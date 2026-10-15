import React, { useState } from 'react';
import { Check, Lock, Star, Sparkles, BookOpen, Play } from 'lucide-react';
import { Lesson, Unit, UserStats } from '../types';
import { soundManager } from '../utils/audio';
import { SabzakMascot } from './SabzakMascot';

interface LearnPathProps {
  units: Unit[];
  stats: UserStats;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenGrammarTopic?: (topicId: string) => void;
}

export const LearnPath: React.FC<LearnPathProps> = ({
  units,
  stats,
  onSelectLesson,
  onOpenGrammarTopic,
}) => {
  const [selectedNodeLesson, setSelectedNodeLesson] = useState<Lesson | null>(null);

  // Winding offset pattern for Duolingo serpentine path (calibrated for mobile screens)
  const getOffsetClass = (index: number) => {
    const pattern = [0, -24, -36, -20, 20, 36, 24, 0];
    const offset = pattern[index % pattern.length];
    return `translateX(${offset}px)`;
  };

  return (
    <div className="max-w-xl mx-auto py-4 sm:py-6 px-3 sm:px-4 pb-24">
      
      {/* Top Welcome / Mascot Banner */}
      <div className="mb-6 p-4 sm:p-5 bg-linear-to-r from-emerald-500 to-green-600 rounded-3xl text-white shadow-md relative overflow-hidden flex items-center justify-between gap-2">
        <div className="z-10 flex-1 min-w-0">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Омӯзиши ҳаррӯза</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black leading-tight truncate">
            Салом, {stats.userName}!
          </h2>
          <p className="mt-1 text-xs text-green-100 font-medium line-clamp-2">
            Ҳадафи имрӯз: Ҳадди аққал 1 дарсро хатм кунед ва занҷираи рӯзҳоро нигоҳ доред.
          </p>
        </div>
        <div className="shrink-0 -mr-1">
          <SabzakMascot mood="happy" size="sm" className="sm:hidden" />
          <SabzakMascot mood="happy" size="md" className="hidden sm:block" />
        </div>
      </div>

      {/* Units Flow */}
      <div className="space-y-10">
        {units.map((unit) => {
          return (
            <div key={unit.id} className="relative">
              
              {/* Unit Header Card */}
              <div
                className="p-4 rounded-3xl text-white shadow-md mb-6 flex items-center justify-between gap-2"
                style={{ backgroundColor: unit.color }}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white/80 block">
                    Қисми {unit.unitNumber}
                  </span>
                  <h3 className="text-base sm:text-lg font-black truncate">
                    {unit.titleTj}
                  </h3>
                  <p className="text-xs text-white/90 font-medium mt-0.5 line-clamp-2">
                    {unit.titleEn} — {unit.descriptionTj}
                  </p>
                </div>

                {onOpenGrammarTopic && (
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenGrammarTopic(`g${unit.unitNumber}`);
                    }}
                    className="p-2 sm:p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white transition active:scale-95 flex items-center gap-1.5 text-xs font-bold shrink-0"
                    title="Хондани қоидаҳои ин қисм"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Дастур</span>
                  </button>
                )}
              </div>

              {/* Lesson Nodes Path */}
              <div className="flex flex-col items-center gap-6 py-2 relative">
                {unit.lessons.map((lesson, idx) => {
                  const isCompleted = stats.completedLessonIds.includes(lesson.id);
                  const isUnlocked = isCompleted || (idx === 0 && unit.unitNumber === 1) || stats.completedLessonIds.length > 0;
                  const isNextActive = isUnlocked && !isCompleted;
                  const isSelected = selectedNodeLesson?.id === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      className="relative flex flex-col items-center"
                      style={{ transform: getOffsetClass(idx) }}
                    >
                      {/* Floating Tooltip Bubble if clicked */}
                      {isSelected && (
                        <div className="absolute -top-32 z-30 w-52 sm:w-56 bg-white rounded-2xl p-3 shadow-2xl border-2 border-gray-200 text-center animate-gentle-bounce">
                          <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-snug">
                            {lesson.titleTj}
                          </h4>
                          <span className="text-[10px] sm:text-[11px] text-gray-500 block font-semibold mt-0.5 truncate">
                            {lesson.titleEn}
                          </span>
                          <div className="mt-1.5 text-xs font-bold text-amber-600 flex items-center justify-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                            <span>+{lesson.xpReward} XP</span>
                          </div>
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              onSelectLesson(lesson);
                            }}
                            className="mt-2 w-full py-2 rounded-xl duo-btn-green text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>{isCompleted ? 'Такрор' : 'Оғоз'}</span>
                          </button>
                          {/* Arrow pointer */}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                        </div>
                      )}

                      {/* Main Circular Button */}
                      <div className="relative">
                        {isNextActive && (
                          <div
                            className="absolute -inset-1.5 rounded-full opacity-70 animate-ping"
                            style={{ backgroundColor: unit.color }}
                          />
                        )}

                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedNodeLesson(isSelected ? null : lesson);
                          }}
                          className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shadow-md relative transition-transform active:translate-y-1 ${
                            isCompleted
                              ? 'bg-amber-400 border-4 border-amber-500 border-b-8 border-b-amber-600 text-white'
                              : isUnlocked
                              ? 'border-4 border-b-8 text-white'
                              : 'bg-gray-200 border-4 border-gray-300 border-b-8 border-b-gray-400 text-gray-400 cursor-not-allowed'
                          }`}
                          style={{
                            backgroundColor: isCompleted ? '#F59E0B' : isUnlocked ? unit.color : '#E5E7EB',
                            borderColor: isCompleted ? '#D97706' : isUnlocked ? unit.color : '#D1D5DB',
                          }}
                        >
                          {isCompleted ? (
                            <div className="flex flex-col items-center">
                              <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3.5]" />
                              <div className="flex gap-0.5 -mt-0.5">
                                <Star className="w-2.5 h-2.5 fill-white text-white" />
                                <Star className="w-2.5 h-2.5 fill-white text-white" />
                                <Star className="w-2.5 h-2.5 fill-white text-white" />
                              </div>
                            </div>
                          ) : isUnlocked ? (
                            <Star className="w-7 h-7 sm:w-8 sm:h-8 fill-white/80" />
                          ) : (
                            <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
                          )}
                        </button>
                      </div>

                      {/* Title label underneath */}
                      <span className="mt-1.5 text-[11px] sm:text-xs font-extrabold text-gray-700 text-center max-w-[110px] sm:max-w-[130px] line-clamp-1">
                        {lesson.titleTj}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
