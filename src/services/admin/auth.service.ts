import { supabase } from "../../lib/supabase/client";
import type { LoginFormData } from "../../lib/validations/login.schema";

export async function signIn(
  data: LoginFormData
): Promise<void> {
const { data: authData, error } =
  await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

console.log("Login Session:", authData.session);
console.log("Login User:", authData.user);

if (error) {
  throw new Error(error.message);
}

  
}