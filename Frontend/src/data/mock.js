export const currentUser = {
  name: "Dr. Alex Rivera",
  role: "Senior Clinician",
  initials: "AR",
};

export const navItems = [
  { to: "/dashboard", label: "Overview", icon: "▦" },
  { to: "/scan-analysis", label: "Image Analysis", icon: "🩻" },
  { to: "/lab-results", label: "Lab Reports", icon: "🧪" },
  { to: "/compare-reports", label: "Compare Reports", icon: "📊" },
  { to: "/wellness", label: "Wellness Plan", icon: "🥗" },
  { to: "/doctors", label: "Find Doctors", icon: "🩺" },
  { to: "/archive", label: "Analysis Archive", icon: "🗂" },
];

export const chatSeed = [
  {
    from: "ai",
    text: "Hello Dr. Rivera. I've finished cross-referencing your latest lab results. Would you like a summary or should we discuss the glucose spike?",
  },
  { from: "user", text: "Let's look at the glucose spike first. What's the suspected cause?" },
  {
    from: "ai",
    text: "Based on your sleep tracker data, you've averaged only 5.5 hours for the last 3 nights. Reduced sleep is strongly correlated with morning fasting glucose elevation.",
  },
];

export const habits = [
  { title: "Drink 8 Glasses of Water", note: "Hydration Goal", done: true },
  { title: "30-min Light Exercise", note: "Activity Goal", done: true },
  { title: "Vitamin D Supplement", note: "Nutrition Goal", done: true },
  { title: "Mindfulness Session", note: "Mental Health", done: false },
];

export const quickTiles = [
  { icon: "💊", label: "Meds Info" },
  { icon: "🍽", label: "Diet Plan" },
  { icon: "🏋", label: "Workout" },
  { icon: "📅", label: "Appointments" },
  { icon: "🏥", label: "Nearby Clinics" },
  { icon: "🔒", label: "Vault" },
];

export const healthChecks = [
  { name: "Blood Sugar (Fasting)", value: "102", unit: "mg/dL", tag: "Just Above Range", tone: "amber" },
  { name: "Total Cholesterol", value: "185", unit: "mg/dL", tag: "Looking Great!", tone: "green" },
  { name: "Vitamin D", value: "28", unit: "ng/mL", tag: "A Bit Low", tone: "amber" },
  { name: "A1C Score", value: "5.7", unit: "%", tag: "Keep an eye on this", tone: "red" },
];

export const advice = [
  {
    icon: "☀️",
    title: "Boost Your Vitamin D",
    text: "Try a daily supplement (2000 IU) and we'll check back in 3 months to see how you're feeling.",
  },
  {
    icon: "🌾",
    title: "Try More Fiber",
    text: "Swapping white bread for whole grains and eating more veggies can help balance your sugar.",
  },
  {
    icon: "🚶",
    title: "Keep Moving",
    text: "A daily 20-minute brisk walk is a wonderful way to boost your energy and heart health.",
  },
];

export const sugarTrend = [
  { month: "May", value: 5.3 },
  { month: "Jun", value: 5.35 },
  { month: "Jul", value: 5.45 },
  { month: "Aug", value: 5.5 },
  { month: "Sep", value: 5.62 },
  { month: "Oct", value: 5.7 },
];

export const macroGoals = [
  { label: "Protein Goal", value: "142 / 160g", delta: "+12% vs avg", tone: "green", pct: 88, icon: "🍗" },
  { label: "Carbs Goal", value: "185 / 220g", delta: "Optimal", tone: "blue", pct: 84, icon: "🌾" },
  { label: "Fats Goal", value: "54 / 70g", delta: "-5% limit", tone: "amber", pct: 77, icon: "💧" },
];

export const mealPlan = [
  { day: "MON", meals: [["Breakfast", "Greek Yogurt & Nuts"], ["Lunch", "Grilled Salmon Salad"], ["Dinner", "Lentil Pasta"]] },
  { day: "TUE", meals: [["Breakfast", "Avocado Toast"], ["Lunch", "Quinoa Bowl"], ["Dinner", "Chicken Curry"]] },
  { day: "WED", meals: [["Breakfast", "Steel Cut Oats"], ["Lunch", "Turkey Wrap"], ["Dinner", "Baked Cod"]] },
  { day: "THU", meals: [["Breakfast", "Berry Smoothie"], ["Lunch", "Miso Ramen"], ["Dinner", "Beef Stir-Fry"]] },
  { day: "FRI", meals: [["Breakfast", "Chia Pudding"], ["Lunch", "Chickpea Salad"], ["Dinner", "Tofu Tikka"]] },
  { day: "SAT", meals: [["Breakfast", "Omelette"], ["Lunch", "Falafel Plate"], ["Dinner", "Shrimp Tacos"]] },
];

export const activitySync = [
  { icon: "👟", title: "Daily Steps", note: "Syncing with Apple Health", value: "8,432", tag: "84% of Goal", tone: "green" },
  { icon: "🏋", title: "Strength Training", note: "Active Workout", value: "45 min", tag: "420 kcal burned", tone: "blue" },
  { icon: "❤️", title: "Avg Heart Rate", note: "Last 24 hours", value: "68 bpm", tag: "Stable", tone: "green" },
];

export const doctors = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Hormone Specialist",
    rating: "4.9 / 5.0",
    reviews: "Highly Rated for Friendliness",
    match: "96% Match for You",
    tags: ["Welcoming New Patients", "Easy Online Booking"],
    initials: "SC",
  },
  {
    name: "Dr. James Wilson",
    specialty: "Heart Specialist",
    rating: "4.8 / 5.0",
    reviews: "Great Patient Reviews",
    match: "94% Match for You",
    tags: ["Takes Your Insurance", "12+ Years Experience"],
    initials: "JW",
  },
];

export const clinics = [
  { name: "Mount Sinai Hospital", distance: "0.8 miles away", status: "Wait: 12 mins", tone: "amber" },
  { name: "City Wellness Clinic", distance: "1.4 miles away", status: "Open Now: No Wait", tone: "green" },
  { name: "St. Jude Medical", distance: "2.9 miles away", status: "Wait: 45 mins", tone: "amber" },
];

export const archiveItems = [
  {
    kind: "IMAGING",
    title: "Chest X-Ray",
    meta: "Oct 24, 2024 • ID: AX-4022",
    status: "New Result",
    tone: "green",
    insight: "Clear pulmonary fields. No evidence of pleural effusion or consolidation. Heart size is within normal limits.",
  },
  {
    kind: "LAB ANALYSIS",
    title: "Biochemical Screening",
    meta: "Oct 18, 2024 • ID: LB-1189",
    status: "Reviewed",
    insight: "Normal cardiovascular markers. All metabolic panels are within the healthy reference range for age bracket.",
    stats: [["Glucose", "94 mg/dL"], ["HbA1c", "52 mg/dL"]],
  },
  {
    kind: "IMAGING",
    title: "MRI Brain (Contrast)",
    meta: "Sep 30, 2024 • ID: AX-9891",
    status: "Reviewed",
    insight: "Symmetrical brain parenchyma. No signs of infarction, mass effect, or midline shift. Ventricular system is normal.",
  },
  {
    kind: "LAB ANALYSIS",
    title: "Full Blood Count (CBC)",
    meta: "Sep 15, 2024 • ID: LB-0942",
    status: "Reviewed",
    insight: "Hematological profile is stable. WBC count indicates a healthy immune response with no signs of inflammation.",
    stats: [["Hemoglobin", "14.2 g/dL"], ["White Cells", "6.4 x10³/µL"]],
  },
];
