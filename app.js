const defaultState = {
  focus: "Build routine",
  runs: 3,
  yoga: 2,
  schedule: createDefaultSchedule(),
  sleep: 8,
  stress: 4,
  energy: 7,
  streak: 6,
  completedMain: false,
  habits: {
    "Morning mobility": false,
    "Hydration check": true,
    "Evening reflection": false,
    "Screen wind-down": false,
  },
  consistency: [62, 70, 66, 78, 82, 74, 86],
};

const workouts = [
  { title: "Zone 2 Foundation Run", type: "run", module: "Running", detail: "Conversational pace, light strides, aerobic base." },
  { title: "Tempo Builder", type: "run", module: "Running", detail: "Warm-up, controlled threshold block, easy cool-down." },
  { title: "Post-Run Recovery Flow", type: "yoga", module: "Yoga", detail: "Hips, calves, hamstrings, and breath-led downshift." },
  { title: "Morning Mobility", type: "yoga", module: "Mobility", detail: "Joint circles, dynamic hips, thoracic rotation." },
  { title: "Core Stability Pilates", type: "pilates", module: "Pilates", detail: "Deep core, glutes, posture, controlled breathing." },
  { title: "Runner Strength Basics", type: "strength", module: "Strength", detail: "Squat, hinge, calf strength, single-leg balance." },
  { title: "Restorative Yoga", type: "yoga", module: "Yoga", detail: "Low intensity practice for high-stress days." },
  { title: "Hill Confidence Session", type: "run", module: "Running", detail: "Short uphill reps with full recovery and form focus." },
  { title: "Brisk Walking Reset", type: "walking", module: "Walking", detail: "Low-impact aerobic volume with posture cues." },
  { title: "Incline Walking Climb", type: "walking", module: "Incline walking", detail: "Treadmill incline intervals for glutes and aerobic strength." },
  { title: "Stair Stepper Power", type: "cardio", module: "Stair stepper", detail: "Short controlled blocks with calf and hip stability focus." },
];

const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sessionCountOptions = [1, 2, 3];
const timeOfDayOptions = ["Morning", "During the day", "Evening"];
const durationOptions = ["15 min", "20 min", "25 min", "30 min", "40 min", "55 min", "75 min"];
const trainingTypes = [
  "Run",
  "Yoga",
  "Pilates",
  "Walking",
  "Incline walking",
  "Stair stepper",
  "Strength",
  "Mobility",
  "Recovery",
];

let state = loadState();

function createDefaultSchedule() {
  return {
    Mon: {
      count: 2,
      sessions: [
        { timeOfDay: "Morning", duration: "40 min", type: "Run" },
        { timeOfDay: "Evening", duration: "20 min", type: "Mobility" },
      ],
    },
    Tue: { count: 1, sessions: [{ timeOfDay: "Evening", duration: "25 min", type: "Yoga" }] },
    Wed: {
      count: 2,
      sessions: [
        { timeOfDay: "Morning", duration: "40 min", type: "Run" },
        { timeOfDay: "During the day", duration: "25 min", type: "Pilates" },
      ],
    },
    Thu: { count: 1, sessions: [{ timeOfDay: "Evening", duration: "30 min", type: "Yoga" }] },
    Fri: { count: 1, sessions: [{ timeOfDay: "Morning", duration: "35 min", type: "Strength" }] },
    Sat: {
      count: 2,
      sessions: [
        { timeOfDay: "Morning", duration: "55 min", type: "Run" },
        { timeOfDay: "Evening", duration: "20 min", type: "Recovery" },
      ],
    },
    Sun: { count: 1, sessions: [{ timeOfDay: "Morning", duration: "20 min", type: "Walking" }] },
  };
}

function loadState() {
  const saved = localStorage.getItem("bekasTrainingState") || localStorage.getItem("vitaCoachState");
  if (!saved) return { ...defaultState };
  const parsed = JSON.parse(saved);
  return {
    ...defaultState,
    ...parsed,
    habits: { ...defaultState.habits, ...(parsed.habits || {}) },
    schedule: normalizeSchedule(parsed.schedule, parsed),
  };
}

function saveState() {
  localStorage.setItem("bekasTrainingState", JSON.stringify(state));
}

function readiness() {
  const score = Math.round(state.sleep * 7 + state.energy * 6 - state.stress * 4 + 20);
  return Math.max(22, Math.min(98, score));
}

function recovery() {
  const score = Math.round(state.sleep * 7 + (11 - state.stress) * 4 + state.energy * 2);
  return Math.max(25, Math.min(96, score));
}

function normalizeSchedule(savedSchedule, legacyState = {}) {
  const defaults = createDefaultSchedule();
  if (!savedSchedule) {
    const legacyCount = Number(legacyState.sessions || 1);
    const legacyType = legacyState.crossTraining || "Pilates";
    return Object.fromEntries(
      dayKeys.map((day) => {
        const daySchedule = {
          ...defaults[day],
          sessions: defaults[day].sessions.map((session) => ({ ...session })),
        };
        daySchedule.count = Math.max(1, Math.min(3, legacyCount));
        while (daySchedule.sessions.length < daySchedule.count) {
          daySchedule.sessions.push({
            timeOfDay: daySchedule.sessions.length === 1 ? "During the day" : "Evening",
            duration: legacyState.duration || "25 min",
            type: daySchedule.sessions.length === 1 ? legacyType : "Recovery",
          });
        }
        return [day, trimDaySchedule(daySchedule)];
      }),
    );
  }

  return Object.fromEntries(
    dayKeys.map((day) => {
      const incoming = savedSchedule[day] || {};
      const merged = {
        ...defaults[day],
        ...incoming,
        sessions: [...(incoming.sessions || defaults[day].sessions)],
      };
      return [day, trimDaySchedule(merged)];
    }),
  );
}

function trimDaySchedule(daySchedule) {
  const count = Math.max(1, Math.min(3, Number(daySchedule.count || 1)));
  const sessions = [...daySchedule.sessions];
  while (sessions.length < count) {
    sessions.push({
      timeOfDay: timeOfDayOptions[Math.min(sessions.length, timeOfDayOptions.length - 1)],
      duration: sessions.length === 0 ? "40 min" : "25 min",
      type: sessions.length === 0 ? "Run" : "Recovery",
    });
  }
  return {
    count,
    sessions: sessions.slice(0, count).map((session, index) => ({
      timeOfDay: timeOfDayOptions.includes(session.timeOfDay) ? session.timeOfDay : timeOfDayOptions[index] || "Morning",
      duration: durationOptions.includes(session.duration) ? session.duration : "25 min",
      type: trainingTypes.includes(session.type) ? session.type : "Recovery",
    })),
  };
}

function minutesFromDuration(duration) {
  return Number(duration.replace(" min", ""));
}

function totalSessions() {
  return dayKeys.reduce((sum, day) => sum + state.schedule[day].count, 0);
}

function totalMinutes() {
  return dayKeys.reduce(
    (sum, day) => sum + state.schedule[day].sessions.reduce((daySum, session) => daySum + minutesFromDuration(session.duration), 0),
    0,
  );
}

function optionMarkup(options, selected) {
  return options.map((option) => `<option value="${option}" ${option === selected ? "selected" : ""}>${option}</option>`).join("");
}

function titleForSession(day, session, index) {
  const lowerFocus = state.focus.toLowerCase();
  if (session.type === "Run") {
    if (day === "Sat") return "Long Easy Run";
    if (lowerFocus.includes("speed") || lowerFocus.includes("race")) return index === 0 ? "Tempo Builder" : "Easy Run";
    return index === 0 ? "Zone 2 Foundation Run" : "Recovery Run";
  }
  const titles = {
    Yoga: recovery() < 74 ? "Restorative Yoga" : "Yoga for Runners",
    Pilates: "Core Stability Pilates",
    Walking: "Brisk Walking Reset",
    "Incline walking": "Incline Walking Climb",
    "Stair stepper": "Stair Stepper Power",
    Strength: "Runner Strength Basics",
    Mobility: "Mobility Reset",
    Recovery: recovery() < 74 ? "Breathwork + Recovery" : "Mobility + Sleep Wind-Down",
  };
  return titles[session.type] || session.type;
}

function timeLabel(timeOfDay) {
  if (timeOfDay === "Morning") return "AM";
  if (timeOfDay === "Evening") return "Evening";
  return "Midday";
}

function planTemplates() {
  const tags = {
    Mon: "Adaptive",
    Tue: "Recovery",
    Wed: "Base",
    Thu: "Balance",
    Fri: "Strength",
    Sat: "Endurance",
    Sun: "Lifestyle",
  };

  return dayKeys.map((day) => ({
    day,
    tag: tags[day],
    count: state.schedule[day].count,
    sessions: state.schedule[day].sessions.map((session, index) => ({
      ...session,
      title: titleForSession(day, session, index),
      time: timeLabel(session.timeOfDay),
    })),
  }));
}

function renderMetrics() {
  const readinessScore = readiness();
  const recoveryScore = recovery();
  document.querySelector("#readinessScore").textContent = readinessScore;
  document.querySelector("#recoveryScore").textContent = recoveryScore;
  document.querySelector("#streakCount").textContent = state.streak;
  document.querySelector("#weeklyLoad").textContent = `${totalSessions()}x`;
  document.querySelector("#densityLabel").textContent = `${(totalMinutes() / 60).toFixed(1)}h planned`;
  document.querySelector("#readinessLabel").textContent =
    readinessScore > 82 ? "Ready for quality work" : readinessScore > 65 ? "Ready for moderate load" : "Keep it gentle today";
  document.querySelector("#recoveryLabel").textContent =
    recoveryScore > 78 ? "Recovery supports progress" : "Prioritize sleep and mobility";
  document.querySelector("#coachNudge").textContent =
    readinessScore > 78
      ? `Your check-in supports ${totalSessions()} planned sessions across the week.`
      : "The plan has been softened so consistency stays intact without forcing intensity.";
  document.querySelector("#profileGoal").textContent = state.focus;
  document.querySelector("#profileType").textContent =
    totalSessions() > 10 ? "Hybrid multi-session athlete" : "Hybrid beginner";
}

function renderPlan() {
  document.querySelector("#weekPlan").innerHTML = planTemplates()
    .map(
      ({ day, sessions, tag }) => `
        <article class="day-card">
          <div class="day">${day}</div>
          <div class="session-stack">
            <div class="day-controls">
              <label>
                Sessions
                <select data-day="${day}" data-field="count">
                  ${optionMarkup(sessionCountOptions.map(String), String(state.schedule[day].count))}
                </select>
              </label>
            </div>
            ${sessions
              .map(
                (session, index) => `
                  <div class="session-row">
                    <span class="session-time">${session.time}</span>
                    <div>
                      <h3>${session.title}</h3>
                      <p>${session.duration} · ${session.type} · ${state.focus}</p>
                      <div class="session-controls">
                        <label>
                          Time
                          <select data-day="${day}" data-session="${index}" data-field="timeOfDay">
                            ${optionMarkup(timeOfDayOptions, session.timeOfDay)}
                          </select>
                        </label>
                        <label>
                          Duration
                          <select data-day="${day}" data-session="${index}" data-field="duration">
                            ${optionMarkup(durationOptions, session.duration)}
                          </select>
                        </label>
                        <label>
                          Training
                          <select data-day="${day}" data-session="${index}" data-field="type">
                            ${optionMarkup(trainingTypes, session.type)}
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
          <span class="pill">${tag}</span>
        </article>
      `,
    )
    .join("");
}

function renderHabits() {
  document.querySelector("#habitList").innerHTML = Object.entries(state.habits)
    .map(
      ([habit, done]) => `
        <label class="habit-item">
          <span>${habit}</span>
          <input type="checkbox" data-habit="${habit}" ${done ? "checked" : ""} />
        </label>
      `,
    )
    .join("");
}

function renderLibrary(filter = "all") {
  const filtered = filter === "all" ? workouts : workouts.filter((workout) => workout.type === filter);
  document.querySelector("#workoutLibrary").innerHTML = filtered
    .map(
      (workout) => `
        <article class="workout-card">
          <span class="module">${workout.module}</span>
          <div>
            <h3>${workout.title}</h3>
            <p>${workout.detail}</p>
          </div>
          <span class="pill">${workout.type}</span>
        </article>
      `,
    )
    .join("");
}

function renderChart() {
  const max = Math.max(...state.consistency);
  document.querySelector("#chart").innerHTML = state.consistency
    .map((value) => `<div class="bar" style="height:${Math.max(34, (value / max) * 100)}%">${value}</div>`)
    .join("");
}

function addCoachMessage(text, type = "coach") {
  const messages = document.querySelector("#coachMessages");
  messages.insertAdjacentHTML(
    "beforeend",
    `<article class="message ${type}"><p>${text}</p></article>`,
  );
  messages.scrollTop = messages.scrollHeight;
}

function coachReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes("2") || lower.includes("3") || lower.includes("double") || lower.includes("twice")) {
    return "For multi-session days, I would keep one key workout, one support session, and one optional lifestyle recovery block. The extra work should serve the main plan, not compete with it.";
  }
  if (lower.includes("tired") || lower.includes("sore") || lower.includes("stress")) {
    return "I would trade intensity for recovery today: keep movement easy, add a 20-minute restorative flow, and protect tomorrow's consistency.";
  }
  if (lower.includes("race") || lower.includes("speed")) {
    return "Good signal. I would keep one quality run this week, then surround it with easy aerobic work and mobility so the faster session actually lands.";
  }
  if (lower.includes("yoga") || lower.includes("mobility")) {
    return "Let’s pair yoga with your harder run days: short dynamic mobility before, longer hip and calf recovery afterward.";
  }
  if (lower.includes("pilates") || lower.includes("walk") || lower.includes("stepper") || lower.includes("strength")) {
    return "That fits the hybrid model: use running as the primary progression, then place Pilates, walking, stair stepper, and strength around it based on recovery and the goal of the phase.";
  }
  return "I’ll keep the plan balanced: one meaningful challenge, two confidence-building sessions, and enough recovery to make the habit repeatable.";
}

function bindEvents() {
  ["focusInput", "runsInput", "yogaInput"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("change", (event) => {
      const key = id.replace("Input", "");
      state[key] = event.target.value;
      if (key === "runs" || key === "yoga") state[key] = Number(state[key]);
      saveState();
      render();
    });
  });

  document.querySelector("#weekPlan").addEventListener("change", (event) => {
    const { day, session, field } = event.target.dataset;
    if (!day || !field) return;
    if (field === "count") {
      state.schedule[day].count = Number(event.target.value);
      state.schedule[day] = trimDaySchedule(state.schedule[day]);
    } else {
      state.schedule[day].sessions[Number(session)][field] = event.target.value;
    }
    saveState();
    render();
  });

  ["sleepInput", "stressInput", "energyInput"].forEach((id) => {
    document.querySelector(`#${id}`).addEventListener("input", (event) => {
      state[id.replace("Input", "")] = Number(event.target.value);
      saveState();
      renderMetrics();
    });
  });

  document.querySelector("#saveCheckin").addEventListener("click", () => {
    state.consistency = [...state.consistency.slice(1), readiness()];
    saveState();
    render();
    addCoachMessage("Check-in saved. I updated readiness and nudged the week toward your current recovery state.");
  });

  document.querySelector("#generatePlan").addEventListener("click", () => {
    renderPlan();
    addCoachMessage(`Plan refreshed with ${totalSessions()} weekly sessions and ${Math.round(totalMinutes())} planned minutes.`);
  });

  document.querySelector("#rebalancePlan").addEventListener("click", () => {
    state.stress = Math.min(10, state.stress + 1);
    saveState();
    render();
    addCoachMessage("I softened the training load and moved recovery earlier in the week.");
  });

  document.querySelector("#completeMain").addEventListener("click", () => {
    state.completedMain = true;
    state.streak += 1;
    saveState();
    render();
    addCoachMessage("Session complete. That counts: consistency over perfection.");
  });

  document.querySelector("#habitList").addEventListener("change", (event) => {
    const habit = event.target.dataset.habit;
    if (!habit) return;
    state.habits[habit] = event.target.checked;
    saveState();
    renderMetrics();
  });

  document.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderLibrary(button.dataset.filter);
    });
  });

  document.querySelector("#coachForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#coachInput");
    if (!input.value.trim()) return;
    addCoachMessage(input.value, "user");
    addCoachMessage(coachReply(input.value));
    input.value = "";
  });
}

function hydrateInputs() {
  document.querySelector("#focusInput").value = state.focus;
  document.querySelector("#runsInput").value = state.runs;
  document.querySelector("#yogaInput").value = state.yoga;
  document.querySelector("#sleepInput").value = state.sleep;
  document.querySelector("#stressInput").value = state.stress;
  document.querySelector("#energyInput").value = state.energy;
}

function render() {
  hydrateInputs();
  renderMetrics();
  renderPlan();
  renderHabits();
  renderLibrary(document.querySelector(".segmented button.active")?.dataset.filter || "all");
  renderChart();
}

bindEvents();
render();
addCoachMessage("Bekas training app is balancing your running, Pilates, yoga, strength, walking, recovery, and lifestyle habits today.");
