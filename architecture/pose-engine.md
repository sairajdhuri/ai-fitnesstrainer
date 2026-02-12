# SOP: Pose Engine

> **Module:** `src/engine/poseEngine.js`
> **Purpose:** MediaPipe PoseLandmarker initialization and real-time detection loop.

## Goal
Provide a thin wrapper around MediaPipe's `PoseLandmarker` that handles init, start/stop detection, and frame-by-frame pose inference via `requestAnimationFrame`.

## Input
| Source | Shape |
|---|---|
| `initPoseEngine()` | None — loads model from CDN |
| `startDetection(videoElement, onResults)` | HTMLVideoElement + callback |

## Output
Calls `onResults` each frame with:
```json
{
  "landmarks": "NormalizedLandmark[33]",
  "worldLandmarks": "Landmark[33] | null",
  "timestamp": "number (performance.now())"
}
```

## Logic
1. `initPoseEngine()` — Resolves vision WASM, creates `PoseLandmarker` with GPU delegate, lite model, single pose
2. `startDetection()` — Starts `requestAnimationFrame` loop, skips if video not ready or timestamp unchanged
3. `stopDetection()` — Cancels animation frame, resets timestamp
4. `isInitialized()` — Boolean check

## Edge Cases
- **Duplicate timestamps:** Skipped via `ts === lastTimestamp` guard
- **Video not ready:** `readyState < 2` → skip frame, try next
- **No landmarks detected:** `results.landmarks.length === 0` → callback not called
- **GPU not available:** Falls back to CPU (MediaPipe default behavior)

## Dependencies
- `@mediapipe/tasks-vision` (CDN-loaded WASM + model)

## Configuration
```
Model: pose_landmarker_lite (float16)
Delegate: GPU
Running Mode: VIDEO
Num Poses: 1
Min Detection Confidence: 0.5
Min Tracking Confidence: 0.5
```
