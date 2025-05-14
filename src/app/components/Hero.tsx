import { FC } from 'react';
import UploadCard from './UploadCard';
import TrustBar from './TrustBar';
import { useRouter } from 'next/navigation';

const Hero: FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] relative">
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(circle at 60% 40%, rgba(255,65,84,0.12) 0%, transparent 70%)'}} />
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <h1 className="text-7xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg" style={{fontFamily: 'Inter, sans-serif'}}>Get Roasted. Get Funded.</h1>
        <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">Upload your pitch deck and get brutally honest feedback from real VCs. No sugar coating, just straight talk to help you raise your next round.</p>
        <button className="bg-[#ff4154] hover:bg-[#ff6b6b] text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-200 mb-12" onClick={() => router.push('/select')}>
          Upload Your Deck
        </button>
        <TrustBar />
      </div>
    </div>
  );
};

export default Hero; 