import React, { useState } from 'react';
import { Search, Volume2, Star, Bookmark, Shuffle, Check, ArrowRight, Award } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { VocabularyWord, UserStats } from '../types';
import { soundManager, speakEnglish } from '../utils/audio';

interface VocabularyViewProps {
  stats: UserStats;
  onToggleBookmark: (wordId: string) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  stats,
  onToggleBookmark,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Ҳама');
  const [filterType, setFilterType] = useState<'all' | 'mastered' | 'bookmarks'>('all');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['Ҳама', 'Салом', 'Оила', 'Хӯрок', 'Шаҳр', 'Феълҳо', 'Сифатҳо', 'Кор'];

  const masteredCount = (stats.masteredWordIds || []).length;
  const totalWords = VOCABULARY_LIST.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalWords) * 100));

  const filteredWords = VOCABULARY_LIST.filter(word => {
    const matchesSearch =
      word.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.tj.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.tajikPhonetic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Ҳама' || word.category === selectedCategory;

    let matchesFilter = true;
    if (filterType === 'mastered') {
      matchesFilter = (stats.masteredWordIds || []).includes(word.id);
    } else if (filterType === 'bookmarks') {
      matchesFilter = stats.savedWordIds.includes(word.id);
    }

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const currentFlashcard: VocabularyWord | undefined = filteredWords[currentFlashcardIdx % Math.max(1, filteredWords.length)];

  return (
    <div className="max-w-3xl mx-auto py-5 sm:py-6 px-3 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>📖</span>
            <span>Луғатномаи англисӣ-тоҷикӣ</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Калимаҳои муҳим бо талаффузи овозӣ ва тарҷумаи саҳеҳ
          </p>
        </div>

        {/* Mode Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            setFlashcardMode(!flashcardMode);
            setIsFlipped(false);
          }}
          className={`px-3.5 py-2 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
            flashcardMode
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <span>{flashcardMode ? 'Рӯйхат' : 'Кортҳои омӯзишӣ'}</span>
        </button>
      </div>

      {/* Mastery Progress Card (Duolingo Vocabulary metric) */}
      <div className="mb-5 p-4 rounded-2xl bg-white border-2 border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-black text-gray-700 mb-2">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Калимаҳои омӯхташуда дар дарсҳо:</span>
          </div>
          <span className="text-emerald-700 font-black">
            {masteredCount} аз {totalWords} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard Mode */}
      {flashcardMode && currentFlashcard && (
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div
              onClick={() => {
                soundManager.playClick();
                setIsFlipped(!isFlipped);
              }}
              className="min-h-[260px] duo-card p-6 flex flex-col justify-between items-center text-center cursor-pointer bg-linear-to-b from-white to-gray-50 hover:border-blue-400 transition-all select-none relative"
            >
              <div className="w-full flex items-center justify-between text-xs font-bold text-gray-400">
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg uppercase">
                  {currentFlashcard.category}
                </span>
                <span>Барои дидани тарҷума пахш кунед 🔄</span>
              </div>

              {!isFlipped ? (
                <div className="my-auto">
                  <h3 className="text-4xl font-black text-gray-900 tracking-tight">
                    {currentFlashcard.en}
                  </h3>
                  <div className="mt-2 text-sm text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-xl inline-block">
                    {currentFlashcard.tajikPhonetic}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.playClick();
                        speakEnglish(currentFlashcard.en);
                      }}
                      className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md active:scale-95 transition"
                      title="Шунидани овоз"
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-auto animate-gentle-bounce">
                  <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
                    Тарҷума ба тоҷикӣ:
                  </span>
                  <h3 className="text-3xl font-black text-gray-900 mt-1">
                    {currentFlashcard.tj}
                  </h3>
                  <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 font-semibold text-left">
                    <div className="font-bold">{currentFlashcard.exampleEn}</div>
                    <div className="text-gray-600 mt-0.5">{currentFlashcard.exampleTj}</div>
                  </div>
                </div>
              )}

              <div className="w-full text-xs font-bold text-gray-400">
                Корти {currentFlashcardIdx + 1} аз {filteredWords.length}
              </div>
            </div>

            {/* Flashcard controls */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentFlashcardIdx(prev => Math.max(0, prev - 1));
                  setIsFlipped(false);
                }}
                disabled={currentFlashcardIdx === 0}
                className="flex-1 py-3 rounded-xl duo-btn-white font-bold text-xs uppercase disabled:opacity-40"
              >
                Қаблӣ
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onToggleBookmark(currentFlashcard.id);
                }}
                className={`p-3 rounded-xl border-2 transition ${
                  stats.savedWordIds.includes(currentFlashcard.id)
                    ? 'border-amber-400 bg-amber-50 text-amber-500'
                    : 'border-gray-200 bg-white text-gray-400 hover:text-amber-500'
                }`}
                title="Захира дар ёддоштҳо"
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentFlashcardIdx(prev => prev + 1);
                  setIsFlipped(false);
                }}
                className="flex-1 py-3 rounded-xl duo-btn-green font-bold text-xs uppercase flex items-center justify-center gap-1.5"
              >
                <span>Баъдӣ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Normal Search & List View */}
      {!flashcardMode && (
        <>
          {/* Search bar & Filter Pills */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ҷустуҷӯ бо забони англисӣ ё тоҷикӣ..."
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-hidden text-xs sm:text-sm font-semibold transition"
              />
            </div>

            {/* Filter mode buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setFilterType('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Ҳама ({totalWords})
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setFilterType('mastered');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1 ${
                  filterType === 'mastered'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-emerald-700 border-gray-200 hover:bg-emerald-50'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Омӯхташуда ({masteredCount})</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setFilterType('bookmarks');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1 ${
                  filterType === 'bookmarks'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-amber-700 border-gray-200 hover:bg-amber-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Мунтахаб ({stats.savedWordIds.length})</span>
              </button>
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-3 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Words List */}
          <div className="space-y-3 pb-24">
            {filteredWords.length === 0 ? (
              <div className="text-center py-12 duo-card bg-white">
                <span className="text-4xl">🔍</span>
                <h4 className="mt-2 text-base font-bold text-gray-800">
                  Ҳеҷ калимае ёфт нашуд
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Калимаи дигарро ҷустуҷӯ кунед ё филтрҳоро тоза намоед.
                </p>
              </div>
            ) : (
              filteredWords.map((word) => {
                const isBookmarked = stats.savedWordIds.includes(word.id);
                const isMastered = (stats.masteredWordIds || []).includes(word.id);

                return (
                  <div
                    key={word.id}
                    className="duo-card p-3.5 sm:p-4 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          speakEnglish(word.en);
                        }}
                        className="mt-0.5 p-2 sm:p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 active:scale-95 transition shrink-0"
                        title="Шунидани талаффуз"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-base sm:text-lg font-black text-gray-900">
                            {word.en}
                          </span>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            {word.tajikPhonetic}
                          </span>
                          <span className="text-[11px] font-bold text-gray-400">
                            {word.transcription}
                          </span>
                          {isMastered && (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Омӯхташуда</span>
                            </span>
                          )}
                        </div>

                        <div className="mt-1 text-sm font-bold text-emerald-700">
                          {word.tj}
                        </div>

                        <div className="mt-1.5 text-xs text-gray-500 font-medium border-l-2 border-gray-200 pl-2">
                          <span className="font-semibold text-gray-700">{word.exampleEn}</span>
                          <span className="block text-gray-400 mt-0.5">{word.exampleTj}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
                        {word.category}
                      </span>
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onToggleBookmark(word.id);
                        }}
                        className={`p-1.5 sm:p-2 rounded-xl transition ${
                          isBookmarked
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-gray-300 hover:text-amber-500'
                        }`}
                        title={isBookmarked ? 'Аз мунтахаб хориҷ кардан' : 'Ба мунтахаб илова кардан'}
                      >
                        <Bookmark className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};
