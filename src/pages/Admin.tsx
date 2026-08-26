import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { processImageFile } from "@/lib/imageUpload";
import { Loader2, Trash2, Upload } from "lucide-react";

type TrackingRow = {
  tracking_number: string;
  owner_name: string | null;
  status: string;
  progress: number | null;
  from_location: string;
  to_location: string;
  estimated_delivery: string | null;
  estimated_delivery_at: string | null;
  image_url: string | null;
  image_data: string | null;
};

const emptyForm: TrackingRow = {
  tracking_number: "",
  owner_name: "",
  status: "In Transit",
  progress: 0,
  from_location: "USPS FACILITY",
  to_location: "",
  estimated_delivery: "",
  estimated_delivery_at: "",
  image_url: "",
  image_data: null,
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<TrackingRow[]>([]);
  const [form, setForm] = useState<TrackingRow>(emptyForm);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [busy, setBusy] = useState(false);

  const call = async (action: string, payload?: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-tracking", {
      body: { password, action, payload },
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const loadRows = async () => {
    const data = await call("list");
    setRows(data.data ?? []);
  };

  const handleLogin = async () => {
    setBusy(true);
    try {
      await call("login");
      setAuthed(true);
      await loadRows();
    } catch (e) {
      toast({ title: "Login failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    const result = await processImageFile(file);
    if ("error" in result) {
      toast({ title: "Invalid image", description: result.error, variant: "destructive" });
      return;
    }
    setForm((f) => ({ ...f, image_data: result.dataUrl }));
  };

  const handleSave = async () => {
    if (!form.tracking_number.trim()) {
      toast({ title: "Tracking number required", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      await call(mode, {
        tracking_number: form.tracking_number.trim(),
        owner_name: form.owner_name || null,
        status: form.status,
        progress: Number(form.progress) || 0,
        from_location: form.from_location,
        to_location: form.to_location,
        estimated_delivery: form.estimated_delivery || null,
        estimated_delivery_at: form.estimated_delivery_at || null,
        image_url: form.image_url || null,
        image_data: form.image_data,
      });
      toast({ title: mode === "create" ? "Tracking created" : "Tracking updated" });
      await loadRows();
      if (mode === "create") setForm(emptyForm);
    } catch (e) {
      toast({ title: "Save failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteImage = async (trackingNumber: string) => {
    setBusy(true);
    try {
      await call("delete_image", { tracking_number: trackingNumber });
      toast({ title: "Image removed", description: "The tracking record was kept." });
      setForm((f) => (f.tracking_number === trackingNumber ? { ...f, image_data: null } : f));
      await loadRows();
    } catch (e) {
      toast({ title: "Delete failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const editRow = (row: TrackingRow) => {
    setMode("update");
    setForm({
      ...row,
      owner_name: row.owner_name ?? "",
      estimated_delivery: row.estimated_delivery ?? "",
      estimated_delivery_at: row.estimated_delivery_at ? row.estimated_delivery_at.slice(0, 16) : "",
      image_url: row.image_url ?? "",
      progress: row.progress ?? 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-sm px-6 py-16">
          <h1 className="mb-6 text-2xl font-bold">Admin access</h1>
          <div className="space-y-3">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button className="w-full" onClick={handleLogin} disabled={busy || !password}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8 space-y-10">
        <section className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">{mode === "create" ? "New tracking" : "Edit tracking"}</h1>
            <Button
              variant="outline"
              onClick={() => {
                setMode("create");
                setForm(emptyForm);
              }}
            >
              New entry
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tracking number</Label>
              <Input
                value={form.tracking_number}
                disabled={mode === "update"}
                onChange={(e) => setForm({ ...form, tracking_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Owner name</Label>
              <Input value={form.owner_name ?? ""} onChange={(e) => setForm({ ...form, owner_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Progress (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={form.progress ?? 0}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Input value={form.from_location} onChange={(e) => setForm({ ...form, from_location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input value={form.to_location} onChange={(e) => setForm({ ...form, to_location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Estimated delivery (display text)</Label>
              <Input
                value={form.estimated_delivery ?? ""}
                onChange={(e) => setForm({ ...form, estimated_delivery: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Estimated delivery timestamp</Label>
              <Input
                type="datetime-local"
                value={form.estimated_delivery_at ?? ""}
                onChange={(e) => setForm({ ...form, estimated_delivery_at: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Label>Package image (JPG, PNG or WEBP, max 500 KB)</Label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm">
                <Upload className="h-4 w-4" />
                Choose image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
              {form.image_data && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.tracking_number && mode === "update"
                      ? handleDeleteImage(form.tracking_number)
                      : setForm({ ...form, image_data: null })
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove image
                </Button>
              )}
            </div>
            {form.image_data && (
              <img src={form.image_data} alt="Package preview" className="h-40 w-auto rounded-lg border object-contain" />
            )}
          </div>

          <Button className="mt-6" onClick={handleSave} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "create" ? "Create tracking" : "Save changes"}
          </Button>
        </section>

        <section className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Tracking entries</h2>
          <div className="space-y-3">
            {rows.map((row) => (
              <div key={row.tracking_number} className="flex flex-wrap items-center gap-4 rounded-md border p-3">
                {row.image_data || row.image_url ? (
                  <img
                    src={row.image_data ?? row.image_url ?? ""}
                    alt={`Package ${row.tracking_number}`}
                    className="h-14 w-14 rounded object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded bg-muted" />
                )}
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold">{row.tracking_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {row.status} · {row.progress ?? 0}% · {row.to_location}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => editRow(row)}>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!row.image_data}
                  onClick={() => handleDeleteImage(row.tracking_number)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
