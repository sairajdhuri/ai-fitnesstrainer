# SOP: Exercise Definitions

> **Module:** `src/engine/exercises.js`
> **Purpose:** Static configuration for all supported exercises — the single source of truth for joints, phases, and correction rules.

## Goal
Define each exercise as a self-contained config object containing all the information the engine needs to track form, count reps, and provide corrections.

## Supported Exercises

| ID | Name | Primary Joint | # Rules |
|---|---|---|---|
| `squat` | Squat | leftKnee | 2 (depth, back) |
| `pushup` | Push-up | leftElbow | 2 (depth, body line) |
| `bicepCurl` | Bicep Curl | leftElbow | 2 (curl height, extension) |
| `jumpingJack` | Jumping Jack | leftShoulder | 1 (arm height) |

## Schema
See `gemini.md` → Data Schemas → Exercise Config for full JSON shape.

## Adding a New Exercise
1. Define `joints` with MediaPipe landmark indices (see `gemini.md` landmark table)
2. Set `primaryJoint` — the joint used by `repCounter` for phase detection
3. Define `phases.up` and `phases.down` angle ranges
4. Add `rules[]` for form corrections with unique IDs
5. Add icon mapping in `LandingPage.jsx` → `ICON_MAP`

## Invariants
- Every exercise MUST have `id`, `name`, `joints`, `primaryJoint`, `phases`, and `rules`
- `primaryJoint` MUST be a key in `joints`
- Rule IDs MUST be globally unique across all exercises
- `EXERCISE_LIST` is always `Object.values(EXERCISES)` — no manual ordering
