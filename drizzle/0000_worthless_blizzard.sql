CREATE TABLE "t3gallery_pengetahuan_am_score" (
	"id" serial PRIMARY KEY NOT NULL,
	"topicA" integer NOT NULL,
	"topicB" integer NOT NULL,
	"topicC" integer NOT NULL,
	"topicD" integer NOT NULL,
	"userId" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
