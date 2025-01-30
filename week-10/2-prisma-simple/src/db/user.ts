import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export const createUser = async (username: string, password: string, name: string) =>{
    const res = await prisma.user.create({
        data: {
            username,
            password,
            name
        }
    })

    return res;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export const getUser =  async (userId: number)=>{
    const res = await prisma.user.findUnique({ where:{id: userId}   
    })
    return res
    
}
