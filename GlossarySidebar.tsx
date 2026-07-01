import { useProgressStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function GlossarySidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { glossaryTerms } = useProgressStore();
  const [search, setSearch] = useState('');

  const filtered = glossaryTerms.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-80 z-50 glass-panel rounded-none border-l border-white/10 p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">دفتر المصطلحات</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <input
            type="text"
            placeholder="ابحث في المصطلحات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 mb-4"
          />

          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">لا توجد مصطلحات بعد. انقر على أي مصطلح إنجليزي في النص لإضافته.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-cyan-400/30 transition">
                  <p className="text-cyan-400 font-semibold mb-1" dir="ltr">{item.term}</p>
                  <p className="text-gray-300 text-sm">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
