// store.ts
import { create } from 'zustand';

type GalleryImage = { id: string; src: string; pid?: string };

interface GalleryState {
    images: GalleryImage[];
    loading: boolean;
    nextCursor: string | null;
    hasMore: boolean;
    fetchedIds: Set<string>;
    fetchImages: () => Promise<void>;
    reset: () => void;
}

interface Memory {
    id: string;
    name: string;
    email?: string;
    relationship: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

interface MemoriesResponse {
    memories: Memory[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

interface MemoryState {
    memories: Memory[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    loading: boolean;
    error: string | null;
    fetchedPages: Set<number>;
    fetchMemories: (page?: number, limit?: number, force?: boolean) => Promise<void>;
    addMemory: (memory: Memory) => void;
    reset: () => void;
    getRecentMemories: (count?: number) => Memory[];
}

const optimizeCloudinary = (url: string) => {
    // Insert Cloudinary transformations for speed: f_auto,q_auto
    // e.g. https://res.cloudinary.com/<cloud>/image/upload/... -> .../upload/f_auto,q_auto/...
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
};

export const useGalleryStore = create<GalleryState>((set, get) => ({
    images: [],
    loading: false,
    nextCursor: null,
    hasMore: true,
    fetchedIds: new Set(),

    fetchImages: async () => {
        const { loading, hasMore, nextCursor, images, fetchedIds } = get();
        if (loading || !hasMore) return;

        set({ loading: true });

        try {
            const url = nextCursor ? `/api/gallery?next_cursor=${encodeURIComponent(nextCursor)}` : `/api/gallery`;
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch images');

            const data: { images: GalleryImage[]; next_cursor: string | null } = await res.json();

            // De-dupe across pages by id or public_id fallback
            const newImages: GalleryImage[] = [];
            for (const img of data.images || []) {
                const uniqueKey = img.id || img.pid || img.src;
                if (!fetchedIds.has(uniqueKey)) {
                    fetchedIds.add(uniqueKey);
                    newImages.push({
                        id: uniqueKey,
                        src: optimizeCloudinary(img.src),
                    });
                }
            }

            set({
                images: [...images, ...newImages],
                nextCursor: data.next_cursor,
                hasMore: !!data.next_cursor,
                fetchedIds,
            });
        } catch (e) {
            console.error(e);
        } finally {
            set({ loading: false });
        }
    },

    reset: () => set({
        images: [],
        loading: false,
        nextCursor: null,
        hasMore: true,
        fetchedIds: new Set(),
    }),
}));

export const useMemoryStore = create<MemoryState>((set, get) => ({
    memories: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
    },
    loading: false,
    error: null,
    fetchedPages: new Set(),

    fetchMemories: async (page = 1, limit = 10, force = false) => {
        const { loading, fetchedPages } = get();

        // Skip if already loading or page already fetched (unless forced)
        if (loading || (!force && fetchedPages.has(page))) return;

        set({ loading: true, error: null });

        try {
            const response = await fetch(`/api/memories?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error("Failed to fetch memories");
            }

            const data: MemoriesResponse = await response.json();

            set((state) => {
                // If it's page 1 or force refresh, replace memories
                // Otherwise, merge with existing memories
                const updatedMemories = page === 1 || force
                    ? data.memories
                    : [...state.memories, ...data.memories.filter(newMem =>
                        !state.memories.some(existingMem => existingMem.id === newMem.id)
                    )];

                // Sort by creation date (newest first)
                updatedMemories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                return {
                    memories: updatedMemories,
                    pagination: data.pagination,
                    fetchedPages: new Set([...state.fetchedPages, page]),
                };
            });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    },

    addMemory: (memory: Memory) => {
        set((state) => ({
            memories: [memory, ...state.memories],
            pagination: {
                ...state.pagination,
                total: state.pagination.total + 1,
            },
        }));
    },

    reset: () => set({
        memories: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
        },
        loading: false,
        error: null,
        fetchedPages: new Set(),
    }),

    getRecentMemories: (count = 3) => {
        const { memories } = get();
        return memories.slice(0, count);
    },
}));