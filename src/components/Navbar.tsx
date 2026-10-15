import React from 'react';
import { Flame, Gem, Heart, Wifi, WifiOff, Volume2, VolumeX, Download } from 'lucide-react';
import { UserStats } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  stats: UserStats;
  onOpenStreakModal: () => void;
  onOpenHeartsModal: () => void;
  onOpenGemsModal: () => void;
  onToggleSound: () => void;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  onOpenStreakModal,
  onOpenHeartsModal,
  onOpenGemsModal,
  onToggleSound,
  onLogoClick,
}) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [showIOSHint, setShowIOSHint] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-200 shadow-xs px-2 sm:px-4 py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1 sm:gap-3">
        
        {/* Brand / Logo */}
        <button
          onClick={() => {
            soundManager.playClick();
            if (onLogoClick) onLogoClick();
          }}
          className="flex items-center gap-2 cursor-pointer text-left shrink-0 active:scale-95 transition"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#58CC02] flex items-center justify-center shadow-xs overflow-hidden">
            <span className="text-lg sm:text-xl">🦉</span>
          </div>
          <div className="hidden min-[420px]:block">
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[#58CC02] leading-none">
              САБЗАК
            </h1>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Англисӣ
            </span>
          </div>
        </button>

        {/* Stats Chips (Gamified Duolingo bar) */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          
          {/* Offline / Online badge (only shown on larger screens to save space) */}
          <div
            title={isOnline ? 'Пайвастшавӣ ба интернет фаъол аст' : 'Ҳолати офлайн фаъол аст: Ҳамаи дарсҳо кор мекунанд!'}
            className={`hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'Онлайн' : 'Офлайн'}</span>
          </div>

          {/* In-App PWA Install Button */}
          {!isInstalled && isInstallable && (
            <button
              onClick={() => {
                soundManager.playClick();
                install();
              }}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
              title="Насб кардан"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Насб</span>
            </button>
          )}

          {!isInstalled && isIOS && (
            <button
              onClick={() => setShowIOSHint(true)}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-3 h-3" />
              <span>iOS</span>
            </button>
          )}

          {/* Streak 🔥 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenStreakModal();
            }}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-xl hover:bg-orange-50 active:scale-95 transition"
            title="Занҷираи рӯзҳо (Streak)"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500" />
            <span className="font-black text-orange-600 text-xs sm:text-sm">
              {stats.streak}
            </span>
          </button>

          {/* Gems 💎 */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGemsModal();
            }}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-xl hover:bg-sky-50 active:scale-95 transition"
            title="Дурдонаҳо (Gems)"
          >
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 fill-sky-400" />
            <span className="font-black text-sky-600 text-xs sm:text-sm">
              {stats.gems}
            </span>
          </button>

          {/* Hearts ❤️ */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenHeartsModal();
            }}
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-xl hover:bg-rose-50 active:scale-95 transition"
            title="Ҷонҳо (Hearts)"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${stats.hearts > 0 ? 'text-rose-500 fill-rose-500' : 'text-gray-300'}`} />
            <span className={`font-black text-xs sm:text-sm ${stats.hearts > 0 ? 'text-rose-500' : 'text-gray-400'}`}>
              {stats.hearts}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition active:scale-95"
            title={stats.soundEnabled ? 'Хомӯш кардани садо' : 'Фаъол кардани садо'}
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* iOS Install Instructions Modal */}
      {showIOSHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-gray-900">Насб дар iPhone / iPad</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
              1. Тугмаи <strong>«Мубодила» (Share ⎋)</strong>-ро дар Safari пахш кунед.<br />
              2. <strong>«Илова ба экрани асосӣ» (Add to Home Screen)</strong>-ро интихоб намоед.
            </p>
            <button
              onClick={() => setShowIOSHint(false)}
              className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-200 transition"
            >
              Фаҳмо шуд
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
