// ════════════════════════════════════════
//  trends.gs — Google Trends Fetcher
// ════════════════════════════════════════

function getTrendingTopics() {
  try {
    const country = CONFIG.TRENDS_COUNTRY || "BD";
    const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${country}`;
    
    const response = UrlFetchApp.fetch(url);
    const xml = response.getContentText();
    const doc = XmlService.parse(xml);
    const root = doc.getRootElement();
    const channel = root.getChild("channel");
    const items = channel.getChildren("item");
    
    const topics = [];
    items.forEach(item => {
      const title = item.getChildText("title");
      if (title && !isAlreadyPosted(title)) {
        topics.push(title);
      }
    });
    
    return topics;
  } catch (e) {
    logActivity("Trends Error: " + e.message);
    return [];
  }
}

function getNextTopic() {
  const topics = getTrendingTopics();
  if (topics.length === 0) return null;
  return topics[0];
}
