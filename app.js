const defaultState = {
  focus: "Build routine",
  runs: 3,
  yoga: 2,
  selectedDay: "Sun",
  schedule: createDefaultSchedule(),
  sleep: 8,
  stress: 4,
  energy: 7,
  hydrationTotal: 0,
  weatherLocation: "Vienna, Austria",
  currentWeather: null,
  movementSteps: 11500,
  streak: 6,
  completedMain: false,
  sessionStatus: {},
  videos: [
    { title: "Post-run Yoga Reset", category: "Yoga", source: "YouTube", url: "https://www.youtube.com/" },
    { title: "Core Pilates Foundation", category: "Pilates", source: "YouTube", url: "https://www.youtube.com/" },
  ],
  habits: {},
  consistency: [62, 70, 66, 78, 82, 74, 86],
  onboarding: {
    version: 2,
    complete: false,
    step: 0,
    selectedActivities: [],
    mainGoals: [],
    goal: "",
    distance: "",
    raceDistances: [],
    raceGoal: "",
    primaryRace: "",
    hillProfile: "",
    ability: "",
    weeklyDistance: "",
    longestRun: "",
    averagePace: "",
    currentRaceDistance: "",
    currentRaceTime: "",
    runDaysPerWeek: "",
    availableDays: [],
    preferredTimes: [],
    workoutDuration: "",
    dayWorkouts: {},
    restDays: [],
    longRunDay: "",
    startChoice: "",
    planLengthWeeks: "",
    trainingVolume: "",
    difficulty: "",
    interests: [],
    lifestyle: [],
    healthConsiderations: ["No current injury"],
    activityPreferences: [],
    equipment: [],
    wellness: [],
    athleteIdentity: "",
    coachPersonality: "",
    planAdaptability: "",
    aiAutoReschedule: "",
    devices: [],
  },
};

const workouts = [
  { title: "Easy Runs", type: "run", module: "Running", detail: "Comfortable, conversational running that builds aerobic endurance, supports recovery, and helps increase weekly mileage.", bestFor: "Building endurance; Recovery between workouts; Increasing weekly mileage; Everyday training" },
  { title: "Long Runs", type: "run", module: "Running", detail: "Slower-paced runs over an extended duration to improve cardiovascular endurance, stamina, fat-burning efficiency, and mental confidence.", bestFor: "Half marathon and marathon training; Endurance development; Improving stamina; Mental resilience" },
  { title: "Tempo Runs", type: "run", module: "Running", detail: "A steady, comfortably hard effort that improves lactate threshold so you can sustain faster running for longer.", bestFor: "Improving race pace; Building endurance at higher speeds; Increasing running efficiency" },
  { title: "Interval Runs", type: "run", module: "Running", detail: "Repeated fast efforts with recovery periods to improve VO2 max, speed, cardiovascular fitness, and running economy.", bestFor: "Speed development; VO2 max improvement; Race performance; High-intensity fitness" },
  { title: "Fartlek Runs", type: "run", module: "Running", detail: "Unstructured speed play that blends faster running with easy recovery for a fun mix of endurance and speed work.", bestFor: "Variety; Speed endurance; Beginner speed work; Trail running" },
  { title: "Recovery Runs", type: "run", module: "Running", detail: "Very easy short runs after harder sessions or races to increase blood flow and reduce stiffness without adding much fatigue.", bestFor: "Active recovery; Reducing soreness; Maintaining consistency" },
  { title: "Progression Runs", type: "run", module: "Running", detail: "Runs that start easy and gradually get faster, teaching pacing, endurance, and the ability to finish strong.", bestFor: "Pacing practice; Endurance; Race preparation; Building confidence" },
  { title: "Hill Runs", type: "run", module: "Running", detail: "Uphill workouts that build leg strength, power, running form, cardiovascular fitness, and impact-friendly intensity.", bestFor: "Strength; Power; Running economy; Injury prevention" },
  { title: "Zone 1", type: "run", module: "Running zone", detail: "Very easy effort for recovery, circulation, warm-ups, cool-downs, and movement without fatigue.", bestFor: "Warm-ups; Cool-downs; Recovery days" },
  { title: "Zone 2", type: "run", module: "Running zone", detail: "Foundational aerobic training that improves endurance, fat metabolism, and long-term aerobic fitness.", bestFor: "Easy runs; Long runs; Base training" },
  { title: "Zone 3", type: "run", module: "Running zone", detail: "Moderate aerobic effort that develops stamina and aerobic capacity between easy and hard training.", bestFor: "Steady-state runs; Marathon pace; Endurance" },
  { title: "Threshold", type: "run", module: "Running zone", detail: "Sustained fast training that raises lactate threshold so you can hold quicker paces for longer.", bestFor: "Tempo workouts; Race pace training; Endurance at speed" },
  { title: "VO2 Max", type: "run", module: "Running zone", detail: "High-intensity work that trains maximum aerobic capacity, oxygen uptake, speed, and performance.", bestFor: "Intervals; 5K-10K performance; Speed" },
  { title: "Sprint", type: "run", module: "Running zone", detail: "Short maximal efforts for acceleration, neuromuscular coordination, running mechanics, and explosive power.", bestFor: "Speed; Acceleration; Running form; Finishing kick" },
  { title: "Hatha Yoga", type: "yoga", module: "Yoga", detail: "Slower-paced practice focused on fundamental postures, breathing, alignment, strength, flexibility, and balance.", bestFor: "Beginners; Flexibility; Balance; Recovery" },
  { title: "Vinyasa Yoga", type: "yoga", module: "Yoga", detail: "Dynamic flow that links movement with breath to improve strength, flexibility, coordination, and cardiovascular fitness.", bestFor: "Full-body workout; Strength; Flexibility; Active recovery" },
  { title: "Ashtanga Yoga", type: "yoga", module: "Yoga", detail: "Structured and physically demanding fixed sequence that builds endurance, discipline, strength, and flexibility.", bestFor: "Strength; Endurance; Advanced practice" },
  { title: "Bikram Yoga", type: "yoga", module: "Yoga", detail: "Fixed sequence practiced in a heated room to improve flexibility, balance, focus, and tolerance to heat.", bestFor: "Flexibility; Heat training; Balance" },
  { title: "Yin Yoga", type: "yoga", module: "Yoga", detail: "Long passive holds that deeply stretch connective tissues, improve mobility, and calm the nervous system.", bestFor: "Recovery; Mobility; Relaxation" },
  { title: "Restorative Yoga", type: "yoga", module: "Yoga", detail: "Gentle supported poses that promote deep relaxation, stress relief, nervous system recovery, and better sleep.", bestFor: "Stress relief; Recovery; Better sleep" },
  { title: "Power Yoga", type: "yoga", module: "Yoga", detail: "Fast-paced athletic flow that combines yoga with strength, core work, endurance, and cardiovascular challenge.", bestFor: "Strength; Cardio; Core" },
  { title: "Mat Pilates", type: "pilates", module: "Pilates", detail: "Controlled bodyweight exercises that strengthen the core, improve posture, flexibility, and muscular endurance.", bestFor: "Core; Beginners; Posture" },
  { title: "Reformer Pilates", type: "pilates", module: "Pilates", detail: "Spring-resistance full-body training that improves strength, control, balance, mobility, and coordination.", bestFor: "Full-body strength; Athletes; Mobility" },
  { title: "Clinical Pilates", type: "pilates", module: "Pilates", detail: "Targeted movement-quality work tailored for safe movement, rehabilitation, and return from injury.", bestFor: "Rehabilitation; Injury recovery" },
  { title: "Athletic Pilates", type: "pilates", module: "Pilates", detail: "Performance-focused Pilates for stability, balance, control, and functional strength for sport.", bestFor: "Runners; Injury prevention" },
  { title: "Contemporary Pilates", type: "pilates", module: "Pilates", detail: "Modern movement-science approach that blends updated techniques with traditional Pilates principles.", bestFor: "Whole-body fitness; Functional movement" },
  { title: "Classical Pilates", type: "pilates", module: "Pilates", detail: "Original Pilates method using traditional sequencing, precision, control, and core-centered technique.", bestFor: "Technique; Core strength" },
  { title: "Easy Walking", type: "walking", module: "Walking", detail: "Relaxed walking that supports recovery, circulation, daily movement, and gentle consistency.", bestFor: "Recovery; Beginners" },
  { title: "Brisk Walking", type: "walking", module: "Walking", detail: "Faster-paced walking that raises heart rate and improves cardiovascular fitness while staying low impact.", bestFor: "Fat loss; Cardio; Heart health" },
  { title: "Incline Walking", type: "walking", module: "Walking", detail: "Uphill walking that increases intensity, targets glutes and legs, and builds endurance.", bestFor: "Glutes; Fat burning; Endurance" },
  { title: "Stair Stepper", type: "cardio", module: "Cardio", detail: "Climbing-based cardio that strengthens the lower body and builds endurance with a strong calorie burn.", bestFor: "Glutes; Legs; Cardio; Calorie burn" },
  { title: "Recovery Walk", type: "walking", module: "Walking", detail: "Gentle movement that encourages circulation and reduces stiffness after harder workouts or on rest days.", bestFor: "Recovery; Rest days" },
  { title: "Full Body", type: "strength", module: "Strength training", detail: "Efficient sessions that train all major muscle groups to improve overall strength and fitness.", bestFor: "Beginners; Time-efficient" },
  { title: "Upper Body", type: "strength", module: "Strength training", detail: "Exercises for arms, shoulders, chest, and back to build functional strength and improve posture.", bestFor: "Strength; Muscle building" },
  { title: "Lower Body", type: "strength", module: "Strength training", detail: "Leg-focused strength for glutes, quads, hamstrings, calves, power, and durability.", bestFor: "Runners; Power; Injury prevention" },
  { title: "Core Training", type: "strength", module: "Strength training", detail: "Stability and control work that improves posture, balance, movement efficiency, and running performance.", bestFor: "Stability; Running performance" },
  { title: "Functional Strength", type: "strength", module: "Strength training", detail: "Movement-pattern training that improves everyday function and sports performance.", bestFor: "Athletes; Everyday fitness" },
  { title: "Mobility & Strength", type: "strength", module: "Strength training", detail: "Combined flexibility and strength work for healthier joints, better movement, and resilience.", bestFor: "Recovery; Joint health" },
  { title: "Bodyweight Strength", type: "strength", module: "Strength training", detail: "Strength training with bodyweight exercises such as push-ups, squats, lunges, and planks.", bestFor: "Home workouts; Travel; Functional strength" },
];

const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = { Mon: 22, Tue: 23, Wed: 24, Thu: 25, Fri: 26, Sat: 27, Sun: 28 };
const timeOfDayOptions = ["Morning", "During the day", "Evening"];
const durationOptions = ["15 min", "20 min", "25 min", "30 min", "40 min", "55 min", "75 min"];
const trainingTypes = ["Run", "Yoga", "Pilates", "Walking", "Incline walking", "Stair stepper", "Strength", "Mobility", "Recovery"];

let state = loadState();

function createDefaultSchedule() {
  return {
    Mon: { count: 2, sessions: [{ timeOfDay: "Morning", duration: "40 min", type: "Run" }, { timeOfDay: "Evening", duration: "20 min", type: "Mobility" }] },
    Tue: { count: 1, sessions: [{ timeOfDay: "Evening", duration: "25 min", type: "Yoga" }] },
    Wed: { count: 2, sessions: [{ timeOfDay: "Morning", duration: "40 min", type: "Run" }, { timeOfDay: "During the day", duration: "25 min", type: "Pilates" }] },
    Thu: { count: 1, sessions: [{ timeOfDay: "Evening", duration: "30 min", type: "Yoga" }] },
    Fri: { count: 1, sessions: [{ timeOfDay: "Morning", duration: "35 min", type: "Strength" }] },
    Sat: { count: 2, sessions: [{ timeOfDay: "Morning", duration: "55 min", type: "Run" }, { timeOfDay: "Evening", duration: "20 min", type: "Recovery" }] },
    Sun: { count: 1, sessions: [{ timeOfDay: "Morning", duration: "75 min", type: "Run" }] },
  };
}

function loadState() {
  const saved = localStorage.getItem("bekasTrainingState") || localStorage.getItem("vitaCoachState");
  if (!saved) return { ...defaultState };
  const parsed = JSON.parse(saved);
  return {
    ...defaultState,
    ...parsed,
    selectedDay: dayKeys.includes(parsed.selectedDay) ? parsed.selectedDay : "Sun",
    habits: { ...defaultState.habits, ...(parsed.habits || {}) },
    sessionStatus: parsed.sessionStatus || {},
    videos: parsed.videos || defaultState.videos,
    onboarding: parsed.onboarding?.version === defaultState.onboarding.version ? { ...defaultState.onboarding, ...(parsed.onboarding || {}) } : { ...defaultState.onboarding },
    schedule: normalizeSchedule(parsed.schedule, parsed),
  };
}

function saveState() {
  localStorage.setItem("bekasTrainingState", JSON.stringify(state));
}

function freshOnboardingState() {
  return JSON.parse(JSON.stringify(defaultState.onboarding));
}

function normalizeSchedule(savedSchedule, legacyState = {}) {
  const defaults = createDefaultSchedule();
  if (!savedSchedule) return defaults;
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
  const count = Math.max(0, Math.min(3, Number(daySchedule.count ?? 1)));
  const sessions = [...(daySchedule.sessions || [])];
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
  return Number(String(duration).replace(" min", ""));
}

function totalSessions() {
  return dayKeys.reduce((sum, day) => sum + state.schedule[day].sessions.length, 0);
}

function completedSessions() {
  return dayKeys.reduce((sum, day) => sum + state.schedule[day].sessions.filter((_, index) => sessionState(day, index) === "completed").length, 0);
}

function weeklyRunKm() {
  return dayKeys.reduce((sum, day) => {
    return sum + state.schedule[day].sessions.reduce((daySum, session) => {
      if (session.type !== "Run") return daySum;
      return daySum + Math.max(4, Math.round(minutesFromDuration(session.duration) / 6));
    }, 0);
  }, 0);
}

function totalMinutes() {
  return dayKeys.reduce((sum, day) => sum + state.schedule[day].sessions.reduce((daySum, session) => daySum + minutesFromDuration(session.duration), 0), 0);
}

function optionMarkup(options, selected) {
  return options.map((option) => `<option value="${option}" ${option === selected ? "selected" : ""}>${option}</option>`).join("");
}

function sessionKey(day, index) {
  return `${day}-${index}`;
}

function sessionState(day, index) {
  return state.sessionStatus[sessionKey(day, index)] || "planned";
}

function readiness() {
  const score = Math.round(state.sleep * 7 + state.energy * 6 - state.stress * 4 + 20);
  return Math.max(22, Math.min(98, score));
}

function recovery() {
  const score = Math.round(state.sleep * 7 + (11 - state.stress) * 4 + state.energy * 2);
  return Math.max(25, Math.min(96, score));
}

function aiActionForSession(session) {
  const hardSession = ["Run", "Strength", "Stair stepper", "Incline walking"].includes(session.type);
  if (readiness() < 62 || (recovery() < 70 && hardSession)) return "skip";
  return "reschedule";
}

function aiSuggestionForSession(session, weather) {
  if (weather.type === "hot" && session.type === "Run") return "AI suggests moving this run to morning or shortening intensity because it is warm.";
  if (weather.type === "rain" && session.type === "Run") return "AI suggests treadmill, incline walking, or moving the run to a clearer day.";
  if (aiActionForSession(session) === "skip") return "AI suggests skipping this workout today and replacing it with light mobility.";
  return "AI suggests this session can stay planned, with flexibility to move it if the day changes.";
}

function titleForSession(day, session, index) {
  const lowerFocus = state.focus.toLowerCase();
  if (session.type === "Run") {
    if (day === "Sun" || minutesFromDuration(session.duration) >= 55) return "Long Easy Run";
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
  return "PM";
}

function planTitle() {
  const activities = state.onboarding?.selectedActivities || [];
  const goals = state.onboarding?.mainGoals || [];
  if (!activities.includes("Running")) {
    if (activities.includes("Pilates") && activities.includes("Yoga")) return "Yoga + Pilates Plan";
    if (activities.includes("Strength Training")) return "Strength + Mobility Plan";
    return "Wellness Training Plan";
  }
  const distance = state.onboarding?.distance || "Hybrid Running";
  if (goals.includes("Hybrid athlete")) return `${distance} Hybrid Plan`;
  if (state.onboarding?.goal === "General training") return "General Training Plan";
  if (state.onboarding?.goal === "Start running") return "Start Running Plan";
  if (state.onboarding?.goal === "Get back into running") return "Return to Running Plan";
  return `${distance} Plan`;
}

function planTargetDistance() {
  const distance = state.onboarding?.distance || "Half Marathon";
  const targets = { "5k": "5 km", "10k": "10 km", "10 mile": "16.1 km", "Half Marathon": "21.1 km", Marathon: "42.2 km", "50k": "50 km" };
  return targets[distance] || distance;
}

function planWeeks() {
  return Number(state.onboarding?.planLengthWeeks || 15);
}

function planWeekLabel() {
  return `Week 3/${planWeeks()}`;
}

function weeklyDistanceTarget() {
  const targets = { "5k": 25, "10k": 34, "10 mile": 42, "Half Marathon": 55, Marathon: 70, "50k": 78 };
  return targets[state.onboarding?.distance] || 55;
}

function planTemplates() {
  return dayKeys.map((day) => ({
    day,
    date: dates[day],
    sessions: state.schedule[day].sessions.map((session, index) => ({ ...session, title: titleForSession(day, session, index), time: timeLabel(session.timeOfDay), status: sessionState(day, index) })),
  }));
}

const onboardingSteps = [
  {
    key: "welcome",
    title: "Welcome to Beka's Training",
    helper: "Train smarter. Stay consistent. Build habits for life.",
    type: "welcome",
  },
  {
    key: "selectedActivities",
    title: "Which activities do you want in your plan?",
    helper: "Running stays the main focus, and you can add every discipline you want the AI to balance.",
    type: "multi",
    options: [
      ["Running", "Primary running plan"],
      ["Walking", "Outdoor walks, incline walking, stair stepper, and recovery walks"],
      ["Yoga", "Mobility, stress relief, and recovery"],
      ["Pilates", "Mat, reformer, athletic, or clinical Pilates"],
      ["Strength Training", "Gym, home, bodyweight, machines, dumbbells, and bands"],
      ["Cardio/Cross Training", "Cycling, swimming, rowing, elliptical, HIIT, or jump rope"],
    ],
  },
  {
    key: "mainGoals",
    title: "What are your main goals?",
    helper: "Choose more than one so the plan understands the full picture.",
    type: "multi",
    options: [
      ["Train for a race", "Build toward a specific race or distance"],
      ["Build consistency", "Make training repeatable and realistic"],
      ["Improve endurance", "Longer runs and aerobic development"],
      ["Improve speed", "Tempo, intervals, hills, and progression work"],
      ["Lose weight", "Balanced movement and lifestyle support"],
      ["Build strength", "Strength sessions that support performance"],
      ["Improve mobility", "Yoga, Pilates, and daily mobility"],
      ["Stress relief", "Recovery-friendly training and calming sessions"],
      ["Recovery", "Lower load and smarter adaptation"],
      ["General health", "A sustainable all-round plan"],
      ["Hybrid athlete", "Running plus strength, Pilates, yoga, and cross-training"],
    ],
  },
  {
    key: "goal",
    title: "What is your running goal?",
    helper: "Pick the running direction that suits you best.",
    type: "single",
    requiresActivity: "Running",
    options: [
      ["Race", "Booked a running race and want a structured plan."],
      ["Run a specific distance", "Choose a distance from 5k to ultramarathon."],
      ["Start running", "Build from the beginning with gentle progression."],
      ["Get back into running", "Return safely after time away."],
      ["5k improvement plan", "Sharpen speed and consistency."],
      ["General training", "Build fitness across running, strength, yoga, and Pilates."],
      ["parkrun Improvement Plan", "Improve weekly 5k confidence."],
      ["Postpartum plan", "Gentle rebuilding with recovery-first progression."],
    ],
  },
  {
    key: "distance",
    title: "Choose a distance goal",
    helper: "Choose the distance you would like to train towards.",
    type: "single",
    requiresActivity: "Running",
    options: [["5k"], ["10k"], ["10 mile"], ["Half Marathon"], ["Marathon"], ["50k"], ["Custom", "Set a custom distance later in Manage Plan."]],
  },
  {
    key: "raceDistances",
    title: "Which race distances matter to you?",
    helper: "Select every race distance you may want the plan to consider.",
    type: "multi",
    requiresGoal: "Train for a race",
    options: [["5k"], ["10k"], ["10 mile"], ["Half Marathon"], ["Marathon"], ["50k"], ["Triathlon"]],
  },
  {
    key: "raceGoal",
    title: "What should the race goal be?",
    helper: "The AI can also recommend the right target after seeing your training data.",
    type: "single",
    requiresGoal: "Train for a race",
    options: [["Finish"], ["PB", "Personal best"], ["Time", "Train toward a time goal"], ["AI recommendation", "Let the coach choose the smartest goal"]],
  },
  {
    key: "hillProfile",
    title: "How hilly will your training or race be?",
    helper: "This adjusts hills, incline walking, and lower-body strength.",
    type: "single",
    requiresActivity: "Running",
    options: [
      ["Flat", "No hill workouts as a regular plan feature."],
      ["Rolling", "Some hill workouts and incline walking."],
      ["Moderate", "More hill workouts for strength and stamina."],
      ["Hilly", "Frequent hills and focused climbing sessions."],
    ],
  },
  {
    key: "ability",
    title: "How would you rate your running ability?",
    helper: "Pick the level that matches your current running, not your goal.",
    type: "single",
    requiresActivity: "Running",
    options: [
      ["Beginner", "You can complete a 5k run without stopping in under 60 minutes."],
      ["Intermediate", "You run regularly but want more structure."],
      ["Advanced", "You run 10k or more and do some structured workouts."],
      ["Elite", "You are experienced with half marathons or further and structured training."],
    ],
  },
  {
    key: "runningProfile",
    title: "Build your running profile",
    helper: "These answers shape mileage, long runs, and workout intensity.",
    type: "profile",
    requiresActivity: "Running",
  },
  {
    key: "currentRaceTime",
    title: "What is your estimated current race time?",
    helper: "Use current fitness, not an old personal best.",
    type: "raceTime",
    requiresActivity: "Running",
    options: [["5k", "21:00"], ["10k", "42:00"], ["Half Marathon", "1:39:42"], ["Marathon", "3:32:17"]],
  },
  {
    key: "lifestyle",
    title: "What should the coach know about your lifestyle?",
    helper: "This helps the AI avoid unrealistic training weeks.",
    type: "multi",
    options: [
      ["Desk work", "Mostly seated workdays"],
      ["Active job", "Work already adds movement"],
      ["Family commitments", "Training needs flexible timing"],
      ["Travel often", "Plan needs travel-friendly sessions"],
      ["Travel sometimes", "Occasional adaptive weeks"],
      ["Low stress", "Recovery load can be normal"],
      ["Moderate stress", "Balance load and recovery"],
      ["High stress", "Protect recovery and sleep"],
      ["No current injury", "Normal progression"],
      ["Injury consideration", "Use conservative progression"],
    ],
  },
  {
    key: "runDaysPerWeek",
    title: "How many days per week would you like to run?",
    helper: "This should usually be at most once more than you currently run.",
    type: "single",
    requiresActivity: "Running",
    options: [[2, "2 Days"], [3, "3 Days"], [4, "4 Days"], [5, "5 Days"], [6, "6 Days"]],
  },
  {
    key: "availableDays",
    title: "Which days are you free to train?",
    helper: "Select every day available so the plan can choose the most realistic schedule.",
    type: "multi",
    options: dayKeys.map((day) => [day, fullDayName(day)]),
  },
  {
    key: "preferredTimes",
    title: "What times of day do you prefer?",
    helper: "The generated workouts will use these time windows.",
    type: "multi",
    options: [["Morning"], ["During the day", "Afternoon / lunch window"], ["Evening"]],
  },
  {
    key: "workoutDuration",
    title: "How much time do you usually have?",
    helper: "This sets the default duration for runs and cross-training.",
    type: "single",
    options: [["20-30 min"], ["30-45 min"], ["45-60 min"], ["60-75 min"], ["75+ min"]],
  },
  {
    key: "dayWorkouts",
    title: "How many workouts can each day hold?",
    helper: "For each day, choose how many workouts you want and how much time you have for each session.",
    type: "dayWorkouts",
  },
  {
    key: "restDays",
    title: "Which days do you prefer as rest days?",
    helper: "The AI avoids placing hard work here when possible.",
    type: "multi",
    options: dayKeys.map((day) => [day, fullDayName(day)]),
  },
  {
    key: "longRunDay",
    title: "Which day do you want to do your long runs on?",
    helper: "Choose one day for the longest run of the week.",
    type: "single",
    requiresActivity: "Running",
    options: dayKeys.map((day) => [day, fullDayName(day)]),
  },
  {
    key: "activityPreferences",
    title: "Choose your favorite training styles",
    helper: "These expand based on the activities you selected.",
    type: "multi",
    options: [
      ["Road running", "Running"], ["Trail running", "Running"], ["Track running", "Running"], ["Treadmill running", "Running"],
      ["Easy runs", "Running"], ["Tempo", "Running"], ["Intervals", "Running"], ["Long Run", "Running"], ["Fartlek", "Running"], ["Progression", "Running"], ["Hills", "Running"], ["Recovery runs", "Running"],
      ["Outdoor walking", "Walking"], ["Incline Walking", "Walking"], ["Stair Stepper", "Walking"], ["Recovery Walk", "Walking"],
      ["Gym strength", "Strength Training"], ["Home strength", "Strength Training"], ["Bodyweight", "Strength Training"], ["Machines", "Strength Training"], ["Dumbbells", "Strength Training"], ["Bands", "Strength Training"],
      ["Mat Pilates", "Pilates"], ["Reformer Pilates", "Pilates"], ["Athletic Pilates", "Pilates"], ["Clinical Pilates", "Pilates"],
      ["Hatha Yoga", "Yoga"], ["Vinyasa Yoga", "Yoga"], ["Ashtanga Yoga", "Yoga"], ["Yin Yoga", "Yoga"], ["Restorative Yoga", "Yoga"], ["Bikram Yoga", "Yoga"], ["Power Yoga", "Yoga"],
      ["Cycling", "Cardio/Cross Training"], ["Swimming", "Cardio/Cross Training"], ["Rowing", "Cardio/Cross Training"], ["Elliptical", "Cardio/Cross Training"], ["HIIT", "Cardio/Cross Training"], ["Jump Rope", "Cardio/Cross Training"],
    ],
    activityFiltered: true,
  },
  {
    key: "equipment",
    title: "What equipment can you use?",
    helper: "This helps the plan choose realistic workouts.",
    type: "multi",
    options: [["Running watch"], ["Heart-rate monitor"], ["Gym membership"], ["Home equipment"], ["Dumbbells"], ["Bands"], ["Machines"], ["Recovery tools"]],
  },
  {
    key: "preferences",
    title: "Set your training preferences",
    helper: "Adjust training volume, difficulty, and how the coach talks to you.",
    type: "preferences",
  },
  {
    key: "wellness",
    title: "Which wellness reminders should be included?",
    helper: "These become dashboard prompts and AI coach context.",
    type: "multi",
    options: [["Hydration reminders"], ["Sleep reminders"], ["Mobility reminders"], ["Mood check-ins"], ["Energy check-ins"], ["Nutrition reminders"]],
  },
  {
    key: "athleteIdentity",
    title: "Choose your athlete identity",
    helper: "This shapes the language and emphasis of your profile.",
    type: "single",
    options: [["Runner"], ["Trail Runner"], ["Hybrid Athlete"], ["Performance Athlete"], ["Wellness Athlete"], ["Balanced Athlete"], ["Movement Enthusiast"]],
  },
  {
    key: "aiCoach",
    title: "Set up your AI coach",
    helper: "Choose how much the AI can adapt your plan.",
    type: "aiCoach",
  },
  {
    key: "devices",
    title: "Connect devices and apps",
    helper: "Choose what you may want to connect later.",
    type: "multi",
    options: [["Apple Health"], ["Garmin"], ["COROS"], ["Polar"], ["Suunto"], ["Fitbit"], ["Whoop"], ["Oura"], ["Strava"], ["TrainingPeaks"]],
  },
  {
    key: "startChoice",
    title: "When do you want to start your plan?",
    helper: "You can change this later.",
    type: "single",
    options: [["Today", "Start now"], ["Tomorrow", "Start the next day"], ["Custom", "Choose a date later"]],
  },
  {
    key: "planLengthWeeks",
    title: "How long do you want your plan to be?",
    helper: "Choose the length of your training block.",
    type: "single",
    options: [[9, "9 Weeks"], [10, "10 Weeks · Recommended"], [11, "11 Weeks"], [15, "15 Weeks"], [20, "Set a custom plan length"]],
  },
  {
    key: "trainingDNA",
    title: "Generate your Training DNA",
    helper: "AI analyzes goals, lifestyle, availability, recovery, and activity preferences to create your system.",
    type: "dna",
  },
  {
    key: "summary",
    title: "Your plan is nearly ready",
    helper: "Review the choices that will create your training plan.",
    type: "summary",
  },
];

function fullDayName(day) {
  return { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }[day] || day;
}

function activeOnboardingSteps() {
  const activities = state.onboarding.selectedActivities || [];
  const goals = state.onboarding.mainGoals || [];
  return onboardingSteps.filter((step) => {
    if (step.requiresActivity && !activities.includes(step.requiresActivity)) return false;
    if (step.requiresGoal && !goals.includes(step.requiresGoal)) return false;
    return true;
  });
}

function renderOnboarding() {
  const root = document.querySelector("#onboardingStep");
  const progress = document.querySelector("#onboardingProgress");
  const continueButton = document.querySelector("#onboardingContinue");
  if (!root || !progress || !continueButton) return;
  const steps = activeOnboardingSteps();
  const stepIndex = Math.max(0, Math.min(state.onboarding.step || 0, steps.length - 1));
  state.onboarding.step = stepIndex;
  const step = steps[stepIndex];
  progress.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
  continueButton.textContent = step.type === "summary" ? "Generate my plan" : "Continue";
  root.innerHTML = `
    <span class="eyebrow">Onboarding</span>
    <h1>${step.title}</h1>
    <p>${step.helper}</p>
    ${onboardingStepContent(step)}
  `;
}

function onboardingStepContent(step) {
  if (step.type === "welcome") return `<article class="onboarding-summary-card welcome-card"><div class="plan-badge">BT</div><h2>Build a plan around your real life</h2><p>Running is the base. Yoga, Pilates, strength, walking, recovery, lifestyle, and AI adjustments all shape the final schedule.</p></article>`;
  if (step.type === "summary") return onboardingSummary();
  if (step.type === "dna") return onboardingDNA();
  if (step.type === "profile") return onboardingProfile();
  if (step.type === "aiCoach") return onboardingAiCoach();
  if (step.type === "dayWorkouts") return onboardingDayWorkouts();
  if (step.type === "raceTime") {
    return `
      <div class="onboarding-segments">
        ${step.options.map(([label, time]) => `<button type="button" data-onboarding-race="${label}" class="${state.onboarding.currentRaceDistance === label ? "active" : ""}">${label}</button>`).join("")}
      </div>
      <div class="race-time-card">
        <span>I can currently run a <b>${state.onboarding.currentRaceDistance}</b> in</span>
        <strong>${state.onboarding.currentRaceTime}</strong>
      </div>
    `;
  }
  if (step.type === "preferences") {
    return `
      <div class="onboarding-list">
        <div class="onboarding-subtitle">Training Volume</div>
        ${["Conservative", "Balanced", "Progressive"].map((item) => onboardingOption("trainingVolume", item, item, trainingVolumeText(item))).join("")}
        <div class="onboarding-subtitle">Difficulty</div>
        ${["Comfortable", "Challenging", "Aggressive"].map((item) => onboardingOption("difficulty", item, item, difficultyText(item))).join("")}
      </div>
    `;
  }
  const optionHtml = step.options.map(([value, labelOrDetail]) => {
    const label = typeof value === "number" ? labelOrDetail : value;
    const detail = typeof value === "number" ? "" : labelOrDetail;
    if (step.activityFiltered && !shouldShowActivityPreference(label, detail)) return "";
    if (step.type === "multi") return onboardingMultiOption(step.key, value, label, detail);
    return onboardingOption(step.key, value, label, detail);
  }).join("");
  return `<div class="onboarding-list">${optionHtml}</div>`;
}

function shouldShowActivityPreference(label, activity) {
  const selected = state.onboarding.selectedActivities || [];
  if (selected.includes(activity)) return true;
  if (activity === "Walking" && selected.includes("Cardio/Cross Training") && ["Stair Stepper", "Incline Walking"].includes(label)) return true;
  return false;
}

function onboardingProfile() {
  return `
    <div class="onboarding-form-grid">
      ${onboardingSelect("weeklyDistance", "Weekly distance", ["0-10 km", "10-25 km", "25-40 km", "40-60 km", "60+ km"])}
      ${onboardingSelect("longestRun", "Longest run", ["5 km", "10 km", "15 km", "21 km", "30+ km"])}
      ${onboardingSelect("averagePace", "Average pace", ["Optional", "6:30/km", "6:00/km", "5:30/km", "5:00/km", "4:30/km"])}
      ${onboardingSelect("primaryRace", "Primary A-race", ["5k", "10k", "Half Marathon", "Marathon", "50k"])}
    </div>
  `;
}

function onboardingAiCoach() {
  return `
    <div class="onboarding-list">
      <div class="onboarding-subtitle">Coach personality</div>
      ${["Supportive", "Direct", "Technical", "Motivational"].map((item) => onboardingOption("coachPersonality", item, item, coachPersonalityText(item))).join("")}
      <div class="onboarding-subtitle">Plan adaptability</div>
      ${["Conservative", "Balanced", "Highly adaptive"].map((item) => onboardingOption("planAdaptability", item, item, adaptabilityText(item))).join("")}
      <div class="onboarding-subtitle">AI rescheduling</div>
      ${["Ask first", "Auto-adjust low risk", "Manual only"].map((item) => onboardingOption("aiAutoReschedule", item, item, aiRescheduleText(item))).join("")}
    </div>
  `;
}

function onboardingDayWorkouts() {
  const durationChoices = ["15 min", "20 min", "25 min", "30 min", "40 min", "55 min", "75 min"];
  return `
    <div class="day-workout-builder">
      ${dayKeys.map((day) => {
        const config = state.onboarding.dayWorkouts?.[day] || { count: 0, durations: [] };
        const count = Number(config.count || 0);
        return `
          <article class="day-workout-row">
            <div>
              <strong>${fullDayName(day)}</strong>
              <small>${count === 0 ? "No workout planned" : `${count} workout${count > 1 ? "s" : ""}`}</small>
            </div>
            <label>
              Sessions
              <select data-day-workout-count="${day}">
                ${optionMarkup([0, 1, 2, 3], count)}
              </select>
            </label>
            <div class="day-duration-grid">
              ${Array.from({ length: count }, (_, index) => `
                <label>
                  Workout ${index + 1}
                  <select data-day-workout-duration="${day}-${index}">
                    ${optionMarkup(durationChoices, config.durations?.[index] || durationFromAvailability(index))}
                  </select>
                </label>
              `).join("")}
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function onboardingDNA() {
  const selected = state.onboarding.selectedActivities || [];
  const goals = state.onboarding.mainGoals || [];
  const identity = state.onboarding.athleteIdentity || "Hybrid Athlete";
  return `
    <article class="onboarding-summary-card dna-card">
      <div class="plan-badge">DNA</div>
      <h2>${identity}</h2>
      <p>Your training system will combine ${selected.join(", ")} with goals for ${goals.slice(0, 4).join(", ")}.</p>
      <div class="dna-preview-grid">
        <span>Running base <b>${selected.includes("Running") ? "Primary" : "Optional"}</b></span>
        <span>Recovery logic <b>${state.onboarding.planAdaptability}</b></span>
        <span>Coach style <b>${state.onboarding.coachPersonality}</b></span>
        <span>Weekly structure <b>${state.onboarding.availableDays.length} training days</b></span>
      </div>
    </article>
  `;
}

function onboardingSelect(key, label, options) {
  return `
    <label class="onboarding-field">
      <span>${label}</span>
      <select data-onboarding-select="${key}">
        ${optionMarkup(options, state.onboarding[key])}
      </select>
    </label>
  `;
}

function durationFromAvailability(index = 0) {
  const duration = state.onboarding.workoutDuration || "30-45 min";
  const fallback = {
    "20-30 min": "25 min",
    "30-45 min": "40 min",
    "45-60 min": "55 min",
    "60-75 min": "75 min",
    "75+ min": "75 min",
  }[duration] || "40 min";
  return index === 0 ? fallback : "25 min";
}

function onboardingOption(key, value, label, detail = "") {
  const active = state.onboarding[key] === value;
  return `
    <button class="onboarding-option ${active ? "active" : ""}" type="button" data-onboarding-key="${key}" data-onboarding-value="${value}">
      <span>${label}</span>
      ${detail ? `<small>${detail}</small>` : ""}
    </button>
  `;
}

function onboardingMultiOption(key, value, label, detail = "") {
  const selected = (state.onboarding[key] || []).includes(value);
  return `
    <button class="onboarding-option multi ${selected ? "active" : ""}" type="button" data-onboarding-multi="${key}" data-onboarding-value="${value}">
      <span>${label}</span>
      ${detail ? `<small>${detail}</small>` : ""}
      <b>${selected ? "✓" : ""}</b>
    </button>
  `;
}

function onboardingSummary() {
  const available = state.onboarding.availableDays.map(fullDayName).join(", ");
  const activities = (state.onboarding.selectedActivities || []).join(", ");
  const goals = (state.onboarding.mainGoals || []).join(", ");
  return `
    <article class="onboarding-summary-card">
      <div class="plan-badge">${planTargetDistance()}</div>
      <h2>${planTitle()}</h2>
      <p>${planWeeks()} weeks · ${planTargetDistance()} · ${fullDayName(state.onboarding.longRunDay)} long run</p>
      <ul>
        <li>Activities: ${activities}</li>
        <li>Main goals: ${goals}</li>
        <li>Goal: ${state.onboarding.goal}</li>
        <li>Current ${state.onboarding.currentRaceDistance} fitness: ${state.onboarding.currentRaceTime}</li>
        <li>Available to run: ${available}</li>
        <li>Preferred times: ${(state.onboarding.preferredTimes || []).join(", ")}</li>
        <li>Daily workout capacity: ${dayWorkoutSummary()}</li>
        <li>Running ${state.onboarding.runDaysPerWeek} days per week</li>
        <li>Elevation profile: ${state.onboarding.hillProfile}</li>
        <li>Volume: ${state.onboarding.trainingVolume}; difficulty: ${state.onboarding.difficulty}</li>
        <li>Training styles: ${(state.onboarding.activityPreferences || []).join(", ")}</li>
        <li>Coach: ${state.onboarding.coachPersonality}, ${state.onboarding.planAdaptability}, ${state.onboarding.aiAutoReschedule}</li>
      </ul>
    </article>
  `;
}

function dayWorkoutSummary() {
  const config = state.onboarding.dayWorkouts || {};
  const selected = dayKeys
    .map((day) => ({ day, count: Number(config[day]?.count || 0), durations: config[day]?.durations || [] }))
    .filter((item) => item.count > 0);
  if (!selected.length) return "No daily session limits selected";
  return selected.map((item) => `${item.day}: ${item.count} (${item.durations.slice(0, item.count).join(", ")})`).join("; ");
}

function trainingVolumeText(value) {
  return { Conservative: "Gentler mileage ramp.", Balanced: "Moderate progression.", Progressive: "Higher ramp and stronger peak weeks." }[value];
}

function difficultyText(value) {
  return { Comfortable: "More easy days.", Challenging: "Balanced easy and hard efforts.", Aggressive: "More demanding quality work." }[value];
}

function coachPersonalityText(value) {
  return { Supportive: "Warm, encouraging guidance.", Direct: "Clear and concise instructions.", Technical: "More training science and detail.", Motivational: "More energy and accountability." }[value];
}

function adaptabilityText(value) {
  return { Conservative: "Protect recovery first.", Balanced: "Adjust when readiness or weather changes.", "Highly adaptive": "Frequent AI changes based on signals." }[value];
}

function aiRescheduleText(value) {
  return { "Ask first": "AI suggests changes before applying them.", "Auto-adjust low risk": "AI can move easy sessions automatically.", "Manual only": "You stay fully in control." }[value];
}

function generatePlanFromOnboarding() {
  const onboarding = state.onboarding;
  const activities = onboarding.selectedActivities || ["Running"];
  const preferredTimes = onboarding.preferredTimes?.length ? onboarding.preferredTimes : ["Morning"];
  const daysWithWorkoutCapacity = dayKeys.filter((day) => maxWorkoutsForDay(day, onboarding) > 0);
  const availableBase = daysWithWorkoutCapacity.length ? daysWithWorkoutCapacity : (onboarding.availableDays?.length ? [...onboarding.availableDays] : [...dayKeys]);
  const available = availableBase.filter((day) => !(onboarding.restDays || []).includes(day));
  const runDays = activities.includes("Running") ? Math.min(Number(onboarding.runDaysPerWeek || 4), available.length) : 0;
  const runPlanDays = available.slice(0, runDays);
  if (runDays > 0 && onboarding.longRunDay && available.includes(onboarding.longRunDay) && !runPlanDays.includes(onboarding.longRunDay)) {
    runPlanDays[runPlanDays.length - 1] = onboarding.longRunDay;
  }
  const nextSchedule = Object.fromEntries(dayKeys.map((day) => [day, { count: 0, sessions: [] }]));
  const runDurations = runDurationsForGoal(onboarding.distance, runDays);
  runPlanDays.forEach((day, index) => {
    const isLong = day === onboarding.longRunDay;
    nextSchedule[day].sessions.push({
      timeOfDay: preferredTimes[index % preferredTimes.length],
      duration: durationForDaySession(day, nextSchedule[day].sessions.length, onboarding, isLong ? runDurations.long : runDurations.regular[index % runDurations.regular.length]),
      type: "Run",
    });
  });
  addCrossTraining(nextSchedule, onboarding);
  dayKeys.forEach((day) => {
    nextSchedule[day] = trimDaySchedule({ ...nextSchedule[day], count: nextSchedule[day].sessions.length });
  });
  state.schedule = nextSchedule;
  state.runs = runDays;
  state.yoga = activities.includes("Yoga") || onboarding.interests.includes("Stretching & mobility") ? 2 : 1;
  state.focus = planTitle();
  state.selectedDay = available.find((day) => nextSchedule[day].sessions.length) || "Mon";
  state.sessionStatus = {};
  state.onboarding.complete = true;
}

function runDurationsForGoal(distance, runDays) {
  const byDistance = {
    "5k": { regular: ["25 min", "30 min", "35 min"], long: "45 min" },
    "10k": { regular: ["30 min", "35 min", "40 min"], long: "55 min" },
    "10 mile": { regular: ["35 min", "40 min", "45 min"], long: "75 min" },
    "Half Marathon": { regular: ["35 min", "40 min", "55 min"], long: "75 min" },
    Marathon: { regular: ["40 min", "55 min", "55 min"], long: "75 min" },
    "50k": { regular: ["40 min", "55 min", "75 min"], long: "75 min" },
  };
  const base = byDistance[distance] || byDistance["Half Marathon"];
  if (runDays <= 3) return { regular: base.regular.slice(0, 2), long: base.long };
  return base;
}

function addCrossTraining(schedule, onboarding) {
  const interests = onboarding.interests || [];
  const activities = onboarding.selectedActivities || [];
  const preferences = onboarding.activityPreferences || [];
  const goals = onboarding.mainGoals || [];
  const preferredTimes = onboarding.preferredTimes?.length ? onboarding.preferredTimes : ["Evening"];
  const restDays = onboarding.restDays || [];
  const candidates = [...dayKeys].filter((day) => !restDays.includes(day) && hasOpenWorkoutSlot(day, schedule, onboarding)).sort((a, b) => schedule[a].sessions.length - schedule[b].sessions.length);
  const addSession = (type, duration, preferredTime = "Evening") => {
    const day = candidates.find((item) => hasOpenWorkoutSlot(item, schedule, onboarding));
    if (!day) return;
    schedule[day].sessions.push({ type, duration: durationForDaySession(day, schedule[day].sessions.length, onboarding, duration), timeOfDay: preferredTime });
    candidates.sort((a, b) => schedule[a].sessions.length - schedule[b].sessions.length);
  };
  const evening = preferredTimes.includes("Evening") ? "Evening" : preferredTimes[0];
  const midday = preferredTimes.includes("During the day") ? "During the day" : preferredTimes[0];
  if (activities.includes("Strength Training") || interests.includes("Strength training") || goals.includes("Build strength")) addSession("Strength", durationForCrossTraining(onboarding), evening);
  if (activities.includes("Pilates") || preferences.some((item) => item.includes("Pilates"))) addSession("Pilates", durationForCrossTraining(onboarding), evening);
  if (activities.includes("Yoga") || interests.includes("Stretching & mobility") || goals.includes("Improve mobility") || goals.includes("Stress relief")) {
    addSession("Mobility", "20 min", evening);
    addSession("Yoga", durationForCrossTraining(onboarding), evening);
  }
  if (activities.includes("Walking") || preferences.includes("Recovery Walk")) addSession(preferences.includes("Stair Stepper") ? "Stair stepper" : preferences.includes("Incline Walking") ? "Incline walking" : "Walking", "30 min", midday);
  if (activities.includes("Cardio/Cross Training")) addSession(preferences.includes("HIIT") ? "Stair stepper" : "Walking", "30 min", midday);
  if (interests.includes("Sleep & recovery") || goals.includes("Recovery")) addSession("Recovery", "20 min", evening);
  if (activities.includes("Running") && onboarding.hillProfile !== "Flat") addSession("Incline walking", "30 min", midday);
}

function maxWorkoutsForDay(day, onboarding) {
  const configured = onboarding.dayWorkouts?.[day];
  if (Object.keys(onboarding.dayWorkouts || {}).length) return configured ? Number(configured.count || 0) : 0;
  if (configured) return Number(configured.count || 0);
  return onboarding.availableDays?.includes(day) ? 3 : 0;
}

function hasOpenWorkoutSlot(day, schedule, onboarding) {
  const max = maxWorkoutsForDay(day, onboarding);
  return max > 0 && schedule[day].sessions.length < max;
}

function durationForDaySession(day, index, onboarding, fallback) {
  return onboarding.dayWorkouts?.[day]?.durations?.[index] || fallback;
}

function durationForCrossTraining(onboarding) {
  const duration = onboarding.workoutDuration || "45-60 min";
  if (duration === "20-30 min") return "25 min";
  if (duration === "30-45 min") return "30 min";
  if (duration === "60-75 min") return "55 min";
  if (duration === "75+ min") return "55 min";
  return "40 min";
}

function weatherTypeFromCondition(condition, temp) {
  const text = String(condition || "").toLowerCase();
  if (text.includes("rain") || text.includes("shower") || text.includes("storm")) return "rain";
  if (text.includes("snow") || text.includes("ice")) return "cold";
  if (temp >= 30) return "hot";
  if (temp >= 25) return "warm";
  return "mild";
}

function weatherIconFromCode(code) {
  if ([0, 1].includes(code)) return "sun";
  if ([2, 3, 45, 48].includes(code)) return "cloud";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  return "weather";
}

function weatherTextFromCode(code) {
  const descriptions = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle", 56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain", 66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 77: "Snow grains", 80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
    85: "Slight snow showers", 86: "Heavy snow showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail",
  };
  return descriptions[code] || "Current conditions available";
}

function weatherTypeFromCode(code, temp) {
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code) || temp <= 2) return "cold";
  if (temp >= 30) return "hot";
  if (temp >= 25) return "warm";
  return "mild";
}

function weatherForDay(day) {
  if (state.currentWeather) return state.currentWeather;
  return {
    temp: null,
    icon: "--",
    type: "unknown",
    detail: "Enter a city and update weather to fetch the real current condition.",
    location: state.weatherLocation || "Vienna, Austria",
    source: "Open-Meteo setup needed",
  };
}

function weatherSuggestion(day) {
  const weather = weatherForDay(day);
  const hasRun = state.schedule[day].sessions.some((session) => session.type === "Run");
  if (weather.type === "unknown") return "Update live weather to adjust the plan using the real current condition.";
  if (weather.type === "hot" && hasRun) return "Live weather shows heat: move the run to morning, reduce pace pressure, and shorten hard blocks if needed.";
  if (weather.type === "rain" && hasRun) return "Live weather shows rain: use treadmill, incline walking, or reschedule the run to a clearer window.";
  if (weather.type === "cold" && hasRun) return "Live weather shows cold conditions: extend the warm-up and keep the first minutes very easy.";
  if (weather.type === "hot") return "Keep lower intensity sessions, add fluids, and avoid stacking extra work in the afternoon.";
  return "Live weather supports the planned training. Keep the session realistic and recover well after.";
}

async function refreshLiveWeather() {
  const location = state.weatherLocation?.trim() || "Vienna, Austria";
  setText("#weatherStatus", "Fetching live weather...");
  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`;
    const geocodeResponse = await fetch(geocodeUrl);
    if (!geocodeResponse.ok) throw new Error(`Location lookup failed (${geocodeResponse.status})`);
    const geocode = await geocodeResponse.json();
    if (!geocode.results?.length) throw new Error("Location not found");
    const place = geocode.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) throw new Error(`Current weather failed (${weatherResponse.status})`);
    const weather = await weatherResponse.json();
    const current = weather.current;
    const temp = Math.round(current.temperature_2m);
    const code = Number(current.weather_code);
    const condition = weatherTextFromCode(code);
    state.currentWeather = {
      temp,
      icon: weatherIconFromCode(code),
      type: weatherTypeFromCode(code, temp),
      detail: `${condition} · humidity ${current.relative_humidity_2m}% · wind ${Math.round(current.wind_speed_10m)} km/h`,
      location: `${place.name}, ${place.country}`,
      source: "Open-Meteo current weather",
      observedAt: current.time,
    };
    saveState();
    renderTodayWorkouts();
    setText("#weatherStatus", "Updated from live Open-Meteo weather.");
  } catch (error) {
    state.currentWeather = null;
    saveState();
    renderTodayWorkouts();
    setText("#weatherStatus", `Weather error: ${error.message}`);
  }
}

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, Rebeka.";
  if (hour < 18) return "Good afternoon, Rebeka.";
  return "Good evening, Rebeka.";
}

function todayFocusText() {
  const sessions = state.schedule[state.selectedDay]?.sessions || [];
  const names = sessions.slice(0, 2).map((session, index) => {
    const title = titleForSession(state.selectedDay, session, index);
    return title.includes("Long") ? "Easy Run" : title.replace("Zone 2 Foundation Run", "Easy Run").replace("Mobility Reset", "Mobility");
  });
  if (!names.length) return "Recovery + Mobility";
  if (!names.some((name) => name.includes("Mobility")) && names.length === 1 && names[0].includes("Run")) names.push("Mobility");
  return names.join(" + ");
}

function energyLevel() {
  if (state.energy >= 8) return "High";
  if (state.energy >= 5) return "Steady";
  return "Low";
}

function trainingLoad() {
  return Math.min(99, Math.round(totalMinutes() / 4 + weeklyRunKm() * 1.4));
}

function consistencyScore() {
  return Math.min(99, Math.round((completedSessions() / Math.max(totalSessions(), 1)) * 35 + state.streak * 5 + 62));
}

function recoveryTrend() {
  return recovery() >= 78 ? "+6" : recovery() >= 65 ? "+2" : "-4";
}

function movementSteps() {
  return Number(state.movementSteps || 11500).toLocaleString("en-US");
}

function bodyBattery() {
  return Math.max(30, Math.min(98, Math.round((readiness() + recovery()) / 2)));
}

function hydrationLiters() {
  return `${Number(state.hydrationTotal || 0).toFixed(1)} L`;
}

function renderCheckinValues() {
  setText("#sleepValue", state.sleep);
  setText("#stressValue", state.stress);
  setText("#energyValue", state.energy);
}

function setText(selector, text) {
  const node = document.querySelector(selector);
  if (node) node.textContent = text;
}

function renderMetrics() {
  setText("#dashboardGreeting", greetingForNow());
  setText("#coachNudge", `Today's focus: ${todayFocusText()}`);
  setText("#profileGoal", state.focus);
  setText("#profileType", totalSessions() > 10 ? "Hybrid multi-session athlete" : "Hybrid beginner");
  setText("#profilePrimaryGoal", planTitle());
  setText("#profileSecondaryGoal", (state.onboarding?.interests || []).includes("Strength training") ? "Build Strength" : "Consistency");
  setText("#profileCurrentFocus", state.onboarding?.goal || "Consistency");
  setText("#profileExperience", state.onboarding?.ability || "Intermediate");
  setText("#profileTrainingDays", `${state.onboarding?.runDaysPerWeek || state.runs} days/week`);
  setText("#profilePreferredTime", "Morning");
  setText("#planPageTitle", planTitle());
}

function renderDashboardStickers() {
  const node = document.querySelector("#stickerGrid");
  if (!node) return;
  const completed = completedSessions();
  const total = totalSessions();
  const runKm = weeklyRunKm();
  const stats = [
    { label: "Plan week", value: planWeekLabel(), tone: "purple" },
    { label: "Training Load", value: trainingLoad(), tone: "blue" },
    { label: "Consistency Score", value: consistencyScore(), tone: "pink" },
    { label: "Weekly Workouts", value: `${completed}/${total}`, tone: "purple" },
    { label: "Energy Level", value: energyLevel(), tone: "pink" },
    { label: "Recovery Trend", value: recoveryTrend(), tone: "blue" },
    { label: "Movement", value: `${movementSteps()} steps`, tone: "nude" },
    { label: "Total weekly distance", value: `${runKm}/${weeklyDistanceTarget()} km`, tone: "blue" },
    { label: "Body Battery", value: bodyBattery(), tone: "purple" },
    { label: "Hydration", value: hydrationLiters(), tone: "nude" },
  ];
  node.innerHTML = stats.map((stat) => `
    <article class="sticker-card stat-card ${stat.tone}">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
    </article>
  `).join("");
}

function renderTodayCalendar() {
  const node = document.querySelector("#todayCalendar");
  if (!node) return;
  node.innerHTML = planTemplates().map(({ day, date, sessions }) => {
    const active = day === state.selectedDay;
    const firstType = sessions[0]?.type || "Rest";
    return `
      <button class="calendar-day ${active ? "active" : ""}" type="button" data-day-select="${day}">
        <span>${day}</span>
        <strong>${date}</strong>
        <i class="type-dot ${firstType.toLowerCase().replaceAll(" ", "-")}"></i>
      </button>
    `;
  }).join("");
}

function targetDayOptions(currentDay) {
  return dayKeys.map((day) => `<option value="${day}" ${day === currentDay ? "selected" : ""}>${day} ${dates[day]}</option>`).join("");
}

function renderTodayWorkouts() {
  const node = document.querySelector("#todayWorkouts");
  if (!node) return;
  const day = state.selectedDay;
  const weather = weatherForDay(day);
  setText("#todayTitle", `${planWeekLabel()} · ${day} ${dates[day]}`);
  setText("#weatherTemp", weather.temp === null ? "Connect weather" : `${weather.temp} C ${weather.icon}`);
  setText("#weatherDetail", `${weather.location} · ${weather.detail}`);
  setText("#weatherIcon", weather.icon);
  setText("#weatherSuggestion", weatherSuggestion(day));

  const sessions = planTemplates().find((item) => item.day === day)?.sessions || [];
  if (!sessions.length) {
    node.innerHTML = `<article class="today-card empty-day"><h3>No workouts planned</h3><p>Use this as a recovery day or move a light session here.</p></article>`;
    return;
  }

  node.innerHTML = sessions.map((session, index) => {
    const status = sessionState(day, index);
    const locked = status === "completed" || status === "canceled";
    return `
      <article class="today-card ${status !== "planned" ? `is-${status}` : ""}">
        <div class="today-card-main">
          <span class="session-time">${session.time}</span>
          <div>
            <div class="session-title-row">
              <h3>${session.title}</h3>
              ${status !== "planned" ? `<span class="status-pill">${status}</span>` : ""}
            </div>
            <p>${session.duration} · ${session.type}</p>
            <p class="planned-time">Planned for ${session.timeOfDay}</p>
            <small>${aiSuggestionForSession(session, weather)}</small>
          </div>
        </div>
        <div class="time-chip-row" aria-label="Planned time of day">
          ${timeOfDayOptions.map((option) => `<span class="time-chip ${option === session.timeOfDay ? "active" : ""}">${timeLabel(option)}</span>`).join("")}
        </div>
        <div class="reschedule-row">
          <label>
            Move to day
            <select data-target-day="${day}-${index}" ${locked ? "disabled" : ""}>${targetDayOptions(day)}</select>
          </label>
          <label>
            Time of day
            <select data-target-time="${day}-${index}" ${locked ? "disabled" : ""}>${optionMarkup(timeOfDayOptions, session.timeOfDay)}</select>
          </label>
        </div>
        <div class="session-actions">
          <button type="button" class="session-action complete-action" data-today-action="complete" data-day="${day}" data-session="${index}" ${locked ? "disabled" : ""}>Complete Workout</button>
          <button type="button" class="session-action ai-action" data-today-action="reschedule-day" data-day="${day}" data-session="${index}" ${locked ? "disabled" : ""}>Reschedule Workout</button>
          <button type="button" class="session-action cancel-action" data-today-action="cancel" data-day="${day}" data-session="${index}" ${locked ? "disabled" : ""}>Cancel Workout</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderPlanOverview() {
  const summary = document.querySelector("#planSummary");
  const weeks = document.querySelector("#planWeeks");
  if (!summary || !weeks) return;
  const completed = completedSessions();
  const total = totalSessions();
  summary.innerHTML = `
    <article class="plan-hero-card">
      <div>
        <span class="eyebrow">Active plan</span>
        <h3>${planTitle()}</h3>
        <p>Week 3 of ${planWeeks()} · ${total} workouts this week · ${runSummaryText()}</p>
      </div>
      <strong>${Math.round((2 / planWeeks()) * 100)}%</strong>
      <div class="mini-progress wide"><span style="width:${(2 / planWeeks()) * 100}%"></span></div>
      <div class="plan-stats"><span>Weeks completed <b>2/${planWeeks()}</b></span><span>Week completion <b>${completed}/${total}</b></span><span>Goal <b>${planTargetDistance()}</b></span></div>
    </article>
  `;

  const futureWeeks = Array.from({ length: planWeeks() }, (_, index) => ({
    week: index + 1,
    range: weekRangeLabel(index + 1),
    distance: `${estimatedWeekDistance(index + 1)} km`,
    locked: false,
  }));
  weeks.innerHTML = futureWeeks.map((week) => `
    <article class="week-card ${week.week === 3 ? "current" : ""} ${week.locked ? "locked" : ""}">
      <div>
        <span class="eyebrow">${week.range}</span>
        <h3>Week ${week.week}</h3>
        <p>${week.locked ? "Preview will unlock as the plan adapts." : `${totalSessions()} workouts · ${week.distance}`}</p>
      </div>
      <ul>
        ${planTemplates().map(({ day, sessions }) => sessions.length ? sessions.map((session) => `<li><span class="type-dot ${session.type.toLowerCase().replaceAll(" ", "-")}"></span>${day} · ${session.time} · ${session.title} · ${session.duration}</li>`).join("") : `<li><span class="type-dot rest"></span>${day} · Recovery</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function weekRangeLabel(week) {
  return `Week ${week} schedule`;
}

function estimatedWeekDistance(week) {
  const current = weeklyRunKm();
  if (!current) return 0;
  const peak = weeklyDistanceTarget();
  const progress = Math.min(1, week / Math.max(planWeeks() - 2, 1));
  return Math.round(Math.min(peak, current * (0.75 + progress * 0.45)));
}

function runSummaryText() {
  const km = weeklyRunKm();
  return km > 0 ? `${km} km running volume` : "cross-training focused week";
}

function aiRearrangeSuggestion(reason) {
  const text = reason.toLowerCase();
  const easierDay = dayKeys.find((day) => state.schedule[day].sessions.length <= 1) || "Thu";
  const longRun = state.onboarding.longRunDay || "Sun";
  if (text.includes("weather") || text.includes("rain") || text.includes("hot")) {
    return `AI rearrange suggestion for weather: move the hardest run to the earliest cooler or clearer window, keep ${longRun} as the long-run anchor if possible, and replace the original slot with mobility or recovery walking.`;
  }
  if (text.includes("fatigue") || text.includes("tired") || text.includes("sore") || text.includes("stress")) {
    return `AI rearrange suggestion for recovery: move intensity to ${easierDay}, keep only easy movement today, and reduce the next hard workout by 10-15% if readiness stays low.`;
  }
  if (text.includes("travel") || text.includes("work") || text.includes("schedule")) {
    return `AI rearrange suggestion for schedule pressure: move the shortest session to the busy day, place strength or Pilates on a double-workout day, and keep the long run on ${longRun} unless travel affects that day.`;
  }
  return `AI rearrange suggestion: protect the long run on ${longRun}, move the most flexible cross-training session first, and avoid stacking two hard running days back to back. Reason logged: ${reason}.`;
}

function renderHabits() {
  const node = document.querySelector("#habitList");
  if (node) node.innerHTML = "";
}

function renderLibrary(filter = "all") {
  const node = document.querySelector("#workoutLibrary");
  if (!node) return;
  const filtered = filter === "all" ? workouts : workouts.filter((workout) => workout.type === filter);
  node.innerHTML = filtered.map((workout) => `
    <article class="workout-card">
      <span class="module">${workout.module}</span>
      <div>
        <h3>${workout.title}</h3>
        <p>${workout.detail}</p>
        ${workout.bestFor ? `<p class="best-for"><strong>Best for:</strong> ${workout.bestFor}</p>` : ""}
      </div>
      <span class="pill">${workout.type}</span>
    </article>
  `).join("");
}

function youtubeEmbedUrl(url) {
  const match = String(url).match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
}

function renderVideos() {
  const node = document.querySelector("#videoLibrary");
  if (!node) return;
  node.innerHTML = state.videos.map((video, index) => {
    const embed = video.source === "YouTube" ? youtubeEmbedUrl(video.url) : "";
    return `
      <article class="video-card">
        <div class="video-frame">
          ${embed ? `<iframe src="${embed}" title="${video.title}" allowfullscreen></iframe>` : video.source === "Uploaded file" ? `<video src="${video.url}" controls></video>` : `<a href="${video.url}" target="_blank" rel="noreferrer">Open video link</a>`}
        </div>
        <div>
          <span class="module">${video.category}</span>
          <h3>${video.title}</h3>
          <p>${video.source}</p>
        </div>
        <button type="button" class="session-action cancel-action" data-remove-video="${index}">Remove</button>
      </article>
    `;
  }).join("");
}

function renderChart() {
  const node = document.querySelector("#chart");
  if (!node) return;
  const max = Math.max(...state.consistency);
  node.innerHTML = state.consistency.map((value) => `<div class="bar" style="height:${Math.max(34, (value / max) * 100)}%">${value}</div>`).join("");
}

function addCoachMessage(text, type = "coach") {
  const messages = document.querySelector("#coachMessages");
  if (!messages) return;
  messages.insertAdjacentHTML("beforeend", `<article class="message ${type}"><p>${text}</p></article>`);
  messages.scrollTop = messages.scrollHeight;
}

function coachReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes("reschedule") || lower.includes("move")) return "I would move the workout to the least loaded day, then soften the surrounding sessions so the week still has a rhythm instead of a pile-up.";
  if (lower.includes("hot") || lower.includes("rain")) return "Weather should change execution, not the whole identity of the plan. Move the run earlier, shorten intensity, or switch to treadmill/incline walking when needed.";
  if (lower.includes("tired") || lower.includes("sore") || lower.includes("stress")) return "I would trade intensity for recovery today: keep movement easy, add a 20-minute restorative flow, and protect tomorrow's consistency.";
  if (lower.includes("yoga") || lower.includes("mobility")) return "Let’s pair yoga with harder run days: short dynamic mobility before, longer hip and calf recovery afterward.";
  return "I’ll keep the plan balanced: one meaningful challenge, support work around it, and enough recovery to make the habit repeatable.";
}

function reindexSessionStatusAfterMove(fromDay, fromIndex, toDay) {
  const nextStatus = {};
  Object.entries(state.sessionStatus).forEach(([key, value]) => {
    const [day, rawIndex] = key.split("-");
    const index = Number(rawIndex);
    if (day === fromDay && index === fromIndex) return;
    if (day === fromDay && index > fromIndex) nextStatus[sessionKey(day, index - 1)] = value;
    else nextStatus[key] = value;
  });
  nextStatus[sessionKey(toDay, state.schedule[toDay].sessions.length - 1)] = "rescheduled";
  state.sessionStatus = nextStatus;
}

function moveSessionToDay(fromDay, index, toDay, targetTimeOfDay) {
  const session = state.schedule[fromDay].sessions[index];
  if (!session) return;
  const timeOfDay = timeOfDayOptions.includes(targetTimeOfDay) ? targetTimeOfDay : session.timeOfDay;

  if (fromDay === toDay) {
    session.timeOfDay = timeOfDay;
    state.sessionStatus[sessionKey(fromDay, index)] = "rescheduled";
    addCoachMessage(`AI adjusted the workout: kept ${session.type.toLowerCase()} on ${fromDay}, now planned for ${timeOfDay.toLowerCase()}.`);
    return;
  }

  let targetDay = toDay;
  if (state.schedule[targetDay].sessions.length >= 3) {
    targetDay = dayKeys.find((day) => day !== fromDay && state.schedule[day].sessions.length < 3);
  }
  if (!targetDay) {
    state.sessionStatus[sessionKey(fromDay, index)] = "canceled";
    addCoachMessage(`AI suggestion: every day is already full, so skip ${fromDay} ${session.type.toLowerCase()} instead of overloading the week.`);
    return;
  }
  state.schedule[fromDay].sessions.splice(index, 1);
  state.schedule[fromDay].count = state.schedule[fromDay].sessions.length;
  state.schedule[targetDay].sessions.push({ ...session, timeOfDay });
  state.schedule[targetDay].count = state.schedule[targetDay].sessions.length;
  reindexSessionStatusAfterMove(fromDay, index, targetDay);
  state.selectedDay = targetDay;
  addCoachMessage(`AI adjusted the week: moved ${session.type.toLowerCase()} from ${fromDay} to ${targetDay} ${timeOfDay.toLowerCase()}, then kept the surrounding days lighter.`);
}

function applySessionAction(day, index, action, targetDay, targetTimeOfDay) {
  const key = sessionKey(day, index);
  const session = state.schedule[day].sessions[index];
  if (!session) return;

  if (action === "complete") {
    if (state.sessionStatus[key] !== "completed") state.streak += 1;
    state.sessionStatus[key] = "completed";
    addCoachMessage(`${day} ${session.timeOfDay.toLowerCase()} ${session.type.toLowerCase()} marked complete. This is logged at the workout level.`);
  }

  if (action === "reschedule-day") moveSessionToDay(day, index, targetDay || nextDay(day), targetTimeOfDay);

  if (action === "cancel") {
    state.sessionStatus[key] = "canceled";
    addCoachMessage(`Canceled ${day} ${session.type.toLowerCase()}. AI suggestion: skip this workout and keep only gentle mobility if you want movement.`);
  }

  saveState();
  render();
}

function nextDay(day) {
  return dayKeys[(dayKeys.indexOf(day) + 1) % dayKeys.length];
}

function bindEvents() {
  document.querySelectorAll('.nav-list a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const hash = link.getAttribute("href");
      history.pushState(null, "", hash);
      renderPageVisibility();
    });
  });
  window.addEventListener("popstate", renderPageVisibility);
  window.addEventListener("hashchange", renderPageVisibility);

  const onboardingStep = document.querySelector("#onboardingStep");
  if (onboardingStep) {
    onboardingStep.addEventListener("click", (event) => {
      const option = event.target.closest("[data-onboarding-key]");
      const multi = event.target.closest("[data-onboarding-multi]");
      const race = event.target.closest("[data-onboarding-race]");
      const select = event.target.closest("[data-onboarding-select]");
      if (option) {
        const key = option.dataset.onboardingKey;
        const rawValue = option.dataset.onboardingValue;
        state.onboarding[key] = ["runDaysPerWeek", "planLengthWeeks"].includes(key) ? Number(rawValue) : rawValue;
        saveState();
        renderOnboarding();
      }
      if (multi) {
        const key = multi.dataset.onboardingMulti;
        const value = multi.dataset.onboardingValue;
        const current = new Set(state.onboarding[key] || []);
        if (current.has(value)) current.delete(value);
        else current.add(value);
        state.onboarding[key] = [...current];
        saveState();
        renderOnboarding();
      }
      if (race) {
        const selected = activeOnboardingSteps().find((step) => step.key === "currentRaceTime").options.find(([label]) => label === race.dataset.onboardingRace);
        state.onboarding.currentRaceDistance = selected[0];
        state.onboarding.currentRaceTime = selected[1];
        saveState();
        renderOnboarding();
      }
      if (select) {
        state.onboarding[select.dataset.onboardingSelect] = select.value;
        saveState();
        renderOnboarding();
      }
    });
    onboardingStep.addEventListener("change", (event) => {
      const select = event.target.closest("[data-onboarding-select]");
      const countSelect = event.target.closest("[data-day-workout-count]");
      const durationSelect = event.target.closest("[data-day-workout-duration]");
      if (select) {
        state.onboarding[select.dataset.onboardingSelect] = select.value;
        saveState();
        renderOnboarding();
      }
      if (countSelect) {
        const day = countSelect.dataset.dayWorkoutCount;
        const count = Number(countSelect.value);
        const current = state.onboarding.dayWorkouts?.[day] || { count: 0, durations: [] };
        state.onboarding.dayWorkouts = { ...(state.onboarding.dayWorkouts || {}), [day]: { count, durations: Array.from({ length: count }, (_, index) => current.durations?.[index] || durationFromAvailability(index)) } };
        saveState();
        renderOnboarding();
      }
      if (durationSelect) {
        const [day, rawIndex] = durationSelect.dataset.dayWorkoutDuration.split("-");
        const index = Number(rawIndex);
        const current = state.onboarding.dayWorkouts?.[day] || { count: 0, durations: [] };
        const durations = [...(current.durations || [])];
        durations[index] = durationSelect.value;
        state.onboarding.dayWorkouts = { ...(state.onboarding.dayWorkouts || {}), [day]: { ...current, durations } };
        saveState();
      }
    });
  }

  const onboardingBack = document.querySelector("#onboardingBack");
  if (onboardingBack) {
    onboardingBack.addEventListener("click", () => {
      state.onboarding.step = Math.max(0, Number(state.onboarding.step || 0) - 1);
      saveState();
      renderOnboarding();
    });
  }

  const onboardingClose = document.querySelector("#onboardingClose");
  if (onboardingClose) {
    onboardingClose.addEventListener("click", () => {
      history.pushState(null, "", "#dashboard");
      renderPageVisibility();
    });
  }

  const onboardingContinue = document.querySelector("#onboardingContinue");
  if (onboardingContinue) {
    onboardingContinue.addEventListener("click", () => {
      const steps = activeOnboardingSteps();
      const finalStep = state.onboarding.step >= steps.length - 1;
      if (finalStep) {
        generatePlanFromOnboarding();
        saveState();
        render();
        history.pushState(null, "", "#plan");
        renderPageVisibility();
        addCoachMessage(`${planTitle()} generated from onboarding: ${state.onboarding.runDaysPerWeek} run days, ${totalSessions()} weekly sessions, ${weeklyRunKm()} km running volume.`);
        return;
      }
      state.onboarding.step = Math.min(steps.length - 1, Number(state.onboarding.step || 0) + 1);
      saveState();
      renderOnboarding();
    });
  }

  document.querySelectorAll("[data-profile-back]").forEach((button) => {
    button.addEventListener("click", () => {
      history.pushState(null, "", "#profile");
      renderPageVisibility();
    });
  });

  document.querySelectorAll("[data-profile-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      history.pushState(null, "", "#edit-profile");
      renderPageVisibility();
    });
  });

  document.querySelectorAll("[data-profile-subpage]").forEach((button) => {
    button.addEventListener("click", () => {
      addCoachMessage(`Profile section opened: ${button.textContent.trim()}. These settings will become editable in the full app.`);
    });
  });

  const todayCalendar = document.querySelector("#todayCalendar");
  if (todayCalendar) {
    todayCalendar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-day-select]");
      if (!button) return;
      state.selectedDay = button.dataset.daySelect;
      saveState();
      renderTodayCalendar();
      renderTodayWorkouts();
    });
  }

  const todayWorkouts = document.querySelector("#todayWorkouts");
  if (todayWorkouts) {
    todayWorkouts.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-today-action]");
      if (!button) return;
      const { day, session, todayAction } = button.dataset;
      const card = button.closest(".today-card");
      if (todayAction === "reschedule-day" && !card.classList.contains("is-rescheduling")) {
        card.classList.add("is-rescheduling");
        button.textContent = "Confirm Reschedule";
        return;
      }
      const daySelect = todayWorkouts.querySelector(`[data-target-day="${day}-${session}"]`);
      const timeSelect = todayWorkouts.querySelector(`[data-target-time="${day}-${session}"]`);
      applySessionAction(day, Number(session), todayAction, daySelect?.value || day, timeSelect?.value);
    });
  }

  ["sleepInput", "stressInput", "energyInput"].forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (!input) return;
    input.addEventListener("input", (event) => {
      state[id.replace("Input", "")] = Number(event.target.value);
      saveState();
      renderMetrics();
      renderCheckinValues();
      renderDashboardStickers();
      renderTodayWorkouts();
    });
  });

  const logHydration = document.querySelector("#logHydration");
  if (logHydration) {
    logHydration.addEventListener("click", () => {
      const input = document.querySelector("#hydrationInput");
      const amount = Math.max(0, Number(input?.value || 0));
      state.hydrationTotal = Number((Number(state.hydrationTotal || 0) + amount).toFixed(1));
      saveState();
      renderCheckinValues();
      renderDashboardStickers();
      addCoachMessage(`Hydration logged: ${amount.toFixed(1)} L. Today total is ${hydrationLiters()}.`);
    });
  }

  const weatherLocation = document.querySelector("#weatherLocation");
  if (weatherLocation) {
    weatherLocation.addEventListener("change", (event) => {
      state.weatherLocation = event.target.value.trim() || "Vienna, Austria";
      state.currentWeather = null;
      saveState();
      renderTodayWorkouts();
    });
  }

  const refreshWeather = document.querySelector("#refreshWeather");
  if (refreshWeather) {
    refreshWeather.addEventListener("click", refreshLiveWeather);
  }

  const saveCheckin = document.querySelector("#saveCheckin");
  if (saveCheckin) {
    saveCheckin.addEventListener("click", () => {
      state.consistency = [...state.consistency.slice(1), readiness()];
      saveState();
      render();
      addCoachMessage("Check-in saved. I updated readiness and will use it for reschedule or skip suggestions.");
    });
  }

  const generatePlan = document.querySelector("#generatePlan");
  if (generatePlan) {
    generatePlan.addEventListener("click", () => {
      renderPlanOverview();
      addCoachMessage(`Plan overview refreshed with ${totalSessions()} weekly workouts and ${Math.round(totalMinutes())} planned minutes.`);
    });
  }

  document.querySelectorAll("[data-plan-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.planAction;
      if (action === "overview") {
        renderPlanOverview();
        document.querySelector("#planWeeks")?.scrollIntoView({ behavior: "smooth", block: "start" });
        addCoachMessage(`Plan overview opened: showing all ${planWeeks()} weeks with every planned session for each week.`);
        return;
      }
      if (action === "manage") {
        state.onboarding = freshOnboardingState();
        saveState();
        renderOnboarding();
        history.pushState(null, "", "#onboarding");
        renderPageVisibility();
        addCoachMessage("Manage Plan restarted onboarding so you can rebuild the full plan from the beginning.");
        return;
      }
      if (action === "rearrange") {
        const reason = window.prompt("Why do you want to rearrange workouts? For example: travel, fatigue, weather, period symptoms, work schedule, or soreness.");
        if (!reason) return;
        addCoachMessage(aiRearrangeSuggestion(reason));
      }
    });
  });

  const habitList = document.querySelector("#habitList");
  if (habitList) {
    habitList.addEventListener("change", (event) => {
      const habit = event.target.dataset.habit;
      if (!habit) return;
      state.habits[habit] = event.target.checked;
      saveState();
      renderMetrics();
    });
  }

  document.querySelectorAll(".segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderLibrary(button.dataset.filter);
    });
  });

  const videoForm = document.querySelector("#videoForm");
  if (videoForm) {
    videoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.querySelector("#videoTitle");
      const category = document.querySelector("#videoCategory");
      const url = document.querySelector("#videoUrl");
      const file = document.querySelector("#videoFile");
      const uploadedFile = file.files?.[0];
      const submittedTitle = title.value.trim();
      const submittedCategory = category.value;
      const videoUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : url.value.trim();
      if (!submittedTitle || !videoUrl) return;
      state.videos.unshift({
        title: submittedTitle,
        category: submittedCategory,
        source: uploadedFile ? "Uploaded file" : "YouTube",
        url: videoUrl,
      });
      saveState();
      renderVideos();
      videoForm.reset();
      addCoachMessage(`Added ${submittedCategory.toLowerCase()} video: ${submittedTitle}.`);
    });
  }

  const videoLibrary = document.querySelector("#videoLibrary");
  if (videoLibrary) {
    videoLibrary.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-video]");
      if (!button) return;
      state.videos.splice(Number(button.dataset.removeVideo), 1);
      saveState();
      renderVideos();
    });
  }

  const coachForm = document.querySelector("#coachForm");
  if (coachForm) {
    coachForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.querySelector("#coachInput");
      if (!input.value.trim()) return;
      addCoachMessage(input.value, "user");
      addCoachMessage(coachReply(input.value));
      input.value = "";
    });
  }
}

function hydrateInputs() {
  const values = { sleepInput: state.sleep, stressInput: state.stress, energyInput: state.energy, weatherLocation: state.weatherLocation };
  Object.entries(values).forEach(([id, value]) => {
    const node = document.querySelector(`#${id}`);
    if (node) node.value = value || "";
  });
  renderCheckinValues();
}

function activePageFromHash() {
  return (window.location.hash || "#dashboard").replace("#", "") || "dashboard";
}

function renderPageVisibility() {
  const activePage = activePageFromHash();
  document.querySelectorAll(".page-section").forEach((section) => {
    const pages = (section.dataset.page || section.id || "").split(" ");
    section.classList.toggle("is-active", pages.includes(activePage));
  });
  document.querySelectorAll('.nav-list a[href^="#"]').forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activePage}`);
  });
}

function render() {
  hydrateInputs();
  renderMetrics();
  renderDashboardStickers();
  renderTodayCalendar();
  renderTodayWorkouts();
  renderPlanOverview();
  renderHabits();
  renderLibrary(document.querySelector(".segmented button.active")?.dataset.filter || "all");
  renderVideos();
  renderChart();
  renderOnboarding();
  renderPageVisibility();
}

bindEvents();
render();
refreshLiveWeather();
addCoachMessage("Bekas training app is balancing running, Pilates, yoga, strength, walking, recovery, sleep, weather, and lifestyle habits today.");
