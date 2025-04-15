
import { integer, pgTable,  serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const chat=pgTable('side_chats',{
    id:serial('id').primaryKey(),
    chatName:text('name').notNull(),
    chatUrl:text('url').notNull(),
    createdAt:timestamp('created_at').notNull().defaultNow(),
    userId:varchar('user_id',{length:256}).notNull(),
    key:text('key').notNull(),


})

export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chat.id)
    .notNull(),
  msgContext: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role:userSystemEum 
});