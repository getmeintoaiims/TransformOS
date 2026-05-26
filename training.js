const TrainingSystem = {
  // Biomechanical & EMG-supported exercise database with clinical rationales
  exercises: {
    incline_db_press: {
      name: "30° Incline Dumbbell Bench Press",
      setup: "Set adjustable bench to exactly 30 degrees (higher shifts tension to anterior delts). Keep scapula retracted and depressed throughout the movement.",
      rationale: "Aligns the line of force with the clavicular (upper) fibers of the pectoralis major. Targets gyno aesthetics directly by adding volume to the upper chest, creating a lifting effect.",
      execution: "Lower under control (3-sec eccentric), pause slightly at the deep stretch, then press forcefully in an arc."
    },
    low_to_high_cable_fly: {
      name: "Low-to-High Cable Fly",
      setup: "Set pulleys to lowest position. Take a small step forward. Maintain a slight bend in the elbows.",
      rationale: "Maximizes the shortened position of the clavicular pectoral fibers. High EMG activity in the upper chest, low joint stress on the rotator cuff.",
      execution: "Bring hands up and inward, meeting at eye level. Squeeze the chest for 1 second at the peak contraction."
    },
    behind_back_cable_lateral: {
      name: "Behind-the-Back Cable Lateral Raise",
      setup: "Set pulley to bottom notch. Stand in front of it, pull the cable behind your back, holding the handle with the opposite hand.",
      rationale: "Provides constant tension throughout the range of motion, particularly in the deep stretched position where research shows hypertrophy is maximized. Standard dumbbell raises have zero tension at the bottom.",
      execution: "Raise arm to 90 degrees, keeping the movement in the scapular plane (tilted 30 degrees forward)."
    },
    chest_supported_db_rear_row: {
      name: "Chest-Supported Dumbbell Rear Delt Row",
      setup: "Set incline bench to 30 degrees. Lie face down. Flare elbows out at a 45-to-90 degree angle from the torso.",
      rationale: "Isolates the posterior deltoid by removing lower back stability limits. Squeezing the shoulder blades together is avoided to keep the tension on the rear delts rather than the rhomboids/traps.",
      execution: "Pull elbows up and out, focusing on driving with the back of the shoulder."
    },
    cable_rear_delt_fly: {
      name: "45° Cable Rear Delt Fly",
      setup: "Stand in the middle of a dual cable station. Cross arms and grab the left cable with the right hand, and vice versa. No handles, grab the raw cable spheres.",
      rationale: "Perfectly aligns cable resistance with the horizontal abduction function of the rear delts.",
      execution: "Pull hands backward in a wide arc, maintaining elbow extension."
    },
    single_arm_lat_pulldown: {
      name: "Half-Kneeling Single-Arm Lat Pulldown",
      setup: "Kneel next to a high cable pulldown. Pull down in the scapular plane.",
      rationale: "Unilateral pulling allows the humerus to travel close to the side, targeting the lower/iliac lat fibers. Maximizes V-taper by flaring the lats without compressing the spine.",
      execution: "Drive elbow down towards your hip bone. Focus on late contraction and full stretch at the top."
    },
    chest_supported_neutral_row: {
      name: "Chest-Supported Neutral Grip Row",
      setup: "Lie face down on a flat or slight incline bench. Hold dumbbells with palms facing each other.",
      rationale: "Builds upper back thickness and mid-traps safely. Neutral grip keeps shoulders in safe external rotation.",
      execution: "Pull dumbbells up towards your lower ribs, grazing your elbows against your sides."
    },
    romanian_deadlift: {
      name: "Dumbbell/Barbell Romanian Deadlift (RDL)",
      setup: "Stand straight with weights. Micro-bend knees and push hips backward.",
      rationale: "Extreme load in the stretched position of the glutes and hamstrings. Excellent posterior chain hypertrophy with minimal spinal compression compared to conventional deadlifts.",
      execution: "Hinge at the hips, lowering the weight close to your legs until your hamstrings stretch. Drive hips forward to stand."
    },
    leg_press: {
      name: "Leg Press (High & Wide Foot Placement)",
      setup: "Sit in leg press, place feet high and slightly wide on the sled.",
      rationale: "Minimizes lower back fatigue while providing massive mechanical tension to the glutes and quadriceps. Crucial for Sean's cardiovascular conditioning without limiting back strength.",
      execution: "Lower under control until knees are at 90 degrees (do not let lower back lift off the pad). Press upward."
    },
    db_bulgarian_split_squat: {
      name: "Dumbbell Bulgarian Split Squat",
      setup: "Place one foot behind you on a bench, hold dumbbells in each hand.",
      rationale: "Unilateral loading forces glute medius and core stabilization. Perfect for correcting hip imbalances and curing Anterior Pelvic Tilt.",
      execution: "Lower hips vertically under control. Keep front shin relatively vertical to maximize hip hinge/glute tension."
    },
    decline_cable_crunch: {
      name: "Kneeling Cable Crunch",
      setup: "Kneel facing the cable machine with rope attachment held behind your neck.",
      rationale: "Allows progressive overload of the rectus abdominis. Promotes visible ab lines under fat loss.",
      execution: "Flex your spine, bringing your elbows down towards your knees. Avoid flexing at the hips."
    },
    hanging_leg_raise: {
      name: "Hanging Leg/Knee Raise",
      setup: "Hang from pull-up bar. Keep shoulders active.",
      rationale: "Directly targets the lower fibers of the rectus abdominis, which Sean identified as underdeveloped.",
      execution: "Raise knees/feet upward by curling your pelvis towards your sternum."
    }
  },

  // Posture Correction Regimen
  posture: [
    { name: "Chin Tucks (Neck Hump)", reps: "3 sets of 12 reps", guide: "Pull head straight back as if making a double chin. Hold 3 secs." },
    { name: "Wall Angels (Thoracic & Neck)", reps: "3 sets of 10 reps", guide: "Stand flat against a wall. Keep head, upper back, and glutes touching. Slide arms up and down slowly." },
    { name: "Couch Stretch (APT)", reps: "2 sets of 45 secs per leg", guide: "Place back knee against a wall or couch, step other leg forward. Squeeze glutes to stretch hip flexors." },
    { name: "Glute Bridges (APT)", reps: "3 sets of 15 reps", guide: "Lie on back, bend knees, drive hips up by squeezing glutes. Hold 2 secs at top." }
  ],

  // 5-Phase Periodization splits
  phases: {
    1: {
      name: "Anatomical Adaptation & Posture Correction",
      dates: "June 1 - June 30",
      description: "Focus on cardiovascular base, connective tissue loading, and posture re-alignment. Clean up APT and forward head posture before loading heavy.",
      split: ["Upper A", "Lower A", "Rest", "Upper B", "Lower B", "Rest", "Rest"],
      routine: {
        "Upper A": [
          { key: "incline_db_press", sets: 3, reps: "12-15", rest: "2 mins" },
          { key: "single_arm_lat_pulldown", sets: 3, reps: "12-15", rest: "2 mins" },
          { key: "behind_back_cable_lateral", sets: 3, reps: "15", rest: "90s" },
          { key: "chest_supported_db_rear_row", sets: 3, reps: "15", rest: "90s" },
          { key: "decline_cable_crunch", sets: 3, reps: "15", rest: "90s" }
        ],
        "Upper B": [
          { key: "low_to_high_cable_fly", sets: 3, reps: "12-15", rest: "2 mins" },
          { key: "chest_supported_neutral_row", sets: 3, reps: "12-15", rest: "2 mins" },
          { key: "behind_back_cable_lateral", sets: 3, reps: "15", rest: "90s" },
          { key: "cable_rear_delt_fly", sets: 3, reps: "15", rest: "90s" },
          { key: "hanging_leg_raise", sets: 3, reps: "12-15", rest: "90s" }
        ],
        "Lower A": [
          { key: "leg_press", sets: 3, reps: "12-15", rest: "2.5 mins" },
          { key: "romanian_deadlift", sets: 3, reps: "12", rest: "2.5 mins" },
          { key: "db_bulgarian_split_squat", sets: 2, reps: "10 per leg", rest: "2 mins" }
        ],
        "Lower B": [
          { key: "romanian_deadlift", sets: 3, reps: "12", rest: "2.5 mins" },
          { key: "leg_press", sets: 3, reps: "12-15", rest: "2.5 mins" },
          { key: "db_bulgarian_split_squat", sets: 2, reps: "10 per leg", rest: "2 mins" }
        ]
      }
    },
    2: {
      name: "Hypertrophy & Work Capacity",
      dates: "July 1 - August 15",
      description: "Aggressive muscle protein synthesis trigger. Push/Pull/Legs rotation to increase volume on shoulders, upper chest, and lats.",
      split: ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Legs", "Rest"],
      routine: {
        "Push": [
          { key: "incline_db_press", sets: 4, reps: "8-10", rest: "2.5 mins" },
          { key: "low_to_high_cable_fly", sets: 3, reps: "10-12", rest: "2 mins" },
          { key: "behind_back_cable_lateral", sets: 4, reps: "12-15", rest: "90s" },
          { key: "decline_cable_crunch", sets: 3, reps: "12-15", rest: "90s" }
        ],
        "Pull": [
          { key: "single_arm_lat_pulldown", sets: 4, reps: "8-10", rest: "2.5 mins" },
          { key: "chest_supported_neutral_row", sets: 3, reps: "10-12", rest: "2 mins" },
          { key: "chest_supported_db_rear_row", sets: 4, reps: "12-15", rest: "90s" },
          { key: "cable_rear_delt_fly", sets: 3, reps: "12-15", rest: "90s" }
        ],
        "Legs": [
          { key: "romanian_deadlift", sets: 4, reps: "8-10", rest: "3 mins" },
          { key: "leg_press", sets: 4, reps: "10-12", rest: "2.5 mins" },
          { key: "db_bulgarian_split_squat", sets: 3, reps: "8 per leg", rest: "2 mins" },
          { key: "hanging_leg_raise", sets: 3, reps: "12", rest: "90s" }
        ]
      }
    },
    3: {
      name: "Recomposition Peak & Strength",
      dates: "August 16 - September 30",
      description: "Pushing limits of mechanical tension. High intensity, targeting absolute muscle retention while expanding calorie deficit.",
      split: ["Push A", "Pull A", "Legs", "Rest", "Push B", "Pull B", "Rest"],
      routine: {
        "Push A": [
          { key: "incline_db_press", sets: 4, reps: "6-8", rest: "3 mins" },
          { key: "behind_back_cable_lateral", sets: 5, reps: "10-12", rest: "90s" },
          { key: "low_to_high_cable_fly", sets: 3, reps: "10", rest: "2 mins" },
          { key: "decline_cable_crunch", sets: 4, reps: "10-12", rest: "90s" }
        ],
        "Push B": [
          { key: "low_to_high_cable_fly", sets: 4, reps: "8-10", rest: "2 mins" },
          { key: "incline_db_press", sets: 3, reps: "10", rest: "2.5 mins" },
          { key: "behind_back_cable_lateral", sets: 5, reps: "12-15", rest: "90s" }
        ],
        "Pull A": [
          { key: "single_arm_lat_pulldown", sets: 4, reps: "6-8", rest: "3 mins" },
          { key: "chest_supported_db_rear_row", sets: 5, reps: "10-12", rest: "90s" },
          { key: "chest_supported_neutral_row", sets: 3, reps: "10", rest: "2 mins" }
        ],
        "Pull B": [
          { key: "chest_supported_neutral_row", sets: 4, reps: "8-10", rest: "2.5 mins" },
          { key: "single_arm_lat_pulldown", sets: 3, reps: "10-12", rest: "2 mins" },
          { key: "cable_rear_delt_fly", sets: 5, reps: "12-15", rest: "90s" }
        ],
        "Legs": [
          { key: "romanian_deadlift", sets: 4, reps: "6-8", rest: "3 mins" },
          { key: "leg_press", sets: 4, reps: "8-10", rest: "2.5 mins" },
          { key: "db_bulgarian_split_squat", sets: 3, reps: "8 per leg", rest: "2 mins" },
          { key: "hanging_leg_raise", sets: 4, reps: "10-12", rest: "90s" }
        ]
      }
    },
    4: {
      name: "Aggressive Fat Loss & Density",
      dates: "October 1 - October 31",
      description: "Aggressive deficit period. Training volume is slightly reduced, but intensity is maintained at absolute 100% to safeguard muscle tissue.",
      split: ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Legs", "Rest"],
      routine: {
        "Push": [
          { key: "incline_db_press", sets: 3, reps: "6-8", rest: "3 mins" },
          { key: "behind_back_cable_lateral", sets: 4, reps: "8-10", rest: "90s" },
          { key: "low_to_high_cable_fly", sets: 2, reps: "10", rest: "2 mins" },
          { key: "decline_cable_crunch", sets: 3, reps: "10-12", rest: "90s" }
        ],
        "Pull": [
          { key: "single_arm_lat_pulldown", sets: 3, reps: "6-8", rest: "3 mins" },
          { key: "chest_supported_db_rear_row", sets: 4, reps: "8-10", rest: "90s" },
          { key: "chest_supported_neutral_row", sets: 2, reps: "10", rest: "2 mins" },
          { key: "cable_rear_delt_fly", sets: 3, reps: "10-12", rest: "90s" }
        ],
        "Legs": [
          { key: "romanian_deadlift", sets: 3, reps: "6-8", rest: "3 mins" },
          { key: "leg_press", sets: 3, reps: "8-10", rest: "2.5 mins" },
          { key: "hanging_leg_raise", sets: 3, reps: "10-12", rest: "90s" }
        ]
      }
    },
    5: {
      name: "Peak & Dry Out",
      dates: "November 1 - November 10",
      description: "Final cosmetic prep. Flush body water, deplete muscle glycogen then load slightly to produce maximum skin-stretching fullness and ab vascularity.",
      split: ["Full Body Pump", "Rest", "Full Body Pump", "Rest", "Full Body Pump", "Rest", "Full Body Pump", "Rest", "Rest", "Peak Photo Day"],
      routine: {
        "Full Body Pump": [
          { key: "incline_db_press", sets: 4, reps: "15", rest: "60s" },
          { key: "single_arm_lat_pulldown", sets: 4, reps: "15", rest: "60s" },
          { key: "behind_back_cable_lateral", sets: 5, reps: "20", rest: "45s" },
          { key: "chest_supported_db_rear_row", sets: 5, reps: "20", rest: "45s" },
          { key: "decline_cable_crunch", sets: 4, reps: "15-20", rest: "45s" }
        ],
        "Peak Photo Day": []
      }
    }
  },

  // Deterministic daily generator
  getDailyTraining: function(dayNumber) {
    let phaseId = 1;
    let localDay = dayNumber;

    if (dayNumber <= 30) {
      phaseId = 1;
      localDay = dayNumber;
    } else if (dayNumber <= 76) {
      phaseId = 2;
      localDay = dayNumber - 30;
    } else if (dayNumber <= 122) {
      phaseId = 3;
      localDay = dayNumber - 76;
    } else if (dayNumber <= 153) {
      phaseId = 4;
      localDay = dayNumber - 122;
    } else {
      phaseId = 5;
      localDay = dayNumber - 153;
    }

    const phase = this.phases[phaseId];
    const splitArr = phase.split;
    const splitIndex = (localDay - 1) % splitArr.length;
    const workoutName = splitArr[splitIndex];

    const routine = phase.routine[workoutName] || [];
    const workoutExercises = routine.map(item => {
      const details = this.exercises[item.key];
      return {
        name: details.name,
        sets: item.sets,
        reps: item.reps,
        rest: item.rest,
        setup: details.setup,
        rationale: details.rationale,
        execution: details.execution
      };
    });

    // Cardiovascular progression (LISS Steps)
    let stepGoal = 10000;
    if (phaseId === 2) stepGoal = 12000;
    if (phaseId === 3) stepGoal = 12000;
    if (phaseId === 4) stepGoal = 14000;
    if (phaseId === 5) stepGoal = 10000;

    return {
      phaseName: phase.name,
      phaseDescription: phase.description,
      workoutName: workoutName,
      exercises: workoutExercises,
      steps: stepGoal,
      posture: this.posture
    };
  }
};
