import { MOCK_USERS } from "@/lib/supabase/mock";
import { createClient } from "@/lib/supabase/server";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<User | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    // Read role from a cookie in mock mode
    const cookieStore = await cookies();
    const roleCookie = cookieStore.get("mock_role");
    const role = roleCookie?.value || "pcc";
    const user = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    return user;
  }

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (!profile) return null;

  return profile as User;
}
