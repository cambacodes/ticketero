CREATE TYPE "public"."ticket_status" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
CREATE TABLE "t_comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"author_id" text NOT NULL,
	"ticket_id" uuid NOT NULL,
	"parent_comment_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "t_ticket" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"status" "ticket_status" DEFAULT 'OPEN' NOT NULL,
	"deadline" timestamp with time zone NOT NULL,
	"bounty" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"authorId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"inviter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_member" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "t_organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"created_at" timestamp NOT NULL,
	"metadata" text,
	CONSTRAINT "t_organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "t_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"active_organization_id" text,
	CONSTRAINT "t_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "t_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "t_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "t_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "t_comment" ADD CONSTRAINT "t_comment_author_id_t_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_comment" ADD CONSTRAINT "t_comment_ticket_id_t_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."t_ticket"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_comment" ADD CONSTRAINT "t_comment_parent_comment_id_t_comment_id_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."t_comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_ticket" ADD CONSTRAINT "t_ticket_authorId_t_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_account" ADD CONSTRAINT "t_account_user_id_t_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_invitation" ADD CONSTRAINT "t_invitation_organization_id_t_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."t_organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_invitation" ADD CONSTRAINT "t_invitation_inviter_id_t_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_member" ADD CONSTRAINT "t_member_organization_id_t_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."t_organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_member" ADD CONSTRAINT "t_member_user_id_t_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "t_session" ADD CONSTRAINT "t_session_user_id_t_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."t_user"("id") ON DELETE cascade ON UPDATE no action;