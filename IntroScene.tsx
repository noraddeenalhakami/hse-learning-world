'use client';

import { motion } from 'framer-motion';

export function IntroScene({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0a0e1a 0%, #030608 100%)' }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,245,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: ['#00f5d4', '#7209b7', '#f39c12'][i % 3],
            boxShadow: `0 0 8px currentColor`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Central helmet icon (SVG) */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.2 }}
        className="relative z-10 mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <defs>
                <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5d4" />
                  <stop offset="50%" stopColor="#00b4d8" />
                  <stop offset="100%" stopColor="#7209b7" />
                </linearGradient>
              </defs>
              <path
                d="M10 70 Q10 30 50 25 Q90 30 90 70 L90 75 L10 75 Z"
                fill="url(#helmetGrad)"
                stroke="#00f5d4"
                strokeWidth="1"
                style={{ filter: 'drop-shadow(0 0 10px #00f5d4)' }}
              />
              <path d="M10 70 L90 70" stroke="#fff" strokeWidth="2" opacity="0.5" />
              <rect x="40" y="35" width="20" height="12" rx="2" fill="#0a0e1a" opacity="0.6" />
              <path d="M25 25 L50 15 L75 25" stroke="#00f5d4" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center z-10 px-4"
        style={{ color: '#fff', textShadow: '0 0 20px rgba(0,245,212,0.5), 0 0 40px rgba(0,245,212,0.3)' }}
      >
        السلامة والصحة المهنية
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-400 text-lg md:text-xl mt-4 z-10 text-center px-4"
      >
        عالم تعليمي تفاعلي غامر — إعداد نورالدين الحكمي
      </motion.p>

      {/* Enter button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="mt-12 z-10 px-10 py-4 rounded-2xl text-white font-bold text-lg transition pulse-glow"
        style={{
          background: 'linear-gradient(135deg, #00f5d4, #00b4d8, #7209b7)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        ابدأ الاستكشاف
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 z-10 flex gap-2 text-gray-500 text-sm"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>10 فصول • HSE Immersive Learning</span>
      </motion.div>
    </div>
  );
}
