import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://athokjrebrfllgnqiywi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0aG9ranJlYnJmbGxnbnFpeXdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDUwNDAsImV4cCI6MjA3OTgyMTA0MH0.a7ig2RgY96YtS9d4wPMZ0zWo_ndrjUb8kycwuAcS_rw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
