import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, Snail, CheckCircle2, AlertCircle, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question, UserStats } from '../types';
import { soundManager, speakEnglish } from '../utils/audio';
import { SabzakMascot } from './SabzakMascot';

interface LessonRunnerProps {
  lesson: Lesson;
  stats: UserStats;
  onComplete: (xp: number, gems: number, zeroMistakes: boolean) => void;
  onExit: () => void;
  onLoseHeart: () => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({
  lesson,
  stats,
  onComplete,
  onExit,
  onLoseHeart,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentHearts, setCurrentHearts] = useState(stats.hearts);
  const [hasMistakeInLesson, setHasMistakeInLesson] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showGrammarTipModal, setShowGrammarTipModal] = useState(false);

  // Question state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Match pairs state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedTj, setSelectedTj] = useState<string | null>(null);
  const [shuffledEn, setShuffledEn] = useState<string[]>([]);
  const [shuffledTj, setShuffledTj] = useState<string[]>([]);

  // Verification state: 'answering' | 'correct' | 'incorrect' | 'completed'
  const [checkStatus, setCheckStatus] = useState<'answering' | 'correct' | 'incorrect' | 'completed'>('answering');
  const [heartShake, setHeartShake] = useState(false);

  const question: Question = lesson.questions[currentIdx];
  const progressPercent = Math.round((currentIdx / lesson.questions.length) * 100);

  // Initialize question
  useEffect(() => {
    if (!question) return;

    setSelectedOption(null);
    setCheckStatus('answering');

    if (question.type === 'word-bank' || question.type === 'listening') {
      const words = [...(question.wordsPool || [])];
      // Randomize words pool
      setAvailableWords(words.sort(() => Math.random() - 0.5));
      setSelectedWords([]);
    }

    if (question.type === 'match-pairs' && question.pairs) {
      setMatchedPairs([]);
      setSelectedEn(null);
      setSelectedTj(null);
      const enList = question.pairs.map(p => p.en).sort(() => Math.random() - 0.5);
      const tjList = question.pairs.map(p => p.tj).sort(() => Math.random() - 0.5);
      setShuffledEn(enList);
      setShuffledTj(tjList);
    }

    // Auto-pronounce if listening or has audioText
    if (question.audioText) {
      speakEnglish(question.audioText, stats.speechRate);
    }
  }, [currentIdx, question]);

  // Handle word bank click
  const handleSelectWord = (word: string, index: number) => {
    soundManager.playClick();
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeselectWord = (word: string, index: number) => {
    soundManager.playClick();
    setSelectedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  // Handle match pairs selection
  const handleSelectEnTile = (word: string) => {
    if (matchedPairs.includes(word)) return;
    soundManager.playClick();
    setSelectedEn(word);
    speakEnglish(word, stats.speechRate);

    if (selectedTj) {
      checkMatch(word, selectedTj);
    }
  };

  const handleSelectTjTile = (word: string) => {
    const pair = question.pairs?.find(p => p.tj === word);
    if (pair && matchedPairs.includes(pair.en)) return;
    soundManager.playClick();
    setSelectedTj(word);

    if (selectedEn) {
      checkMatch(selectedEn, word);
    }
  };

  const checkMatch = (en: string, tj: string) => {
    const matched = question.pairs?.some(p => p.en === en && p.tj === tj);
    if (matched) {
      soundManager.playMatch();
      setMatchedPairs(prev => [...prev, en]);
      setSelectedEn(null);
      setSelectedTj(null);
    } else {
      soundManager.playWrong();
      setTimeout(() => {
        setSelectedEn(null);
        setSelectedTj(null);
      }, 350);
    }
  };

  // Check answer
  const handleCheck = () => {
    if (checkStatus !== 'answering') return;

    let isCorrect = false;

    if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
      isCorrect = selectedOption?.trim().toLowerCase() === question.correctAnswer?.trim().toLowerCase();
    } else if (question.type === 'word-bank' || question.type === 'listening') {
      const userSentence = selectedWords.join(' ').trim().toLowerCase();
      const expected = question.correctAnswerSentence?.trim().toLowerCase();
      isCorrect = userSentence === expected;
    } else if (question.type === 'match-pairs') {
      isCorrect = matchedPairs.length === (question.pairs?.length || 0);
    }

    if (isCorrect) {
      soundManager.playCorrect();
      setCheckStatus('correct');
    } else {
      soundManager.playWrong();
      setCheckStatus('incorrect');
      setHasMistakeInLesson(true);
      setHeartShake(true);
      setTimeout(() => setHeartShake(false), 500);

      // Decrement hearts
      const updatedHearts = Math.max(0, currentHearts - 1);
      setCurrentHearts(updatedHearts);
      onLoseHeart();
    }
  };

  // Continue to next question or complete
  const handleNext = () => {
    soundManager.playClick();

    if (currentIdx + 1 < lesson.questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed lesson!
      soundManager.playFanfare();
      setCheckStatus('completed');

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  // Is check button disabled?
  const isCheckDisabled = () => {
    if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
      return !selectedOption;
    }
    if (question.type === 'word-bank' || question.type === 'listening') {
      return selectedWords.length === 0;
    }
    if (question.type === 'match-pairs') {
      return matchedPairs.length !== (question.pairs?.length || 0);
    }
    return false;
  };

  // Completed Screen
  if (checkStatus === 'completed') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col items-center justify-center text-center py-8">
          <SabzakMascot mood="cheering" speechText="Офарин! Ту ин дарсро хатм кардӣ!" size="xl" />
          
          <h2 className="mt-6 text-3xl font-black text-gray-900 tracking-tight">
            Дарс ба анҷом расид!
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Шумо донишҳои худро дар забони англисӣ боз ҳам қавитар гардонидед.
          </p>

          {/* Rewards Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 w-full">
            <div className="duo-card p-4 flex flex-col items-center bg-amber-50 border-amber-200">
              <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">Холҳо (XP)</span>
              <div className="mt-1 flex items-center gap-1.5 text-2xl font-black text-amber-600">
                <Sparkles className="w-6 h-6 fill-amber-500" />
                <span>+{lesson.xpReward}</span>
              </div>
            </div>

            <div className="duo-card p-4 flex flex-col items-center bg-sky-50 border-sky-200">
              <span className="text-xs font-bold uppercase text-sky-700 tracking-wider">Дурдонаҳо</span>
              <div className="mt-1 flex items-center gap-1.5 text-2xl font-black text-sky-600">
                <span className="text-2xl">💎</span>
                <span>+{lesson.gemReward}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full duo-card p-3.5 bg-emerald-50 border-emerald-200 flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-800">Дақиқии дарс:</span>
            <span className="text-sm font-black text-emerald-700">
              {hasMistakeInLesson ? '80%' : '100% (Бехато! 🔥)'}
            </span>
          </div>
        </div>

        {/* Continue button */}
        <div className="w-full max-w-md mx-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => onComplete(lesson.xpReward, lesson.gemReward, !hasMistakeInLesson)}
            className="w-full py-4 rounded-2xl duo-btn-green font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Идома додан</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-gray-100 max-w-2xl mx-auto w-full flex items-center gap-4">
        {/* Close Button */}
        <button
          onClick={() => setShowExitConfirm(true)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          title="Баромадан аз дарс"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-gray-200 h-3.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-[#58CC02] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Grammar Tip Button */}
        {lesson.grammarTip && (
          <button
            onClick={() => setShowGrammarTipModal(true)}
            className="p-2 text-amber-500 hover:text-amber-600 rounded-xl hover:bg-amber-50 transition"
            title="Дастури грамматикӣ"
          >
            <BookOpen className="w-5 h-5" />
          </button>
        )}

        {/* Hearts */}
        <div className={`flex items-center gap-1.5 font-black text-rose-500 ${heartShake ? 'animate-shake' : ''}`}>
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
          <span className="text-lg">{currentHearts}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col justify-center">
        
        {/* Tajik Prompt */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">
            {question.promptTj}
          </h2>
          {question.phoneticTj && (
            <span className="inline-block mt-1 text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-lg">
              Таллафуз: {question.phoneticTj}
            </span>
          )}
        </div>

        {/* Mascot & Audio Section */}
        {(question.audioText || question.type === 'listening') && (
          <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <button
              onClick={() => {
                soundManager.playClick();
                if (question.audioText) speakEnglish(question.audioText, 0.95);
              }}
              className="w-14 h-14 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-md active:scale-95 transition"
              title="Шунидан бо суръати муқаррарӣ"
            >
              <Volume2 className="w-7 h-7" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                if (question.audioText) speakEnglish(question.audioText, 0.65);
              }}
              className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-500 text-white flex items-center justify-center shadow-xs active:scale-95 transition"
              title="Шунидан бо суръати оҳиста (Turtle speed)"
            >
              <Snail className="w-6 h-6" />
            </button>

            {question.type !== 'listening' && question.audioText && (
              <span className="text-lg font-bold text-gray-800">
                {question.audioText}
              </span>
            )}

            {question.type === 'listening' && (
              <span className="text-sm font-semibold text-gray-400 italic">
                (Ба овоз гӯш диҳед ва калимаҳоро чинед)
              </span>
            )}
          </div>
        )}

        {/* 1. Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                disabled={checkStatus !== 'answering'}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedOption(opt);
                }}
                className={`p-4 rounded-2xl text-left font-bold text-base sm:text-lg border-2 transition-all ${
                  selectedOption === opt
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm translate-y-0.5'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  <span className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">
                    {i + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 2. Fill in the blank */}
        {question.type === 'fill-blank' && (
          <div className="mt-4">
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
              <span className="text-xl sm:text-2xl font-black text-gray-800">
                {question.englishText?.replace('_____', selectedOption || '_____')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {question.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={checkStatus !== 'answering'}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedOption(opt);
                  }}
                  className={`p-3.5 rounded-xl text-center font-bold text-lg border-2 transition ${
                    selectedOption === opt
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Word Bank & Listening */}
        {(question.type === 'word-bank' || question.type === 'listening') && (
          <div className="mt-2">
            {/* Selected Answer Strip */}
            <div className="min-h-[70px] p-3 rounded-2xl border-b-2 border-gray-200 bg-gray-50 flex flex-wrap gap-2 items-center mb-6">
              {selectedWords.length === 0 ? (
                <span className="text-gray-400 text-sm italic px-2">
                  Калимаҳои зерро пахш карда ҷумла созед...
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={checkStatus !== 'answering'}
                    onClick={() => handleDeselectWord(word, idx)}
                    className="px-3.5 py-2 rounded-xl bg-white border-2 border-gray-200 border-b-4 border-b-gray-300 font-bold text-gray-800 text-base shadow-xs active:scale-95 transition"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Available Words Pool */}
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  disabled={checkStatus !== 'answering'}
                  onClick={() => handleSelectWord(word, idx)}
                  className="px-4 py-2.5 rounded-xl bg-white border-2 border-gray-200 border-b-4 border-b-gray-300 font-bold text-gray-800 text-base hover:border-blue-300 hover:bg-blue-50 active:scale-95 transition shadow-xs"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Match Pairs */}
        {question.type === 'match-pairs' && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* English column */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-black uppercase text-gray-400 text-center tracking-wider">
                English
              </span>
              {shuffledEn.map((word, i) => {
                const isMatched = matchedPairs.includes(word);
                const isSelected = selectedEn === word;
                return (
                  <button
                    key={i}
                    disabled={isMatched || checkStatus !== 'answering'}
                    onClick={() => handleSelectEnTile(word)}
                    className={`p-3.5 rounded-2xl text-center font-bold text-base border-2 transition ${
                      isMatched
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-600 opacity-60'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 border-b-2 translate-y-0.5'
                        : 'border-gray-200 bg-white border-b-4 border-b-gray-300 hover:border-blue-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            {/* Tajik column */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-black uppercase text-gray-400 text-center tracking-wider">
                Тоҷикӣ
              </span>
              {shuffledTj.map((word, i) => {
                const pair = question.pairs?.find(p => p.tj === word);
                const isMatched = pair ? matchedPairs.includes(pair.en) : false;
                const isSelected = selectedTj === word;
                return (
                  <button
                    key={i}
                    disabled={isMatched || checkStatus !== 'answering'}
                    onClick={() => handleSelectTjTile(word)}
                    className={`p-3.5 rounded-2xl text-center font-bold text-base border-2 transition ${
                      isMatched
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-600 opacity-60'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700 border-b-2 translate-y-0.5'
                        : 'border-gray-200 bg-white border-b-4 border-b-gray-300 hover:border-blue-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Result / Action Drawer */}
      <div
        className={`border-t-2 transition-colors duration-300 px-4 py-4 ${
          checkStatus === 'correct'
            ? 'bg-emerald-50 border-emerald-300'
            : checkStatus === 'incorrect'
            ? 'bg-rose-50 border-rose-300'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Feedback details */}
          <div className="w-full sm:w-auto flex items-center gap-3">
            {checkStatus === 'correct' && (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-9 h-9 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-xl font-black text-emerald-800">
                    Офарин! Ҷавоби саҳеҳ!
                  </h4>
                  {question.explanationTj && (
                    <p className="text-xs text-emerald-700 mt-0.5 font-medium">
                      {question.explanationTj}
                    </p>
                  )}
                </div>
              </div>
            )}

            {checkStatus === 'incorrect' && (
              <div className="flex items-start gap-3">
                <AlertCircle className="w-9 h-9 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-lg font-black text-rose-800">
                    Мутаассифона хато шуд
                  </h4>
                  <p className="text-xs text-rose-700 font-semibold mt-0.5">
                    Ҷавоби дуруст: <span className="underline">{question.correctAnswer || question.correctAnswerSentence}</span>
                  </p>
                  {question.explanationTj && (
                    <p className="text-xs text-rose-600 mt-1">
                      {question.explanationTj}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="w-full sm:w-auto">
            {checkStatus === 'answering' ? (
              <button
                disabled={isCheckDisabled()}
                onClick={handleCheck}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl font-black uppercase tracking-wider text-base transition-all ${
                  isCheckDisabled()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'duo-btn-green'
                }`}
              >
                Тафтиш
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl font-black uppercase tracking-wider text-base text-white transition-all ${
                  checkStatus === 'correct'
                    ? 'bg-emerald-600 hover:bg-emerald-700 border-b-4 border-emerald-800'
                    : 'bg-rose-600 hover:bg-rose-700 border-b-4 border-rose-800'
                }`}
              >
                Идома
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grammar Tip Modal */}
      {showGrammarTipModal && lesson.grammarTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border-2 border-gray-100">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <BookOpen className="w-6 h-6" />
              <h3 className="text-lg font-black">{lesson.grammarTip.title}</h3>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {lesson.grammarTip.content}
            </p>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
              Мисол: {lesson.grammarTip.example}
            </div>
            <button
              onClick={() => setShowGrammarTipModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl duo-btn-green font-bold text-sm"
            >
              Фаҳмо шуд, ташаккур!
            </button>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
            <SabzakMascot mood="sad" size="md" className="mx-auto" />
            <h3 className="mt-4 text-xl font-black text-gray-900">
              Оё дарвоқеъ мебароед?
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Агар ҳозир бароед, пешрафти ин дарс ҳисоб карда намешавад ва холҳоро аз даст медиҳед.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3 rounded-xl duo-btn-green font-bold text-sm uppercase"
              >
                Идома додани дарс
              </button>
              <button
                onClick={onExit}
                className="w-full py-2.5 rounded-xl text-gray-500 hover:text-rose-600 font-bold text-sm transition"
              >
                Баромадан
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
