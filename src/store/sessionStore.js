/**
 * Session state management with Zustand.
 */
import { create } from 'zustand';

const useSessionStore = create((set, get) => ({
    // State
    exercise: null,
    phase: 'idle',
    repCount: 0,
    currentAngles: {},
    activeErrors: [],
    feedbackQueue: [],
    isFullBodyVisible: true,
    isPaused: false,
    isEngineReady: false,
    isSessionActive: false,

    // Actions
    selectExercise: (exercise) =>
        set({ exercise, repCount: 0, phase: 'idle', activeErrors: [], feedbackQueue: [], isSessionActive: true, isPaused: false }),

    setPhase: (phase) => set({ phase }),

    incrementRep: () => set((s) => ({ repCount: s.repCount + 1 })),

    setRepCount: (repCount) => set({ repCount }),

    setCurrentAngles: (currentAngles) => set({ currentAngles }),

    setActiveErrors: (activeErrors) => set({ activeErrors }),

    pushFeedback: (feedback) =>
        set((s) => ({
            feedbackQueue: [...s.feedbackQueue.slice(-4), feedback],
        })),

    clearOldFeedback: () =>
        set((s) => ({
            feedbackQueue: s.feedbackQueue.filter(
                (f) => Date.now() - f.timestamp < 3000
            ),
        })),

    setFullBodyVisible: (isFullBodyVisible) => set({ isFullBodyVisible }),

    togglePause: () => set((s) => ({ isPaused: !s.isPaused })),

    setEngineReady: (isEngineReady) => set({ isEngineReady }),

    resetSession: () =>
        set({
            exercise: null,
            phase: 'idle',
            repCount: 0,
            currentAngles: {},
            activeErrors: [],
            feedbackQueue: [],
            isFullBodyVisible: true,
            isPaused: false,
            isSessionActive: false,
        }),

    endSession: () =>
        set({
            isSessionActive: false,
            phase: 'idle',
        }),
}));

export default useSessionStore;
