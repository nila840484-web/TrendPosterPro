// ════════════════════════════════════════
//  blogger_poster.gs — Website Post
// ════════════════════════════════════════

function postToBlogger(title, description, imageUrl, topic, category) {
  try {
    const cloakedLink = "https://newsfromeworld.blogspot.com/p/go.html";
    const linkText = CONFIG.LINK_TEXT;

    const content = `
<div style="font-family:Arial,sans-serif;max-width:800px;margin:auto">
  <img src="${imageUrl}" style="width:100%;border-radius:8px" alt="${topic}"/>
  <br/><br/>
  <p style="font-size:17px;line-height:1.8;color:#333">${description}</p>
  <br/>
  <div style="text-align:center;margin:30px 0">
    <a href="${cloakedLink}"
       style="background:#FF6B00;color:white;padding:15px 30px;
              border-radius:8px;text-decoration:none;font-size:18px;font-weight:bold">
      ${linkText}
    </a>
  </div>
</div>
    `;

    const url = `https://www.googleapis.com/blogger/v3/blogs/${CONFIG.BLOGGER_BLOG_ID}/posts/`;

    const payload = {
      kind: "blogger#post",
      title: title,
      content: content,
      labels: [category]
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
    logActivity("Blogger Posted: " + title);
    return true;

  } catch (e) {
    logActivity("Blogger Error: " + e.message);
    return false;
  }
}
