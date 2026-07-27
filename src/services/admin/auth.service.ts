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

console.log("Login Error:", error);
console.log("Login Session:", authData.session);
console.log("Login User:", authData.user);

alert(JSON.stringify({
  error: error?.message,
  hasSession: !!authData.session,
  hasUser: !!authData.user,
}));

console.log("Login Session:", authData.session);
console.log("Login User:", authData.user);

if (error) {
  throw new Error(error.message);
}

  
}