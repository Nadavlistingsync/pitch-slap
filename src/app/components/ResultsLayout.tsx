import { FC, ReactNode } from 'react';

interface ResultsLayoutProps {
  slides: ReactNode;
  feedback: ReactNode;
}

const ResultsLayout: FC<ResultsLayoutProps> = ({ slides, feedback }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Slides pane - 25% */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-4">
              <h2 className="text-lg font-semibold mb-4">Your Slides</h2>
              <div className="space-y-4">
                {slides}
              </div>
            </div>
          </div>
          
          {/* Feedback pane - 75% */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6">
              <h2 className="text-xl font-semibold mb-6">VC Feedback</h2>
              <div className="space-y-6">
                {feedback}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsLayout; 