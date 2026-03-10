import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 思考ゲームのデータを蓄積するテーブル
  synergyEntries: defineTable({
    // ユーザーが入力した元の単語 (例: "個人")
    inputWord: v.string(),
    
    // AIが抽出した対義語 (例: "集団")
    antonym: v.string(),
    
    // 二つを融合させたキャプション
    // (例: "自律した個の輝きが、最強のチームを編む")
    caption: v.string(),
    
    // Finite: 二者択一の限定的な視点
    finiteText: v.string(),
    
    // Infinite: 統合・相乗効果の視点
    infiniteText: v.string(),

    // 作成日時（管理用）
    createdAt: v.number(),
  })
  // inputWord で検索をかけるため、インデックスを作成
  .index("by_inputWord", ["inputWord"]),
});