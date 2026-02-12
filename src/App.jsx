'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import useSessionStore from './store/sessionStore';
import { initPoseEngine, startDetection, stopDetection } from './engine/poseEngine';
import { getJointAngles } from './engine/angleCalculator';
import { createRepCounter } from './engine/repCounter';
import { createFeedbackEngine } from './engine/feedbackEngine';
import { drawSkeleton, getErrorLandmarkIndices } from './components/SkeletonOverlay';

import LandingPage from './components/LandingPage';
import CameraFeed from './components/CameraFeed';
import HUD from './components/HUD';
import FeedbackPopup from './components/FeedbackPopup';
import VisibilityWarning from './components/VisibilityWarning';

import { ArrowLeft } from 'lucide-react';

export default function App() {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const repCounterRef = useRef(null);
    const feedbackEngineRef = useRef(null);

    const [isWorkoutView, setIsWorkoutView] = useState(false);

    const {
        exercise, isSessionActive, isEngineReady, isFullBodyVisible, isPaused,
        setEngineReady, setPhase, setRepCount, setCurrentAngles,
        setFullBodyVisible, pushFeedback, setActiveErrors, resetSession,
    } = useSessionStore();

    // Init pose engine
    useEffect(() => {
        initPoseEngine()
            .then(() => setEngineReady(true))
            .catch(err => console.error('Failed to init pose engine:', err));
    }, [setEngineReady]);

    // Create rep counter + feedback engine per exercise
    useEffect(() => {
        if (exercise) {
            repCounterRef.current = createRepCounter();
            feedbackEngineRef.current = createFeedbackEngine();
        }
        return () => { repCounterRef.current = null; feedbackEngineRef.current = null; };
    }, [exercise]);

    const prevLandmarksRef = useRef(null);

    const lastUpdateRef = useRef(0);

    // Handle pose results
    const handlePoseResults = useCallback(({ landmarks, timestamp }) => {
        if (!exercise || isPaused) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const video = videoRef.current;
        if (video) { canvas.width = video.videoWidth; canvas.height = video.videoHeight; }

        // SMOOTHING: Low Pass Filter
        let smoothed = landmarks;
        if (prevLandmarksRef.current) {
            smoothed = landmarks.map((lm, i) => {
                const prev = prevLandmarksRef.current[i];
                return {
                    x: 0.5 * lm.x + 0.5 * prev.x,
                    y: 0.5 * lm.y + 0.5 * prev.y,
                    z: 0.5 * lm.z + 0.5 * prev.z,
                    visibility: 0.5 * lm.visibility + 0.5 * prev.visibility
                };
            });
        }
        prevLandmarksRef.current = smoothed;

        const fe = feedbackEngineRef.current;
        let activeErrors = new Set();

        if (fe) {
            const visible = fe.isBodyVisible(smoothed);
            setFullBodyVisible(visible);
            if (!visible) { canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); return; }
        }

        const angles = getJointAngles(smoothed, exercise);

        // Update physics/logic (always run this to not miss reps)
        const primaryAngle = angles[exercise.primaryJoint];
        if (repCounterRef.current && primaryAngle !== undefined) {
            const result = repCounterRef.current.update(primaryAngle, exercise.phases);

            // Sync state only if changed or throttled
            const now = performance.now();
            if (now - lastUpdateRef.current > 32 || result.repCompleted) { // ~30fps update for UI
                setPhase(result.phase);
                setRepCount(result.repCount);
                setCurrentAngles(angles);
                lastUpdateRef.current = now;
            }

            if (result.repCompleted) {
                pushFeedback({ id: 'rep_complete', type: 'rep_complete', message: 'Well done', severity: 'success', timestamp });
            }
        }

        if (fe) {
            const phase = repCounterRef.current?.getState()?.phase || 'idle';
            const fbs = fe.evaluate(angles, exercise, phase, timestamp);
            const currentErrors = fe.getActiveErrors();
            activeErrors = getErrorLandmarkIndices(exercise, currentErrors);

            // Only update active errors state occasionally to avoid flickering/lag
            // But we need 'activeErrors' for drawing immediately
            if (Math.random() < 0.1) setActiveErrors(currentErrors); // Low freq update for UI state
            fbs.forEach(fb => pushFeedback(fb));
        }

        const ctx = canvas.getContext('2d');
        drawSkeleton(ctx, smoothed, canvas.width, canvas.height, activeErrors, angles);
    }, [exercise, isPaused, setFullBodyVisible, setCurrentAngles, setPhase, setRepCount, pushFeedback, setActiveErrors]);

    // Start/stop detection
    useEffect(() => {
        if (isSessionActive && isEngineReady && videoRef.current) {
            startDetection(videoRef.current, handlePoseResults);
        }
        return () => stopDetection();
    }, [isSessionActive, isEngineReady, handlePoseResults]);

    const handleVideoReady = useCallback(video => {
        videoRef.current = video;
        if (isSessionActive && isEngineReady) startDetection(video, handlePoseResults);
    }, [isSessionActive, isEngineReady, handlePoseResults]);

    // Auto-start workout if session is active (e.g. from /workouts route)
    useEffect(() => {
        if (isSessionActive) setIsWorkoutView(true);
    }, [isSessionActive]);

    const handleStartWorkout = () => setIsWorkoutView(true);

    const handleEndWorkout = () => {
        stopDetection();
        resetSession();
        setIsWorkoutView(false);
    };

    // ── Workout view ──
    if (isWorkoutView) {
        return (
            <div className="w-full h-full relative" style={{ background: '#1d1815' }}>
                <CameraFeed onVideoReady={handleVideoReady} canvasRef={canvasRef}>
                    {isSessionActive && (
                        <>
                            <HUD />
                            <FeedbackPopup />
                            {!isFullBodyVisible && <VisibilityWarning />}
                        </>
                    )}
                    {/* Back button */}
                    <button onClick={handleEndWorkout}
                        className="absolute top-6 left-6 px-8 py-4 rounded-full cursor-pointer pointer-events-auto z-50
                                   hover:opacity-90 transition-all duration-200 flex items-center gap-3 shadow-2xl border border-white/10"
                        style={{ backgroundColor: '#AC6A47' }}>
                        <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
                        <span className="text-base text-white font-bold tracking-wide">End Workout</span>
                    </button>
                </CameraFeed>
            </div>
        );
    }

    // ── Landing page ──
    return <LandingPage onStartWorkout={handleStartWorkout} />;
}
