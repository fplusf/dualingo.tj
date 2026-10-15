import React, { useState, useEffect } from 'react';
import { Target, Gift, Check, Sparkles, Award, Flame, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quest, UserStats } from '../types';
import { getDailyQuests, saveDailyQuests, saveUserStats } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface QuestsViewProps {
  stats: UserStats;
  onStatsUpdate: (updated: UserStats) => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({ stats, onStatsUpdate }) => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    setQuests(getDailyQuests());
  }, []);

  const handleClaim = (quest: Quest) => {
    if (!quest.isCompleted || quest.isClaimed) return;

    soundManager.playFanfare();
    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Fallback
    }

    const updatedQuests = quests.map(q => q.id === quest.id ? { ...q, isClaimed: true } : q);
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

  const badges = [
    { title: 'Оғози бобарор', desc: 'Дарси якумро ба анҷом расонед', icon: '🌱', achieved: stats.completedLessonIds.length >= 1 },
    { title: 'Занҷираи оташин', desc: '3 рӯз пайдарпай дарс хонед', icon: '🔥', achieved: stats.streak >= 3 },
    { title: 'Ҷамъовари калимаҳо', desc: 'Камаш 10 калимаро аз худ намоед', icon: '📖', achieved: stats.savedWordIds.length >= 2 || stats.completedLessonIds.length >= 2 },
    { title: 'Қаҳрамони грамматика', desc: 'Дастури қоидаҳоро омӯзед', icon: '👑', achieved: stats.xp >= 60 },
  ];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>🎯</span>
          <span>Вазифаҳои рӯзона ва Медалҳо</span>
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Ҳар рӯз вазифаҳоро иҷро карда, дурдонаҳо ва холҳои иловагӣ ба даст оред
        </p>
      </div>

      {/* Daily Quests Section */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
          Вазифаҳои имрӯза
        </h3>

        {quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

          return (
            <div
              key={quest.id}
              className={`duo-card p-4 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                quest.isCompleted && !quest.isClaimed ? 'border-amber-400 shadow-sm' : ''
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  quest.isClaimed
                    ? 'bg-emerald-100 text-emerald-600'
                    : quest.isCompleted
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {quest.isClaimed ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <Target className="w-6 h-6" />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-sm sm:text-base font-black text-gray-900">
                    {quest.titleTj}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {quest.descriptionTj}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          quest.isCompleted ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-gray-600 whitespace-nowrap">
                      {quest.current} / {quest.target}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward / Claim */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-xl">
                    +{quest.rewardGems} 💎
                  </span>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl">
                    +{quest.rewardXp} XP
                  </span>
                </div>

                {quest.isClaimed ? (
                  <span className="text-xs font-black text-emerald-600 uppercase px-3 py-1.5 bg-emerald-50 rounded-xl">
                    Гирифта шуд
                  </span>
                ) : quest.isCompleted ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    className="py-2 px-4 rounded-xl duo-btn-green font-black text-xs uppercase tracking-wider animate-bounce"
                  >
                    Гирифтан
                  </button>
                ) : (
                  <span className="text-xs font-bold text-gray-400">
                    Дар иҷро
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges / Achievements Section */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">
          Дастовардҳо ва Медалҳо
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`duo-card p-4 flex items-center gap-3.5 transition ${
                badge.achieved ? 'bg-white border-amber-300' : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-3xl shrink-0 p-2 bg-gray-100 rounded-2xl">
                {badge.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-gray-900">
                    {badge.title}
                  </h4>
                  {badge.achieved && (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
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
