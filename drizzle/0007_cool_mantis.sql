ALTER TABLE "ticketero_comment" DROP CONSTRAINT "ticketero_comment_parentCommentId_ticketero_comment_id_fk";
--> statement-breakpoint
ALTER TABLE "ticketero_comment" DROP COLUMN "parentCommentId";