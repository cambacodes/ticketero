import type { user } from "@/server/db/schema";
import { type comment } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type BaseComment = InferSelectModel<typeof comment>;
export type AuthorUser = Pick<InferSelectModel<typeof user>, "id" | "name">;

export type CommentWithParent = BaseComment & {
  author: AuthorUser;
  isOwner: boolean;
  parent: BaseComment & { author: AuthorUser };
};

export type CommentWithOptionalParent = BaseComment & {
  author: AuthorUser;
  isOwner: boolean;
  parent: (BaseComment & { author: AuthorUser }) | null;
};

export type CommentWithMetadata = CommentWithOptionalParent & {
  replies: CommentWithParent[];
};
