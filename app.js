// --- TRANSFORMOS MASTER CORE V2.2 ---
// Calibrated to Start Timeline: May 29, 2026

const AppConfig = {
  startDate: new Date('2026-05-29T00:00:00'),
  totalDays: 173,
  wakeHour: 6,  // 06:00 AM
  sleepHour: 22 // 10:00 PM
};

let AppState = {
  activeDate: new Date('2026-05-29T00:00:00'),
  completedTasks: {} 
};

// Accountability phrases to push your focus
const GrindPrompts = [
  "Are you grinding right now? Check your schedule.",
  "Stop drifting. Log back into your active targets.",
  "Biology and Chemistry targets don't clear themselves. Focus.",
  "Did you hit your tracking bowl protein metrics this hour?",
  "Eyes on the prize. Stand up, adjust your posture, and get back to work.",
  "Consistency check. Are you executing or procrastinating?",
  "The 173-day countdown is moving. Make this hour count.",
  "Check a box off your list right now. Push the streak forward."
];

function initAppTime() {
  const now = new Date();
  const currentDateStr = now.toISOString().split('T')[0];
  const targetStartStr = AppConfig.startDate.toISOString().split('T')[0];
  
  if (currentDateStr === targetStartStr || now >= AppConfig.startDate) {
    AppState.activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else {
    AppState.activeDate = new Date(AppConfig.startDate);
  }
  
  const savedTasks = localStorage.getItem('t_os_v2_tasks');
  if (savedTasks) AppState.completedTasks = JSON.parse(savedTasks);
  
  // Initialize Hourly Background Interval Clock
  checkNotificationUIState();
  setInterval(runHourlyGrindCheckLoop, 30000); // Check system time every 30 seconds
}

function saveState() {
  localStorage.setItem('t_os_v2_tasks', JSON.stringify(AppState.completedTasks));
  calculateAndRenderStreak();
}

function getDayNumber(targetDate) {
  const diffTime = targetDate - AppConfig.startDate;
  if (diffTime < 0) return 1;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

// --- HOURLY NOTIFICATION GRIND ENGINE ---
function checkNotificationUIState() {
  const btn = document.getElementById('noti-toggle-btn');
  if (!btn) return;
  if (Notification.permission === 'granted') {
    btn.innerText = "REMINDERS ACTIVE 🛡️";
    btn.classList.add('enabled-active');
  }
}

function requestNotificationAccess() {
  if (!('Notification' in window)) {
    alert("This device layout does not support native web notifications.");
    return;
  }
  
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      checkNotificationUIState();
      // Send a test notification immediately
      sendGrindNotification("System Armed 🚀", "TransformOS will now check your grind status every hour.");
    }
  });
}

function runHourlyGrindCheckLoop() {
  if (Notification.permission !== 'granted') return;
  
  const now = new Date();
  const currentHour = now.getHours();
  
  // Strict window logic check
  if (currentHour >= AppConfig.wakeHour && currentHour < AppConfig.sleepHour) {
    const lastNotifiedHour = localStorage.getItem('t_os_last_notified_hour');
    
    // Check if we already fired a alert notification during this calendar hour block
    if (lastNotifiedHour !== currentHour.toString()) {
      localStorage.setItem('t_os_last_notified_hour', currentHour.toString());
      
      // Select a random phrase from the accountability pool
      const randomPrompt = GrindPrompts[Math.floor(Math.random() * GrindPrompts.length)];
      sendGrindNotification(`GRIND CHECK — ${currentHour}:00 ⚡`, randomPrompt);
    }
  }
}

function sendGrindNotification(title, message) {
  // Try sending via Service Worker first (best compatibility for background PWA mode)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body: message,
        icon: 'icon.svg',
        badge: 'icon.svg',
        tag: 'grind-alert-id',
        renotify: true
      });
    });
  } else {
    // Standard application fallback alert
    new Notification(title, { body: message });
  }
}

// --- CALCULATION STREAK SYSTEM ---
function calculateAndRenderStreak() {
  let runningStreak = 0;
  let checkDate = new Date(AppConfig.startDate);
  const todayStr = new Date().toISOString().split('T')[0];
  
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const dayData = AppState.completedTasks[dateStr] || {};
    
    const requiredIds = [
      "t_neet_study", "t_neet_rev", "t_gym", "t_protein",
      "sched_0600", "sched_0800", "sched_1000", "sched_1300", 
      "sched_1400", "sched_1530", "sched_1600", "sched_1830", 
      "sched_1930", "sched_2200"
    ];
    
    const isDayComplete = requiredIds.every(id => dayData[id] === true);
    
    if (isDayComplete) {
      runningStreak++;
    } else {
      if (dateStr !== todayStr) {
        runningStreak = 0; 
      }
    }
    
    if (dateStr === todayStr) break;
    checkDate.setDate(checkDate.getDate() + 1);
  }
  
  document.getElementById('streak-display').innerText = `${runningStreak} DAY STREAK 🔥`;
}

// --- EXERCISE CATALOG SYSTEM ---
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
  
  getRoutineForDay: function(dayNum) {
    if (dayNum <= 30) {
      const cycle = (dayNum - 1) % 7;
      if (cycle === 0) return { name: "Upper A", keys: ["incline_db_press", "single_arm_lat_pulldown", "behind_back_cable_lateral", "chest_supported_db_rear_row", "decline_cable_crunch"] };
      if (cycle === 1) return { name: "Lower A", keys: ["leg_press", "romanian_deadlift", "db_bulgarian_split_squat"] };
      if (cycle === 2) return { name: "Rest & Recovery", keys: [] };
      if (cycle === 3) return { name: "Upper B", keys: ["low_to_high_cable_fly", "chest_supported_neutral_row", "behind_back_cable_lateral", "cable_rear_delt_fly", "hanging_leg_raise"] };
      if (cycle === 4) return { name: "Lower B", keys: ["romanian_deadlift", "leg_press", "db_bulgarian_split_squat"] };
      return { name: "Rest & Recovery", keys: [] };
    } else {
      const cycle = (dayNum - 1) % 4;
      if (cycle === 0) return { name: "Push Day", keys: ["incline_db_press", "low_to_high_cable_fly", "behind_back_cable_lateral", "decline_cable_crunch"] };
      if (cycle === 1) return { name: "Pull Day", keys: ["single_arm_lat_pulldown", "chest_supported_neutral_row", "chest_supported_db_rear_row", "cable_rear_delt_fly"] };
      if (cycle === 2) return { name: "Legs Day", keys: ["romanian_deadlift", "leg_press", "db_bulgarian_split_squat", "hanging_leg_raise"] };
      return { name: "Rest Day", keys: [] };
    }
  }
};

// --- LINEAR NEET ENGINE ---
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
    const primaryIndex = (dayNum - 1) % total;
    const primaryChapter = this.chapters[primaryIndex];
    
    let revChapter = "Initial Track Syncing";
    if (dayNum > 3) {
      const revIndex = (dayNum - 4) % total;
      revChapter = this.chapters[revIndex];
    }
    
    return { study: primaryChapter, revise: revChapter };
  }
};

// --- UNIVERSAL DIET LAB CALCULATOR ---
function calculateUniversalDiet() {
  const targetCalories = parseFloat(document.getElementById('user-cal-input').value) || 1900;
  const targetProtein = parseFloat(document.getElementById('user-pro-input').value) || 195;
  
  const chickenWeight = (targetProtein * 0.6).toFixed(0);
  const chickenBowls = (chickenWeight / 250).toFixed(1);
  
  const soyWeight = (targetProtein * 0.25).toFixed(0);
  const soyBowls = (soyWeight / 75).toFixed(1);
  
  const eggCount = Math.round(targetProtein * 0.04);
  const riceWeight = (targetCalories * 0.12).toFixed(0);
  const riceBowls = (riceWeight / 150).toFixed(1);
  
  document.getElementById('diet-output-matrix').innerHTML = `
    <div class="output-row-dish">
      <span class="output-dish-title">🍗 Chicken Breast Weight Allotment (Non-Veg)</span>
      <span class="output-dish-value">${chickenWeight}g (~${chickenBowls} Bowls)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🌱 Soya Chunks + Lentils Mix (Veg alternative)</span>
      <span class="output-dish-value">${soyWeight}g (~${soyBowls} Bowls)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🥚 Whole Eggs + Added Egg Whites Matrix</span>
      <span class="output-dish-value">${eggCount} Eggs Total (~1.0 Bowl Filled)</span>
    </div>
    <div class="output-row-dish">
      <span class="output-dish-title">🍚 Performance Carb Rice Allocation</span>
      <span class="output-dish-value">${riceWeight}g (~${riceBowls} Bowls Packed)</span>
    </div>
  `;
}

// --- DYNAMIC TIMELINE CHECKLIST GENERATION ---
function buildDailyTimeline(dayNum, routine, neetTask, dateKey) {
  const container = document.getElementById('timeline-schedule-container');
  const dayData = AppState.completedTasks[dateKey] || {};
  
  const blocks = [
    { id: "sched_0600", time: "06:00 AM", title: "Wake Up & Posture Realignment", desc: "Execute 3 sets of Wall Angels + Anterior Pelvic Tilt correction drills." },
    { id: "sched_0800", time: "08:00 AM", title: "Meal 1: High Protein Breakfast Bolus", desc: "Fill up 1 custom 700ml Tracking Vessel baseline macro target." },
    { id: "sched_1000", time: "10:00 AM", title: "NEET Deep Core Study Window", desc: `Focus on Chapter: **${neetTask.study}**. Focus entirely on high-yield exceptions.` },
    { id: "sched_1300", time: "01:00 PM", title: "Meal 2: Deficit Hunger Buffer Satiety Lunch", desc: "Consume 1 full tracking bowl allotment to secure energy stores." },
    { id: "sched_1400", time: "02:00 PM", title: "Strategic Cognitive Refresh Power Nap", desc: "Exactly 20-30 minutes horizontal sleep. Resets neurological fatigue." },
    { id: "sched_1530", time: "03:30 PM", title: "Pre-Gym Energy Stimulation", desc: "Black coffee + 1 heavy pinch of sodium mixed inside 0.5 water tracking vessel." },
    { id: "sched_1600", time: "04:00 PM", title: "Gym Session Execution Window", desc: routine.keys.length > 0 ? `Target Workout: **${routine.name}**. Execute specific marked items inside Gym tab.` : "Active Rest. Hit a baseline minimum of 12,000 steps outdoors safely." },
    { id: "sched_1830", time: "06:30 PM", title: "Meal 3: Glycogen Re-Shuttling Post-Workout Dinner", desc: "Consume 1 full tracking bowl load immediately following workout." },
    { id: "sched_1930", time: "07:30 PM", title: "NEET Active Recall Spaced Revision Target", desc: `Force blind retrieval testing on Chapter: **${neetTask.revise}** without looking at summaries.` },
    { id: "sched_2200", time: "10:00 PM", title: "Meal 4: Anti-Catabolic Night Layer & Sleep Routine", desc: "0.5 bowl casein metric layer. Shut off all screens to finalize deep muscle repair." }
  ];
  
  container.innerHTML = blocks.map(b => {
    const isChecked = dayData[b.id] ? "checked" : "";
    const compClass = dayData[b.id] ? "completed-item" : "";
    return `
      <div class="time-block ${compClass}" id="container_${b.id}">
        <input type="checkbox" class="timeline-checkbox" id="${b.id}" ${isChecked} onchange="toggleCheckboxSync('${dateKey}', '${b.id}', true)">
        <div class="time-badge">${b.time}</div>
        <div class="schedule-details">
          <div class="schedule-title">${b.title}</div>
          <div class="schedule-desc">${b.desc}</div>
        </div>
      </div>
    `;
  }).join('');
}

// --- MAIN OBLIGATIONS CHECKLIST ---
function renderTasksChecklist(dateKey, routine, neetTask) {
  const container = document.getElementById('daily-summary-tasks');
  if (!AppState.completedTasks[dateKey]) AppState.completedTasks[dateKey] = {};
  const dayData = AppState.completedTasks[dateKey];
  
  const tasks = [
    { id: "t_neet_study", label: `Study Chapter: <strong>${neetTask.study}</strong>` },
    { id: "t_neet_rev", label: `Active Recall Test: <strong>${neetTask.revise}</strong>` },
    { id: "t_gym", label: routine.keys.length > 0 ? `Execute Weight Lift Routine: <strong>${routine.name}</strong>` : `Complete Active Recovery: <strong>12,000 Steps Walking</strong>` },
    { id: "t_protein", label: "Clear 195g Base Protein Bolus Target Across Single Bowls" }
  ];
  
  container.innerHTML = tasks.map(t => {
    const isChecked = dayData[t.id] ? "checked" : "";
    return `
      <div class="task-item-row">
        <input type="checkbox" id="${t.id}" ${isChecked} onchange="toggleCheckboxSync('${dateKey}', '${t.id}', false)">
        <span class="task-label-text">${t.label}</span>
      </div>
    `;
  }).join('');
}

function toggleCheckboxSync(dateKey, checkboxId, isTimelineItem) {
  const checkbox = document.getElementById(checkboxId);
  if (!AppState.completedTasks[dateKey]) AppState.completedTasks[dateKey] = {};
  
  AppState.completedTasks[dateKey][checkboxId] = checkbox.checked;
  
  if (isTimelineItem) {
    const wrapper = document.getElementById(`container_${checkboxId}`);
    if (checkbox.checked) wrapper.classList.add('completed-item');
    else wrapper.classList.remove('completed-item');
  }
  
  saveState();
}

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
            <span class="dish-meta">${isToday ? '<span class="active-gold-marker">TODAY\'S WORKOUT</span>' : 'Catalog Base'}</span>
          </div>
          <div class="dish-desc">${ex.desc}</div>
        </div>
      `;
    });
  }
  
  container.innerHTML = html;
}

// --- GLOBAL NAVIGATION SYSTEMS ---
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
  
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('active-date-title').innerText = AppState.activeDate.toLocaleDateString('en-US', options);
  document.getElementById('day-badge-display').innerText = `DAY ${dayNum}`;
  
  const currentRoutine = GymDatabase.getRoutineForDay(dayNum);
  const currentNeetTask = NeetDatabase.getTaskForDay(dayNum);
  
  buildDailyTimeline(dayNum, currentRoutine, currentNeetTask, dateKey);
  renderTasksChecklist(dateKey, currentRoutine, currentNeetTask);
  renderGymCatalog(currentRoutine);
  calculateUniversalDiet();
  calculateAndRenderStreak();
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

window.addEventListener('DOMContentLoaded', () => {
  initAppTime();
  updateApplicationView();
});

// --- LAZY-PROOF LIVE CLOCK INJECTOR ---
window.addEventListener('DOMContentLoaded', () => {
  // 1. Inject the styles automatically so you don't touch style.css
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    .live-clock-container {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
      letter-spacing: 2px;
      color: #a8a29e;
      margin: 10px 0;
      text-transform: uppercase;
      text-align: center;
    }
    .live-clock-time {
      color: #c5a880;
      font-weight: 700;
      margin-left: 5px;
    }
  `;
  document.head.appendChild(styleTag);

  // 2. Spawn and drop the clock right under your logo divider
  const clockDiv = document.createElement('div');
  clockDiv.className = 'live-clock-container';
  clockDiv.innerText = 'INITIALIZING TIME MATRIX...';
  
  const targetDivider = document.querySelector('.menu-divider');
  if (targetDivider) {
    targetDivider.after(clockDiv);
  }

  // 3. Keep it ticking every second
  setInterval(() => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    clockDiv.innerHTML = `${dateFormatted} — <span class="live-clock-time">${timeFormatted}</span>`;
  }, 1000);
});
