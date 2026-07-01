import { useProgressStore } from '@/lib/store';
import { chapters } from '@/data/chapters';

export function ProgressBar() {
  const { completedChapters } = useProgressStore();
  const total = chapters.length;
  const completed = completedChapters.length;
  const percentage = (completed / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">تقدمك في المنهج</span>
        <span className="text-sm font-bold" style={{ color: 'var(--neon-glow)' }}>
          {completed} / {total} فصول مكتملة
        </span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #00f5d4, #7209b7)',
            boxShadow: '0 0 10px rgba(0, 245, 212, 0.6), 0 0 20px rgba(114, 9, 183, 0.4)',
          }}
        />
      </div>
    </div>
  );
}
