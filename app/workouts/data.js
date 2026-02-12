export const WORKOUT_LIBRARY = [
    // Strength - Lower Body
    { id: 's1', name: 'Goblet Squats', category: 'Strength', difficulty: 'Beginner', duration: '15 min', tags: ['Lower Body', 'Dumbbell'] },
    { id: 's2', name: 'Romanian Deadlifts', category: 'Strength', difficulty: 'Intermediate', duration: '20 min', tags: ['Hamstrings', 'Glutes'] },
    { id: 's3', name: 'Forward Lunges', category: 'Strength', difficulty: 'Beginner', duration: '12 min', tags: ['Balance', 'Legs'] },
    { id: 's4', name: 'Glute Bridges', category: 'Strength', difficulty: 'Beginner', duration: '10 min', tags: ['Floor', 'Glutes'] },
    { id: 's5', name: 'Calf Raises', category: 'Strength', difficulty: 'Beginner', duration: '8 min', tags: ['Low Impact', 'Calves'] },
    { id: 's6', name: 'Wall Sits', category: 'Strength', difficulty: 'Beginner', duration: '5 min', tags: ['Isometric', 'Quads'] },
    { id: 's7', name: 'Step-Ups', category: 'Strength', difficulty: 'Intermediate', duration: '15 min', tags: ['Cardio', 'Legs'] },
    { id: 's8', name: 'Sumo Squats', category: 'Strength', difficulty: 'Intermediate', duration: '15 min', tags: ['Inner Thighs'] },
    { id: 's9', name: 'Side Lunges', category: 'Strength', difficulty: 'Intermediate', duration: '12 min', tags: ['Lateral Movement'] },
    { id: 's10', name: 'Chair Squats', category: 'Strength', difficulty: 'Beginner', duration: '10 min', tags: ['Senior Friendly', 'Low Impact'] },

    // Strength - Upper Body
    { id: 'u1', name: 'Push-Ups', category: 'Strength', difficulty: 'Intermediate', duration: '10 min', tags: ['Chest', 'Bodyweight'] },
    { id: 'u2', name: 'Wall Push-Ups', category: 'Strength', difficulty: 'Beginner', duration: '10 min', tags: ['Senior Friendly', 'Chest'] },
    { id: 'u3', name: 'Dumbbell Rows', category: 'Strength', difficulty: 'Beginner', duration: '15 min', tags: ['Back', 'Posture'] },
    { id: 'u4', name: 'Overhead Press', category: 'Strength', difficulty: 'Intermediate', duration: '15 min', tags: ['Shoulders'] },
    { id: 'u5', name: 'Bicep Curls', category: 'Strength', difficulty: 'Beginner', duration: '10 min', tags: ['Arms', 'Isolation'] },
    { id: 'u6', name: 'Tricep Dips', category: 'Strength', difficulty: 'Intermediate', duration: '10 min', tags: ['Arms', 'Chair'] },
    { id: 'u7', name: 'Lateral Raises', category: 'Strength', difficulty: 'Intermediate', duration: '12 min', tags: ['Shoulders', 'Dumbbell'] },
    { id: 'u8', name: 'Plank Shoulder Taps', category: 'Strength', difficulty: 'Intermediate', duration: '8 min', tags: ['Core', 'Shoulders'] },
    { id: 'u9', name: 'Arm Circles', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Warmup', 'Shoulders'] },
    { id: 'u10', name: 'Chest Flys', category: 'Strength', difficulty: 'Intermediate', duration: '12 min', tags: ['Chest', 'Dumbbell'] },

    // Core
    { id: 'c1', name: 'Plank', category: 'Core', difficulty: 'Intermediate', duration: '5 min', tags: ['Isometric', 'Abs'] },
    { id: 'c2', name: 'Dead Bug', category: 'Core', difficulty: 'Beginner', duration: '10 min', tags: ['Back Friendly', 'Abs'] },
    { id: 'c3', name: 'Bird Dog', category: 'Core', difficulty: 'Beginner', duration: '10 min', tags: ['Balance', 'Back Health'] },
    { id: 'c4', name: 'Russian Twists', category: 'Core', difficulty: 'Intermediate', duration: '8 min', tags: ['Obliques'] },
    { id: 'c5', name: 'Bicycle Crunches', category: 'Core', difficulty: 'Intermediate', duration: '10 min', tags: ['Abs', 'Cardio'] },
    { id: 'c6', name: 'Seated Knee Tucks', category: 'Core', difficulty: 'Beginner', duration: '8 min', tags: ['Chair', 'Abs'] },
    { id: 'c7', name: 'Side Plank', category: 'Core', difficulty: 'Intermediate', duration: '6 min', tags: ['Obliques', 'Stability'] },
    { id: 'c8', name: 'Superman', category: 'Core', difficulty: 'Beginner', duration: '8 min', tags: ['Lower Back'] },
    { id: 'c9', name: 'Mountain Climbers', category: 'Cardio', difficulty: 'Intermediate', duration: '5 min', tags: ['High Intensity', 'Core'] },
    { id: 'c10', name: 'Standing Side Bends', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Stretching', 'Obliques'] },

    // Cardio & HIIT
    { id: 'h1', name: 'Jumping Jacks', category: 'Cardio', difficulty: 'Beginner', duration: '10 min', tags: ['Full Body', 'Warmup'] },
    { id: 'h2', name: 'High Knees', category: 'Cardio', difficulty: 'Intermediate', duration: '8 min', tags: ['Glutes', 'Heart Rate'] },
    { id: 'h3', name: 'Burpees', category: 'HIIT', difficulty: 'Advanced', duration: '10 min', tags: ['Full Body', 'Intense'] },
    { id: 'h4', name: 'Marching in Place', category: 'Cardio', difficulty: 'Beginner', duration: '15 min', tags: ['Low Impact', 'Senior Friendly'] },
    { id: 'h5', name: 'Butt Kicks', category: 'Cardio', difficulty: 'Beginner', duration: '5 min', tags: ['Warmup', 'Quads'] },
    { id: 'h6', name: 'Box Jumps', category: 'HIIT', difficulty: 'Advanced', duration: '15 min', tags: ['Explosive', 'Legs'] },
    { id: 'h7', name: 'Skaters', category: 'Cardio', difficulty: 'Intermediate', duration: '10 min', tags: ['Lateral', 'Balance'] },
    { id: 'h8', name: 'Shadow Boxing', category: 'Cardio', difficulty: 'Beginner', duration: '15 min', tags: ['Upper Body', 'Fun'] },
    { id: 'h9', name: 'Jump Rope', category: 'Cardio', difficulty: 'Intermediate', duration: '10 min', tags: ['Coordination', 'Calves'] },
    { id: 'h10', name: 'Power Walking', category: 'Cardio', difficulty: 'Beginner', duration: '20 min', tags: ['Low Impact', 'Outdoors'] },

    // Mobility & Flexibility
    { id: 'm1', name: 'Cat-Cow Stretch', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Spine', 'Relaxing'] },
    { id: 'm2', name: 'Child’s Pose', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Recovery', 'Lower Back'] },
    { id: 'm3', name: 'Hip Flexor Stretch', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Hips', 'Sitting Relief'] },
    { id: 'm4', name: 'Shoulder Rolls', category: 'Mobility', difficulty: 'Beginner', duration: '3 min', tags: ['Desk Relief', 'Upper Body'] },
    { id: 'm5', name: 'Torso Twists', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Spine', 'Warmup'] },
    { id: 'm6', name: 'Hamstring Stretch', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Legs', 'Recovery'] },
    { id: 'm7', name: 'Quadriceps Stretch', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Legs', 'Balance'] },
    { id: 'm8', name: 'Neck Stretches', category: 'Mobility', difficulty: 'Beginner', duration: '5 min', tags: ['Desk Relief', 'Neck'] },
    { id: 'm9', name: 'Wrist Circles', category: 'Mobility', difficulty: 'Beginner', duration: '3 min', tags: ['Joint Health', 'Hands'] },
    { id: 'm10', name: 'Ankle Circles', category: 'Mobility', difficulty: 'Beginner', duration: '3 min', tags: ['Joint Health', 'Feet'] },

    // Pilates & Balance
    { id: 'p1', name: 'Single Leg Stand', category: 'Balance', difficulty: 'Beginner', duration: '5 min', tags: ['Senior Friendly', 'Stability'] },
    { id: 'p2', name: 'Heel-to-Toe Walk', category: 'Balance', difficulty: 'Beginner', duration: '5 min', tags: ['Coordination', 'Senior Friendly'] },
    { id: 'p3', name: 'Hundred Preps', category: 'Pilates', difficulty: 'Intermediate', duration: '8 min', tags: ['Core', 'Control'] },
    { id: 'p4', name: 'Roll-Ups', category: 'Pilates', difficulty: 'Intermediate', duration: '10 min', tags: ['Spine', 'Abs'] },
    { id: 'p5', name: 'Swimming', category: 'Pilates', difficulty: 'Intermediate', duration: '5 min', tags: ['Back Extension'] }
];
