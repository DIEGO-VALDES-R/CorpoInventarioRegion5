import { createClient } from '@supabase/supabase-js';

// En un entorno de producción real en Vercel, estas deberían ser variables de entorno
// import.meta.env.VITE_SUPABASE_URL y import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseUrl = 'https://qwjawulzcbddsijebncb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3amF3dWx6Y2JkZHNpamVibmNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODUxODMzOCwiZXhwIjoyMDg0MDk0MzM4fQ._sDIeAncdzXsZwdroz-81Y921O3byNGuGP2KnjjieeA';

export const supabase = createClient(supabaseUrl, supabaseKey);
