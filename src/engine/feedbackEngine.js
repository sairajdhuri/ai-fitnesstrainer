/**
 * Feedback engine: throttled rule evaluation + visibility guard.
 */
const THROTTLE_MS = 500;
const MIN_VISIBLE = 15;
const VIS_THRESH = 0.5;

export function createFeedbackEngine() {
    const errorTimestamps = {};
    const activeErrors = new Set();

    function isBodyVisible(landmarks) {
        if (!landmarks?.length) return false;
        return landmarks.filter(lm => lm.visibility > VIS_THRESH).length >= MIN_VISIBLE;
    }

    function evaluate(angles, exerciseConfig, currentPhase, timestamp) {
        const feedbacks = [];
        for (const rule of exerciseConfig.rules) {
            if (rule.phase !== 'all' && rule.phase !== currentPhase) {
                delete errorTimestamps[rule.id]; activeErrors.delete(rule.id); continue;
            }
            const ruleAngles = rule.joints.map(j => angles[j]).filter(a => a !== undefined);
            if (!ruleAngles.length) continue;
            const avg = ruleAngles.reduce((s, a) => s + a, 0) / ruleAngles.length;
            const violated = (rule.check === 'min' && avg < rule.threshold) || (rule.check === 'max' && avg > rule.threshold);

            if (violated) {
                if (!errorTimestamps[rule.id]) errorTimestamps[rule.id] = timestamp;
                if (timestamp - errorTimestamps[rule.id] >= THROTTLE_MS && !activeErrors.has(rule.id)) {
                    activeErrors.add(rule.id);
                    feedbacks.push({ id: rule.id, type: 'correction', message: rule.message, severity: rule.severity || 'warning', timestamp });
                }
            } else {
                delete errorTimestamps[rule.id]; activeErrors.delete(rule.id);
            }
        }
        return feedbacks;
    }

    function getActiveErrors() { return [...activeErrors]; }
    function reset() { Object.keys(errorTimestamps).forEach(k => delete errorTimestamps[k]); activeErrors.clear(); }

    return { evaluate, isBodyVisible, getActiveErrors, reset };
}
