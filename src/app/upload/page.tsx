"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { vcs } from '../../lib/vcs';

const intensities = [
  { value: "gentle", label: "Gentle" },
  { value: "balanced", label: "Balanced" },
  { value: "brutal", label: "Brutal" },
];

const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    message,
    ...(data && { data })
  };
  console.log(JSON.stringify(logData));
};

// Utility to ensure error is always a string
function toErrorString(err: unknown): string {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err, null, 2);
  } catch {
    return String(err);
  }
}

function UploadContent() {
  const router = useRouter();
  const params = useSearchParams();
  const vcId = params.get("vc");
  const vc = vcs.find((v) => v.id === vcId);

  const [file, setFile] = useState<File | null>(null);
  const [intensity, setIntensity] = useState("balanced");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_SIZE_MB = 4;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  if (!vc) {
    log('No VC selected', { vcId });
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div>
          <h2 className="text-2xl font-bold mb-4">No VC selected</h2>
          <button className="bg-pink-500 px-4 py-2 rounded" onClick={() => router.push("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > MAX_SIZE_BYTES) {
        setError(`File is too large. Maximum allowed size is ${MAX_SIZE_MB}MB.`);
        setFile(null);
        return;
      }
      log('File selected', { 
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      });
      setFile(selectedFile);
    } else {
      log('No file selected');
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      log('Validation error: No file provided');
      setError(toErrorString('Please upload a PDF or text file'));
      return;
    }

    setLoading(true);
    setError(null);
    const startTime = Date.now();

    try {
      log('Starting file processing');
      let pitchDeckContent = '';
      
      if (file.type === 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          
          // Convert PDF to text using a simple approach
          const textDecoder = new TextDecoder('utf-8');
          const text = textDecoder.decode(uint8Array);
          
          // Remove non-printable characters and normalize whitespace
          pitchDeckContent = text
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
          
          log('PDF processed successfully');
        } catch (error) {
          const pdfError = error as Error;
          log('Error processing PDF', { error: pdfError.message });
          throw new Error(`Failed to process PDF: ${pdfError.message}`);
        }
      } else {
        try {
          pitchDeckContent = await file.text();
          log('Text file processed successfully');
        } catch (error) {
          const readError = error as Error;
          log('Error reading file', { error: readError.message });
          throw new Error(`Failed to read file: ${readError.message}`);
        }
      }

      if (!pitchDeckContent || pitchDeckContent.trim().length === 0) {
        log('Empty content error');
        throw new Error('The file appears to be empty or could not be read properly');
      }

      // Create a clean VC object
      const cleanVc = {
        name: vc.name,
        firm: vc.firm,
        knownFor: vc.knownFor,
        vibe: vc.vibe
      };

      log('Preparing API request', { 
        vc: cleanVc,
        intensity,
        contentLength: pitchDeckContent.length
      });

      const requestBody = JSON.stringify({
        pitchDeck: pitchDeckContent,
        vc: cleanVc,
        intensity: intensity
      });

      log('Sending API request');
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        log('API error', { 
          status: response.status,
          error: errorData
        });
        console.log('API errorData:', errorData);
        throw new Error(
          typeof errorData.error === 'string'
            ? errorData.error
            : JSON.stringify(errorData.error) || 'Failed to get feedback'
        );
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;
      log('Successfully received feedback', { 
        processingTimeMs: processingTime,
        roastLength: data.roast.length
      });

      // Store the result
      const result = {
        roast: data.roast,
        vc: cleanVc
      };

      sessionStorage.setItem('roastResult', JSON.stringify(result));
      sessionStorage.setItem('selectedVC', JSON.stringify(cleanVc));

      // Redirect to results page
      const encodedRoast = encodeURIComponent(data.roast);
      router.push(`/results?roast=${encodedRoast}`);
    } catch (error) {
      const processingTime = Date.now() - startTime;
      log('Error in submission process', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTimeMs: processingTime
      });
      setError(toErrorString(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upload Your Pitch Deck</h1>
        <h2 className="mb-2">Roaster: <span className="text-pink-400 font-semibold">{vc.name}</span></h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Upload a PDF or text file:</label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800"
            />
          </div>
          {file && (
            <div className="text-gray-400 mt-2">
              Selected file: <span className="font-semibold">{file.name}</span>
            </div>
          )}
          <div>
            <label className="block mb-2">Feedback Intensity:</label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-800"
            >
              {intensities.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-500">
              {toErrorString(error)}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !file}
            className={`w-full py-2 px-4 rounded ${
              loading || !file
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {loading ? 'Processing...' : 'Get Feedback'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadContent />
    </Suspense>
  );
} 