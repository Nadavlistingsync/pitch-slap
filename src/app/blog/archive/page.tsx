'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiClock, FiUser, FiTag, FiCalendar } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

// Simulated blog posts data
const posts: BlogPost[] = [
  {
    id: '1',
    title: '10 Common Pitch Deck Mistakes That Turn Off Investors',
    excerpt: 'Learn about the most common mistakes founders make in their pitch decks and how to avoid them to increase your chances of securing funding.',
    author: {
      name: 'Sarah Chen',
      avatar: '/team/sarah.jpg',
    },
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Pitch Deck Tips',
    image: '/blog/pitch-deck-mistakes.jpg',
    tags: ['Pitch Deck', 'Investor Relations', 'Startup Funding', 'Presentation Skills'],
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Creating a Winning Pitch Deck',
    excerpt: 'A comprehensive guide that walks you through the process of creating a pitch deck that will impress investors and help you raise your next round.',
    author: {
      name: 'Michael Rodriguez',
      avatar: '/team/michael.jpg',
    },
    date: '2024-03-10',
    readTime: '8 min read',
    category: 'Guides',
    image: '/blog/winning-pitch-deck.jpg',
    tags: ['Pitch Deck', 'Guides', 'Startup Funding', 'Investor Relations'],
  },
  {
    id: '3',
    title: 'How to Present Your Pitch Deck Like a Pro',
    excerpt: 'Master the art of presenting your pitch deck with these proven techniques and tips from successful founders and investors.',
    author: {
      name: 'Emily Thompson',
      avatar: '/team/emily.jpg',
    },
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Presentation Skills',
    image: '/blog/present-like-pro.jpg',
    tags: ['Presentation Skills', 'Pitch Deck', 'Public Speaking', 'Investor Relations'],
  },
  {
    id: '4',
    title: 'The Psychology of Investor Decision Making',
    excerpt: 'Understand how investors think and make decisions, and learn how to tailor your pitch deck to appeal to their psychology.',
    author: {
      name: 'David Kim',
      avatar: '/team/david.jpg',
    },
    date: '2024-02-28',
    readTime: '7 min read',
    category: 'Investor Insights',
    image: '/blog/investor-psychology.jpg',
    tags: ['Investor Relations', 'Psychology', 'Pitch Deck', 'Startup Funding'],
  },
];

// Group posts by year and month
const groupPostsByDate = (posts: BlogPost[]) => {
  const grouped = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {} as Record<number, Record<string, BlogPost[]>>);

  return Object.entries(grouped)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, months]) => ({
      year: Number(year),
      months: Object.entries(months)
        .sort(([monthA], [monthB]) => {
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return months.indexOf(monthB) - months.indexOf(monthA);
        })
        .map(([month, posts]) => ({
          month,
          posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        })),
    }));
};

export default function ArchivePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const groupedPosts = groupPostsByDate(posts);
  const years = groupedPosts.map((group) => group.year);
  const months = selectedYear
    ? groupedPosts
        .find((group) => group.year === selectedYear)
        ?.months.map((m) => m.month) || []
    : [];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = !selectedYear || new Date(post.date).getFullYear() === selectedYear;
    const matchesMonth = !selectedMonth || new Date(post.date).toLocaleString('default', { month: 'long' }) === selectedMonth;
    return matchesSearch && matchesYear && matchesMonth;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Blog Archive
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Browse all articles by date
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={selectedYear || ''}
              onChange={(e) => {
                setSelectedYear(e.target.value ? Number(e.target.value) : null);
                setSelectedMonth(null);
              }}
              className="rounded-lg bg-white/5 border border-gray-700 px-4 py-2 text-white focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {selectedYear && (
              <select
                value={selectedMonth || ''}
                onChange={(e) => setSelectedMonth(e.target.value || null)}
                className="rounded-lg bg-white/5 border border-gray-700 px-4 py-2 text-white focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Archive Content */}
        <div className="mt-12">
          {groupedPosts.map((group, groupIndex) => (
            <div
              key={group.year}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6">{group.year}</h2>
              {group.months.map((monthGroup, monthIndex) => (
                <div
                  key={monthGroup.month}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-semibold mb-4">{monthGroup.month}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {monthGroup.posts.map((post, postIndex) => (
                      <article
                        key={post.id}
                        className="rounded-2xl bg-white/5 backdrop-blur-lg overflow-hidden"
                      >
                        <Link href={`/blog/${post.id}`}>
                          <div className="relative h-48">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                              <FiTag className="w-4 h-4" />
                              <span>{post.category}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2 hover:text-pink-500 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                  <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-sm text-gray-300">{post.author.name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <FiClock className="w-4 h-4" />
                                  <span>{post.readTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FiCalendar className="w-4 h-4" />
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div
            className="text-center mt-12"
          >
            <h3 className="text-xl font-semibold text-white">No articles found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 