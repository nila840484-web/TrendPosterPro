// ════════════════════════════════════════
//  utils.gs — Helper Functions
// ════════════════════════════════════════

// ── Date & Time ──
function getBDTime() {
  const now = new Date();
  const bd = new Date(now.getTime() + (6 * 60 * 60 * 1000));
  return bd;
}

function getFormattedDate() {
  const bd = getBDTime();
  return Utilities.formatDate(bd, "Asia/Dhaka", "dd MMM yyyy, hh:mm a");
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
  cache.put(key, "1", 60 * 60 * 6); // 6 ঘন্টা মনে রাখবে
}

// ── Log ──
function logActivity(message) {
  const sheet = getLogSheet();
  sheet.appendRow([getFormattedDate(), message]);
}

function getLogSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID);
  return ss.getSheetByName("Log") || ss.insertSheet("Log");
}

// ── Clean Text ──
function cleanText(text) {
  return text.replace(/[^\w\s\u0980-\u09FF]/gi, "").trim();
}
