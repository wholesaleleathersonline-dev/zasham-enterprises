import { supabase } from "../../lib/supabase/client";
import type { LoginFormData } from "../../lib/validations/login.schema";

export async function signIn(
  data: LoginFormData
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    throw new Error(error.message);
  }
}