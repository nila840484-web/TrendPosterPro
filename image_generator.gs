// ════════════════════════════════════════
//  image_generator.gs — Smart Image
// ════════════════════════════════════════

function isCopyrightSensitive(topic) {
  const t = topic.toLowerCase();
  return CONFIG.COPYRIGHT_TOPICS.some(word => t.includes(word));
}

function generateImage(topic) {
  try {
    let prompt;

    if (isCopyrightSensitive(topic)) {
      // Anime style — copyright safe
      prompt = encodeURIComponent(
        `anime style illustration about ${topic}, colorful, professional, no real person face, artistic`
      );
    } else {
      // Normal style
      prompt = encodeURIComponent(
        `news thumbnail about ${topic}, professional, HD, colorful, photorealistic`
      );
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&nologo=true`;
    return imageUrl;

  } catch (e) {
    logActivity("Image Error: " + e.message);
    return null;
  }
}
