import db from "../db/drizzle";
import { todo } from "../db/schema";
import { asc, eq, not } from "drizzle-orm";

/** inserts a new record into todo table */
export const addTodo = async (id: number, text: string) => {
  await db.insert(todo).values({
    id: id,
    text: text,
  });
};

/** fetch all todos sorted by id */
export const getData = async () => {
  const data = await db.select().from(todo).orderBy(asc(todo.id));

  return data;
};

/** updates the text of a todo by its id */
export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));
};

/** toggles status of a todo to its opposite state */
export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
};

/** deletes a todo by id */
export const deleteToodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));
};