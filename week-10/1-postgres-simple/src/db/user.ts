import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export const createUser =  async (username: string, password: string, name: string)=> {
    await client.connect();
    const result = await client.query(`
            INSERT INTO users(
            username, password, name) VALUES ($1, $2, $3) 
            RETURNING *
        `)
        return result.rows[0]
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export const getUser = async (userId: number) =>{
        await client.connect();
        const data = await client.query( `
            SELECT * FROM  USERS where id=$1`, [userId])
}
