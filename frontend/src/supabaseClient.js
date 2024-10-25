// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dsqvkfkgrtxqwoxxcfcq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcXZrZmtncnR4cXdveHhjZmNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTEzMjYsImV4cCI6MjA0NDU4NzMyNn0.tJTO0kZHVeBThtsvYVh-5lecP1fuuJOVGAg2tiVho6Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
