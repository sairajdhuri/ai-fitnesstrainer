/**
 * Pure math utilities for joint angle calculation.
 */
export function calculateAngle(a, b, c) {
    const ba = { x: a.x - b.x, y: a.y - b.y };
    const bc = { x: c.x - b.x, y: c.y - b.y };
    const dot = ba.x * bc.x + ba.y * bc.y;
    const magBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
    const magBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);
    if (magBA === 0 || magBC === 0) return 0;
    const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
    return Math.acos(cosAngle) * (180 / Math.PI);
}

export function getJointAngles(landmarks, exerciseConfig) {
    const angles = {};
    for (const [jointName, joint] of Object.entries(exerciseConfig.joints)) {
        const a = landmarks[joint.a];
        const b = landmarks[joint.b];
        const c = landmarks[joint.c];
        if (a && b && c) angles[jointName] = calculateAngle(a, b, c);
    }
    return angles;
}
