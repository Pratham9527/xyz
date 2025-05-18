'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Star, StarHalf } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  rating: number;
  date: string;
}

const sampleQuotes: Quote[] = [
  {
    id: '1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'Motivation',
    rating: 4.5,
    date: '2024-03-15'
  },
  {
    id: '2',
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'Leadership',
    rating: 4.0,
    date: '2024-03-10'
  },
  {
    id: '3',
    text: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs',
    category: 'Life',
    rating: 5.0,
    date: '2024-03-05'
  },
  // Add more sample quotes as needed
];

const categories = ['All', 'Motivation', 'Leadership', 'Life', 'Success', 'Technology'];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(sampleQuotes);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'date'>('rating');

  const filteredQuotes = quotes
    .filter(quote => 
      (selectedCategory === 'All' || quote.category === selectedCategory) &&
      (quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
       quote.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Quote Board</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search quotes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <Select value={sortBy} onValueChange={(value: 'rating' | 'date') => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredQuotes.map(quote => (
          <div
            key={quote.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <blockquote className="text-xl italic mb-4">"{quote.text}"</blockquote>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">- {quote.author}</p>
                <Badge variant="secondary" className="mt-2">
                  {quote.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(quote.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  {quote.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No quotes found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
