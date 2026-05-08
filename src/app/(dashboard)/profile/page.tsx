import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Profile</h1>
        <p className="mt-2 text-slate-500">Your account information.</p>
      </div>

      <Card>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-950">{user?.email}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-1 text-slate-950">{profile?.name || "-"}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Role</dt>
            <dd className="mt-1 text-slate-950">{profile?.role || "user"}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
