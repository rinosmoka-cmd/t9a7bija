import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  posts: defineTable({
    title: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
    order: v.number(),
  }).index("by_order", ["order"]),

  likes: defineTable({
    postId: v.id("posts"),
    fingerprint: v.string(),
  })
    .index("by_post", ["postId"])
    .index("by_post_and_fingerprint", ["postId", "fingerprint"]),

  comments: defineTable({
    postId: v.id("posts"),
    author: v.string(),
    body: v.string(),
  }).index("by_post", ["postId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
