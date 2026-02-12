/**
 * Exercise definitions with MediaPipe landmark indices,
 * phase thresholds, and form-correction rules.
 *
 * Landmark indices:
 * 11=L_SHOULDER 12=R_SHOULDER  13=L_ELBOW 14=R_ELBOW
 * 15=L_WRIST    16=R_WRIST     23=L_HIP   24=R_HIP
 * 25=L_KNEE     26=R_KNEE      27=L_ANKLE 28=R_ANKLE
 */

export const EXERCISES = {
    squat: {
        id: 'squat',
        name: 'Squat',
        icon: 'ArrowDownUp',
        description: 'Full-body lower strength',
        color: '#AC6A47',
        joints: {
            leftKnee: { a: 23, b: 25, c: 27 },
            rightKnee: { a: 24, b: 26, c: 28 },
            leftHip: { a: 11, b: 23, c: 25 },
            rightHip: { a: 12, b: 24, c: 26 },
        },
        primaryJoint: 'leftKnee',
        phases: {
            up: { min: 160, max: 180 },
            down: { min: 60, max: 110 },
        },
        rules: [
            { id: 'squat_depth', joints: ['leftKnee', 'rightKnee'], check: 'max', threshold: 120, message: 'Go lower!', phase: 'down', severity: 'warning' },
            { id: 'squat_back', joints: ['leftHip', 'rightHip'], check: 'min', threshold: 70, message: 'Keep your back straight!', phase: 'all', severity: 'warning' },
        ],
    },
    pushup: {
        id: 'pushup',
        name: 'Push-up',
        icon: 'ArrowDown',
        description: 'Upper body & core',
        color: '#6D674B',
        joints: {
            leftElbow: { a: 11, b: 13, c: 15 },
            rightElbow: { a: 12, b: 14, c: 16 },
            leftBody: { a: 11, b: 23, c: 27 },
            rightBody: { a: 12, b: 24, c: 28 },
        },
        primaryJoint: 'leftElbow',
        phases: {
            up: { min: 160, max: 180 },
            down: { min: 60, max: 100 },
        },
        rules: [
            { id: 'pushup_depth', joints: ['leftElbow', 'rightElbow'], check: 'max', threshold: 110, message: 'Go lower!', phase: 'down', severity: 'warning' },
            { id: 'pushup_body_line', joints: ['leftBody', 'rightBody'], check: 'min', threshold: 155, message: 'Keep your body straight!', phase: 'all', severity: 'warning' },
        ],
    },
    bicepCurl: {
        id: 'bicepCurl',
        name: 'Bicep Curl',
        icon: 'Dumbbell',
        description: 'Arm isolation',
        color: '#B98869',
        joints: {
            leftElbow: { a: 11, b: 13, c: 15 },
            rightElbow: { a: 12, b: 14, c: 16 },
        },
        primaryJoint: 'leftElbow',
        phases: {
            up: { min: 30, max: 70 },
            down: { min: 150, max: 180 },
        },
        rules: [
            { id: 'curl_full_curl', joints: ['leftElbow', 'rightElbow'], check: 'max', threshold: 80, message: 'Curl higher!', phase: 'up', severity: 'warning' },
            { id: 'curl_full_extend', joints: ['leftElbow', 'rightElbow'], check: 'min', threshold: 140, message: 'Extend fully!', phase: 'down', severity: 'info' },
        ],
    },
    jumpingJack: {
        id: 'jumpingJack',
        name: 'Jumping Jack',
        icon: 'Zap',
        description: 'Full-body cardio',
        color: '#AAA082',
        joints: {
            leftShoulder: { a: 23, b: 11, c: 13 },
            rightShoulder: { a: 24, b: 12, c: 14 },
            leftHip: { a: 25, b: 23, c: 24 },
            rightHip: { a: 26, b: 24, c: 23 },
        },
        primaryJoint: 'leftShoulder',
        phases: {
            up: { min: 140, max: 180 },
            down: { min: 10, max: 60 },
        },
        rules: [
            { id: 'jj_arms', joints: ['leftShoulder', 'rightShoulder'], check: 'max', threshold: 150, message: 'Arms higher!', phase: 'up', severity: 'warning' },
        ],
    },
};

export const EXERCISE_LIST = Object.values(EXERCISES);
