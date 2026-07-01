import { lazy, Suspense } from 'react';

const Chapter3DIcon = lazy(() =>
  import('@/components/Chapter3DIcon').then((mod) => ({ default: mod.Chapter3DIcon }))
);

export function Chapter3DIconLazy({ iconName, color }: { iconName: string; color: string }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      }
    >
      <Chapter3DIcon iconName={iconName} color={color} />
    </Suspense>
  );
}
