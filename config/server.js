import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

const serverConfig = {
  isProduction: process.env.NODE_ENV === 'production',
  db: {
    URL: process.env.SUPABASE_URL,
    SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
}

export default serverConfig
