CREATE TYPE "public"."attachment_entity" AS ENUM('TICKET', 'COMMENT');--> statement-breakpoint
ALTER TABLE "t_attachment" ADD COLUMN "entity" "attachment_entity" DEFAULT 'TICKET' NOT NULL;