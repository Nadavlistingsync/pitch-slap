'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiStar, FiTrash2, FiArchive, FiMail, FiCheck, FiClock, FiArrowLeft } from 'react-icons/fi';

const buckets = [
  { key: 'hook', label: 'Hook / Traction' },
  { key: 'pain', label: 'Pain Clarity' },
  { key: 'numbers', label: 'Numbers / Proof Points' },
  { key: 'solution', label: 'Solution Clarity' },
  { key: 'visual', label: 'Product Tease / Visual Excitement' },
  { key: 'ease', label: 'Ease of Use' },
  { key: 'demo', label: 'Demo / Visual Clarity' },
  { key: 'team', label: 'Team Credibility' },
  { key: 'story', label: 'Personal Story / Founder Narrative' },
  { key: 'icp', label: 'ICP Clarity' },
  { key: 'whynow', label: 'Why Now' },
  { key: 'competition', label: 'Competitive Landscape' },
  { key: 'bizmodel', label: 'Business Model' },
];

interface FeedbackDetail {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  isRead: boolean;
  roastScore: number;
  vcName: string;
  vcFirm: string;
  vcAvatar: string;
  sections: {
    title: string;
    content: string;
    score: number;
  }[];
}

export default function FeedbackDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading feedback data
    setTimeout(() => {
      setFeedback({
        id: params.id,
        title: 'Your pitch deck needs work',
        content: 'After reviewing your pitch deck, I have several concerns that need to be addressed before you approach investors. While the concept is interesting, the execution and presentation need significant improvement.',
        date: 'Today',
        time: '2:30 PM',
        isRead: true,
        roastScore: 87,
        vcName: 'Sarah Chen',
        vcFirm: 'Sequoia Capital',
        vcAvatar: 'https://via.placeholder.com/40',
        sections: [
          {
            title: 'Market Size',
            content: 'Your market size slide is way too optimistic. You\'re claiming a $100B TAM without proper justification. Investors see this as a red flag. Be more realistic and back your numbers with solid research.',
            score: 92
          },
          {
            title: 'Financial Projections',
            content: 'The financial projections are completely unrealistic. You\'re projecting 1000% growth in year 2 without explaining how you\'ll achieve this. This makes you look inexperienced.',
            score: 85
          },
          {
            title: 'Competitive Analysis',
            content: 'Your competitive analysis is weak. You\'ve only listed direct competitors and haven\'t addressed potential future competitors or alternative solutions. This shows a lack of market understanding.',
            score: 78
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const getRoastScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 80) return 'text-orange-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Feedback not found</h2>
          <p className="text-gray-400">The feedback you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Determine the email body (feedback)
  const emailBody = feedback.content;

  const handleShareLinkedIn = () => {
    const text = `🔥 Check out this absolutely SAVAGE pitch deck feedback from ${feedback.vcName} on PitchDeck Roaster! No holds barred, just pure unfiltered truth:`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `🔥 This pitch deck just got absolutely MURDERED by ${feedback.vcName} on @PitchDeckRoaster! No mercy, just brutal honesty. Check it out:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4">
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => router.back()}
          >
            <FiArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-xl font-medium text-gray-800">PitchDeck</span>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiArchive className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <FiTrash2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Feedback Header */}
            <div className="flex items-start gap-4 mb-8">
              <img 
                src={feedback.vcAvatar} 
                alt={feedback.vcName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{feedback.title}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{feedback.vcName}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{feedback.vcFirm}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                    <span className="text-sm text-gray-500">{feedback.time}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`text-lg font-semibold ${getRoastScoreColor(feedback.roastScore)}`}>
                    Roast Score: {feedback.roastScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-8">{emailBody}</p>

              {/* Sections */}
              <div className="space-y-8">
                {feedback.sections.map((section, index) => (
                  <div
                    key={section.title}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <span className={`text-sm font-medium ${getRoastScoreColor(section.score)}`}>
                        Score: {section.score}
                      </span>
                    </div>
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <FiStar className="w-5 h-5" />
                  Star Feedback
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <FiCheck className="w-5 h-5" />
                  Mark as Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 