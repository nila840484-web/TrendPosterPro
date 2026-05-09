// ════════════════════════════════════════
//  telegram_poster.gs — Telegram Post
// ════════════════════════════════════════

function postToTelegram(title, description, imageUrl) {
  try {
    const token = CONFIG.TELEGRAM_BOT_TOKEN;
    const chatId = CONFIG.TELEGRAM_CHANNEL_ID;
    const smartLink = CONFIG.SMART_LINK;
    const linkText = CONFIG.LINK_TEXT;

    const message = `
🔥 *${title}*

${description}

👇 [${linkText}](${smartLink})
    `;

    const url = `https://api.telegram.org/bot${token}/sendPhoto`;

    const payload = {
      chat_id: chatId,
      photo: imageUrl,
      caption: message,
      parse_mode: "Markdown"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
    logActivity("Telegram Posted: " + title);
    return true;

  } catch (e) {
    logActivity("Telegram Error: " + e.message);
    return false;
  }
}
