CREATE TABLE `athletes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL,
	`prenom` text NOT NULL,
	`nationalite` text NOT NULL,
	`date_naissance` text,
	`poste` text,
	`biographie` text NOT NULL,
	`fiabilite` text DEFAULT 'non_verifie' NOT NULL,
	`officiel` integer DEFAULT false NOT NULL,
	`a_la_une` integer DEFAULT false NOT NULL,
	`sport_id` integer NOT NULL,
	FOREIGN KEY (`sport_id`) REFERENCES `sports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `page_tags` (
	`page_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`page_id`, `tag_id`),
	FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titre` text NOT NULL,
	`resume` text NOT NULL,
	`contenu` text NOT NULL,
	`fiabilite` text DEFAULT 'non_verifie' NOT NULL,
	`officielle` integer DEFAULT false NOT NULL,
	`a_la_une` integer DEFAULT false NOT NULL,
	`date_modification` integer DEFAULT (unixepoch()) NOT NULL,
	`sport_id` integer NOT NULL,
	FOREIGN KEY (`sport_id`) REFERENCES `sports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pages_titre_unique` ON `pages` (`titre`);--> statement-breakpoint
CREATE TABLE `sports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL,
	`description` text NOT NULL,
	`type` text NOT NULL,
	CONSTRAINT "type_valide" CHECK("sports"."type" IN ('collectif', 'individuel'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sports_nom_unique` ON `sports` (`nom`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_nom_unique` ON `tags` (`nom`);