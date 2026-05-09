// ════════════════════════════════════════
//  ai_generator.gs — Gemini AI Content
// ════════════════════════════════════════

function generateContent(topic) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const prompt = `
তুমি একজন viral content writer।
Topic: "${topic}"

নিচের format এ বাংলায় লেখো:

TITLE: (কৌতূহলজনক title যেন মানুষ click না করে পারে না, ৬০ শব্দের মধ্যে)
DESCRIPTION: (২-৩ লাইনের আকর্ষণীয় description, শেষে কৌতূহল তৈরি করো)

শুধু TITLE আর DESCRIPTION দাও, অন্য কিছু না।
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
    const descMatch = text.match(/DESCRIPTION:\s*([\s\S]+)/);

    return {
      title: titleMatch ? titleMatch[1].trim() : topic,
      description: descMatch ? descMatch[1].trim() : ""
    };

  } catch (e) {
    logActivity("AI Error: " + e.message);
    return { title: topic, description: "" };
  }
}
