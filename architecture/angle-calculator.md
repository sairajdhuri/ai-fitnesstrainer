# SOP: Angle Calculator

> **Module:** `src/engine/angleCalculator.js`
> **Purpose:** Pure math utility for computing joint angles from 3 landmark points.

## Goal
Convert raw MediaPipe landmark coordinates into meaningful joint angles (in degrees) for exercise evaluation.

## Input
| Function | Parameters |
|---|---|
| `calculateAngle(a, b, c)` | Three landmark objects `{ x, y }` — point b is the vertex |
| `getJointAngles(landmarks, exerciseConfig)` | Full landmark array + exercise config |

## Output
| Function | Returns |
|---|---|
| `calculateAngle` | `number` (degrees, 0-180) |
| `getJointAngles` | `{ [jointName]: number }` — angle map |

## Logic
1. Compute vectors BA and BC from vertex B
2. Dot product → cosine of angle
3. Clamp cosine to [-1, 1] to avoid `NaN` from `acos`
4. Convert radians to degrees
5. `getJointAngles` iterates over exercise config joints, plucks landmarks by index

## Edge Cases
- **Zero-magnitude vectors** (landmarks overlap): Returns 0 degrees
- **Missing landmarks**: Joint skipped, not included in output map
- **Cosine out of bounds** (float precision): Clamped with `Math.max(-1, Math.min(1, ...))`

## Invariants
- This module is **pure** — no side effects, no state, no imports beyond math
- Angles always in range [0, 180]
