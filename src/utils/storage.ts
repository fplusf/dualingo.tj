import { DailyChallenge, LeaderboardUser, Quest, UserStats } from '../types';
import { UNITS_DATA } from '../data/lessonsData';

const STORAGE_KEY = 'sabzak_duolingo_tajik_user';
const QUESTS_KEY = 'sabzak_duolingo_tajik_quests';
const CHALLENGE_KEY = 'sabzak_daily_challenge';

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
  lessonStars: { 'u1-l1': 1 },
  savedWordIds: ['v1', 'v16'],
  masteredWordIds: ['v1', 'v2', 'v4', 'v5', 'v6'],
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
    rewardGems: 5,
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
    rewardGems: 10,
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
    rewardGems: 15,
    rewardXp: 25,
    isCompleted: false,
    isClaimed: false
  }
];

const DAILY_CHALLENGES_POOL: Omit<DailyChallenge, 'current' | 'isCompleted' | 'isClaimed' | 'date'>[] = [
  {
    id: 'dc-consecutive-3',
    titleTj: '3 дарси пайдарпай (Triple Streak)',
    descriptionTj: 'Дар давоми 24 соат 3 дарсро пай дар пай ба анҷом расонед',
    type: 'consecutive_lessons',
    target: 3,
    rewardGems: 25,
    rewardXp: 40,
    badgeIcon: '⚡'
  },
  {
    id: 'dc-xp-rush-50',
    titleTj: 'Тӯфони 50 хол (XP Rush)',
    descriptionTj: 'Имрӯз дар дарсҳо камаш 50 холи таҷриба (XP) ба даст оред',
    type: 'xp_rush',
    target: 50,
    rewardGems: 30,
    rewardXp: 45,
    badgeIcon: '🚀'
  },
  {
    id: 'dc-perfect-2',
    titleTj: 'Устоди бехато (Flawless Master)',
    descriptionTj: '2 дарсро бо дақиқии 100% бидуни аз даст додани дилча хатм кунед',
    type: 'perfect_lessons',
    target: 2,
    rewardGems: 30,
    rewardXp: 50,
    badgeIcon: '🎯'
  },
  {
    id: 'dc-vocab-mastery-5',
    titleTj: 'Омӯзиши 5 калимаи нав',
    descriptionTj: 'Бо гузаштани дарсҳои нав 5 калимаи навро комилан аз худ кунед',
    type: 'vocab_mastery',
    target: 5,
    rewardGems: 25,
    rewardXp: 35,
    badgeIcon: '📖'
  },
  {
    id: 'dc-sprint-4',
    titleTj: 'Спринти 4 дарсӣ (Grand Sprint)',
    descriptionTj: 'Имрӯз 4 дарсро пурра ба анҷом расонед',
    type: 'consecutive_lessons',
    target: 4,
    rewardGems: 35,
    rewardXp: 60,
    badgeIcon: '👑'
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
    
    // Ensure backwards compatibility for newly added fields
    if (!stats.lessonStars) {
      stats.lessonStars = {};
      (stats.completedLessonIds || []).forEach(id => {
        stats.lessonStars[id] = 1;
      });
    }
    if (!stats.masteredWordIds) {
      stats.masteredWordIds = ['v1', 'v2', 'v4', 'v5', 'v6'];
    }

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
    return data.quests || DEFAULT_QUESTS;
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

// 24-Hour Rotating Daily Challenge
export function getDailyChallenge(): DailyChallenge {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(CHALLENGE_KEY);
    if (raw) {
      const challenge: DailyChallenge = JSON.parse(raw);
      if (challenge.date === today) {
        return challenge;
      }
    }

    // Calculate deterministic index for today using the calendar date
    const dateNum = today.split('-').reduce((acc, part) => acc * 31 + parseInt(part, 10), 0);
    const template = DAILY_CHALLENGES_POOL[Math.abs(dateNum) % DAILY_CHALLENGES_POOL.length];

    const newChallenge: DailyChallenge = {
      ...template,
      current: 0,
      isCompleted: false,
      isClaimed: false,
      date: today,
    };

    saveDailyChallenge(newChallenge);
    return newChallenge;
  } catch {
    const today = new Date().toISOString().split('T')[0];
    return {
      ...DAILY_CHALLENGES_POOL[0],
      current: 0,
      isCompleted: false,
      isClaimed: false,
      date: today,
    };
  }
}

export function saveDailyChallenge(challenge: DailyChallenge): void {
  try {
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(challenge));
  } catch {
    // Ignore
  }
}

export function recordLessonCompletion(
  lessonId: string,
  xpGained: number,
  gemsGained: number,
  madeZeroMistakes: boolean
): UserStats {
  const stats = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  // XP & Gems
  stats.xp += xpGained;
  stats.gems += gemsGained;

  // Completed lessons list
  if (!stats.completedLessonIds.includes(lessonId)) {
    stats.completedLessonIds.push(lessonId);
  }

  // Level star progression (1 to 3 crowns/stars per lesson)
  if (!stats.lessonStars) stats.lessonStars = {};
  stats.lessonStars[lessonId] = Math.min(3, (stats.lessonStars[lessonId] || 0) + 1);

  // Vocabulary words learned in this lesson
  let taughtWords: string[] = [];
  for (const unit of UNITS_DATA) {
    const l = unit.lessons.find(item => item.id === lessonId);
    if (l && l.taughtWordIds) {
      taughtWords = l.taughtWordIds;
      break;
    }
  }

  let newlyLearnedWordsCount = 0;
  if (!stats.masteredWordIds) stats.masteredWordIds = [];
  taughtWords.forEach(wId => {
    if (!stats.masteredWordIds.includes(wId)) {
      stats.masteredWordIds.push(wId);
      newlyLearnedWordsCount++;
    }
  });

  // Streak check
  if (!stats.streakDates.includes(today)) {
    stats.streakDates.push(today);
    stats.streak += 1;
    stats.lastActiveDate = today;
  }

  // Save updated stats immediately
  saveUserStats(stats);

  // Update and save daily missions/quests
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

  // Update Daily Challenge
  const challenge = getDailyChallenge();
  if (!challenge.isCompleted) {
    if (challenge.type === 'consecutive_lessons') {
      challenge.current = Math.min(challenge.target, challenge.current + 1);
    } else if (challenge.type === 'xp_rush') {
      challenge.current = Math.min(challenge.target, challenge.current + xpGained);
    } else if (challenge.type === 'perfect_lessons' && madeZeroMistakes) {
      challenge.current = Math.min(challenge.target, challenge.current + 1);
    } else if (challenge.type === 'vocab_mastery') {
      challenge.current = Math.min(challenge.target, challenge.current + Math.max(1, newlyLearnedWordsCount));
    }

    if (challenge.current >= challenge.target) {
      challenge.isCompleted = true;
    }
    saveDailyChallenge(challenge);
  }

  return stats;
}

export function earnHeartByPractice(): UserStats {
  const stats = getUserStats();
  if (stats.hearts < stats.maxHearts) {
    stats.hearts += 1;
    saveUserStats(stats);
  }
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
