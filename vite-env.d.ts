import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const toggleLike = mutation({
  args: {
    postId: v.id("posts"),
    fingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("likes")
      .withIndex("by_post_and_fingerprint", (q) =>
        q.eq("postId", args.postId).eq("fingerprint", args.fingerprint)
      )
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
      return false;
    } else {
      await ctx.db.insert("likes", { postId: args.postId, fingerprint: args.fingerprint });
      return true;
    }
  },
});

export const hasLiked = query({
  args: {
    postId: v.id("posts"),
    fingerprint: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("likes")
      .withIndex("by_post_and_fingerprint", (q) =>
        q.eq("postId", args.postId).eq("fingerprint", args.fingerprint)
      )
      .unique();
    return !!existing;
  },
});

export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    author: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.author.trim() || !args.body.trim()) throw new Error("Author and body required");
    return await ctx.db.insert("comments", {
      postId: args.postId,
      author: args.author.trim(),
      body: args.body.trim(),
    });
  },
});
