import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedChapters: number[];
  toggleChapter: (id: number) => void;
  isChapterCompleted: (id: number) => boolean;
  resetProgress: () => void;
  glossaryTerms: { term: string; definition: string }[];
  addGlossaryTerm: (term: string, definition: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedChapters: [],
      toggleChapter: (id) =>
        set((state) => ({
          completedChapters: state.completedChapters.includes(id)
            ? state.completedChapters.filter((c) => c !== id)
            : [...state.completedChapters, id],
        })),
      isChapterCompleted: (id) => get().completedChapters.includes(id),
      resetProgress: () => set({ completedChapters: [] }),
      glossaryTerms: [],
      addGlossaryTerm: (term, definition) =>
        set((state) => {
          if (state.glossaryTerms.some((t) => t.term === term)) return state;
          return { glossaryTerms: [...state.glossaryTerms, { term, definition }] };
        }),
    }),
    { name: 'hse-progress' }
  )
);
