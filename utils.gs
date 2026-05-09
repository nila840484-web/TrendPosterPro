
// ════════════════════════════════════════
//  utils.gs — Helper Functions
// ════════════════════════════════════════

// ── Date & Time ──
function getBDTime() {
  const now = new Date();
  return new Date(now.getTime() + (6 * 60 * 60 * 1000));
}

function getFormattedDate() {
  return Utilities.formatDate(getBDTime(), "Asia/Dhaka", "dd MMM yyyy, hh:mm a");
}

// ── Already Posted Check ──
function isAlreadyPosted(topic) {
  const cache = CacheService.getScriptCache();
  const key = "posted_" + topic.replace(/\s+/g, "_").toLowerCase();
  return cache.get(key) !== null;
}

function markAsPosted(topic) {
  const cache = CacheService.getScriptCache();
  const key = "posted_" + topic.replace(/\s+/g, "_").toLowerCase();
  cache.put(key, "1", 60 * 60 * 6);
}

// ── Log ──  ✅ Fixed: Google Sheet বাদ, Properties use করছি
function logActivity(message) {
  const log = getFormattedDate() + " → " + message;
  console.log(log);
  
  const props = PropertiesService.getScriptProperties();
  const existing = props.getProperty("activity_log") || "";
  const updated = log + "\n" + existing;
  // শুধু শেষ 50টা log রাখবো
  const lines = updated.split("\n").slice(0, 50).join("\n");
  props.setProperty("activity_log", lines);
}

function getActivityLog() {
  const props = PropertiesService.getScriptProperties();
  return props.getProperty("activity_log") || "No activity yet.";
}

// ── Clean Text ──
function cleanText(text) {
  return text.replace(/[^\w\s\u0980-\u09FF]/gi, "").trim();
}
