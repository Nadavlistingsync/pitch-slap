"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCoffee, FiZap } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { realVCPersonalities } from "../../types/realVCPersonalities";
import { RoastLevelSelector, RoastLevel } from "@/components/RoastLevelSelector";

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
    icon: <FaFire className="w-6 h-6" />
  }
];

export default function RoastLevelPage() {
  const router = useRouter();
  const [selectedVC, setSelectedVC] = useState<string | null>(null);
  const [roastLevel, setRoastLevel] = useState<RoastLevel>("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  useEffect(() => {
    const checkRequirements = () => {
      const storedVC = localStorage.getItem("selectedVC");
      const uploadedFile = sessionStorage.getItem("uploadedFile");

      if (!storedVC) {
        router.push("/select");
        return false;
      }

      if (!uploadedFile) {
        router.push("/upload");
        return false;
      }

      setSelectedVC(storedVC);
      setUploadedFile(uploadedFile);
      return true;
    };

    const requirementsMet = checkRequirements();
    setIsInitializing(false);
  }, [router]);

  const handleRoast = async () => {
    if (!selectedVC || !roastLevel || !uploadedFile) {
      setError('Please select a VC and roast level, and upload a pitch deck');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert base64 to Blob
      const base64Data = uploadedFile.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const file = new File([blob], 'pitch-deck.pdf', { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('roastIntensity', roastLevel);
      formData.append('personality', selectedVC.id);
      formData.append('userName', localStorage.getItem("userName") || '');

      console.log('Sending request to process pitch deck...');
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to process pitch deck');
      }

      const data = await response.json();
      console.log('Received response:', data);

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate feedback');
      }

      // Store the feedback ID in localStorage for the wait page
      localStorage.setItem('feedbackId', data.feedbackId);
      
      // Navigate to wait page
      router.push('/wait');
    } catch (err) {
      console.error('Error processing pitch deck:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const selectedVCData = selectedVC ? realVCPersonalities.find(vc => vc.id === selectedVC) : null;

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Roast Level
          </h1>
          {selectedVCData && (
            <p className="text-xl text-gray-300">
              Selected VC: <span className="text-pink-400 font-semibold">{selectedVCData.name}</span>
            </p>
          )}
        </div>

        <RoastLevelSelector
          selectedLevel={roastLevel}
          onSelect={setRoastLevel}
        />

        <div className="text-center mt-8">
          <motion.button
            onClick={handleRoast}
            disabled={loading || !selectedVC}
            className="px-10 py-4 rounded-full bg-pink-500 text-white font-bold text-xl shadow-lg hover:bg-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Processing..." : "Get Roasted"}
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