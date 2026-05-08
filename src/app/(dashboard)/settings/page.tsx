import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
        <p className="mt-2 text-slate-500">Application settings placeholder.</p>
      </div>

      <Card>
        <h2 className="text-lg font-bold">General</h2>
        <p className="mt-2 text-sm text-slate-500">
          Add team settings, billing, integrations, notification preferences, and
          role management here.
        </p>
      </Card>
    </div>
  );
}
