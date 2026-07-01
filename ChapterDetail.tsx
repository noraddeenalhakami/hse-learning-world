'use client';

import { chapters } from '@/data/chapters';
import { useProgressStore } from '@/lib/store';
import { ChapterIcon } from '@/components/ChapterIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import { Chapter3DIconLazy } from '@/components/Chapter3DIconLazy';

type Tab = 'explanation' | 'qa' | 'numbers';

export function ChapterDetail({ chapterId, onBack }: { chapterId: number; onBack: () => void }) {
  const chapter = chapters.find((c) => c.id === chapterId);
  const { toggleChapter, isChapterCompleted, addGlossaryTerm } = useProgressStore();
  const [activeTab, setActiveTab] = useState<Tab>('explanation');

  if (!chapter) return null;

  const completed = isChapterCompleted(chapter.id);

  const handleTermClick = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addGlossaryTerm(term, 'مصطلح تقني في السلامة والصحة المهنية — انقر للتعريف الكامل');
  };

  const renderTextWithTerms = (text: string) => {
    const parts = text.split(/\(([A-Za-z][A-Za-z\s/&-]+)\)/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <span
            key={idx}
            className="english-term"
            dir="ltr"
            onClick={(e) => handleTermClick(part, e)}
            title="انقر لإضافة المصطلح إلى دفتر المصطلحات"
          >
            ({part})
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
      style={{ background: `radial-gradient(ellipse at top, ${chapter.color}30 0%, #0a0e1a 60%, #050810 100%)` }}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>الخريطة</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: chapter.gradient }}>
              <ChapterIcon name={chapter.icon} className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{chapter.title}</h1>
              <p className="text-xs text-gray-400" dir="ltr">{chapter.titleEn}</p>
            </div>
          </div>

          <button
            onClick={() => toggleChapter(chapter.id)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition ${
              completed
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            {completed ? '✓ مكتمل' : 'وضع علامة كمكتمل'}
          </button>
        </div>
      </header>

      {/* 3D Hero Scene */}
      <div className="h-48 md:h-64 relative">
        <Suspense fallback={<div className="h-full flex items-center justify-center text-gray-500">جاري تحميل المجسم ثلاثي الأبعاد...</div>}>
          <Chapter3DIconLazy iconName={chapter.icon} color={chapter.accentColor} />
        </Suspense>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-2 mb-8 sticky top-[72px] z-10 backdrop-blur-xl bg-black/40 rounded-2xl p-2 border border-white/10">
          {([
            { id: 'explanation' as Tab, label: 'الشرح الفني المفصل', icon: '📖' },
            { id: 'qa' as Tab, label: 'الأسئلة والأجوبة', icon: '❓' },
            { id: 'numbers' as Tab, label: 'الأرقام والضوابط', icon: '🔢' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-xl font-medium text-sm transition text-center ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={activeTab === tab.id ? { background: chapter.gradient } : {}}
            >
              <span className="ml-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'explanation' && (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {chapter.explanation.map((section, idx) => (
                  <div key={idx} className="glass-panel p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: chapter.accentColor }}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed text-base font-[inherit]" style={{ fontFamily: 'inherit' }}>
                          {renderTextWithTerms(section)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'qa' && (
              <motion.div
                key="qa"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {chapter.qa.map((item, idx) => (
                  <QAAccordion key={idx} index={idx} question={item.question} answer={item.answer} accentColor={chapter.accentColor} renderTerms={renderTextWithTerms} />
                ))}
              </motion.div>
            )}

            {activeTab === 'numbers' && (
              <motion.div
                key="numbers"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {chapter.numbers.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="glass-panel p-5 hover:scale-[1.02] transition-transform"
                    style={{ borderLeft: `3px solid ${chapter.accentColor}` }}
                  >
                    <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                    <p className="text-white font-bold text-lg" dir="auto">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function QAAccordion({ index, question, answer, accentColor, renderTerms }: {
  index: number;
  question: string;
  answer: string;
  accentColor: string;
  renderTerms: (text: string) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-right p-5 flex items-center justify-between gap-4 hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-3 flex-1">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: accentColor }}>
            {index + 1}
          </span>
          <span className="text-white font-medium">{question}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-gray-400 flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 pr-14">
              <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed" style={{ fontFamily: 'inherit' }}>
                {renderTerms(answer)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
