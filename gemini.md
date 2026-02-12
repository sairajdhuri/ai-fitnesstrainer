# FitVision — Project Constitution

> **gemini.md is law.** All code must conform to these schemas, rules, and invariants.

---

## Data Schemas

### Exercise Config
```json
{
  "id": "string",
  "name": "string",
  "icon": "string (Lucide icon name)",
  "description": "string",
  "color": "string (hex)",
  "joints": {
    "[jointName]": {
      "a": "number (MediaPipe landmark index)",
      "b": "number (vertex landmark index)",
      "c": "number (MediaPipe landmark index)"
    }
  },
  "primaryJoint": "string (key in joints)",
  "phases": {
    "up": { "min": "number (degrees)", "max": "number (degrees)" },
    "down": { "min": "number (degrees)", "max": "number (degrees)" }
  },
  "rules": [
    {
      "id": "string (unique rule ID)",
      "joints": ["string (joint names)"],
      "check": "'min' | 'max'",
      "threshold": "number (degrees)",
      "message": "string (user-facing correction)",
      "phase": "'up' | 'down' | 'all'",
      "severity": "'warning' | 'info'"
    }
  ]
}
```

### Pose Result (from MediaPipe → App)
```json
{
  "landmarks": "NormalizedLandmark[] (33 points, x/y/z/visibility)",
  "worldLandmarks": "Landmark[] | null",
  "timestamp": "number (performance.now())"
}
```

### Angle Map (from angleCalculator)
```json
{
  "[jointName]": "number (degrees, 0-180)"
}
```

### Feedback Item (from feedbackEngine → UI)
```json
{
  "id": "string (rule ID or 'rep_complete')",
  "type": "'correction' | 'rep_complete'",
  "message": "string",
  "severity": "'warning' | 'info' | 'success'",
  "timestamp": "number"
}
```

### Session State (Zustand store shape)
```json
{
  "exercise": "ExerciseConfig | null",
  "phase": "'idle' | 'up' | 'down'",
  "repCount": "number",
  "currentAngles": "AngleMap",
  "activeErrors": "string[]",
  "feedbackQueue": "FeedbackItem[] (max 5)",
  "isFullBodyVisible": "boolean",
  "isPaused": "boolean",
  "isEngineReady": "boolean",
  "isSessionActive": "boolean"
}
```

---

## MediaPipe Landmark Indices

| Index | Landmark | Index | Landmark |
|---|---|---|---|
| 11 | L_SHOULDER | 12 | R_SHOULDER |
| 13 | L_ELBOW | 14 | R_ELBOW |
| 15 | L_WRIST | 16 | R_WRIST |
| 23 | L_HIP | 24 | R_HIP |
| 25 | L_KNEE | 26 | R_KNEE |
| 27 | L_ANKLE | 28 | R_ANKLE |

---

## Behavioral Rules

### Engine Rules
1. **Deterministic processing** — All engine modules (`angleCalculator`, `repCounter`, `feedbackEngine`) must be pure/deterministic. No side effects.
2. **Throttled feedback** — Form corrections fire only after 500ms sustained violation. Never spam.
3. **Visibility guard** — At least 15 landmarks must have visibility > 0.5 to process. Otherwise, clear canvas and show warning.
4. **Rep counting** — State machine: `idle → down → up` = 1 rep. Must see DOWN before counting UP.
5. **Feedback queue cap** — Max 5 items per queue. FIFO eviction.
6. **Rule evaluation per phase** — Rules with `phase: 'all'` apply always. Others only during their phase.

### UI Rules
1. **No placeholder images** — All visuals must be real assets.
2. **Dark Japandi aesthetic** — Background `#1d1815`, primary `#bd8965`, glass-morphism cards.
3. **Fonts** — Playfair Display (serif headings), Inter (body text).
4. **Feedback toasts** — Auto-dismiss after 3 seconds. Color-coded by severity.

### Architecture Rules
1. **Client-side only** — No backend, no server-side processing, no API keys.
2. **MediaPipe from CDN** — Model loads from `storage.googleapis.com`, WASM from `cdn.jsdelivr.net`.
3. **Single pose** — `numPoses: 1`. One user at a time.
4. **GPU delegate** — MediaPipe runs with GPU acceleration by default.

---

## Architectural Invariants

1. **Data flow**: Camera → MediaPipe → landmarks → angleCalculator → repCounter + feedbackEngine → Zustand store → UI
2. **Separation**: Engine modules NEVER import React or UI code. UI NEVER calls MediaPipe directly.
3. **State management**: All shared state goes through Zustand. No prop drilling for session data.
4. **Exercise config is static**: `exercises.js` is the single source of truth for all exercise definitions.

---

## Tech Stack (Locked)

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 15 |
| UI | React | 19 |
| Pose Detection | MediaPipe Tasks Vision | 0.10.32 |
| State | Zustand | 5.0.11 |
| Styling | Tailwind CSS | 4 |
| Icons | Lucide React | 0.563.0 |

---

## Maintenance Log

| Date | Change | By |
|---|---|---|
| 2026-02-13 | Initial constitution created from existing codebase | System Pilot |
| 2026-02-13 | Logo updated (favicon + nav) to zen brush design | System Pilot |
