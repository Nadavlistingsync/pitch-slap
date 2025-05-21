'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser, FiTag, FiShare2, FiBookmark, FiMessageSquare } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  relatedPosts: {
    id: string;
    title: string;
    image: string;
  }[];
}

// Simulated blog post data
const blogPost: BlogPost = {
  id: '1',
  title: '10 Common Pitch Deck Mistakes That Turn Off Investors',
  content: `
    <p>Creating a compelling pitch deck is crucial for securing investment, but many founders make common mistakes that can turn off potential investors. In this article, we'll explore the top 10 mistakes to avoid and how to fix them.</p>

    <h2>1. Too Much Text</h2>
    <p>One of the most common mistakes is overcrowding slides with text. Investors want to see clear, concise information that they can quickly understand. Instead of paragraphs of text, use bullet points, charts, and visuals to convey your message.</p>

    <h2>2. Unclear Value Proposition</h2>
    <p>Your value proposition should be crystal clear within the first few slides. If investors can't quickly understand what problem you're solving and why your solution is unique, they'll lose interest.</p>

    <h2>3. Weak Market Analysis</h2>
    <p>Many founders fail to properly research and present their market opportunity. Include specific data about market size, growth potential, and your target audience to show you understand your market.</p>

    <h2>4. Unrealistic Financial Projections</h2>
    <p>Overly optimistic financial projections can damage your credibility. Be realistic and back up your numbers with solid assumptions and market research.</p>

    <h2>5. Missing Competitive Analysis</h2>
    <p>Investors want to know how you stack up against competitors. Include a clear competitive analysis that shows your unique advantages and market positioning.</p>

    <h2>6. Poor Design and Branding</h2>
    <p>Your pitch deck should reflect your brand's professionalism. Use consistent branding, high-quality visuals, and a clean design that's easy to read.</p>

    <h2>7. Lack of Clear Ask</h2>
    <p>Be specific about how much funding you're seeking and how you'll use it. Investors need to know exactly what you're asking for and why.</p>

    <h2>8. Ignoring the Team Slide</h2>
    <p>Your team is crucial to your success. Highlight key team members' relevant experience and achievements to build credibility.</p>

    <h2>9. Too Many Slides</h2>
    <p>Keep your pitch deck concise and focused. Aim for 10-15 slides that cover the essential information without overwhelming investors.</p>

    <h2>10. No Clear Call to Action</h2>
    <p>End your pitch with a clear next step. Whether it's scheduling a follow-up meeting or providing additional materials, make it easy for investors to take action.</p>

    <p>By avoiding these common mistakes, you'll create a more compelling pitch deck that better engages potential investors and increases your chances of securing funding.</p>
  `,
  author: {
    name: 'Sarah Chen',
    avatar: '/team/sarah.jpg',
    role: 'Pitch Deck Expert',
  },
  date: '2024-03-15',
  readTime: '5 min read',
  category: 'Pitch Deck Tips',
  image: '/blog/pitch-deck-mistakes.jpg',
  tags: ['Pitch Deck', 'Investor Relations', 'Startup Funding', 'Presentation Skills'],
  relatedPosts: [
    {
      id: '2',
      title: 'The Ultimate Guide to Creating a Winning Pitch Deck',
      image: '/blog/winning-pitch-deck.jpg',
    },
    {
      id: '3',
      title: 'How to Present Your Pitch Deck Like a Pro',
      image: '/blog/present-like-pro.jpg',
    },
    {
      id: '4',
      title: 'The Psychology of Investor Decision Making',
      image: '/blog/investor-psychology.jpg',
    },
  ],
};

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
            <FiTag className="w-4 h-4" />
            <span>{blogPost.category}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {blogPost.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={blogPost.author.avatar}
                  alt={blogPost.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-white">{blogPost.author.name}</div>
                <div>{blogPost.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              <span>{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUser className="w-4 h-4" />
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative h-[400px] rounded-2xl overflow-hidden mb-12"
        >
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          {blogPost.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </motion.div>

        {/* Share and Bookmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-between border-t border-gray-800 pt-8"
        >
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <FiShare2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <FiBookmark className="w-5 h-5" />
              <span>Bookmark</span>
            </button>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <FiMessageSquare className="w-5 h-5" />
            <span>Comment</span>
          </button>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24"
        >
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPost.relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group"
              >
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-pink-500 transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 