'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroScene } from '@/components/IntroScene';
import { HubWorld } from '@/components/HubWorld';
import { ChapterDetail } from '@/components/ChapterDetail';
import { GlossarySidebar } from '@/components/GlossarySidebar';

type View = 'intro' | 'hub' | 'chapter';

export default function Home() {
  const [view, setView] = useState<View>('intro');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const handleEnter = () => {
    setView('hub');
  };

  const handleSelectChapter = (id: number) => {
    setSelectedChapter(id);
    setView('chapter');
  };

  const handleBack = () => {
    setView('hub');
    setSelectedChapter(null);
  };

  return (
    <>
      {/* Glossary floating button */}
      {view !== 'intro' && (
        <button
          onClick={() => setGlossaryOpen(!glossaryOpen)}
          className="fixed top-4 left-4 z-40 w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyan-400 hover:scale-110 transition"
          title="دفتر المصطلحات"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </button>
      )}

      <GlossarySidebar open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }}>
            <IntroScene onEnter={handleEnter} />
          </motion.div>
        )}

        {view === 'hub' && (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HubWorld onSelectChapter={handleSelectChapter} />
          </motion.div>
        )}

        {view === 'chapter' && selectedChapter && (
          <motion.div
            key="chapter"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <ChapterDetail chapterId={selectedChapter} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
