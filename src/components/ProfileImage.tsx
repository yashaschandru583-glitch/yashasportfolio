import React from 'react';
import staticProfileImg from '../assets/profile.jpg';

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showStatusIndicator?: boolean;
  isAvailable?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = 'Yashas C. - Full-Stack Developer',
  className = '',
  imageClassName = '',
  size = 'md',
  showStatusIndicator = false,
  isAvailable = true,
}) => {
  const imageSrc = src || staticProfileImg;

  // Size mapping presets
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
    xl: 'w-36 h-36 rounded-[2rem]',
    hero: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-[2rem]',
  };

  const glowBlurClasses = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    hero: 'blur-2xl',
  };

  return (
    <div
      className={`relative inline-block group select-none ${className}`}
      id="profile-image-container"
    >
      {/* Subtle Ambient Glowing Ring & Backdrop */}
      <div
        className={`absolute -inset-1 rounded-[inherit] bg-gradient-to-tr from-indigo-600/40 via-purple-600/30 to-emerald-400/40 opacity-75 group-hover:opacity-100 transition-all duration-500 ${glowBlurClasses[size]} pointer-events-none`}
        aria-hidden="true"
      />

      {/* Main Image Frame with subtle glowing border */}
      <div
        className={`relative ${sizeClasses[size]} overflow-hidden border-2 border-indigo-500/50 dark:border-indigo-400/40 light:border-indigo-600/30 shadow-xl shadow-indigo-950/40 bg-slate-900/90 transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center`}
      >
        <img
          src={imageSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${imageClassName}`}
          loading="eager"
        />

        {/* Inner subtle specular light reflection */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Optional Live Status Indicator Beacon */}
      {showStatusIndicator && (
        <div
          className="absolute -bottom-1 -right-1 flex items-center justify-center"
          title={isAvailable ? 'Available for work' : 'Busy'}
        >
          <span className="relative flex h-4 w-4">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isAvailable ? 'bg-emerald-400' : 'bg-amber-400'
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-4 w-4 border-2 border-[#030712] ${
                isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
