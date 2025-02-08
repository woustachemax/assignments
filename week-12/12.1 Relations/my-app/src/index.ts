import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'


const app = new Hono();
const prisma = new PrismaClient();

app.get('/surveys', (c) => {
  return c.text('Hello Hono!')
})

export default app
