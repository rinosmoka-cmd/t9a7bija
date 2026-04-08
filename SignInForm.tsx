import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").withIndex("by_order").order("desc").collect();
    return Promise.all(
      posts.map(async (post) => {
        const imageUrl = post.imageId ? await ctx.storage.getUrl(post.imageId) : null;
        const likesCount = (await ctx.db.query("likes").withIndex("by_post", (q) => q.eq("postId", post._id)).collect()).length;
        const commentsCount = (await ctx.db.query("comments").withIndex("by_post", (q) => q.eq("postId", post._id)).collect()).length;
        return { ...post, imageUrl, likesCount, commentsCount };
      })
    );
  },
});

export const get = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;
    const imageUrl = post.imageId ? await ctx.storage.getUrl(post.imageId) : null;
    const likesCount = (await ctx.db.query("likes").withIndex("by_post", (q) => q.eq("postId", post._id)).collect()).length;
    const comments = await ctx.db.query("comments").withIndex("by_post", (q) => q.eq("postId", post._id)).order("asc").collect();
    return { ...post, imageUrl, likesCount, comments };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
    adminPassword: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.adminPassword !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const existing = await ctx.db.query("posts").withIndex("by_order").order("desc").first();
    const order = existing ? existing.order + 1 : 0;
    return await ctx.db.insert("posts", {
      title: args.title,
      description: args.description,
      imageId: args.imageId,
      order,
    });
  },
});

export const remove = mutation({
  args: {
    postId: v.id("posts"),
    adminPassword: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.adminPassword !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const likes = await ctx.db.query("likes").withIndex("by_post", (q) => q.eq("postId", args.postId)).collect();
    for (const like of likes) await ctx.db.delete(like._id);
    const comments = await ctx.db.query("comments").withIndex("by_post", (q) => q.eq("postId", args.postId)).collect();
    for (const comment of comments) await ctx.db.delete(comment._id);
    await ctx.db.delete(args.postId);
  },
});

export const generateUploadUrl = mutation({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    if (args.adminPassword !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
