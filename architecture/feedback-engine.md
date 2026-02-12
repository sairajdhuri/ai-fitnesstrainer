# SOP: Feedback Engine

> **Module:** `src/engine/feedbackEngine.js`
> **Purpose:** Evaluate exercise form rules and produce throttled, actionable corrections.

## Goal
Compare current joint angles against exercise rules, and emit feedback only after sustained violations (500ms). Prevents spammy corrections during transitions.

## Input
| Function | Parameters |
|---|---|
| `isBodyVisible(landmarks)` | Full 33-point landmark array |
| `evaluate(angles, exerciseConfig, currentPhase, timestamp)` | Angle map + config + phase + time |

## Output
| Function | Returns |
|---|---|
| `isBodyVisible` | `boolean` |
| `evaluate` | `FeedbackItem[]` (only newly triggered items) |
| `getActiveErrors` | `string[]` (currently active rule IDs) |

## Logic
1. **Visibility check**: Count landmarks with `visibility > 0.5`. Need ≥ 15 of 33.
2. **Rule iteration**: For each rule in exercise config:
   - Skip if rule phase doesn't match current phase (unless `'all'`)
   - Average angles across specified joints
   - Check violation: `min` check → `avg < threshold`, `max` check → `avg > threshold`
3. **Throttle**: On first violation, record timestamp. Only emit feedback after 500ms sustained violation.
4. **Auto-clear**: When rule passes again, remove from active errors and clear timestamp.

## Configuration Constants
| Constant | Value | Purpose |
|---|---|---|
| `THROTTLE_MS` | 500 | Minimum sustained violation before feedback |
| `MIN_VISIBLE` | 15 | Minimum visible landmarks for processing |
| `VIS_THRESH` | 0.5 | Landmark visibility confidence threshold |

## Edge Cases
- **Phase transition**: Rules for old phase auto-clear when phase changes
- **Multiple joints per rule**: Averaged — one bad angle won't trigger if the other is fine
- **Rapid re-violation**: Once active, same rule won't emit duplicate feedback until cleared and re-triggered
