/**
 * Pose Engine: MediaPipe PoseLandmarker wrapper.
 */
import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

let poseLandmarker = null;
let animationFrameId = null;
let lastTimestamp = -1;

export async function initPoseEngine() {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
            delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        modelComplexity: 0,
    });
    return poseLandmarker;
}

export function startDetection(videoElement, onResults) {
    if (!poseLandmarker) return;
    function detect() {
        if (!videoElement || videoElement.readyState < 2) { animationFrameId = requestAnimationFrame(detect); return; }
        const ts = performance.now();
        if (ts === lastTimestamp) { animationFrameId = requestAnimationFrame(detect); return; }
        lastTimestamp = ts;
        const results = poseLandmarker.detectForVideo(videoElement, ts);
        if (results?.landmarks?.length > 0) {
            onResults({ landmarks: results.landmarks[0], worldLandmarks: results.worldLandmarks?.[0] || null, timestamp: ts });
        }
        animationFrameId = requestAnimationFrame(detect);
    }
    detect();
}

export function stopDetection() {
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
    lastTimestamp = -1;
}

export function isInitialized() { return poseLandmarker !== null; }
