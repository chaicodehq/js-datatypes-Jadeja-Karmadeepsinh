/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  // Your code here
  if(typeof message !== "string") return null;

  const commaIdx = message.indexOf(", ");
  const dashIdx = message.indexOf(" - ");
  const colonIdx = message.indexOf(": ", dashIdx);

  if(commaIdx === -1 || dashIdx === -1 || colonIdx === -1) return null;

  const date = message.slice(0, commaIdx);
  const time = message.slice(commaIdx + ", ".length, dashIdx);
  const sender = message.slice(dashIdx + " - ".length, colonIdx);
  const text = message.slice(colonIdx + ": ".length).trim();

  const words = text.split(/\s+/).filter(word => Boolean(word)); // or use .filter(Boolean) shorthand
  const wordCount = words.length;

  const lower = text.toLowerCase();

  let sentiment = "neutral";
  const hasFunny = lower.includes("😂") || lower.includes(":)") || lower.includes("haha");
  const hasLove = lower.includes("❤") || lower.includes("love") || lower.includes("pyaar");

  if(hasFunny) sentiment = "funny";
  else if(hasLove) sentiment = "love";

  return { date: date, time: time, sender: sender, text: text, wordCount: wordCount, sentiment: sentiment };
}


// if(typeof message !== "string" || message === "") return null;
  // if(!message.includes(" - ") || !message.includes(": ")) return null;
  // const comma = message.indexOf(", ");
  // const dash = message.indexOf(" - ");
  // const colan = message.indexOf(": ");
  
  // const date = message.slice(0, comma);
  // const time = message.slice(comma + 2, dash);
  // const sender = message.slice(dash + 3, colan);
  // const msg = message.slice(colan + 2);

  // const msgArr = msg.split(/\s+/);
  // let senti;
  // if((msgArr.includes("😂") || msgArr.includes(":)") || msgArr.includes("haha")) && (msgArr.includes("❤") || msgArr.includes("love") || msgArr.includes("pyaar"))) senti = "funny";
  // else if(msgArr.includes("😂") || msgArr.includes(":)") || msgArr.includes("haha")) senti = "funny";
  // else if(msgArr.includes("❤") || msgArr.includes("love") || msgArr.includes("pyaar")) senti = "love";
  // else senti = "neutral";

  // return { date: date, time:time, sender:sender, text:msg, wordCount:msgArr.length, sentiment:senti };
