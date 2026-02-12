# SOP: Session Store

> **Module:** `src/store/sessionStore.js`
> **Purpose:** Centralized state management for the active workout session using Zustand.

## Goal
Single global store holding all runtime session state. UI components subscribe to slices; engine modules write via actions.

## State Shape
See `gemini.md` → Data Schemas → Session State for full shape.

## Actions

| Action | Effect |
|---|---|
| `selectExercise(ex)` | Sets exercise, resets counters, activates session |
| `setPhase(phase)` | Updates current phase |
| `setRepCount(n)` | Sets rep count |
| `incrementRep()` | Increments rep count by 1 |
| `setCurrentAngles(map)` | Updates angle map |
| `setActiveErrors(arr)` | Updates active error IDs |
| `pushFeedback(item)` | Appends to queue (max 5, FIFO) |
| `clearOldFeedback()` | Removes items older than 3 seconds |
| `setFullBodyVisible(bool)` | Updates visibility state |
| `togglePause()` | Toggles pause state |
| `setEngineReady(bool)` | Marks MediaPipe as ready |
| `resetSession()` | Full reset to initial state |
| `endSession()` | Deactivates session, sets phase to idle |

## Data Flow
```
Engine modules → store actions → React re-render → UI updates
                                                  ↑
                                    (subscribed components only)
```

## Invariants
- `feedbackQueue` never exceeds 5 items (sliced in `pushFeedback`)
- `resetSession` returns ALL fields to their initial values
- `selectExercise` always sets `isSessionActive: true`
- Store is created once (module-level singleton via Zustand `create()`)
