import React from 'react';

export type MascotMood = 'happy' | 'cheering' | 'sad' | 'thinking' | 'studying' | 'speaking';

interface SabzakMascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SabzakMascot: React.FC<SabzakMascotProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-52 h-52',
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Speech bubble */}
      {speechText && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-white border-2 border-gray-200 shadow-md rounded-2xl px-3.5 py-1.5 text-xs font-bold text-gray-800 animate-gentle-bounce flex items-center gap-1.5">
          <span>{speechText}</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 -z-10 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-gray-200" />
        </div>
      )}

      {/* SVG Mascot */}
      <svg
        className={`${sizeMap[size]} transition-transform duration-300 ${
          mood === 'cheering' ? 'scale-110 animate-bounce' : mood === 'sad' ? 'grayscale-[20%] translate-y-1' : ''
        }`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#58CC02" />
            <stop offset="100%" stopColor="#46A302" />
          </linearGradient>
          <linearGradient id="bellyGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#79D800" />
            <stop offset="100%" stopColor="#58CC02" />
          </linearGradient>
          <linearGradient id="beakYellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFC800" />
            <stop offset="100%" stopColor="#FF9600" />
          </linearGradient>
        </defs>

        {/* Wings */}
        {mood === 'cheering' ? (
          <>
            {/* Raised celebration wings */}
            <ellipse cx="40" cy="80" rx="16" ry="34" fill="#46A302" transform="rotate(-40 40 80)" />
            <ellipse cx="160" cy="80" rx="16" ry="34" fill="#46A302" transform="rotate(40 160 80)" />
          </>
        ) : mood === 'thinking' ? (
          <>
            <ellipse cx="45" cy="115" rx="14" ry="28" fill="#46A302" transform="rotate(-15 45 115)" />
            {/* Wing placed near chin */}
            <ellipse cx="125" cy="110" rx="15" ry="25" fill="#46A302" transform="rotate(-45 125 110)" />
          </>
        ) : (
          <>
            <ellipse cx="45" cy="115" rx="14" ry="30" fill="#46A302" transform="rotate(-15 45 115)" />
            <ellipse cx="155" cy="115" rx="14" ry="30" fill="#46A302" transform="rotate(15 155 115)" />
          </>
        )}

        {/* Feet */}
        <ellipse cx="80" cy="172" rx="12" ry="7" fill="#FF9600" />
        <ellipse cx="120" cy="172" rx="12" ry="7" fill="#FF9600" />

        {/* Body */}
        <ellipse cx="100" cy="108" rx="60" ry="62" fill="url(#bodyGreen)" />

        {/* Belly */}
        <ellipse cx="100" cy="122" rx="42" ry="44" fill="url(#bellyGreen)" />
        <path d="M85 130 Q100 140 115 130" stroke="#46A302" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M90 144 Q100 152 110 144" stroke="#46A302" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Tajik Traditional Toqi / Crown on head */}
        <g transform="translate(100, 36)">
          <path d="M-22 14 L0 -4 L22 14 Z" fill="#D97706" />
          <circle cx="0" cy="-4" r="3.5" fill="#FCD34D" />
          <circle cx="-16" cy="12" r="2.5" fill="#EF4444" />
          <circle cx="0" cy="8" r="2.5" fill="#10B981" />
          <circle cx="16" cy="12" r="2.5" fill="#3B82F6" />
        </g>

        {/* Eyes */}
        {mood === 'sad' ? (
          <>
            {/* Sad downturned eyes */}
            <ellipse cx="78" cy="88" rx="20" ry="22" fill="#FFFFFF" />
            <ellipse cx="122" cy="88" rx="20" ry="22" fill="#FFFFFF" />
            <ellipse cx="78" cy="92" rx="11" ry="12" fill="#2B3942" />
            <ellipse cx="122" cy="92" rx="11" ry="12" fill="#2B3942" />
            {/* Teardrop */}
            <path d="M60 102 C60 106 64 110 68 110 C72 110 76 106 72 100 Q68 94 68 94 Q68 94 60 102 Z" fill="#38BDF8" />
          </>
        ) : mood === 'cheering' ? (
          <>
            {/* Joyful arched closed eyes */}
            <path d="M65 88 Q78 72 91 88" stroke="#2B3942" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M109 88 Q122 72 135 88" stroke="#2B3942" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Sparkles */}
            <path d="M35 55 L40 50 L45 55 L40 60 Z" fill="#FFC800" />
            <path d="M160 55 L165 50 L170 55 L165 60 Z" fill="#FFC800" />
          </>
        ) : (
          <>
            {/* Large vibrant eyes */}
            <ellipse cx="78" cy="86" rx="21" ry="24" fill="#FFFFFF" />
            <ellipse cx="122" cy="86" rx="21" ry="24" fill="#FFFFFF" />
            <ellipse cx="80" cy="87" rx="12" ry="14" fill="#2B3942" />
            <ellipse cx="120" cy="87" rx="12" ry="14" fill="#2B3942" />
            {/* Highlights */}
            <circle cx="85" cy="82" r="5" fill="#FFFFFF" />
            <circle cx="78" cy="92" r="2.5" fill="#FFFFFF" />
            <circle cx="125" cy="82" r="5" fill="#FFFFFF" />
            <circle cx="118" cy="92" r="2.5" fill="#FFFFFF" />
          </>
        )}

        {/* Beak */}
        <polygon points="100,94 90,114 110,114" fill="url(#beakYellow)" />

        {/* Blush cheeks */}
        <ellipse cx="60" cy="106" rx="8" ry="4" fill="#F472B6" opacity="0.6" />
        <ellipse cx="140" cy="106" rx="8" ry="4" fill="#F472B6" opacity="0.6" />
      </svg>
    </div>
  );
};
