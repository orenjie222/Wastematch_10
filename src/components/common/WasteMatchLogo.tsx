import React from 'react';

interface WasteMatchLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
}

export const WasteMatchLogo: React.FC<WasteMatchLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Cyclical Loop & Leaf Mark */}
      <div 
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Subtle Outer Protective Ring */}
          <circle cx="22" cy="22" r="21" stroke={light ? 'rgba(255,255,255,0.2)' : '#164C3A'} strokeOpacity={light ? '1' : '0.12'} strokeWidth="1.5" />
          
          {/* Loop 1: Top Right Cyclical Leaf Arc */}
          <path
            d="M14 18C14 13.5817 17.5817 10 22 10C27.5228 10 32 14.4772 32 20C32 24.4183 29.5 28.5 24 30"
            stroke={light ? '#A7F3D0' : '#164C3A'}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Loop 2: Bottom Left Cyclical Matching Arc with Arrowhead */}
          <path
            d="M30 26C30 30.4183 26.4183 34 22 34C16.4772 34 12 29.5228 12 24C12 19.5817 14.5 15.5 20 14"
            stroke={light ? '#34D399' : '#10B981'}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Central Mutual Match Pivot Point */}
          <circle cx="22" cy="22" r="3.2" fill={light ? '#FFFFFF' : '#164C3A'} />

          {/* Eco Sprout Accent Needle */}
          <path
            d="M22 18C23.5 15 26 14 27.5 14.5C27 16.5 25 18 22 18Z"
            fill={light ? '#34D399' : '#059669'}
          />
        </svg>
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight ${textSize} font-display ${light ? 'text-white' : 'text-[#164C3A]'}`}>
            WasteMatch
          </span>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded tracking-wider uppercase ${
            light ? 'bg-white/20 text-[#A7F3D0]' : 'bg-[#DCE9E2] text-[#164C3A]'
          }`}>
            TH
          </span>
        </div>

        {showSubtitle && (
          <span className={`text-[10px] font-medium tracking-wide ${light ? 'text-white/70' : 'text-[#1C211F]/60'}`}>
            Circular Marketplace & Mutual Match
          </span>
        )}
      </div>
    </div>
  );
};
