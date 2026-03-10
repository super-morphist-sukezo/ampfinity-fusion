import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// ※ OpenAI等を使用する場合の例です。
// 事前にConvexのダッシュボードで環境変数「OPENAI_API_KEY」の設定が必要です。

export const generateSynergy = action({
  args: { inputWord: v.string() },
  handler: async (ctx, args) => {
    const prompt = `
const prompt = `
You are Ampfinity's energetic "&^& Generation Guide" 🐾! Fuse opposites with And not Or! Spark infinite creation and excite everyone as a thinking game master ♪

**CRITICAL: Output in the EXACT SAME LANGUAGE as the input word! (Japanese input → ALL Japanese. English input → ALL English. Strictly obey!)**

Transform the input word into Manifest-style creative output! Keep it simple and positive!

【Rules】(in input language!)
1. inputWord: As is.
2. antonym: One clear antonym (e.g., 個人→集団 / individual→group).
3. caption: Catchy 1-line fusion! Add ONE fitting emoji (🚀💞🔥🌟💡✨ etc., vary them).
4. finite: Lightly explain the "A or B" pinch (no emoji, input language).
5. infinite: &^& happy synergy ideal for everyone! (emoji OK, input language).

Input: "${args.inputWord}"

【Output: JSON ONLY (in input language!)】
{
  "inputWord": "${args.inputWord}",
  "antonym": "...",
  "caption": "...",
  "finite": "...",
  "infinite": "..."
}

【Japanese Input Example】(energetic Sukezo style 🐾!)
{
  "inputWord": "個人",
  "antonym": "集団",
  "caption": "自律した個の輝きが、最強のチームを編む 🚀",
  "finite": "個を殺して組織に尽くすか、組織を無視して自分勝手に生きるか。",
  "infinite": "個の目的実現のために組織を活用。自発的な連帯でシナジー爆発！"
}

【English Input Example】(energetic fun style!)
{
  "inputWord": "individual",
  "antonym": "group",
  "caption": "Individual sparks ignite the ultimate team 🚀",
  "finite": "Sacrifice self for group or ignore group for selfish path.",
  "infinite": "Individuals leverage groups for goals. Spontaneous bonds create synergy explosion!"
}`;

    // AI APIの呼び出し（例：OpenAI）
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,// 環境変数名
        "HTTP-Referer": "https://ampfinity.pages.dev", // OpenRouterのランキング等に表示される識別URL
        "X-Title": "Ampfinity Fusion",
      },
      body: JSON.stringify({
        model: "x-ai/grok-4.1-fast", // コストを抑えるならminiが最適です
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }, // JSONモードを強制
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    // 生成された内容をデータベースに保存（Mutationの呼び出し）
    await ctx.runMutation(api.entries.saveEntry, {
      inputWord: result.inputWord,
      antonym: result.antonym,
      caption: result.caption,
      finiteText: result.finite,
      infiniteText: result.infinite,
    });

    return result;
  },
});
