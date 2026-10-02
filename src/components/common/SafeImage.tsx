import React, { useState } from 'react';
import { FALLBACK_IMAGE, getCategoryDefaultImage } from '../../data/seedData';
import { ListingCategory } from '../../types/marketplace';
import { ImageOff, Sparkles, Edit3 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  category?: ListingCategory | string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
  onEditClick?: () => void;
  showEditBadge?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'WasteMatch Image',
  category,
  fallbackSrc,
  className = '',
  onEditClick,
  showEditBadge = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Determine fallback target
  const defaultFallback = fallbackSrc || (category ? getCategoryDefaultImage(category) : FALLBACK_IMAGE);
  const resolvedSrc = !src || hasError ? defaultFallback : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-[#EEEAE1] animate-pulse flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-[#B8AA96]/60 animate-spin" />
        </div>
      )}

      <img
        {...props}
        src={resolvedSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-80'
        }`}
      />

      {/* Optional on-hover or direct edit button */}
      {showEditBadge && onEditClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          className="absolute bottom-2 right-2 px-2 py-1 bg-[#252722]/80 hover:bg-[#344634] text-white rounded-md text-[11px] font-medium flex items-center gap-1 shadow-md backdrop-blur-xs transition-all cursor-pointer z-10"
          title="แก้ไขหรือเปลี่ยนรูปภาพ"
        >
          <Edit3 className="w-3 h-3" />
          <span>เปลี่ยนรูป</span>
        </button>
      )}
    </div>
  );
};
