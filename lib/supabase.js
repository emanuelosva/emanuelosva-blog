import { createClient } from '@supabase/supabase-js'
import serverConfig from '@/config/server'

const supabase = createClient(
  serverConfig.db.URL,
  serverConfig.db.SERVICE_KEY
)

export default supabase
