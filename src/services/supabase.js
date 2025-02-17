import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://aicmwgiqfaeoqifpuxqx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpY213Z2lxZmFlb3FpZnB1eHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0MDkxMjgsImV4cCI6MjA0NTk4NTEyOH0.xbv3e7XAQmQs_yYbukhlDlAamUh6bOSNntECI7ijiYY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
