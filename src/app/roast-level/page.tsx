"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const roastLevels = [
  { value: "gentle", label: "Gentle", description: "Constructive feedback with a soft touch" },
  { value: "balanced", label: "Balanced", description: "Mix of tough love and helpful advice" },
  { value: "brutal", label: "Brutal", description: "No holds barred, prepare for impact" },
];

export default function RoastLevelPage() {
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastLevel, setRoastLevel] = useState<string>("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedVC(localStorage.getItem("selectedVC"));
    }
  }, []);

  const handleRoast = async () => {
    setError(null);
    setLoading(true);
    try {
      const fileDataUrl = sessionStorage.getItem("uploadedFile");
      const fileName = sessionStorage.getItem("uploadedFileName") || "deck.pdf";
      const userName = localStorage.getItem("userName") || "";
      if (!fileDataUrl || !selectedVC) {
        setError("Missing file or VC selection. Please start over.");
        setLoading(false);
        return;
      }
      // Convert base64 to Blob
      const dataURLtoBlob = (dataurl: string) => {
        const arr = dataurl.split(',');
        const match = arr[0].match(/:(.*?);/);
        if (!match) throw new Error('Invalid data URL');
        const mime = match[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--) u8arr[n] = bstr.charCodeAt(n);
        return new Blob([u8arr], { type: mime });
      };
      const file = dataURLtoBlob(fileDataUrl);
      const formData = new FormData();
      formData.append("file", file, fileName);
      formData.append("roastIntensity", roastLevel);
      formData.append("personality", selectedVC);
      formData.append("userName", userName);
      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Unknown error");
      sessionStorage.setItem("feedbackResult", JSON.stringify(result));
      setLoading(false);
      router.push("/results");
    } catch (e: any) {
      setError(e.message || "Failed to process feedback.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] px-4">
      <h1 className="text-4xl font-bold text-white mb-4">Choose Your Roast Intensity</h1>
      {selectedVC ? (
        <p className="text-lg text-gray-300 mb-8">Selected VC: <span className="font-mono text-pink-400">{selectedVC}</span></p>
      ) : (
        <p className="text-lg text-gray-400 mb-8">No VC selected.</p>
      )}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {roastLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => setRoastLevel(level.value)}
            className={`px-8 py-6 rounded-2xl border-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500/50
              ${roastLevel === level.value ? "border-pink-500 bg-pink-500/10 text-pink-300" : "border-white/10 bg-white/5 text-white hover:border-pink-500/50"}`}
          >
            <div className="mb-2 text-2xl">{level.value === "gentle" ? "😊" : level.value === "balanced" ? "😏" : "🔥"}</div>
            {level.label}
            <div className="text-sm text-gray-400 mt-2">{level.description}</div>
          </button>
        ))}
      </div>
      <button
        onClick={handleRoast}
        disabled={loading || !selectedVC}
        className="px-10 py-4 rounded-full bg-[#ff4154] text-white font-bold text-xl shadow-lg hover:bg-[#ff6b6b] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Roasting..." : "Get Roasted"}
      </button>
      {error && <p className="mt-6 text-red-400 font-semibold">{error}</p>}
      <p className="mt-8 text-gray-500">(Select your roast intensity and get brutally honest feedback from your chosen VC!)</p>
    </main>
  );
} 