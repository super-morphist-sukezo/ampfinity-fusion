import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * 1. 入力された単語が既にデータベースにあるかを確認するクエリ
 * インデックスを利用して高速に検索します
 */
export const getByInputWord = query({
  args: { inputWord: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("synergyEntries")
      .withIndex("by_inputWord", (q) => q.eq("inputWord", args.inputWord))
      .unique();
  },
});

/**
 * 1-2. 保存済みエントリを新しい順で一覧取得するクエリ
 */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("synergyEntries").order("desc").collect();
  },
});

/**
 * 2. 新しく生成された「対義語・キャプション・解説」をデータベースに保存するミューテーション
 */
export const saveEntry = mutation({
  args: {
    inputWord: v.string(),
    antonym: v.string(),
    caption: v.string(),
    finiteText: v.string(),
    infiniteText: v.string(),
  },
  handler: async (ctx, args) => {
    const newEntryId = await ctx.db.insert("synergyEntries", {
      inputWord: args.inputWord,
      antonym: args.antonym,
      caption: args.caption,
      finiteText: args.finiteText,
      infiniteText: args.infiniteText,
      createdAt: Date.now(),
    });
    return newEntryId;
  },
});
