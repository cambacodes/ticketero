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
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema";

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
});

export const userRelations = relations(user, ({ many }) => ({
  tickets: many(ticket),
}));

export const ticketRelations = relations(ticket, ({ one }) => ({
  author: one(user, {
    fields: [ticket.authorId],
    references: [user.id],
  }),
}));

export * from "./auth-schema";
