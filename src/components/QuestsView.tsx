import React, { useState, useEffect } from 'react';
import { Target, Gift, Check, Sparkles, Award, Flame, Zap, Clock, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DailyChallenge, Quest, UserStats } from '../types';
import {
  getDailyChallenge,
  getDailyQuests,
  saveDailyChallenge,
  saveDailyQuests,
  saveUserStats,
} from '../utils/storage';
import { soundManager } from '../utils/audio';

interface QuestsViewProps {
  stats: UserStats;
  onStatsUpdate: (updated: UserStats) => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({ stats, onStatsUpdate }) => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [challenge, setChallenge] = useState<DailyChallenge>(getDailyChallenge());
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate live countdown timer until midnight (24h reset)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // next midnight
      const diff = Math.max(0, midnight.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setQuests(getDailyQuests());
    setChallenge(getDailyChallenge());
  }, []);

  // Claim Daily Quest
  const handleClaimQuest = (quest: Quest) => {
    if (!quest.isCompleted || quest.isClaimed) return;

    soundManager.playFanfare();
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Fallback
    }

    const updatedQuests = quests.map(q => (q.id === quest.id ? { ...q, isClaimed: true } : q));
    setQuests(updatedQuests);
    saveDailyQuests(updatedQuests);

    const updatedStats: UserStats = {
      ...stats,
      gems: stats.gems + quest.rewardGems,
      xp: stats.xp + quest.rewardXp,
    };
    onStatsUpdate(updatedStats);
    saveUserStats(updatedStats);
  };

  // Claim Daily Challenge
  const handleClaimChallenge = () => {
    if (!challenge.isCompleted || challenge.isClaimed) return;

    soundManager.playFanfare();
    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // Fallback
    }

    const updatedChallenge: DailyChallenge = {
      ...challenge,
      isClaimed: true,
    };
    setChallenge(updatedChallenge);
    saveDailyChallenge(updatedChallenge);

    const updatedStats: UserStats = {
      ...stats,
      gems: stats.gems + challenge.rewardGems,
      xp: stats.xp + challenge.rewardXp,
    };
    onStatsUpdate(updatedStats);
    saveUserStats(updatedStats);
  };

  const challengePercent = Math.min(100, Math.round((challenge.current / challenge.target) * 100));

  const badges = [
    {
      title: 'Оғози бобарор',
      desc: 'Дарси якумро ба анҷом расонед',
      icon: '🌱',
      achieved: stats.completedLessonIds.length >= 1,
    },
    {
      title: 'Занҷираи оташин',
      desc: '3 рӯз пайдарпай дарс хонед',
      icon: '🔥',
      achieved: stats.streak >= 3,
    },
    {
      title: 'Ҷамъовари калимаҳо',
      desc: 'Камаш 10 калимаро аз худ намоед',
      icon: '📖',
      achieved: (stats.masteredWordIds || []).length >= 10,
    },
    {
      title: 'Қаҳрамони грамматика',
      desc: 'Дастури қоидаҳоро омӯзед',
      icon: '👑',
      achieved: stats.xp >= 60,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-5 sm:py-6 px-3 sm:px-4 pb-24">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>🎯</span>
          <span>Вазифаҳо ва Сабқати Рӯзона</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Ҳар рӯз вазифаҳоро иҷро карда, дурдонаҳо ва холҳои иловагӣ ба даст оред
        </p>
      </div>

      {/* 1. FEATURED: 24-HOUR DAILY CHALLENGE CARD */}
      <div className="mb-7 duo-card p-5 bg-linear-to-br from-amber-500 via-orange-500 to-rose-500 border-amber-600 text-white shadow-lg relative overflow-hidden">
        {/* Glow blur background decor */}
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-yellow-300/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header with Live 24h Countdown */}
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-black uppercase tracking-wider">
            <span className="text-sm">{challenge.badgeIcon}</span>
            <span>Сабқати 24-соата (Daily Challenge)</span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-xs text-xs font-black tracking-wider text-yellow-200">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Challenge Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2">
            <span>{challenge.titleTj}</span>
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 font-semibold mt-1">
            {challenge.descriptionTj}
          </p>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-black mb-1.5">
            <span className="text-orange-100">Пешрафти сабқат:</span>
            <span className="text-yellow-200">
              {challenge.current} / {challenge.target} {challenge.type === 'xp_rush' ? 'XP' : 'дарс'} ({challengePercent}%)
            </span>
          </div>
          <div className="w-full h-3.5 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                challenge.isCompleted ? 'bg-yellow-300' : 'bg-white'
              }`}
              style={{ width: `${challengePercent}%` }}
            />
          </div>
        </div>

        {/* Action Button & Reward */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-900 bg-yellow-300 px-3 py-1 rounded-xl shadow-xs">
              +{challenge.rewardGems} 💎
            </span>
            <span className="text-xs font-black text-white bg-white/25 px-3 py-1 rounded-xl">
              +{challenge.rewardXp} XP
            </span>
          </div>

          <div>
            {challenge.isClaimed ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs font-black text-xs uppercase tracking-wider text-yellow-200">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Қабул шуд</span>
              </span>
            ) : challenge.isCompleted ? (
              <button
                onClick={handleClaimChallenge}
                className="py-2 px-4 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-amber-950 font-black text-xs uppercase tracking-wider shadow-md animate-bounce active:scale-95 transition"
              >
                Гирифтани ҷоиза!
              </button>
            ) : (
              <span className="text-xs font-extrabold text-orange-200">
                Дар иҷро...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Standard Daily Quests Section */}
      <div className="space-y-3.5 mb-7">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
          Вазифаҳои имрӯза
        </h3>

        {quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

          return (
            <div
              key={quest.id}
              className={`duo-card p-3.5 sm:p-4 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                quest.isCompleted && !quest.isClaimed ? 'border-amber-400 shadow-sm' : ''
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    quest.isClaimed
                      ? 'bg-emerald-100 text-emerald-600'
                      : quest.isCompleted
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {quest.isClaimed ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <Target className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-black text-gray-900 truncate">
                    {quest.titleTj}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">
                    {quest.descriptionTj}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          quest.isCompleted ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-extrabold text-gray-600 whitespace-nowrap">
                      {quest.current} / {quest.target}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward / Claim */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg">
                    +{quest.rewardGems} 💎
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg">
                    +{quest.rewardXp} XP
                  </span>
                </div>

                {quest.isClaimed ? (
                  <span className="text-[11px] font-black text-emerald-600 uppercase px-2.5 py-1 bg-emerald-50 rounded-lg">
                    Гирифта шуд
                  </span>
                ) : quest.isCompleted ? (
                  <button
                    onClick={() => handleClaimQuest(quest)}
                    className="py-1.5 px-3 rounded-xl duo-btn-green font-black text-xs uppercase tracking-wider animate-bounce"
                  >
                    Гирифтан
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-gray-400">
                    Дар иҷро
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Badges / Achievements Section */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
          Дастовардҳо ва Медалҳо
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`duo-card p-3.5 flex items-center gap-3 transition ${
                badge.achieved ? 'bg-white border-amber-300' : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-2xl shrink-0 p-2 bg-gray-100 rounded-xl">
                {badge.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-gray-900 truncate">
                    {badge.title}
                  </h4>
                  {badge.achieved && (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  )}
                </div>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5 line-clamp-1">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
