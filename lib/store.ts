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
