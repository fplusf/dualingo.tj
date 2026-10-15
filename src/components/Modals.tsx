import React from 'react';
import { X, Flame, Heart, Gem, Shield, Check, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserStats } from '../types';
import { soundManager } from '../utils/audio';
import { saveUserStats } from '../utils/storage';

interface ModalProps {
  stats: UserStats;
  onClose: () => void;
  onUpdateStats: (newStats: UserStats) => void;
}

// 1. Streak Modal
export const StreakModal: React.FC<ModalProps> = ({ stats, onClose }) => {
  const daysOfWeek = ['Дш', 'Сш', 'Чш', 'Пш', 'Ҷм', 'Шб', 'Як'];
  const today = new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center relative border-2 border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
          <Flame className="w-12 h-12 fill-current animate-bounce" />
        </div>

        <h3 className="text-3xl font-black text-gray-900">
          {stats.streak} Рӯз
        </h3>
        <p className="mt-1 text-sm text-gray-600 font-bold">
          Занҷираи омӯзиши ҳаррӯза
        </p>
        <p className="mt-2 text-xs text-gray-500 leading-relaxed">
          Ҳар рӯз ҳадди аққал як дарсро хатм кунед, то занҷира наканда шавад ва маҳорати шумо устувор гардад!
        </p>

        {/* 7-day mini calendar */}
        <div className="mt-6 p-3 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((day, idx) => {
              const isPastActive = idx <= (today.getDay() === 0 ? 6 : today.getDay() - 1);
              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400">{day}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isPastActive
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isPastActive ? <Flame className="w-4 h-4 fill-current" /> : '•'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak freeze perk */}
        <div className="mt-4 p-3 bg-sky-50 rounded-xl border border-sky-100 flex items-center gap-2.5 text-left text-xs">
          <Shield className="w-5 h-5 text-sky-600 shrink-0" />
          <div>
            <span className="font-bold text-sky-900 block">Ҳимояи занҷира (Streak Freeze)</span>
            <span className="text-sky-700 text-[11px]">
              {stats.hasStreakFreeze ? 'Фаъол аст: 1 рӯз агар фаромӯш кунед, занҷира намесӯзад!' : 'Дар мағоза харидорӣ кардан мумкин аст.'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl duo-btn-green font-black text-sm uppercase tracking-wider"
        >
          Давом додан
        </button>
      </div>
    </div>
  );
};

// 2. Hearts Modal
export const HeartsModal: React.FC<ModalProps> = ({ stats, onClose, onUpdateStats }) => {
  const handleRefillWithGems = () => {
    if (stats.gems < 50) return;
    soundManager.playFanfare();
    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    } catch {
      //
    }
    const updated = {
      ...stats,
      hearts: stats.maxHearts,
      gems: stats.gems - 50,
      lastHeartRegenTime: Date.now(),
    };
    onUpdateStats(updated);
    saveUserStats(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center relative border-2 border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 text-rose-500 flex items-center justify-center mb-4">
          <Heart className="w-12 h-12 fill-current" />
        </div>

        <h3 className="text-3xl font-black text-gray-900">
          {stats.hearts} / {stats.maxHearts} Ҷон
        </h3>
        <p className="mt-1 text-sm text-gray-600 font-bold">
          Ҳангоми хато кардан як ҷон кам мешавад
        </p>
        <p className="mt-2 text-xs text-gray-500 leading-relaxed">
          Ҳар 25 дақиқа 1 ҷон ба таври худкор барқарор мешавад, ҳатто агар телефони шумо офлайн бошад!
        </p>

        {/* Refill Options */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleRefillWithGems}
            disabled={stats.gems < 50 || stats.hearts === stats.maxHearts}
            className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition ${
              stats.gems >= 50 && stats.hearts < stats.maxHearts
                ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 active:scale-95'
                : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="text-left">
              <span className="font-bold text-xs block">Пур кардани ҳамаи ҷонҳо</span>
              <span className="text-[11px] text-gray-500">Фавран 5/5 мегардад</span>
            </div>
            <div className="flex items-center gap-1 font-black text-xs text-sky-600 bg-white px-2.5 py-1.5 rounded-xl border border-blue-200">
              <span>💎 50</span>
            </div>
          </button>

          {/* Practice to earn 1 heart (Duolingo practice feature) */}
          <button
            onClick={() => {
              soundManager.playFanfare();
              try {
                confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
              } catch {}
              const updated = {
                ...stats,
                hearts: Math.min(stats.maxHearts, stats.hearts + 1),
                xp: stats.xp + 5,
              };
              onUpdateStats(updated);
              saveUserStats(updated);
            }}
            disabled={stats.hearts === stats.maxHearts}
            className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition ${
              stats.hearts < stats.maxHearts
                ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 active:scale-95'
                : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="text-left">
              <span className="font-bold text-xs block">Машқи зуд барои барқарор кардан</span>
              <span className="text-[11px] text-emerald-700">Бепул: +1 ❤️ ва +5 XP</span>
            </div>
            <div className="flex items-center gap-1 font-black text-xs text-emerald-700 bg-white px-2.5 py-1.5 rounded-xl border border-emerald-200">
              <span>+1 ❤️</span>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-2xl duo-btn-white font-bold text-sm"
        >
          Фаҳмо шуд
        </button>
      </div>
    </div>
  );
};

// 3. Gems / Shop Modal
export const GemsModal: React.FC<ModalProps> = ({ stats, onClose, onUpdateStats }) => {
  const handleBuyFreeze = () => {
    if (stats.gems < 100 || stats.hasStreakFreeze) return;
    soundManager.playFanfare();
    const updated = {
      ...stats,
      gems: stats.gems - 100,
      hasStreakFreeze: true,
    };
    onUpdateStats(updated);
    saveUserStats(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center relative border-2 border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-18 h-18 mx-auto rounded-3xl bg-sky-100 text-sky-500 flex items-center justify-center mb-3">
          <span className="text-4xl">💎</span>
        </div>

        <h3 className="text-2xl font-black text-gray-900">
          {stats.gems} Дурдона
        </h3>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Дурдонаҳоро бо хатми дарсҳо ва иҷрои вазифаҳо ба даст оред.
        </p>

        {/* Shop Items */}
        <div className="mt-5 space-y-3 text-left">
          {/* Freeze */}
          <div className="p-3.5 rounded-2xl border-2 border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧊</span>
              <div>
                <h4 className="text-xs font-black text-gray-900">Занҷираи яхбаста</h4>
                <p className="text-[10px] text-gray-500 font-medium">Ҳимояи занҷираи рӯзҳо</p>
              </div>
            </div>
            {stats.hasStreakFreeze ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                Фаъол
              </span>
            ) : (
              <button
                onClick={handleBuyFreeze}
                disabled={stats.gems < 100}
                className="px-3 py-1.5 rounded-xl duo-btn-blue text-xs font-bold disabled:opacity-40"
              >
                100 💎
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl duo-btn-white font-bold text-sm"
        >
          Бастан
        </button>
      </div>
    </div>
  );
};
