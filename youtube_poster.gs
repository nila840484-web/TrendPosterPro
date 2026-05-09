// ════════════════════════════════════════
//  youtube_poster.gs — YouTube Community
// ════════════════════════════════════════

function postToYoutube(title, description) {
  try {
    const smartLink = CONFIG.SMART_LINK;
    const linkText = CONFIG.LINK_TEXT;

    const text = `🔥 ${title}\n\n${description}\n\n👇 ${linkText}: ${smartLink}`;

    const url = "https://www.googleapis.com/youtube/v3/communityPosts?part=snippet";

    const payload = {
      snippet: {
        textOriginal: text
      }
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + ScriptApp.getOAuthToken()
      },
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
    logActivity("YouTube Posted: " + title);
    return true;

  } catch (e) {
    logActivity("YouTube Error: " + e.message);
    return false;
  }
}
