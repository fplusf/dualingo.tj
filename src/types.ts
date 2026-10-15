export type QuestionType =
  | 'word-bank'
  | 'multiple-choice'
  | 'match-pairs'
  | 'listening'
  | 'fill-blank';

export interface Question {
  id: string;
  type: QuestionType;
  promptTj: string; // Instructions in Tajik (e.g. "Ин ҷумларо тарҷума кунед", "Калимаи дурустро интихоб кунед")
  englishText?: string;
  tajikText?: string;
  phoneticTj?: string; // Transliteration in Tajik (e.g., "[Ҳелоу, ҳоу ар ю]")
  audioText?: string; // English text for speech synthesis
  // For word-bank:
  wordsPool?: string[];
  correctAnswerSentence?: string; // e.g. "Good morning teacher"
  // For multiple-choice & fill-blank:
  options?: string[];
  correctAnswer?: string;
  // For match-pairs:
  pairs?: { en: string; tj: string }[];
  explanationTj?: string; // Grammar explanation in Tajik
}

export interface Lesson {
  id: string;
  titleTj: string; // e.g. "Салом ва аҳволпурсӣ"
  titleEn: string; // "Greetings & Introductions"
  descriptionTj: string;
  xpReward: number;
  gemReward: number;
  iconName: string; // Lucide icon identifier
  grammarTip?: {
    title: string;
    content: string;
    example: string;
  };
  questions: Question[];
}

export interface Unit {
  id: string;
  unitNumber: number;
  titleTj: string; // "Қисми 1: Асосҳо ва Салом"
  titleEn: string;
  descriptionTj: string;
  color: string; // Hex color for the unit theme
  lessons: Lesson[];
}

export interface UserStats {
  xp: number;
  streak: number;
  hearts: number; // Max 5
  maxHearts: number;
  gems: number;
  lastHeartRegenTime: number; // Timestamp
  lastActiveDate: string; // "YYYY-MM-DD"
  streakDates: string[]; // List of YYYY-MM-DD
  hasStreakFreeze: boolean;
  completedLessonIds: string[];
  savedWordIds: string[];
  currentLeague: 'Бронза' | 'Нуқра' | 'Тилло' | 'Ёқут' | 'Алмос';
  soundEnabled: boolean;
  speechRate: number; // 0.8 or 1.0
  userName: string;
}

export interface VocabularyWord {
  id: string;
  en: string;
  tj: string;
  transcription: string; // e.g. [həˈloʊ]
  tajikPhonetic: string; // e.g. [ҳело́у]
  category: 'Салом' | 'Оила' | 'Хӯрок' | 'Шаҳр' | 'Рақамҳо' | 'Феълҳо' | 'Сифатҳо' | 'Кор';
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'phrase' | 'number';
  exampleEn: string;
  exampleTj: string;
}

export interface GrammarTopic {
  id: string;
  number: number;
  titleTj: string;
  titleEn: string;
  summaryTj: string;
  category: string;
  rules: {
    ruleTitle: string;
    explanationTj: string;
    examples: { en: string; tj: string; note?: string }[];
  }[];
  tajikComparison: string; // Key differences between Tajik and English
  commonMistake: {
    wrong: string;
    correct: string;
    whyTj: string;
  };
}

export interface Quest {
  id: string;
  titleTj: string;
  descriptionTj: string;
  target: number;
  current: number;
  rewardGems: number;
  rewardXp: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarColor: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
  badge?: string;
  city?: string;
}
