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

    // Handle pose results
    const handlePoseResults = useCallback(({ landmarks, timestamp }) => {
        if (!exercise || isPaused) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const video = videoRef.current;
        if (video) { canvas.width = video.videoWidth; canvas.height = video.videoHeight; }

        const fe = feedbackEngineRef.current;
        if (fe) {
            const visible = fe.isBodyVisible(landmarks);
            setFullBodyVisible(visible);
            if (!visible) { canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); return; }
        }

        const angles = getJointAngles(landmarks, exercise);
        setCurrentAngles(angles);

        const primaryAngle = angles[exercise.primaryJoint];
        if (repCounterRef.current && primaryAngle !== undefined) {
            const result = repCounterRef.current.update(primaryAngle, exercise.phases);
            setPhase(result.phase);
            setRepCount(result.repCount);
            if (result.repCompleted) {
                pushFeedback({ id: 'rep_complete', type: 'rep_complete', message: 'Well done', severity: 'success', timestamp });
            }
        }

        if (fe) {
            const phase = repCounterRef.current?.getState()?.phase || 'idle';
            const fbs = fe.evaluate(angles, exercise, phase, timestamp);
            setActiveErrors(fe.getActiveErrors());
            fbs.forEach(fb => pushFeedback(fb));
        }

        const ctx = canvas.getContext('2d');
        const errIdx = fe ? getErrorLandmarkIndices(exercise, fe.getActiveErrors()) : new Set();
        drawSkeleton(ctx, landmarks, canvas.width, canvas.height, errIdx);
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
                        className="absolute top-5 left-5 glass-card px-4 py-2.5 rounded-full cursor-pointer pointer-events-auto z-50
                                   hover:bg-white/10 transition-all duration-200 flex items-center gap-2 shadow-xl">
                        <ArrowLeft className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.8} />
                        <span className="text-xs text-gray-300 font-medium">End</span>
                    </button>
                </CameraFeed>
            </div>
        );
    }

    // ── Landing page ──
    return <LandingPage onStartWorkout={handleStartWorkout} />;
}
