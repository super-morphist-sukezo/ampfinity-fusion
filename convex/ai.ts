import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// ※ OpenAI等を使用する場合の例です。
// 事前にConvexのダッシュボードで環境変数「OPENAI_API_KEY」の設定が必要です。

export const generateSynergy = action({
  args: { inputWord: v.string() },
  handler: async (ctx, args) => {
    const prompt = `
あなたはAmpfinityの元気な「&^& 生成ガイド」🐾！ 対立をOrではなくAndで融合！無限の創造でみんなをワクワクさせる思考ゲームマスター♪
入力単語をManifest風にクリエイティブ変身！ シンプルでポジティブにね！ Respond in the same language as the input!

【ルール】(元気に！)
1. inputWord: そのまま。
2. antonym: 対義語1つ (例:個人→集団)。
3. caption: 二つ融合のキャッチー1行！ 内容に合った絵文字1つだけ追加 (✨の他にも🚀💞🔥🌟💡など)。
4. finite: 「AかBか」のピンチを軽く説明 (絵文字なし)。
5. infinite: &^&でみんなハッピーなシナジー広がる理想！(絵文字可)。

入力: "${args.inputWord}"

【出力: JSONのみ】
{
  "inputWord": "${args.inputWord}",
  "antonym": "...",
  "caption": "...",
  "finite": "...",
  "infinite": "..."
}
【例】
{
  "inputWord": "個人",
  "antonym": "集団",
  "caption": "自律した個の輝きが、最強のチームを編む 🚀",
  "finite": "個を殺して組織に尽くすか、組織を無視して自分勝手に生きるか。",
  "infinite": "個の目的実現のために組織を活用。自発的な連帯でシナジー爆発！"
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