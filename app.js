// --- TRANSFORMOS UNIFIED MASTER ENGINE ---
// Anchored precisely to user target start timeline: May 29, 2026

const AppConfig = {
  startDate: new Date('2026-05-29T00:00:00'),
  totalDays: 173
};

let AppState = {
  activeDate: new Date('2026-05-29T00:00:00'),
  completedTasks: {} // Key: YYYY-MM-DD string, Value: Object map of checked values
};

// Initialize system dates relative to runtime clock
function initAppTime() {
  const now = new Date();
  const currentDateStr = now.toISOString().split('T')[0];
  const targetStartStr = AppConfig.startDate.toISOString().split('T')[0];
  
  if (currentDateStr === targetStartStr || now >= AppConfig.startDate) {
    AppState.activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else {
    AppState.activeDate = new Date(AppConfig.startDate);
  }
  
  // Load data cache
  const savedTasks = localStorage.getItem('t_os_v2_tasks');
  if (savedTasks) AppState.completedTasks = JSON.parse(savedTasks);
}

function saveState() {
  localStorage.setItem('t_os_v2_tasks', JSON.stringify(AppState.completedTasks));
}

function getDayNumber(targetDate) {
  const diffTime = targetDate - AppConfig.startDate;
  if (diffTime < 0) return 1;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// --- MASSIVE GYM COMPENDIO DATABASE ---
const GymDatabase = {
  categories: {
    chest: [
      { key: "incline_db_press", name: "30° Incline Dumbbell Bench Press", desc: "Clavicular head isolation, 3s eccentric lowering control." },
      { key: "low_to_high_cable_fly", name: "Low-to-High Cable Fly", desc: "Shortened pectoral fiber focus. Eye level contraction meet." },
      { key: "flat_barbell_press", name: "Flat Barbell Bench Press", desc: "Mid-pectoral general mechanical tension vector loading." },
      { key: "weighted_dips", name: "Chest-Focused Weighted Dips", desc: "Lower pectoral sweep development. Torso leaned forward angle." }
    ],
    lats: [
      { key: "single_arm_lat_pulldown", name: "Half-Kneeling Single-Arm Lat Pulldown", desc: "Iliac lower lat alignment. Elbow driven directly into hip bone path." },
      { key: "chest_supported_neutral_row", name: "Chest-Supported Neutral Dumbbell Row", desc: "Thoracic lat width and mid-back rhomboid density engine." },
      { key: "weighted_pullups", name: "Dead-Hang Weighted Pullups", desc: "Vertical pulling baseline mechanics. Pronated wide-grip leverage." },
      { key: "barbell_bent_row", name: "Underhand Scapular Barbell Row", desc: "Erector stability combined with complete lat profile loading." }
    ],
    shoulders: [
      { key: "behind_back_cable_lateral", name: "Behind-the-Back Cable Lateral Raise", desc: "Continuous stretch tension curve on lateral delts via low pulley notch." },
      { key: "chest_supported_db_rear_row", name: "Chest-Supported Dumbbell Rear Delt Row", desc: "Isolates posterior deltoids cleanly without using lower back sway." },
      { key: "cable_rear_delt_fly", name: "Cable Rear Delt Fly", desc: "Constant mechanical alignment for cross-body rear delt fibers." },
      { key: "db_overhead_press", name: "Seated Dumbbell Shoulder Press", desc: "Anterior deltoid vertical compound pushing baseline framework." }
    ],
    legs: [
      { key: "leg_press", name: "Linear Angle Leg Press", desc: "Safe quad/glute load expansion matching deep knee joint flexion." },
      { key: "romanian_deadlift", name: "Barbell Romanian Deadlift (RDL)", desc: "Hinge vector isolating hamstrings and glutes in stretched states." },
      { key: "db_bulgarian_split_squat", name: "Dumbbell Bulgarian Split Squat", desc: "Unilateral leg priority loading to eradicate symmetry discrepancies." },
      { key: "seated_leg_curl", name: "Seated Hamstring Isolation Curl", desc: "Maximizes shortened range contractions without lower back loading." }
    ],
    core: [
      { key: "decline_cable_crunch", name: "Kneeling Cable Rope Crunch", desc: "Spinal rectus abdominis flexion tracking with scaling heavy progressive weight overload." },
      { key: "hanging_leg_raise", name: "Hanging Strict Vertical Leg Raise", desc: "Lower rectus abdominis tension control vector avoiding hip flexing swing." }
    ]
  },
  
  // Deterministic daily routines based on active phase
  getRoutineForDay: function(dayNum) {
    if (dayNum <= 30) { // Phase 1: Upper / Lower Split
      const cycle = (dayNum - 1) % 7;
      if (cycle === 0) return { name: "Upper A", keys: ["incline_db_press", "single_arm_lat_pulldown", "behind_back_cable_lateral", "chest_supported_db_rear_row", "decline_cable_crunch"] };
      if (cycle === 1) return { name: "Lower A", keys: ["leg_press", "romanian_deadlift", "db_bulgarian_split_squat"] };
      if (cycle === 2) return { name: "Rest & Active Posture Recovery", keys: [] };
      if (cycle === 3) return { name: "Upper B", keys: ["low_to_high_cable_fly", "chest_supported_neutral_row", "behind_back_cable_lateral", "cable_rear_delt_fly", "hanging_leg_raise"] };
      if (cycle === 4) return { name: "Lower B", keys: ["romanian_deadlift", "leg_press", "db_bulgarian_split_squat"] };
      return { name: "Rest & Active Recovery", keys: [] };
    } else { // Phase 2+: Push / Pull / Legs
      const cycle = (dayNum - 1) % 4;
      if (cycle === 0) return { name: "Push Day Protocol", keys: ["incline_db_press", "low_to_high_cable_fly", "behind_back_cable_lateral", "decline_cable_crunch"] };
      if (cycle === 1) return { name: "Pull Day Protocol", keys: ["single_arm_lat_pulldown", "chest_supported_neutral_row", "chest_supported_db_rear_row", "cable_rear_delt_fly"] };
      if (cycle === 2) return { name: "Legs Deep Loading", keys: ["romanian_deadlift", "leg_press", "db_bulgarian_split_squat", "hanging_leg_raise"] };
      return { name: "Systemic Recovery Rest", keys: [] };
    }
  }
};

// --- DIRECT LINEAR NEET SYLLABUS LOG ENGINE ---
const NeetDatabase = {
  chapters: [
    "Units & Measurements", "Motion in a Straight Line", "Motion in a Plane", "Laws of Motion", 
    "Work, Energy & Power", "System of Particles & Rotational Motion", "Gravitation", "Mechanical Properties of Solids",
    "Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements & Periodicity", "Chemical Bonding",
    "The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
    "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves", "Solutions", "Electrochemistry", "Chemical Kinetics",
    "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Structural Organisation in Animals", "Cell: Unit of Life",
    "Biomolecules", "Cell Cycle & Cell Division", "Transport in Plants", "Mineral Nutrition", "Photosynthesis in Higher Plants"
  ],
  
  getTaskForDay: function(dayNum) {
    const total = this.chapters.length;
    // Primary Chapter Allocation (Pass 1)
    const primaryIndex = (dayNum - 1) % total;
    const primaryChapter = this.chapters[primaryIndex];
    
    // Revision Target Calculation (3 days behind for active recall loop)
    let revChapter = "No Revision Assigned yet (Initial Consolidation Running)";
    if (dayNum > 3) {
      const revIndex = (dayNum - 4) % total;
      revChapter = this.chapters[revIndex];
    }
    
    return {
      study: primaryChapter,
      revise: revChapter
    };
  }
};

// --- UNIVERSAL DIET CALCULATOR ENGINE ---
function calculateUniversalDiet() {
  const targetCalories = parseFloat(document.getElementById('user-cal-input').value) || 1900;
  const targetProtein = parseFloat(document.getElementById('user-pro-input').value) || 160;
  
  // Calibration scaling equations relative to the 700ml tracking vessel
  const chickenWeight = (targetProtein * 0.6).toFixed(0);
  const chickenBowls = (chickenWeight / 250).toFixed(1);
  
  const soyWeight = (targetProtein * 0.25).toFixed(0);
  const soyBowls = (soyWeight / 75).toFixed(1);
  
  const eggCount = Math.round(targetProtein * 0.04);
  const riceWeight = (targetCalories * 0.12).toFixed(0);
  const riceBowls = (riceWeight / 150).toFixed(1);
  
  const outputContainer = document.getElementById('diet-output-matrix');
  outputContainer.innerHTML = `
    <div class="output-row-dish">
      <span class="output-dish-title">🍗 Chicken Breast Allotment (Non-Veg Track)</span>
      <span class="output-dish-value">${chickenWeight}g (~${chickenBowls} Full Bowl Units)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🌱 Boiled Soy Chunks + Dal Stack (Veg Track)</span>
      <span class="output-dish-value">${soyWeight}g (~${soyBowls} Full Bowl Units)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🥚 Whole Eggs + White Slices Bolus</span>
      <span class="output-dish-value">${eggCount} Eggs Total (~1.0 Bowl Filled)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🍚 Carbo-Fuel Jasmine/White Rice Allocation</span>
      <span class="output-dish-value">${riceWeight}g (~${riceBowls} Bowls Packaged Densely)</span>
    </div>
  `;
}

// --- DYNAMIC TIMELINE GENERATION ENGINE ---
function buildDailyTimeline(dayNum, routine, neetTask) {
  const container = document.getElementById('timeline-schedule-container');
  
  const blocks = [
    { time: "06:00 AM", title: "Wake Up & Posture Correction Stretches", desc: "Execute 3 sets of Wall Angels + APT alignment protocols instantly." },
    { time: "08:00 AM", title: "Meal 1: High Protein Breakfast Bolus", desc: "Consume exactly 1 Full Tracking Bowl metric baseline requirement." },
    { time: "10:00 AM", title: "NEET Deep Study: Pass 1 Focus Chapter", desc: `Active processing target: **${neetTask.study}**. Highlight exceptions cleanly.` },
    { time: "01:00 PM", title: "Meal 2: Satiety Lunch Shield", desc: "Consume 1 Full Tracking Bowl allocation. Manage deficit hunger spikes." },
    { time: "02:00 PM", title: "Strategic Cognitive Refresh Power Nap", desc: "Exactly 20-30 minutes horizontal rest. Drops neuro-fatigue baselines." },
    { time: "03:30 PM", title: "Pre-Workout Stimulation Fuel", desc: "Black coffee + 1 pinch of sodium inside 0.5 fluid bowl tracking metric." },
    { time: "04:00 PM", title: "Gym Session Execution Window", desc: routine.keys.length > 0 ? `Target Lift: **${routine.name}**. Execute specific highlighted items inside tab.` : "Active Rest. Complete 12,000 steps cardio movement safely." },
    { time: "06:30 PM", title: "Meal 3: Glycogen Shuttling Post-Workout Dinner", desc: "Consume 1 Heaping Full Tracking Bowl directly following weight lifting." },
    { time: "07:30 PM", title: "NEET Active Recall Spaced Revision Target", desc: `Force cognitive retrieval drill on: **${neetTask.revise}** without viewing notes first.` },
    { time: "10:00 PM", title: "Meal 4: Nocturnal Repair Bolus & Deep Sleep Protocol", desc: "0.5 Bowl casein tracking layer. Screens off to secure muscle recovery cycle." }
  ];
  
  container.innerHTML = blocks.map(b => `
    <div class="time-block">
      <div class="time-badge">${b.time}</div>
      <div class="schedule-details">
        <div class="schedule-title">${b.title}</div>
        <div class="schedule-desc">${b.desc}</div>
      </div>
    </div>
  `).join('');
}

// --- CHEKLIST CRITICAL ENGINE ---
function renderTasksChecklist(dateKey, routine, neetTask) {
  const container = document.getElementById('daily-summary-tasks');
  if (!AppState.completedTasks[dateKey]) {
    AppState.completedTasks[dateKey] = {};
  }
  
  const tasks = [
    { id: "t_neet_study", label: `Study New Chapter: <strong>${neetTask.study}</strong> (NTA Standard Notes)` },
    { id: "t_neet_rev", label: `Active Recall Revision: <strong>${neetTask.revise}</strong> (30 MCQ Test)` },
    { id: "t_gym", label: routine.keys.length > 0 ? `Execute Weight Lift Routine: <strong>${routine.name}</strong>` : `Complete Active Recovery: <strong>12,000 Steps Walking</strong>` },
    { id: "t_protein", label: "Clear 195g Base Protein Bolus Target Across Single Bowls" }
  ];
  
  container.innerHTML = tasks.map(t => {
    const isChecked = AppState.completedTasks[dateKey][t.id] ? "checked" : "";
    return `
      <div class="task-item-row">
        <input type="checkbox" id="${t.id}" ${isChecked} onchange="toggleTaskSync('${dateKey}', '${t.id}')">
        <span class="task-label-text">${t.label}</span>
      </div>
    `;
  }).join('');
}

function toggleTaskSync(dateKey, taskId) {
  const checkbox = document.getElementById(taskId);
  AppState.completedTasks[dateKey][taskId] = checkbox.checked;
  saveState();
}

// --- GYM HUB EXERCISE CATALOG DISPLAY ---
function renderGymCatalog(activeRoutine) {
  const container = document.getElementById('massive-gym-catalog');
  let html = '';
  
  for (const [category, exercises] of Object.entries(GymDatabase.categories)) {
    html += `<h4 style="color: var(--tuscan-gold); text-transform: uppercase; font-family: var(--font-serif); margin: 20px 0 10px 0; border-bottom: 1px solid var(--charcoal-border); letter-spacing:1px;">${category.toUpperCase()} SELECTION</h4>`;
    
    exercises.forEach(ex => {
      const isToday = activeRoutine.keys.includes(ex.key);
      html += `
        <div class="exercise-dish-item ${isToday ? 'active-today' : ''}">
          <div class="dish-header">
            <span class="dish-name">${ex.name}</span>
            <span class="dish-meta">${isToday ? '<span class="active-gold-marker">TODAY\'S DISH</span>' : 'À La Carte'}</span>
          </div>
          <div class="dish-desc">${ex.desc}</div>
        </div>
      `;
    });
  }
  
  container.innerHTML = html;
}

// --- GLOBAL APP CONTROLLER ORCHESTRATION ---
function changeDate(daysToMove) {
  AppState.activeDate.setDate(AppState.activeDate.getDate() + daysToMove);
  updateApplicationView();
}

function switchTab(tabId, buttonEl) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  buttonEl.classList.add('active');
}

function updateApplicationView() {
  const dayNum = getDayNumber(AppState.activeDate);
  const dateKey = AppState.activeDate.toISOString().split('T')[0];
  
  // Format Date for premium header
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('active-date-title').innerText = AppState.activeDate.toLocaleDateString('en-US', options);
  document.getElementById('day-badge-display').innerText = `GIORNO ${dayNum}`;
  
  // Pull data tracking points
  const currentRoutine = GymDatabase.getRoutineForDay(dayNum);
  const currentNeetTask = NeetDatabase.getTaskForDay(dayNum);
  
  // Run component renders
  buildDailyTimeline(dayNum, currentRoutine, currentNeetTask);
  renderTasksChecklist(dateKey, currentRoutine, currentNeetTask);
  renderGymCatalog(currentRoutine);
  calculateUniversalDiet();
}

function forceCacheClear() {
  if (confirm("Purge application cache storage to sync current development updates?")) {
    if ('caches' in window) {
      caches.keys().then(names => {
        for (let name of names) caches.delete(name);
      });
    }
    window.location.reload(true);
  }
}

// System Execution Trigger on Runtime Load
window.addEventListener('DOMContentLoaded', () => {
  initAppTime();
  updateApplicationView();
});
