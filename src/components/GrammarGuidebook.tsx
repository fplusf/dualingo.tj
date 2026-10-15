import React, { useState } from 'react';
import { BookOpen, Check, X, Volume2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { GRAMMAR_GUIDEBOOK } from '../data/grammarData';
import { GrammarTopic } from '../types';
import { soundManager, speakEnglish } from '../utils/audio';

interface GrammarGuidebookProps {
  initialTopicId?: string;
}

export const GrammarGuidebook: React.FC<GrammarGuidebookProps> = ({ initialTopicId }) => {
  const [openTopicId, setOpenTopicId] = useState<string>(initialTopicId || 'g1');

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span>📚</span>
          <span>Дастури грамматикаи англисӣ</span>
        </h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Қоидаҳои асосӣ бо муқоисаи равшан бо забони тоҷикӣ ва пешгирии хатогиҳои маъмул
        </p>
      </div>

      {/* Guidebook Topics */}
      <div className="space-y-4">
        {GRAMMAR_GUIDEBOOK.map((topic) => {
          const isOpen = openTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className={`duo-card transition-all overflow-hidden bg-white ${
                isOpen ? 'border-blue-400 shadow-md' : 'hover:border-gray-300'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setOpenTopicId(isOpen ? '' : topic.id);
                }}
                className="w-full p-4.5 flex items-center justify-between text-left transition"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm shrink-0">
                    {topic.number}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-gray-900">
                      {topic.titleTj}
                    </h3>
                    <span className="text-xs font-semibold text-gray-400">
                      {topic.titleEn}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-gray-400">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Collapsible Content */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-gray-100 space-y-6">
                  
                  {/* Summary */}
                  <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs sm:text-sm text-blue-900 font-semibold leading-relaxed">
                    💡 {topic.summaryTj}
                  </div>

                  {/* Rules Breakdown */}
                  <div className="space-y-4">
                    {topic.rules.map((rule, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                        <h4 className="text-sm font-black text-gray-800 mb-1.5">
                          {rule.ruleTitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-3">
                          {rule.explanationTj}
                        </p>

                        {/* Examples */}
                        <div className="space-y-2">
                          {rule.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="p-2.5 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <span className="font-bold text-gray-900 text-sm block">
                                  {ex.en}
                                </span>
                                <span className="text-gray-500 font-medium">
                                  {ex.tj}
                                </span>
                              </div>
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  speakEnglish(ex.en);
                                }}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 transition shrink-0"
                                title="Шунидани овоз"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tajik Comparison Callout */}
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                    <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider mb-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Муқоиса бо забони тоҷикӣ:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                      {topic.tajikComparison}
                    </p>
                  </div>

                  {/* Common Mistake Box */}
                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                    <h5 className="text-xs font-black uppercase text-rose-800 tracking-wider mb-2">
                      Хатогии маъмул ва тарзи дурусти он:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-rose-200 flex items-center gap-2 text-rose-700 font-bold">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{topic.commonMistake.wrong} (Нодуруст)</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-emerald-200 flex items-center gap-2 text-emerald-700 font-bold">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{topic.commonMistake.correct} (Дуруст)</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 font-medium mt-2">
                      Чаро: {topic.commonMistake.whyTj}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
