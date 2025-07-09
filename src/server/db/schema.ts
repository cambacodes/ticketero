// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { env } from "@/env";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

import { organization, user } from "./auth-schema";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `${env.DB_TABLE_FILTER}_${name}`
);

export const ticketStatus = pgEnum("ticket_status", [
  "OPEN",
  "IN_PROGRESS",
  "DONE",
]);

export const ticket = createTable("ticket", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  status: ticketStatus("status").default("OPEN").notNull(),
  deadline: timestamp("deadline", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  bounty: integer("bounty").notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  authorId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  organizationId: text()
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
});

export const comment = createTable("comment", {
  id: uuid().defaultRandom().primaryKey(),
  content: text("content").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => ticket.id, { onDelete: "cascade" }),
  parentCommentId: uuid("parent_comment_id").references(
    (): AnyPgColumn => comment.id,
    {
      onDelete: "cascade",
    }
  ),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const attachment = createTable("attachment", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => ticket.id, { onDelete: "cascade" }),
});

export const userRelations = relations(user, ({ many }) => ({
  tickets: many(ticket),
  comments: many(comment),
  organizations: many(organization),
}));

export const ticketRelations = relations(ticket, ({ one, many }) => ({
  author: one(user, {
    fields: [ticket.authorId],
    references: [user.id],
  }),
  comments: many(comment),
  attachments: many(attachment),
  organization: one(organization, {
    fields: [ticket.organizationId],
    references: [organization.id],
  }),
}));

export const commentRelations = relations(comment, ({ one, many }) => ({
  author: one(user, {
    fields: [comment.authorId],
    references: [user.id],
  }),
  ticket: one(ticket, {
    fields: [comment.ticketId],
    references: [ticket.id],
  }),
  parentComment: one(comment, {
    fields: [comment.parentCommentId],
    references: [comment.id],
    relationName: "parentComment",
  }),
  replies: many(comment, {
    relationName: "parentComment",
  }),
}));

export const attachmentRelations = relations(attachment, ({ one }) => ({
  ticket: one(ticket, {
    fields: [attachment.ticketId],
    references: [ticket.id],
  }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
  tickets: many(ticket),
  users: many(user),
}));

export * from "./auth-schema";
