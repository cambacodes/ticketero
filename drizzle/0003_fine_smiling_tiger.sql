ALTER TABLE "t_attachment" ALTER COLUMN "ticket_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "t_attachment" ADD COLUMN "comment_id" uuid;--> statement-breakpoint
ALTER TABLE "t_attachment" ADD CONSTRAINT "t_attachment_comment_id_t_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."t_comment"("id") ON DELETE cascade ON UPDATE no action;