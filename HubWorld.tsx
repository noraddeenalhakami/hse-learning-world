'use client';

import { chapters } from '@/data/chapters';
import { ChapterIcon } from '@/components/ChapterIcon';
import { ProgressBar } from '@/components/ProgressBar';
import { useProgressStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function HubWorld({ onSelectChapter }: { onSelectChapter: (id: number) => void }) {
  const { isChapterCompleted } = useProgressStore();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #0a0e1a 0%, #050810 100%)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-6 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white neon-text"
              style={{ color: '#00f5d4' }}
            >
              السلامة والصحة المهنية
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mt-2 text-lg"
            >
              عالم تعليمي تفاعلي غامر — إعداد نورالدين الحكمي
            </motion.p>
          </div>
          <div className="min-w-[200px] md:min-w-[300px]">
            <ProgressBar />
          </div>
        </div>
      </header>

      {/* Map Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {chapters.map((chapter, idx) => {
            const completed = isChapterCompleted(chapter.id);
            const isHovered = hoveredId === chapter.id;
            return (
              <motion.button
                key={chapter.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.1, type: 'spring', damping: 20 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectChapter(chapter.id)}
                onMouseEnter={() => setHoveredId(chapter.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group rounded-2xl overflow-hidden text-right"
                style={{
                  background: chapter.gradient,
                  minHeight: '220px',
                  border: isHovered ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isHovered ? `0 0 30px ${chapter.accentColor}40, 0 0 60px ${chapter.accentColor}20` : '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Chapter number badge */}
                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{chapter.id}</span>
                </div>

                {/* Completion badge */}
                {completed && (
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center pt-10 pb-4">
                  <div className="w-20 h-20 flex items-center justify-center" style={{ color: '#fff' }}>
                    <ChapterIcon name={chapter.icon} className="w-16 h-16" />
                  </div>
                </div>

                {/* Title */}
                <div className="p-4 pt-0">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1">{chapter.title}</h3>
                  <p className="text-white/60 text-xs">{chapter.subtitle}</p>
                </div>

                {/* Glow path indicator */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, transparent, ${chapter.accentColor}, transparent)` }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
