import React from 'react';
import { Trophy, Flame, Shield, ArrowUp, Sparkles } from 'lucide-react';
import { LeaderboardUser, UserStats } from '../types';
import { getLeaderboard } from '../utils/storage';

interface LeaderboardViewProps {
  stats: UserStats;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats }) => {
  const users = getLeaderboard();
  const leagues = ['Бронза', 'Нуқра', 'Тилло', 'Ёқут', 'Алмос'];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* League Header Banner */}
      <div className="duo-card p-6 bg-linear-to-b from-amber-400 to-amber-500 border-amber-600 text-white text-center mb-6 shadow-md relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
          <Trophy className="w-10 h-10 text-yellow-100" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-amber-100">
          Лигаи ҳарҳафтаина
        </span>
        <h2 className="text-2xl font-black">
          Лигаи {stats.currentLeague}
        </h2>
        <p className="mt-1 text-xs text-amber-100 font-semibold max-w-sm mx-auto">
          3 нафари беҳтарин ба лигаи баландтар роҳ меёбанд! Рӯзи якшанбе ҷадвал нав мешавад.
        </p>

        {/* League indicators */}
        <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
          {leagues.map((lg) => (
            <span
              key={lg}
              className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                stats.currentLeague === lg
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'bg-black/15 text-white/80'
              }`}
            >
              {lg}
            </span>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="duo-card bg-white overflow-hidden divide-y divide-gray-100">
        {users.map((user, idx) => {
          const rank = idx + 1;
          const isTop3 = rank <= 3;

          return (
            <div
              key={user.id}
              className={`p-4 flex items-center justify-between transition ${
                user.isCurrentUser ? 'bg-emerald-50/70 border-l-4 border-l-[#58CC02]' : 'hover:bg-gray-50'
              }`}
            >
              {/* Rank & User Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-7 text-center font-black text-sm">
                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : (
                    <span className="text-gray-400 font-bold">{rank}</span>
                  )}
                </div>

                <div className={`w-10 h-10 rounded-2xl ${user.avatarColor} text-white flex items-center justify-center font-black text-base shadow-xs`}>
                  {user.name.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-gray-900">
                      {user.name}
                    </span>
                    {user.isCurrentUser && (
                      <span className="text-[10px] font-black bg-[#58CC02] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Шумо
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{user.city}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-orange-600 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      {user.streak} рӯз
                    </span>
                  </div>
                </div>
              </div>

              {/* XP */}
              <div className="text-right">
                <span className="text-sm sm:text-base font-black text-gray-900">
                  {user.xp}
                </span>
                <span className="text-xs text-gray-400 font-bold ml-1">
                  XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Promotion Zone Info */}
      <div className="mt-4 p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs font-bold text-emerald-800">
        <ArrowUp className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>3 нафари аввал ба лигаи оянда мегузаранд. Ҳар рӯз дарсҳоро хатм кунед!</span>
      </div>
    </div>
  );
};
