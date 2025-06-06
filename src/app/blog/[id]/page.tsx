'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser, FiTag, FiArrowLeft } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
}

// Static blog posts data
const posts: { [key: string]: BlogPost } = {
  '1': {
    id: '1',
    title: '10 Common Pitch Deck Mistakes That Turn Off Investors',
    content: `
      Creating a compelling pitch deck is crucial for securing funding, but many founders make common mistakes that can turn off potential investors. Here are 10 mistakes to avoid:

      1. Too Much Text
      Investors want to quickly understand your business. Avoid walls of text and use visuals to convey your message.

      2. Unclear Value Proposition
      Your value proposition should be crystal clear within the first few slides. Investors need to understand what problem you're solving and why your solution is unique.

      3. Missing Market Size
      Always include your total addressable market (TAM) and explain how you'll capture a portion of it.

      4. Unrealistic Financial Projections
      Be conservative with your financial projections and be ready to explain your assumptions.

      5. Weak Competitive Analysis
      Show that you understand your competition and explain your competitive advantages.

      6. No Clear Use of Funds
      Specify how you'll use the investment and what milestones you'll achieve.

      7. Poor Design
      A professional-looking pitch deck shows that you take your business seriously.

      8. Too Many Slides
      Keep your pitch deck concise, ideally under 15 slides.

      9. Missing Team Slide
      Investors invest in people as much as ideas. Highlight your team's relevant experience.

      10. No Clear Call to Action
      End with a clear next step for investors.

      Remember, your pitch deck is often the first impression investors have of your company. Make it count!
    `,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Pitch Deck Tips',
    image: 'https://placehold.co/800x600',
  },
  '2': {
    id: '2',
    title: 'The Ultimate Guide to Creating a Winning Pitch Deck',
    content: `
      A winning pitch deck is more than just a presentation—it's a story that captures your vision and convinces investors to join your journey. Here's how to create one:

      1. Start with a Hook
      Your first slide should grab attention and make investors want to learn more.

      2. Tell a Story
      Structure your pitch deck as a narrative that flows logically from problem to solution.

      3. Focus on the Problem
      Clearly articulate the problem you're solving and why it matters.

      4. Present Your Solution
      Show how your product or service solves the problem in a unique way.

      5. Demonstrate Market Opportunity
      Use data to show the size of your market and your potential for growth.

      6. Show Your Business Model
      Explain how you'll make money and achieve profitability.

      7. Highlight Your Team
      Showcase your team's expertise and why they're the right people to execute.

      8. Include Traction
      Share your key metrics and achievements to date.

      9. Be Clear About Funding
      State how much you're raising and how you'll use the funds.

      10. End with a Strong Call to Action
      Make it easy for investors to take the next step.

      Remember, a great pitch deck is just the beginning. Be prepared to answer questions and provide more detail during your pitch.
    `,
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://placehold.co/400x400',
    },
    date: '2024-03-10',
    readTime: '8 min read',
    category: 'Guides',
    image: 'https://placehold.co/800x600',
  },
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts[params.id];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Post not found</h1>
          <p className="mt-2 text-gray-400">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="mt-4 inline-block px-6 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-pink-500 hover:text-pink-400 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        <article>
          <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="relative w-12 h-12">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiTag className="w-4 h-4" />
                  <span>{post.category}</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
} 