"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGalleryStore } from "../../lib/store";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Heart, X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import React from "react";

// Modal component for viewing images
function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  onDownload,
}: {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ id: string; src: string }>;
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDownload: (src: string, id: string) => void;
}) {
  const currentImage = images[currentIndex];
  const [imageLoading, setImageLoading] = useState(true);

  // Get the original full-resolution URL by removing Cloudinary optimizations
  const getFullResolutionUrl = (src: string) => {
    // Remove the f_auto,q_auto optimization to get original image
    return src.replace('/upload/f_auto,q_auto/', '/upload/');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) onNavigate('prev');
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) onNavigate('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  // Reset loading state when image changes
  useEffect(() => {
    if (currentImage) {
      setImageLoading(true);
    }
  }, [currentImage]);

  if (!isOpen || !currentImage) return null;

  const fullResUrl = getFullResolutionUrl(currentImage.src);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Close button - mobile optimized */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm sm:top-4 sm:right-4"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>

        {/* Navigation buttons - mobile optimized */}
        {currentIndex > 0 && (
          <Button
            onClick={() => onNavigate('prev')}
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm sm:left-4"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        )}

        {currentIndex < images.length - 1 && (
          <Button
            onClick={() => onNavigate('next')}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm sm:right-4"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        )}

        {/* Loading spinner */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <Image
              src={fullResUrl}
              alt=""
              width={2000}
              height={2000}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority
              onLoadingComplete={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </div>
        </div>

        {/* Bottom bar - mobile optimized */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 sm:py-3 z-30">
          <span className="text-white text-xs sm:text-sm font-medium">
            {currentIndex + 1} of {images.length}
          </span>
          <Button
            onClick={() => onDownload(fullResUrl, currentImage.id)}
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm h-8 sm:h-9"
          >
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

// Small card component for clean fade-in handling
const PhotoCard = React.forwardRef<HTMLDivElement, {
  src: string;
  id: string;
  onDownload: (src: string, id: string) => void;
  onView: () => void;
}>(({ src, id, onDownload, onView }, ref) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Card ref={ref} className="group hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={src}
            alt=""
            width={800}
            height={600}
            // Responsive sizes for better perf
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`w-full h-64 object-cover transition-opacity duration-500 cursor-pointer ${loaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoadingComplete={() => setLoaded(true)}
            onClick={onView}
          />
          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onView();
                }}
                className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(src, id);
                }}
                className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default function GalleryPage() {
  const { images, fetchImages, loading, hasMore } = useGalleryStore();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initial fetch
  useEffect(() => {
    if (images.length === 0) fetchImages();
  }, [fetchImages, images.length]);

  // Infinite scroll observer (prefetch early with large rootMargin)
  const lastImageRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchImages();
          }
        },
        {
          root: null,
          rootMargin: "1200px 0px", // start fetching before user reaches bottom
          threshold: 0.01,
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, fetchImages]
  );

  // Get the original full-resolution URL by removing Cloudinary optimizations
  const getFullResolutionUrl = (src: string) => {
    // Remove the f_auto,q_auto optimization to get original image
    return src.replace('/upload/f_auto,q_auto/', '/upload/');
  };

  // Download functionality with proper cross-origin handling
  const handleDownload = async (src: string, id: string) => {
    // Always use full resolution for downloads
    const fullResUrl = getFullResolutionUrl(src);
    
    try {
      // For cross-origin images, we need to fetch and create a blob
      const response = await fetch(fullResUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `nancy_photo_${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback for same-origin images or if CORS fails
      const link = document.createElement("a");
      link.href = fullResUrl;
      link.download = `nancy_photo_${id}.jpg`;
      link.target = "_blank"; // Open in new tab if download fails
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadAll = async () => {
    if (images.length === 0) return;
    
    // Show progress indication
    const button = document.querySelector('[data-download-all]') as HTMLButtonElement;
    if (button) {
      button.disabled = true;
      button.textContent = 'Downloading...';
    }

    try {
      // Download each image with a small delay to avoid overwhelming the browser
      for (let i = 0; i < images.length; i++) {
        await handleDownload(images[i].src, images[i].id);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error('Download all failed:', error);
    } finally {
      // Reset button
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>Download All';
      }
    }
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'next' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-semibold text-gray-900">
                Nancy's Photo Gallery
              </span>
            </div>
            <Button 
              onClick={downloadAll} 
              className="bg-rose-600 hover:bg-rose-700"
              data-download-all
            >
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nancy's Photo Gallery</h1>
          <p className="text-gray-600 mb-6">
            A collection of cherished memories and moments
          </p>
          <p className="text-sm text-gray-500">
            Click on any photo to view it larger, or use the download buttons to save your favorites
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((photo, idx) => {
            const isLast = idx === images.length - 1;
            return (
              <PhotoCard
                key={photo.id}
                id={photo.id}
                src={photo.src}
                ref={isLast ? lastImageRef : undefined}
                onDownload={handleDownload}
                onView={() => openModal(idx)}
              />
            );
          })}
        </div>

        {/* Loading / End states */}
        <div className="mt-8 flex justify-center">
          {loading && (
            <div className="flex flex-col items-center space-y-3 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              </div>
              <p className="text-blue-700 font-medium text-sm">Loading more amazing content...</p>
            </div>
          )}
          
          {!loading && !hasMore && images.length > 0 && (
            <div className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-8 h-8 text-gray-400 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <p className="text-gray-600 font-medium text-sm">You've explored it all!</p>
              <p className="text-gray-400 text-xs">No more content to load</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentImageIndex}
        onNavigate={navigateModal}
        onDownload={handleDownload}
      />
    </div>
  );
}