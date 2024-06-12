import { Form, json, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { createSupabaseServerClient } from "~/lib/supabase/server-client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createSupabaseServerClient({ request });

  const { data: user } = await supabase.auth.getUser();

  return json(user);
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {user ? (
        <div>
          <p>
            You are logged in as{" "}
            <strong>{user.user_metadata?.full_name || "unknown"}</strong>.
          </p>
          <Form method="post" action="/logout">
            <button type="submit">Logout</button>
          </Form>
        </div>
      ) : (
        <p>
          You are not logged in. <a href="/login">Log in</a>
        </p>
      )}
    </div>
  );
}
