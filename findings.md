# Findings — AI Fitness Trainer

## Tech Decisions

### Why MediaPipe PoseLandmarker (Lite)?
- Runs entirely client-side via WebAssembly + GPU delegate
- No server costs, no API keys, no data leaves the browser
- Lite model chosen for speed (~30fps) over accuracy tradeoff
- 33 landmarks per pose, sufficient for all 4 exercise types

### Why Zustand over Redux/Context?
- Minimal boilerplate for a single-store app
- No providers needed — works directly with functional components
- Built-in granular subscriptions (no unnecessary re-renders)
- v5 with React 19 compatibility

### Why Next.js for a client-side app?
- User-chosen framework (project initialized with Next.js 15)
- App router provides clean layout/metadata structure
- Easy deployment to Vercel with zero config
- SEO metadata for landing page (title, description, favicon)

### Why client-side only (no backend)?
- Privacy: webcam data never leaves the browser
- Latency: real-time form correction requires <33ms processing
- Cost: zero server infrastructure
- Simplicity: no auth, no database, no API management

## Architecture Discoveries

### Angle Calculation
- Uses 3-point angle formula: `acos(dot(BA, BC) / (|BA| * |BC|))`
- Returns degrees (0-180), clamped via `Math.max(-1, Math.min(1, cosAngle))`
- Edge case: zero-magnitude vectors return 0 degrees

### Rep Counter State Machine
- Simple 3-state: `idle → down → up`
- Rep only counts when transitioning from `down → up`
- Prevents double-counting by requiring `wasDown = true` before counting

### Feedback Throttling
- 500ms sustained violation before triggering feedback
- Prevents rapid-fire corrections during transitional movements
- Active errors tracked in a `Set` for O(1) lookup
- Errors auto-clear when rule passes again

### Visibility Guard
- Requires 15+ of 33 landmarks visible (>0.5 confidence)
- Canvas clears entirely when body not visible
- `VisibilityWarning` component shown to user

## Constraints
- **Single user only**: `numPoses: 1` in MediaPipe config
- **Webcam required**: No video file upload support
- **4 exercises**: Squat, Push-up, Bicep Curl, Jumping Jack
- **No persistence**: Session data lost on page refresh
- **No mobile optimization**: Layout assumes desktop viewport
