// ════════════════════════════════════════
//  ai_generator.gs — Gemini AI Content
// ════════════════════════════════════════

function generateContent(topic) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;

    const prompt = `
তুমি একজন viral বাংলা news writer।
Topic: "${topic}"

নিচের format এ বাংলায় লেখো:

TITLE: (কৌতূহলজনক title, ৬০ শব্দের মধ্যে, যেন মানুষ click না করে পারে না)
DESCRIPTION: (২-৩ লাইনের আকর্ষণীয় description, শেষে কৌতূহল তৈরি করো)
CATEGORY: (শুধু একটা লেখো: International / Bangladesh / Sports / Entertainment / Technology / Others)

শুধু এই তিনটাই দাও, অন্য কিছু না।
    `;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());
    const text = data.candidates[0].content.parts[0].text;

    const titleMatch = text.match(/TITLE:\s*(.+)/);
    const descMatch = text.match(/DESCRIPTION:\s*([\s\S]+?)(?=CATEGORY:|$)/);
    const catMatch = text.match(/CATEGORY:\s*(.+)/);

    return {
      title: titleMatch ? titleMatch[1].trim() : topic,
      description: descMatch ? descMatch[1].trim() : "",
      category: catMatch ? catMatch[1].trim() : "Others"
    };

  } catch (e) {
    logActivity("AI Error: " + e.message);
    return { title: topic, description: "", category: "Others" };
  }
}
