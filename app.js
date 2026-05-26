// --- CORE APP STATE & CONFIGURATION ---
const AppConfig = {
  startDate: new Date('2026-06-01T00:00:00'),
  endDate: new Date('2026-11-10T23:59:59'),
  totalDays: 163
};

let AppState = {
  activeDate: new Date('2026-06-01T00:00:00'),
  dietPreference: 'eggitarian',
  completedTasks: {}, // Key: YYYY-MM-DD, Value: Array of checked task IDs
  neetProgress: {} // Key: chapterId, Value: { studied: bool, revisions: int }
};

// Initialize App State from LocalStorage
function initStorage() {
  const savedDiet = localStorage.getItem('dietPreference');
  if (savedDiet) AppState.dietPreference = savedDiet;

  const savedTasks = localStorage.getItem('completedTasks');
  if (savedTasks) AppState.completedTasks = JSON.parse(savedTasks);

  const savedNeet = localStorage.getItem('neetProgress');
  if (savedNeet) AppState.neetProgress = JSON.parse(savedNeet);

  // Default activeDate to today if today falls within our active timeframe
  const now = new Date();
  if (now >= AppConfig.startDate && now <= AppConfig.endDate) {
    AppState.activeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else {
    AppState.activeDate = new Date(AppConfig.startDate);
  }
}

function saveState() {
  localStorage.setItem('dietPreference', AppState.dietPreference);
  localStorage.setItem('completedTasks', JSON.stringify(AppState.completedTasks));
  localStorage.setItem('neetProgress', JSON.stringify(AppState.neetProgress));
}

// --- UTILITY FUNCTIONS ---
function formatDateStr(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDayNumber(date) {
  const d1 = new Date(AppConfig.startDate);
  const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

// --- VIEW SWITCHER ---
function switchTab(viewId, btnElement) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  // Remove active from all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  // Show active view
  document.getElementById(viewId).classList.add('active');
  btnElement.classList.add('active');

  // Trigger sub-renders if needed
  if (viewId === 'gym-view') drawGymHub();
  if (viewId === 'diet-view') drawDietLab();
  if (viewId === 'neet-view') drawNEETPrep();
}

// --- DATE SLIDER CONTROLLER ---
function adjustDate(offset) {
  const newDate = new Date(AppState.activeDate);
  newDate.setDate(newDate.getDate() + offset);

  if (newDate >= AppConfig.startDate && newDate <= AppConfig.endDate) {
    AppState.activeDate = newDate;
    updateUI();
  }
}

// --- CHECKS & TASKS HANDLERS ---
function toggleTask(dateStr, taskId, checked) {
  if (!AppState.completedTasks[dateStr]) {
    AppState.completedTasks[dateStr] = [];
  }

  const index = AppState.completedTasks[dateStr].indexOf(taskId);
  if (checked && index === -1) {
    AppState.completedTasks[dateStr].push(taskId);
  } else if (!checked && index !== -1) {
    AppState.completedTasks[dateStr].splice(index, 1);
  }

  // Update NEET Chapter status if task relates to studying/revising
  if (taskId.startsWith('study-')) {
    const chapterId = taskId.replace('study-', '');
    if (!AppState.neetProgress[chapterId]) {
      AppState.neetProgress[chapterId] = { studied: false, revisions: 0 };
    }
    AppState.neetProgress[chapterId].studied = checked;
  } else if (taskId.startsWith('rev-')) {
    const parts = taskId.split('-');
    const chapterId = parts[1];
    if (!AppState.neetProgress[chapterId]) {
      AppState.neetProgress[chapterId] = { studied: false, revisions: 0 };
    }
    if (checked) {
      AppState.neetProgress[chapterId].revisions = Math.max(AppState.neetProgress[chapterId].revisions, parseInt(parts[2]));
    }
  }

  saveState();
  updateStreak();
  updateUI();
}

// --- CORE CHECKS RENDERING ENGINE ---
function drawChecklist() {
  const dayNumber = getDayNumber(AppState.activeDate);
  const dateStr = formatDateStr(AppState.activeDate);
  const completed = AppState.completedTasks[dateStr] || [];

  // Update slider displays
  document.getElementById('day-num-display').innerText = `Day ${dayNumber} of ${AppConfig.totalDays}`;
  document.getElementById('calendar-date-display').innerText = AppState.activeDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Load target datasets
  const training = TrainingSystem.getDailyTraining(dayNumber);
  const nutrition = NutritionSystem.getDailyNutrition(dayNumber);
  const study = StudySystem.getDailyStudy(dayNumber);

  // Update Phase Banner
  document.getElementById('phase-title').innerText = `Phase ${Math.min(5, Math.ceil(dayNumber / 35))}: ${training.phaseName}`;
  document.getElementById('phase-desc').innerText = training.phaseDescription;
  
  // Calculate Phase Progress Bar
  const phaseProgress = (dayNumber / AppConfig.totalDays) * 100;
  document.getElementById('phase-progress-fill').style.width = `${phaseProgress}%`;

  const checklistContainer = document.getElementById('daily-tasks-list');
  checklistContainer.innerHTML = ''; // Clear prior content

  const taskGroups = [];

  // 1. Posture & Stretching Task
  taskGroups.push({
    id: 'posture-routine',
    title: '🧘 Daily Posture Correction & Warm-up',
    desc: 'Perform wall angels, couch stretches, and chin tucks to correct neck hump and anterior pelvic tilt.',
    section: 'posture'
  });

  // 2. Training Session (if not a Rest day)
  if (training.workoutName !== 'Rest') {
    taskGroups.push({
      id: `workout-${training.workoutName.toLowerCase().replace(/\s+/g, '-')}`,
      title: `🏋️ Active Training Session: ${training.workoutName}`,
      desc: `Complete all planned sets with strict biomechanics and execution parameters. Current target split.`,
      section: 'gym'
    });
  }

  // 3. Step Target (LISS cardio)
  taskGroups.push({
    id: 'step-target',
    title: `🚶 Daily Step Target: ${training.steps.toLocaleString()} Steps`,
    desc: `Low-impact steady-state cardio to maximize fat mobilization without causing hypertrophy interference.`,
    section: 'steps'
  });

  // 4. NEET Primary Chapter (if First Pass is active)
  if (study.newChapter) {
    taskGroups.push({
      id: `study-${study.newChapter.id}`,
      title: `📚 NEET Core: Study ${study.newChapter.subject} — ${study.newChapter.name}`,
      desc: `First systematic reading. Take structured active-recall notes and mark basic concepts in NCERT.`,
      section: 'neet'
    });
  }

  // 5. NEET Spaced Revisions due today
  study.revisions.forEach(rev => {
    taskGroups.push({
      id: `rev-${rev.chapter.id}-${rev.interval}`,
      title: `🔄 Revise: ${rev.chapter.subject} — ${rev.chapter.name}`,
      desc: `${rev.type}. Use active recall flashcards and write down formulas from memory.`,
      section: 'neet'
    });
  });

  // 6. Supplement Stack timing check
  taskGroups.push({
    id: 'supplements-check',
    title: `💊 Target Supplements Schedule`,
    desc: `Creatine, caffeine pre-workout, D3 with breakfast, and active pink salt during training.`,
    section: 'diet'
  });

  // 7. Calorie & Hydration Adherence
  taskGroups.push({
    id: 'diet-adherence',
    title: `🍲 Macro Compliance: ${nutrition.calories} kcal Target`,
    desc: `Meet exact bowl dimensions for curd, soya chunks, dal, and whites/paneer. Stay above 4L water.`,
    section: 'diet'
  });

  // 8. Sleeping protocol
  taskGroups.push({
    id: 'sleep-protocol',
    title: `💤 Sleep Recovery Architecture`,
    desc: `Get 10+ hours of fully dark, restful sleep. Perform blue light blackout 60 minutes before bed.`,
    section: 'sleep'
  });

  // Build Checklist HTML
  taskGroups.forEach(task => {
    const isCompleted = completed.includes(task.id);
    const itemDiv = document.createElement('div');
    itemDiv.className = `check-item ${isCompleted ? 'completed' : ''}`;
    itemDiv.onclick = (e) => {
      // Prevent double trigger if clicking label/checkmark container directly
      if (e.target.tagName === 'INPUT') return;
      const checkbox = itemDiv.querySelector('input');
      checkbox.checked = !checkbox.checked;
      toggleTask(dateStr, task.id, checkbox.checked);
    };

    itemDiv.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" id="${task.id}" ${isCompleted ? 'checked' : ''} onchange="toggleTask('${dateStr}', '${task.id}', this.checked)">
        <span class="checkmark"></span>
      </label>
      <div class="check-text">
        <span class="title">${task.title}</span>
        <span class="desc">${task.desc}</span>
      </div>
    `;

    checklistContainer.appendChild(itemDiv);
  });
}

// --- DIRECTORIES POPULATION ---
function drawGymHub() {
  const container = document.getElementById('gym-exercises-directory');
  container.innerHTML = '';

  Object.keys(TrainingSystem.exercises).forEach(key => {
    const ex = TrainingSystem.exercises[key];
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title">${ex.name}</span>
      </div>
      <div class="ex-detail"><strong>Biomechanics Rationale:</strong> ${ex.rationale}</div>
      <div class="ex-detail"><strong>Setup:</strong> ${ex.setup}</div>
      <div class="ex-detail"><strong>Execution:</strong> ${ex.execution}</div>
    `;
    container.appendChild(div);
  });

  const postureContainer = document.getElementById('gym-posture-directory');
  postureContainer.innerHTML = '';
  TrainingSystem.posture.forEach(p => {
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title">${p.name}</span>
        <span class="ex-sets">${p.reps}</span>
      </div>
      <div class="ex-detail"><strong>Guide:</strong> ${p.guide}</div>
    `;
    postureContainer.appendChild(div);
  });
}

function setDietPreference(pref) {
  AppState.dietPreference = pref;
  document.getElementById('diet-toggle-egg').classList.toggle('active', pref === 'eggitarian');
  document.getElementById('diet-toggle-veg').classList.toggle('active', pref === 'vegetarian');
  saveState();
  drawDietLab();
  updateUI();
}

function drawDietLab() {
  const dayNumber = getDayNumber(AppState.activeDate);
  const nutrition = NutritionSystem.getDailyNutrition(dayNumber);

  document.getElementById('diet-calories-display').innerText = `${nutrition.calories} kcal`;
  document.getElementById('diet-protein-display').innerText = `${nutrition.protein}g`;
  
  const refeedAlert = document.getElementById('refeed-alert-text');
  if (nutrition.isRefeed) {
    refeedAlert.innerText = `🚨 ${nutrition.refeedNotes}`;
  } else {
    refeedAlert.innerText = "";
  }

  // Populate Bowl Scaling Metrics
  const bowlContainer = document.getElementById('diet-bowl-directory');
  bowlContainer.innerHTML = '';
  nutrition.bowlMetrics.conversions.forEach(item => {
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title" style="color: var(--secondary);">${item.food}</span>
        <span class="ex-sets">${item.portion}</span>
      </div>
      <div class="ex-detail">
        <strong>Macros:</strong> ${item.protein} P | ${item.carbs} C | ${item.fats} F | (${item.calories})
      </div>
    `;
    bowlContainer.appendChild(div);
  });

  // Populate Meals Breakdown
  const mealsContainer = document.getElementById('diet-meals-schedule');
  mealsContainer.innerHTML = '';
  const activeDiet = nutrition.diets[AppState.dietPreference];
  activeDiet.meals.forEach(meal => {
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title">${meal.name}</span>
        <span class="ex-sets" style="background: rgba(167,139,250,0.15); color: var(--secondary);">${meal.timing}</span>
      </div>
      <div class="ex-detail"><strong>Scale:</strong> ${meal.items}</div>
      <div class="ex-detail" style="font-style: italic; color: var(--text-muted); margin-top: 4px;">${meal.macros}</div>
      <div class="ex-detail" style="font-size: 12px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px; margin-top: 6px;">
        <strong>Mechanism:</strong> ${meal.rationale}
      </div>
    `;
    mealsContainer.appendChild(div);
  });

  // Populate Supplements Stack
  const supplementsContainer = document.getElementById('diet-supplements-stack');
  supplementsContainer.innerHTML = '';
  nutrition.supplements.forEach(supp => {
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title">${supp.name}</span>
        <span class="ex-sets" style="background: rgba(244,63,94,0.15); color: var(--accent);">${supp.dose}</span>
      </div>
      <div class="ex-detail"><strong>Circadian Timing:</strong> ${supp.timing}</div>
      <div class="ex-detail"><strong>Evidence base:</strong> ${supp.evidence}</div>
      <div class="ex-detail" style="font-size: 11px; color: var(--text-muted);"><strong>Broke Recommendation:</strong> ${supp.budgetBrand}</div>
    `;
    supplementsContainer.appendChild(div);
  });
}

let activeSubjectFilter = 'All';
function filterSyllabus(subject) {
  activeSubjectFilter = subject;
  document.getElementById('subject-all-btn').classList.toggle('active', subject === 'All');
  document.getElementById('subject-bio-btn').classList.toggle('active', subject === 'Biology');
  document.getElementById('subject-phy-btn').classList.toggle('active', subject === 'Physics');
  document.getElementById('subject-chem-btn').classList.toggle('active', subject === 'Chemistry');
  drawNEETPrep();
}

function drawNEETPrep() {
  const container = document.getElementById('neet-chapters-directory');
  container.innerHTML = '';

  const filtered = StudySystem.chapters.filter(ch => {
    if (activeSubjectFilter === 'All') return true;
    return ch.subject === activeSubjectFilter;
  });

  filtered.forEach(ch => {
    const prog = AppState.neetProgress[ch.id] || { studied: false, revisions: 0 };
    const div = document.createElement('div');
    div.className = 'ex-card';
    div.style.borderColor = prog.studied ? 'var(--success)' : 'var(--border-glass)';
    div.innerHTML = `
      <div class="ex-header">
        <span class="ex-title" style="color: ${prog.studied ? 'var(--success)' : 'var(--text-primary)'};">${ch.name}</span>
        <span class="ex-sets" style="background: rgba(255,255,255,0.05); color: var(--text-muted);">${ch.subject}</span>
      </div>
      <div class="ex-detail">
        Status: <strong>${prog.studied ? 'First Pass Completed ✅' : 'Pending First Pass ⏳'}</strong> | 
        Active Recall Revisions: <strong>${prog.revisions} Completed</strong>
      </div>
    `;
    container.appendChild(div);
  });

  // Update NEET global progress bars
  let studiedCount = 0;
  StudySystem.chapters.forEach(ch => {
    if (AppState.neetProgress[ch.id] && AppState.neetProgress[ch.id].studied) {
      studiedCount++;
    }
  });

  document.getElementById('neet-studied-count').innerText = studiedCount;
  document.getElementById('neet-total-chapters').innerText = StudySystem.chapters.length;

  const barFill = document.getElementById('neet-syllabus-bar-fill');
  const percentage = Math.round((studiedCount / StudySystem.chapters.length) * 100);
  barFill.style.width = `${percentage}%`;
  document.getElementById('study-percent-display').innerText = `${percentage}%`;
}

// --- GLOBAL STREAK COMPILER ---
function updateStreak() {
  let currentStreak = 0;
  const todayStr = formatDateStr(new Date());

  // Scan backwards from today to check continuous compliance
  let checkDate = new Date();
  while (true) {
    const checkDateStr = formatDateStr(checkDate);
    if (checkDate < AppConfig.startDate) break;

    const completed = AppState.completedTasks[checkDateStr] || [];
    const dayNumber = getDayNumber(checkDate);
    const training = TrainingSystem.getDailyTraining(dayNumber);
    const study = StudySystem.getDailyStudy(dayNumber);

    // Compute active tasks target for this date
    let targetCount = 6; // Base tasks (posture, steps, supplements, diet, sleep, general)
    if (training.workoutName !== 'Rest') targetCount++;
    if (study.newChapter) targetCount++;
    targetCount += study.revisions.length;

    // Check if the user successfully marked ALL tasks as done for this day
    if (completed.length >= targetCount && targetCount > 0) {
      currentStreak++;
    } else {
      // If we checked today and it's incomplete, don't break the streak immediately; only break if prior days are incomplete.
      if (checkDateStr !== todayStr) {
        break;
      }
    }
    checkDate.setDate(checkDate.getDate() - 1);
  }

  document.getElementById('streak-count').innerText = currentStreak;
}

// --- SETTINGS CONTROLLER ---
function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `TransformOS_Backup_${formatDateStr(new Date())}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function resetAppData() {
  if (confirm("🚨 WARNING: This will permanently delete all completed tasks, streak scores, and academic tracking. Are you absolutely ready to wipe?")) {
    localStorage.clear();
    AppState = {
      activeDate: new Date(AppConfig.startDate),
      dietPreference: 'eggitarian',
      completedTasks: {},
      neetProgress: {}
    };
    saveState();
    updateUI();
  }
}

// --- GLOBAL UI UPDATE ORCHESTRATOR ---
function updateUI() {
  drawChecklist();
  
  // Calculate general recomposition timeline completion percentage
  const dayNumber = getDayNumber(AppState.activeDate);
  const recompPct = Math.min(100, Math.round((dayNumber / AppConfig.totalDays) * 100));
  document.getElementById('recomp-percent-display').innerText = `${recompPct}%`;

  updateStreak();
}

// --- WINDOW INITIALIZATION LOAD ---
window.onload = () => {
  initStorage();
  updateUI();
};
