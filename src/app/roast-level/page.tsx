"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCoffee, FiZap } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { realVCPersonalities } from "../../types/realVCPersonalities";
import { RoastLevelSelector, RoastLevel } from "@/components/RoastLevelSelector";
import type { RealVCPersonality } from '@/types/realVCPersonalities';

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
  const [selectedVC, setSelectedVC] = useState<RealVCPersonality | null>(null);
  const [roastLevel, setRoastLevel] = useState<RoastLevel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  useEffect(() => {
    const checkRequirements = () => {
      const storedVC = localStorage.getItem('selectedVC');
      const storedFile = sessionStorage.getItem('uploadedFile');
      
      if (!storedVC || !storedFile) {
        router.push('/');
        return false;
      }

      try {
        const vcData = JSON.parse(storedVC);
        setSelectedVC(vcData);
        setUploadedFile(storedFile);
        return true;
      } catch (err) {
        console.error('Error parsing stored VC data:', err);
        router.push('/');
        return false;
      }
    };

    if (checkRequirements()) {
      setIsInitializing(false);
    }
  }, [router]);

  const handleRoast = async () => {
    if (!selectedVC || !roastLevel || !uploadedFile) {
      setError('Please select a VC and roast level, and upload a pitch deck');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock feedback result
      const data = {
        success: true,
        feedback: [
          {
            slide: 1,
            comment: 'Great intro, but clarify your value proposition.',
            score: 7,
          },
          {
            slide: 2,
            comment: 'Market size is good, but add more data.',
            score: 6,
          },
        ],
        overallScore: 6.5,
        roastLevel,
        personality: selectedVC.id,
      };
      sessionStorage.setItem('feedbackResult', JSON.stringify(data));
      router.push('/results');
    } catch (err) {
      console.error('Error processing pitch deck:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Roast Level</h1>
        
        <div className="mb-12">
          <RoastLevelSelector
            onSelect={setRoastLevel}
            selectedLevel={roastLevel ?? undefined}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={handleRoast}
            disabled={loading || !roastLevel}
            className={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
              loading || !roastLevel
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Get Roasted'
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 