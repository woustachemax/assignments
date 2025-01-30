import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export const createTodo = async (userId: number, title: string, description: string)=> {
    await client.connect();
    const newTodo = await client.query(`
        INSERT INTO todos(user_id, title, description, done)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, title, description, false]
        )
        return newTodo.rows[0];
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export const updateTodo = async (todoId: number) =>{
    await client.connect();
    const todoDone = await client.query(`
    UPDATE todos SET done = true WHERE id = $1 RETURNING *`,
        [todoId]);
    return todoDone.rows
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export const getTodos = async(userId: number)=>{
    await client.connect();
    const zuckerberg = await client.query(`
        SELECT * FROM todos where user_id = $1`
        [userId])

        return zuckerberg.rows
}