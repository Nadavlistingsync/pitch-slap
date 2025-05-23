"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCoffee, FiZap, FiFire } from "react-icons/fi";
import { realVCPersonalities } from "../../types/realVCPersonalities";

type RoastLevel = "gentle" | "balanced" | "brutal";

const roastLevels: { level: RoastLevel; label: string; description: string; icon: React.ReactNode }[] = [
  {
    level: "gentle",
    label: "Gentle",
    description: "Constructive feedback with a soft touch",
    icon: <FiCoffee className="w-6 h-6" />
  },
  {
    level: "balanced",
    label: "Balanced",
    description: "Mix of tough love and helpful advice",
    icon: <FiZap className="w-6 h-6" />
  },
  {
    level: "brutal",
    label: "Brutal",
    description: "No holds barred, prepare for impact",
    icon: <FiFire className="w-6 h-6" />
  }
];

export default function RoastLevelPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vcId = localStorage.getItem("selectedVC");
    if (!vcId) {
      router.push("/");
      return;
    }
    setSelectedVC(vcId);
  }, [router]);

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
        const arr = dataurl.split(",");
        const match = arr[0].match(/:(.*?);/);
        if (!match) throw new Error("Invalid data URL");
        const mime = match[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
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
      router.push("/results");
    } catch (e: any) {
      setError(e.message || "Failed to process feedback.");
      setLoading(false);
    }
  };

  const selectedVCData = selectedVC ? realVCPersonalities.find(vc => vc.id === selectedVC) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Roast Intensity
          </h1>
          {selectedVCData && (
            <p className="text-xl text-gray-300">
              Selected VC: <span className="text-pink-400 font-semibold">{selectedVCData.name}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {roastLevels.map(({ level, label, description, icon }) => (
            <motion.button
              key={level}
              onClick={() => setRoastLevel(level)}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                roastLevel === level
                  ? "border-pink-500 bg-pink-500/10"
                  : "border-gray-700 hover:border-pink-500/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 p-3 rounded-full ${
                  roastLevel === level
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-gray-800 text-gray-400"
                }`}>
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{label}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
              
              {roastLevel === level && (
                <motion.div
                  className="absolute inset-0 border-2 border-pink-500 rounded-xl"
                  layoutId="selectedRoastLevel"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            onClick={handleRoast}
            disabled={loading || !selectedVC}
            className="px-10 py-4 rounded-full bg-pink-500 text-white font-bold text-xl shadow-lg hover:bg-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Roasting..." : "Get Roasted"}
          </motion.button>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-red-400 font-semibold"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </main>
  );
} 