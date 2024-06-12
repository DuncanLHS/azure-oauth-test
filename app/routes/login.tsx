import { redirect, json } from "@vercel/remix";
import type { ActionFunctionArgs } from "@vercel/remix";
import { createSupabaseServerClient } from "~/lib/supabase/server-client";
import { getSiteUrl } from "~/lib/utils";

export async function loader({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient({ request });

  const siteUrl = getSiteUrl();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "profile email",
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return json({ error }, { status: 500 });
  }

  return redirect(data.url, { headers });
}
