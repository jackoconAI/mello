import { createMockClient } from "@/lib/supabase/mock";
import { createClient as createRealClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getClient(): Promise<any> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return createMockClient();
  }
  return createRealClient();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getClientSync(): any {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return createMockClient();
  }
  throw new Error("Cannot get sync client in production — use getClient() instead");
}
