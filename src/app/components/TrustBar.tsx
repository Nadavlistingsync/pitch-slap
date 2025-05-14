import { FC } from 'react';

const TrustBar: FC = () => {
  return (
    <div className="mt-12 opacity-90">
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 border-t border-[#23272f] pt-8">
        <div className="text-center">
          <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">500+</div>
          <div className="text-base text-gray-400 font-medium">Startups Roasted</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">20+</div>
          <div className="text-base text-gray-400 font-medium">Active VCs</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">$50M+</div>
          <div className="text-base text-gray-400 font-medium">Funds Raised</div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar; 