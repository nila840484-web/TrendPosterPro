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

    if (CONFIG.MODE_WEBSITE) {
      postToBlogger(title, description, imageUrl, topic);
    }
    if (CONFIG.MODE_TELEGRAM) {
      postToTelegram(title, description, imageUrl);
    }
    if (CONFIG.MODE_FACEBOOK) {
      postToFacebook(title, description);
    }
    if (CONFIG.MODE_YOUTUBE) {
      postToYoutube(title, description);
    }

    markAsPosted(topic);
    logActivity("✅ Done: " + title);

  } catch (e) {
    logActivity("Scheduler Error: " + e.message);
  }
}

function startScheduler() {
  ScriptApp.newTrigger("runAll")
    .timeBased()
    .everyMinutes(CONFIG.POST_INTERVAL_MINUTES)
    .create();
  logActivity("✅ Scheduler Started");
}

function stopScheduler() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));
  logActivity("⏹ Scheduler Stopped");
}
