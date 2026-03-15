"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setInstallPrompt(null);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 lg:left-auto lg:right-6 lg:w-80 bg-white rounded-xl shadow-lg border border-[#d6d8d7] p-4 animate-fade-in safe-bottom">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#f87b4d] text-white flex items-center justify-center flex-shrink-0">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm text-gray-900">Install Mello</p>
          <p className="text-xs text-gray-500 mt-0.5">Add to home screen for quick access</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={handleInstall}>
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowBanner(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
