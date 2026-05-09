// ════════════════════════════════════════
//  scheduler.gs — Auto Runner
// ════════════════════════════════════════

function runAll() {
  try {
    const topic = getNextTopic();
    if (!topic) {
      logActivity("No new topics found");
      return;
    }

    const content = generateContent(topic);
    const imageUrl = generateImage(topic);
    const title = content.title;
    const description = content.description;
    const category = content.category;

    if (CONFIG.MODE_WEBSITE) {
      postToBlogger(title, description, imageUrl, topic, category);
    }
    if (CONFIG.MODE_TELEGRAM) {
      postToTelegram(title, description, imageUrl);
    }

    markAsPosted(topic);
    logActivity("✅ Done: " + title);

  } catch (e) {
    logActivity("Scheduler Error: " + e.message);
  }
}

function startScheduler() {
  // ✅ Fixed: 15 minutes use করছি
  ScriptApp.newTrigger("runAll")
    .timeBased()
    .everyMinutes(15)
    .create();
  logActivity("✅ Scheduler Started");
}

function stopScheduler() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));
  logActivity("⏹ Scheduler Stopped");
}
