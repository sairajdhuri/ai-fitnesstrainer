# SOP: Rep Counter

> **Module:** `src/engine/repCounter.js`
> **Purpose:** State machine that counts exercise repetitions based on joint angle transitions.

## Goal
Track exercise phase (up/down) and count reps using a deterministic state machine. A rep is: DOWN → UP.

## Input
| Function | Parameters |
|---|---|
| `update(angle, phaseConfig)` | Primary joint angle + `{ up: {min, max}, down: {min, max} }` |

## Output
```json
{
  "phase": "'idle' | 'up' | 'down'",
  "repCount": "number",
  "repCompleted": "boolean (true only on the frame a rep completes)"
}
```

## State Machine
```
idle ──(angle in down range)──→ down
down ──(angle in up range)────→ up (repCount++, repCompleted=true)
up ───(angle in down range)──→ down
```

## Edge Cases
- **First frame in UP range without prior DOWN**: No rep counted (`wasDown = false`)
- **Angle between phases** (transition zone): Phase unchanged, no count
- **Rapid transitions**: Each UP→DOWN→UP is exactly 1 rep

## Invariants
- `repCount` is monotonically increasing (never decreases)
- `repCompleted` is `true` for exactly 1 frame per rep
- Calling `reset()` returns to initial state: `idle, 0 reps, wasDown=false`
