/**
 * SkeletonOverlay — Japandi style.
 * Thin, charcoal / soft-white lines at low opacity.
 * Errors shown with muted terracotta instead of bright red.
 */

const POSE_CONNECTIONS = [
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
    [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28],
];

export function drawSkeleton(ctx, landmarks, width, height, errorLandmarks = new Set(), angles = null) {
    ctx.clearRect(0, 0, width, height);
    if (!landmarks?.length) return;

    // Connections — olive green (default) or red (error)
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (const [i, j] of POSE_CONNECTIONS) {
        const a = landmarks[i], b = landmarks[j];
        if (!a || !b || a.visibility < 0.5 || b.visibility < 0.5) continue;
        const hasErr = errorLandmarks.has(i) || errorLandmarks.has(j);
        ctx.strokeStyle = hasErr
            ? 'rgba(255, 60, 60, 1)'      // bright alert red
            : 'rgba(125, 155, 118, 0.9)'; // olive green / sage
        ctx.beginPath();
        // Mirror X calculation: (1 - val) * width
        ctx.moveTo((1 - a.x) * width, a.y * height);
        ctx.lineTo((1 - b.x) * width, b.y * height);
        ctx.stroke();
    }

    // Joints
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < landmarks.length; i++) {
        const lm = landmarks[i];
        if (!lm || lm.visibility < 0.5) continue;
        // Mirror X
        const x = (1 - lm.x) * width;
        const y = lm.y * height;
        const hasErr = errorLandmarks.has(i);

        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, hasErr ? 10 : 8, 0, Math.PI * 2);
        ctx.fillStyle = hasErr
            ? 'rgba(255, 60, 60, 0.4)'
            : 'rgba(125, 155, 118, 0.4)';
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, hasErr ? 6 : 5, 0, Math.PI * 2);
        ctx.fillStyle = hasErr
            ? 'rgba(255, 60, 60, 1)'
            : 'rgba(125, 155, 118, 1)';
        ctx.fill();
    }

    // Draw Angles
    if (angles) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        ctx.font = 'bold 20px Inter, sans-serif'; // Increased font size

        // Map landmark index to angle value if available
        const map = {
            11: angles.leftShoulder, 12: angles.rightShoulder,
            13: angles.leftElbow, 14: angles.rightElbow,
            23: angles.leftHip, 24: angles.rightHip,
            25: angles.leftKnee, 26: angles.rightKnee
        };

        for (const [idx, val] of Object.entries(map)) {
            if (val === undefined) continue;
            const lm = landmarks[idx];
            if (!lm || lm.visibility < 0.5) continue;

            // Mirror X
            const x = (1 - lm.x) * width;
            const y = lm.y * height;

            ctx.fillText(`${Math.round(val)}°`, x + 35, y);
        }
        ctx.shadowBlur = 0;
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
