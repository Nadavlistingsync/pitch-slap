import { FC } from 'react';

const TrustBar: FC = () => {
  return (
    <div className="mt-12 opacity-70">
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#ff4154] mb-2">500+</div>
          <div className="text-sm text-gray-600">Startups Roasted</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#ff4154] mb-2">20+</div>
          <div className="text-sm text-gray-600">Active VCs</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#ff4154] mb-2">$50M+</div>
          <div className="text-sm text-gray-600">Funds Raised</div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar; 