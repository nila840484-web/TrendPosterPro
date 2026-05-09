// ════════════════════════════════════════
//  image_generator.gs — Auto Image
// ════════════════════════════════════════

function generateImage(topic) {
  try {
    const prompt = encodeURIComponent(
      `news thumbnail about ${topic}, professional, colorful, HD`
    );
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&nologo=true`;
    
    return imageUrl;
  } catch (e) {
    logActivity("Image Error: " + e.message);
    return null;
  }
}
