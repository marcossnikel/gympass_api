import 'dotenv/config'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'
// DATABASE_URL="postgresql://docker:docker@localhost:5432/api-gympass-pg?schema=public"

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Provide a database URL')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const prismaEnvironment: Environment = {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}

export default prismaEnvironment
