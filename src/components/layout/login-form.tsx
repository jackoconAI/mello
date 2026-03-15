"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, HardHat } from "lucide-react";

const MOCK_ROLES = [
  {
    role: "pcc",
    label: "Pre-Construction Consultant",
    description: "Create & scope jobs",
    icon: ClipboardList,
    email: "pcc@entrusted.com",
  },
  {
    role: "es",
    label: "Estimating & Scheduling",
    description: "Schedule & estimate jobs",
    icon: Users,
    email: "es@entrusted.com",
  },
  {
    role: "psl",
    label: "Project Service Lead",
    description: "Manage assigned projects",
    icon: HardHat,
    email: "psl@entrusted.com",
  },
];

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  async function handleMockLogin(role: string) {
    setLoading(true);
    document.cookie = `mock_role=${role};path=/;max-age=86400`;
    router.push("/board");
  }

  async function handleRealLogin(formData: FormData) {
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/board");
    } else {
      setLoading(false);
    }
  }

  if (isMock) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Select Your Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_ROLES.map((r) => (
            <button
              key={r.role}
              onClick={() => handleMockLogin(r.role)}
              disabled={loading}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#d6d8d7] hover:border-[#f87b4d] hover:bg-[#fef0eb] transition-all text-left group disabled:opacity-50"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#f87b4d]/10 text-[#f87b4d] flex items-center justify-center group-hover:bg-[#f87b4d] group-hover:text-white transition-colors">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{r.label}</div>
                <div className="text-sm text-gray-500">{r.description}</div>
              </div>
            </button>
          ))}
          <p className="text-xs text-center text-gray-400 mt-4">
            Mock mode — no real authentication
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleRealLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@entrusted.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
