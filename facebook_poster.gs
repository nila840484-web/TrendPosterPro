// ════════════════════════════════════════
//  facebook_poster.gs — Facebook Post
// ════════════════════════════════════════

function postToFacebook(title, description) {
  try {
    const pageId = CONFIG.FACEBOOK_PAGE_ID;
    const token = CONFIG.FACEBOOK_PAGE_TOKEN;
    const smartLink = CONFIG.SMART_LINK;
    const linkText = CONFIG.LINK_TEXT;

    const message = `🔥 ${title}\n\n${description}\n\n👇 ${linkText}\n${smartLink}`;

    const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;

    const payload = {
      message: message,
      access_token: token
    };

    const options = {
      method: "post",
      payload: payload
    };

    UrlFetchApp.fetch(url, options);
    logActivity("Facebook Posted: " + title);
    return true;

  } catch (e) {
    logActivity("Facebook Error: " + e.message);
    return false;
  }
}
