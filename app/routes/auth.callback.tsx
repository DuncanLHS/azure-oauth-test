import { redirect, type LoaderFunctionArgs } from "@vercel/remix";
import { createSupabaseServerClient } from "~/lib/supabase/server-client";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();

  if (code) {
    const { supabase, headers } = createSupabaseServerClient({ request });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
    console.error("Error exchanging code for session:", error.message);
  }

  // return the user to an error page with instructions
  return redirect("/auth/auth-code-error", { headers });
}
