import pg from 'pg'

const pool = new pg.Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'digitalizate',
  user: process.env.PGUSER || 'digitalizate',
  password: process.env.PGPASSWORD || 'digitalizate_secret',
  max: 10,
  idleTimeoutMillis: 30000,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export default pool