import React, { useState } from 'react';
import { Volume2, Gauge, HardDrive, WifiOff, Trash2, Check, User, Sparkles, Download, Smartphone } from 'lucide-react';
import { UserStats } from '../types';
import { saveUserStats } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface SettingsViewProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ stats, onUpdateStats }) => {
  const [nameInput, setNameInput] = useState(stats.userName);
  const [savedNameSuccess, setSavedNameSuccess] = useState(false);
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    soundManager.playClick();
    const updated = { ...stats, userName: nameInput.trim() };
    onUpdateStats(updated);
    saveUserStats(updated);
    setSavedNameSuccess(true);
    setTimeout(() => setSavedNameSuccess(false), 2000);
  };

  const handleChangeSpeechRate = (rate: number) => {
    soundManager.playClick();
    const updated = { ...stats, speechRate: rate };
    onUpdateStats(updated);
    saveUserStats(updated);
  };

  const handleReset = () => {
    if (window.confirm('Оё дарвоқеъ мехоҳед ҳамаи пешрафтро аз нав оғоз кунед?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-5 sm:py-6 px-3 sm:px-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>⚙️</span>
          <span>Танзимот ва Профил</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Мутобиқсозии барнома ва идораи пешрафти шахсӣ
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        
        {/* PWA In-App Install Card */}
        {!isInstalled && (
          <div className="duo-card p-5 bg-linear-to-r from-blue-500 to-indigo-600 text-white border-blue-600 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Насби барнома (PWA)</span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-snug">
                  Сабзакро ба телефони худ насб кунед!
                </h3>
                <p className="text-xs text-blue-100 font-medium mt-1 leading-relaxed">
                  Истифодаи сареъ аз экрани асосӣ, бидуни сатри браузер ва кор дар ҳолати офлайн.
                </p>
              </div>
              <div className="text-3xl shrink-0">📱</div>
            </div>

            <div className="mt-4">
              {isInstallable && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    install();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Ҳозир насб кардан</span>
                </button>
              )}

              {isIOS && (
                <button
                  onClick={() => setShowIOSModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Дастури насб барои iOS / iPhone</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="duo-card p-5 bg-white">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">
            Номи корбар
          </h3>
          <form onSubmit={handleSaveName} className="flex gap-2">
            <div className="relative flex-1">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={25}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-hidden font-bold text-sm"
                placeholder="Номи шумо..."
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl duo-btn-green font-bold text-xs uppercase"
            >
              {savedNameSuccess ? 'Сабт шуд!' : 'Сабт'}
            </button>
          </form>
        </div>

        {/* Speech Speed Setting */}
        <div className="duo-card p-5 bg-white">
          <div className="flex items-center gap-2 text-gray-800 font-black text-sm mb-1">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span>Суръати талаффузи овози англисӣ</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Суръатеро интихоб кунед, ки барои шунидан ва дарки гӯшии шумо мувофиқ бошад.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { rate: 0.7, label: 'Оҳиста (0.7x)' },
              { rate: 0.85, label: 'Муътадил (0.85x)' },
              { rate: 1.0, label: 'Муқаррарӣ (1.0x)' },
            ].map(({ rate, label }) => (
              <button
                key={rate}
                type="button"
                onClick={() => handleChangeSpeechRate(rate)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold border-2 transition ${
                  stats.speechRate === rate
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Offline Support Details Card */}
        <div className="duo-card p-5 bg-emerald-50/70 border-emerald-200">
          <div className="flex items-center gap-2.5 text-emerald-900 font-black text-sm mb-1.5">
            <WifiOff className="w-5 h-5 text-emerald-600" />
            <span>Дастгирии пурраи офлайн (Offline Mode)</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed font-medium">
            Ҳамаи дарсҳои забони англисӣ, саволҳо, тарҷумаҳо, овозҳои сунъӣ (Web Speech), ва луғатнома дар худи дастгоҳи шумо (Local Storage & Cache) маҳфузанд. Ҳатто дар деҳаҳо ва минтақаҳои бе интернет метавонед озодона омӯзишро идома диҳед!
          </p>
        </div>

        {/* Lifetime Summary Stats */}
        <div className="duo-card p-5 bg-white">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-3">
            Омори умумии шумо
          </h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-bold block">Холҳои умумӣ</span>
              <span className="text-xl font-black text-amber-500">{stats.xp} XP</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-bold block">Дарсҳои хатмшуда</span>
              <span className="text-xl font-black text-emerald-600">{stats.completedLessonIds.length}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-bold block">Занҷираи рекордӣ</span>
              <span className="text-xl font-black text-orange-500">{stats.streak} рӯз</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-bold block">Калимаҳои омӯхта</span>
              <span className="text-xl font-black text-blue-600">{(stats.masteredWordIds || []).length}</span>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="pt-2 text-center">
          <button
            onClick={handleReset}
            className="text-xs font-bold text-gray-400 hover:text-rose-600 transition flex items-center justify-center gap-1.5 mx-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Аз нав оғоз кардани барнома (Reset data)</span>
          </button>
        </div>

      </div>

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-gray-900">Насб дар iPhone / iPad</h3>
            <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
              1. Тугмаи <strong>«Мубодила» (Share ⎋)</strong>-ро дар поёни браузери Safari пахш кунед.<br />
              2. Ба поён фароед ва <strong>«Илова ба экрани асосӣ» (Add to Home Screen)</strong>-ро интихоб намоед.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-bold text-gray-800 hover:bg-gray-200 transition"
            >
              Фаҳмо шуд
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
