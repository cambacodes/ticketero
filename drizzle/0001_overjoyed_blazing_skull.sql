CREATE TABLE "t_attachment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"ticket_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "t_attachment" ADD CONSTRAINT "t_attachment_ticket_id_t_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."t_ticket"("id") ON DELETE cascade ON UPDATE no action;