import type { ActionFunctionArgs } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { createSupabaseServerClient } from "~/lib/supabase/server-client";

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient({ request });
  await supabase.auth.signOut();
  return redirect("/", { headers });
}
