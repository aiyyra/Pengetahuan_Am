// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  // pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  pgTable,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

// Pengetahuan Am Score Table
export const pengetahuan_am_score_table = pgTable("pengetahuan_am_score", {
  id: serial("id").primaryKey(),
  topicA: integer("topicA").notNull(),
  topicB: integer("topicB").notNull(),
  topicC: integer("topicC").notNull(),
  topicD: integer("topicD").notNull(),

  userId: varchar("userId", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

// Test Table
export const test_table = pgTable("test", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// export const createTable = pgTableCreator((name) => `t3gallery_${name}`);

// export const pengetahuan_am_score_table = createTable(
//   "pengetahuan_am_score",
//   {
//     id: serial("id").primaryKey(),
//     topicA: integer().notNull(),
//     topicB: integer().notNull(),
//     topicC: integer().notNull(),
//     topicD: integer().notNull(),

//     userId: varchar("userId", { length: 256 }).notNull(),

//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   }
// );

// export const test_table = createTable("test", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   createdAt: timestamp("created_at")
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
// });