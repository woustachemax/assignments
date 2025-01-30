import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
export const createTodo =  async (userId: number, title: string, description: string)=> {
    const res = await prisma.todo.create({
        data: {
            userId,
            title,
            description,
            done: false,
         }
    })

    return(res)
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
export const updateTodo = async(todoId: number)=> {
    const res = await prisma.todo.update({
       where: {id: todoId}, 
       data: {
        done: true
       }
    })
    return(res)
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
export const getTodos =  async(userId: number)=>{
    const res = await prisma.todo.findMany({
        where: {userId: userId}
    })
    return(res)
}