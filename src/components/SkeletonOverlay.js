/**
 * SkeletonOverlay — Japandi style.
 * Thin, charcoal / soft-white lines at low opacity.
 * Errors shown with muted terracotta instead of bright red.
 */

const POSE_CONNECTIONS = [
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
    [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28],
];

export function drawSkeleton(ctx, landmarks, width, height, errorLandmarks = new Set()) {
    ctx.clearRect(0, 0, width, height);
    if (!landmarks?.length) return;

    // Connections — thin, soft
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    for (const [i, j] of POSE_CONNECTIONS) {
        const a = landmarks[i], b = landmarks[j];
        if (!a || !b || a.visibility < 0.5 || b.visibility < 0.5) continue;
        const hasErr = errorLandmarks.has(i) || errorLandmarks.has(j);
        ctx.strokeStyle = hasErr
            ? 'rgba(185, 136, 105, 0.5)'   // terracotta at 50%
            : 'rgba(196, 187, 170, 0.3)';  // warm-white at 30%
        ctx.beginPath();
        ctx.moveTo(a.x * width, a.y * height);
        ctx.lineTo(b.x * width, b.y * height);
        ctx.stroke();
    }

    // Joints — small, understated dots (skip face 0-10)
    for (let i = 11; i < landmarks.length; i++) {
        const lm = landmarks[i];
        if (!lm || lm.visibility < 0.5) continue;
        const x = lm.x * width, y = lm.y * height;
        const hasErr = errorLandmarks.has(i);

        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, hasErr ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hasErr
            ? 'rgba(185, 136, 105, 0.15)'
            : 'rgba(196, 187, 170, 0.08)';
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, hasErr ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = hasErr
            ? 'rgba(185, 136, 105, 0.7)'
            : 'rgba(196, 187, 170, 0.45)';
        ctx.fill();
    }
}

export function getErrorLandmarkIndices(exerciseConfig, activeErrorIds) {
    const indices = new Set();
    if (!exerciseConfig || !activeErrorIds.length) return indices;
    for (const rule of exerciseConfig.rules) {
        if (activeErrorIds.includes(rule.id)) {
            for (const j of rule.joints) {
                const joint = exerciseConfig.joints[j];
                if (joint) { indices.add(joint.a); indices.add(joint.b); indices.add(joint.c); }
            }
        }
    }
    return indices;
}
