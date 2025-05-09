import { FC } from 'react';
import UploadCard from './UploadCard';
import TrustBar from './TrustBar';
import { useRouter } from 'next/navigation';

const Hero: FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#ff4154] to-[#ff6b6b] bg-clip-text text-transparent">
          Get Roasted. Get Funded.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your pitch deck and get brutally honest feedback from real VCs. 
          No sugar coating, just straight talk to help you raise your next round.
        </p>
        <button className="btn-primary text-lg mb-12" onClick={() => router.push('/select')}>
          Upload Your Deck
        </button>
        <TrustBar />
      </div>
    </div>
  );
};

export default Hero; 