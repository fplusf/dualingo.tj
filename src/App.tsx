import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  BookA,
  BookOpen,
  Trophy,
  Target,
  User,
  WifiOff
} from 'lucide-react';
import { UNITS_DATA } from './data/lessonsData';
import { Lesson, UserStats } from './types';
import { getUserStats, recordLessonCompletion, saveUserStats } from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { LearnPath } from './components/LearnPath';
import { LessonRunner } from './components/LessonRunner';
import { VocabularyView } from './components/VocabularyView';
import { GrammarGuidebook } from './components/GrammarGuidebook';
import { LeaderboardView } from './components/LeaderboardView';
import { QuestsView } from './components/QuestsView';
import { SettingsView } from './components/SettingsView';
import { StreakModal, HeartsModal, GemsModal } from './components/Modals';
import { useOnlineStatus } from './hooks/useOnlineStatus';

type ActiveTab = 'learn' | 'vocab' | 'grammar' | 'leaderboard' | 'quests' | 'settings';

export default function App() {
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [activeTab, setActiveTab] = useState<ActiveTab>('learn');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [targetGrammarTopic, setTargetGrammarTopic] = useState<string>('g1');

  // Modals
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showHeartsModal, setShowHeartsModal] = useState(false);
  const [showGemsModal, setShowGemsModal] = useState(false);

  const isOnline = useOnlineStatus();

  // Sync sound setting
  useEffect(() => {
    soundManager.setSoundEnabled(stats.soundEnabled);
  }, [stats.soundEnabled]);

  const handleToggleSound = () => {
    const nextState = !stats.soundEnabled;
    const updated = { ...stats, soundEnabled: nextState };
    setStats(updated);
    saveUserStats(updated);
    soundManager.setSoundEnabled(nextState);
    if (nextState) soundManager.playClick();
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (stats.hearts <= 0) {
      soundManager.playWrong();
      setShowHeartsModal(true);
      return;
    }
    setActiveLesson(lesson);
  };

  const handleCompleteLesson = (xp: number, gems: number, zeroMistakes: boolean) => {
    if (!activeLesson) return;
    const updated = recordLessonCompletion(activeLesson.id, xp, gems, zeroMistakes);
    setStats({ ...updated });
    setActiveLesson(null);
  };

  const handleLoseHeart = () => {
    setStats(prev => {
      const nextHearts = Math.max(0, prev.hearts - 1);
      const updated = {
        ...prev,
        hearts: nextHearts,
        lastHeartRegenTime: prev.hearts === prev.maxHearts ? Date.now() : prev.lastHeartRegenTime,
      };
      saveUserStats(updated);
      return updated;
    });
  };

  const handleToggleBookmark = (wordId: string) => {
    setStats(prev => {
      const isBookmarked = prev.savedWordIds.includes(wordId);
      const nextSaved = isBookmarked
        ? prev.savedWordIds.filter(id => id !== wordId)
        : [...prev.savedWordIds, wordId];
      const updated = { ...prev, savedWordIds: nextSaved };
      saveUserStats(updated);
      return updated;
    });
  };

  const navItems = [
    { id: 'learn', label: 'Дарсҳо', mobileLabel: 'Дарсҳо', icon: GraduationCap },
    { id: 'vocab', label: 'Луғат', mobileLabel: 'Луғат', icon: BookA },
    { id: 'grammar', label: 'Грамматика', mobileLabel: 'Қоида', icon: BookOpen },
    { id: 'leaderboard', label: 'Пешсафон', mobileLabel: 'Лига', icon: Trophy },
    { id: 'quests', label: 'Вазифаҳо', mobileLabel: 'Вазифа', icon: Target },
    { id: 'settings', label: 'Танзимот', mobileLabel: 'Профил', icon: User },
  ];

  // If in active lesson session, render only the lesson runner
  if (activeLesson) {
    return (
      <LessonRunner
        lesson={activeLesson}
        stats={stats}
        onComplete={handleCompleteLesson}
        onExit={() => setActiveLesson(null)}
        onLoseHeart={handleLoseHeart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col pb-28 md:pb-6">
      
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        onOpenStreakModal={() => setShowStreakModal(true)}
        onOpenHeartsModal={() => setShowHeartsModal(true)}
        onOpenGemsModal={() => setShowGemsModal(true)}
        onToggleSound={handleToggleSound}
        onLogoClick={() => setActiveTab('learn')}
      />

      {/* Main Layout: Sidebar on desktop + Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto flex">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white p-4 sticky top-[57px] h-[calc(100vh-57px)]">
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab(item.id as ActiveTab);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-black text-sm uppercase tracking-wider transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Offline Status Card in sidebar */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs">
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>{isOnline ? 'Пайвастшавӣ фаъол' : 'Ҳолати офлайн'}</span>
            </div>
            <p className="mt-1 text-[11px] text-gray-400">
              Барнома бе интернет низ 100% кор мекунад.
            </p>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'learn' && (
            <LearnPath
              units={UNITS_DATA}
              stats={stats}
              onSelectLesson={handleStartLesson}
              onOpenGrammarTopic={(topicId) => {
                setTargetGrammarTopic(topicId);
                setActiveTab('grammar');
              }}
            />
          )}

          {activeTab === 'vocab' && (
            <VocabularyView
              stats={stats}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarGuidebook initialTopicId={targetGrammarTopic} />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView stats={stats} />
          )}

          {activeTab === 'quests' && (
            <QuestsView
              stats={stats}
              onStatsUpdate={(newStats) => setStats(newStats)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              stats={stats}
              onUpdateStats={(newStats) => setStats(newStats)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Responsive, perfect fit on all phone screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl px-1.5 pt-1.5 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.5rem))]">
        <div className="grid grid-cols-6 max-w-md mx-auto items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id as ActiveTab);
                }}
                className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all active:scale-90 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-black'
                    : 'text-gray-400 hover:text-gray-600 font-bold'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] scale-105' : 'stroke-[2]'}`} />
                <span className="text-[9px] tracking-tight truncate w-full text-center block mt-0.5">
                  {item.mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Non-intrusive Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed bottom-24 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-xl animate-gentle-bounce">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Шумо дар ҳолати офлайнед — Дарсҳо кор мекунанд!</span>
        </div>
      )}

      {/* Interactive Modals */}
      {showStreakModal && (
        <StreakModal
          stats={stats}
          onClose={() => setShowStreakModal(false)}
          onUpdateStats={(newStats) => setStats(newStats)}
        />
      )}

      {showHeartsModal && (
        <HeartsModal
          stats={stats}
          onClose={() => setShowHeartsModal(false)}
          onUpdateStats={(newStats) => setStats(newStats)}
        />
      )}

      {showGemsModal && (
        <GemsModal
          stats={stats}
          onClose={() => setShowGemsModal(false)}
          onUpdateStats={(newStats) => setStats(newStats)}
        />
      )}
    </div>
  );
}
