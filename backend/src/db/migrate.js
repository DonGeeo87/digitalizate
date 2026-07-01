import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pool from './pool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const schema = fs.readFileSync(join(__dirname, 'schema.sql'), 'utf-8')
  try {
    await pool.query(schema)
    console.log('✅ Migration completed successfully')
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  }
  await pool.end()
}

migrate()