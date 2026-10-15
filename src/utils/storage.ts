import { LeaderboardUser, Quest, UserStats } from '../types';

const STORAGE_KEY = 'sabzak_duolingo_tajik_user';
const QUESTS_KEY = 'sabzak_duolingo_tajik_quests';

const DEFAULT_STATS: UserStats = {
  xp: 45,
  streak: 3,
  hearts: 5,
  maxHearts: 5,
  gems: 120,
  lastHeartRegenTime: Date.now(),
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDates: [
    new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0]
  ],
  hasStreakFreeze: true,
  completedLessonIds: ['u1-l1'],
  savedWordIds: ['v1', 'v16'],
  currentLeague: 'Тилло',
  soundEnabled: true,
  speechRate: 0.95,
  userName: 'Шогирд'
};

const DEFAULT_QUESTS: Quest[] = [
  {
    id: 'q1',
    titleTj: 'Як дарсро ба анҷом расонед',
    descriptionTj: 'Ҳадди аққал 1 дарси нав ё такрориро хатм кунед',
    target: 1,
    current: 0,
    rewardGems: 10,
    rewardXp: 15,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'q2',
    titleTj: 'Ба даст овардани 30 хол (XP)',
    descriptionTj: 'Дар дарсҳо саволҳоро ҷавоб дода 30 хол ҷамъ оред',
    target: 30,
    current: 15,
    rewardGems: 15,
    rewardXp: 20,
    isCompleted: false,
    isClaimed: false
  },
  {
    id: 'q3',
    titleTj: 'Дақиқии 100% (Бехато)',
    descriptionTj: 'Ягон дарсро бидуни аз даст додани дилча (дил) тамом кунед',
    target: 1,
    current: 0,
    rewardGems: 20,
    rewardXp: 25,
    isCompleted: false,
    isClaimed: false
  }
];

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserStats(DEFAULT_STATS);
      return DEFAULT_STATS;
    }
    const stats: UserStats = JSON.parse(raw);
    
    // Heart regeneration: 1 heart every 25 minutes (1,500,000 ms)
    const REGEN_INTERVAL = 25 * 60 * 1000;
    const now = Date.now();
    if (stats.hearts < stats.maxHearts && stats.lastHeartRegenTime) {
      const elapsed = now - stats.lastHeartRegenTime;
      const heartsToAdd = Math.floor(elapsed / REGEN_INTERVAL);
      if (heartsToAdd > 0) {
        stats.hearts = Math.min(stats.maxHearts, stats.hearts + heartsToAdd);
        stats.lastHeartRegenTime = now;
        saveUserStats(stats);
      }
    }
    return stats;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}

export function getDailyQuests(): Quest[] {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(QUESTS_KEY);
    if (!raw) {
      saveDailyQuests(DEFAULT_QUESTS);
      return DEFAULT_QUESTS;
    }
    const data = JSON.parse(raw);
    if (data.date !== today) {
      // New day, reset quests
      saveDailyQuests(DEFAULT_QUESTS);
      return DEFAULT_QUESTS;
    }
    return data.quests;
  } catch {
    return DEFAULT_QUESTS;
  }
}

export function saveDailyQuests(quests: Quest[]): void {
  try {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(QUESTS_KEY, JSON.stringify({ date: today, quests }));
  } catch {
    // Ignore
  }
}

export function recordLessonCompletion(lessonId: string, xpGained: number, gemsGained: number, madeZeroMistakes: boolean): UserStats {
  const stats = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  // XP & Gems
  stats.xp += xpGained;
  stats.gems += gemsGained;

  // Completed lessons
  if (!stats.completedLessonIds.includes(lessonId)) {
    stats.completedLessonIds.push(lessonId);
  }

  // Streak check
  if (!stats.streakDates.includes(today)) {
    stats.streakDates.push(today);
    stats.streak += 1;
    stats.lastActiveDate = today;
  }

  saveUserStats(stats);

  // Update quests
  const quests = getDailyQuests();
  quests.forEach(q => {
    if (q.id === 'q1') {
      q.current = Math.min(q.target, q.current + 1);
      if (q.current >= q.target) q.isCompleted = true;
    } else if (q.id === 'q2') {
      q.current = Math.min(q.target, q.current + xpGained);
      if (q.current >= q.target) q.isCompleted = true;
    } else if (q.id === 'q3' && madeZeroMistakes) {
      q.current = Math.min(q.target, q.current + 1);
      if (q.current >= q.target) q.isCompleted = true;
    }
  });
  saveDailyQuests(quests);

  return stats;
}

export function getLeaderboard(): LeaderboardUser[] {
  const stats = getUserStats();

  const competitors: LeaderboardUser[] = [
    { id: 'c1', name: 'Фаррух Р.', avatarColor: 'bg-emerald-500', xp: stats.xp + 115, streak: 14, badge: '🥇', city: 'Душанбе' },
    { id: 'c2', name: 'Нигора Саидзода', avatarColor: 'bg-purple-500', xp: stats.xp + 45, streak: 9, badge: '🥈', city: 'Хуҷанд' },
    { id: 'user', name: stats.userName, avatarColor: 'bg-green-600', xp: stats.xp, streak: stats.streak, isCurrentUser: true, city: 'Тоҷикистон' },
    { id: 'c3', name: 'Рустам Қосимов', avatarColor: 'bg-blue-500', xp: Math.max(10, stats.xp - 25), streak: 6, city: 'Бохтар' },
    { id: 'c4', name: 'Малика Ҳасанова', avatarColor: 'bg-pink-500', xp: Math.max(10, stats.xp - 40), streak: 4, city: 'Кӯлоб' },
    { id: 'c5', name: 'Ҷасур Каримов', avatarColor: 'bg-amber-500', xp: Math.max(5, stats.xp - 60), streak: 2, city: 'Истаравшан' },
    { id: 'c6', name: 'Диловар', avatarColor: 'bg-indigo-500', xp: Math.max(5, stats.xp - 80), streak: 1, city: 'Панҷакент' }
  ];

  // Sort descending by XP
  return competitors.sort((a, b) => b.xp - a.xp);
}
