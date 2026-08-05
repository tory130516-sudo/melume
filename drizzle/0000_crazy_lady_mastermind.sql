CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`specialization` text NOT NULL,
	`experience` text NOT NULL,
	`work_formats` text NOT NULL,
	`other_format` text,
	`brands` text NOT NULL,
	`social_url` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_created_at_idx` ON `leads` (`created_at`);