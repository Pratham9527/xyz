'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Copy, BookOpen, FileText, GraduationCap } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  abstract: string;
  keywords: string[];
  citations: number;
  type: 'journal' | 'conference' | 'thesis';
  pdfUrl: string;
}

const samplePapers: Paper[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches to Natural Language Processing',
    authors: ['John Smith', 'Jane Doe', 'Robert Johnson'],
    year: 2023,
    journal: 'Journal of Artificial Intelligence Research',
    doi: '10.1234/jair.2023.123',
    abstract: 'This paper explores various machine learning techniques applied to natural language processing tasks...',
    keywords: ['machine learning', 'NLP', 'deep learning', 'transformer models'],
    citations: 45,
    type: 'journal',
    pdfUrl: '/papers/ml-nlp.pdf'
  },
  {
    id: '2',
    title: 'Neural Networks for Computer Vision: A Comprehensive Review',
    authors: ['Alice Brown', 'Michael Wilson'],
    year: 2022,
    journal: 'International Conference on Computer Vision',
    doi: '10.1234/iccv.2022.456',
    abstract: 'A detailed review of recent advances in neural network architectures for computer vision applications...',
    keywords: ['computer vision', 'neural networks', 'deep learning', 'image processing'],
    citations: 78,
    type: 'conference',
    pdfUrl: '/papers/cv-review.pdf'
  },
  {
    id: '3',
    title: 'Quantum Computing: Foundations and Applications',
    authors: ['David Lee'],
    year: 2023,
    journal: 'PhD Thesis, Stanford University',
    doi: '10.1234/thesis.2023.789',
    abstract: 'This thesis presents a comprehensive study of quantum computing principles and their practical applications...',
    keywords: ['quantum computing', 'quantum algorithms', 'quantum information'],
    citations: 12,
    type: 'thesis',
    pdfUrl: '/papers/quantum-thesis.pdf'
  }
];

export default function AcademicArchivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('bibtex');

  const filteredPapers = samplePapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || paper.type === selectedType;
    const matchesYear = selectedYear === 'all' || paper.year === parseInt(selectedYear);

    return matchesSearch && matchesType && matchesYear;
  });

  const generateCitation = (paper: Paper, format: string) => {
    switch (format) {
      case 'bibtex':
        return `@article{${paper.id},
  title = {${paper.title}},
  author = {${paper.authors.join(' and ')}},
  year = {${paper.year}},
  journal = {${paper.journal}},
  doi = {${paper.doi}}
}`;
      case 'apa':
        return `${paper.authors.join(', ')} (${paper.year}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi}`;
      case 'mla':
        return `${paper.authors.join(', ')}. "${paper.title}." ${paper.journal}, ${paper.year}, doi:${paper.doi}.`;
      default:
        return '';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Academic Archive</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search papers, authors, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="journal">Journal Articles</SelectItem>
                <SelectItem value="conference">Conference Papers</SelectItem>
                <SelectItem value="thesis">Theses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{paper.title}</h2>
                  <p className="text-gray-600 mb-2">{paper.authors.join(', ')}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {paper.journal} • {paper.year} • DOI: {paper.doi}
                  </p>
                  <p className="text-gray-700 mb-4">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {paper.citations} Citations
                    </Button>
                  </div>
                </div>
                <div className="md:w-64">
                  <Tabs defaultValue="bibtex" value={selectedFormat} onValueChange={setSelectedFormat}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
                      <TabsTrigger value="apa">APA</TabsTrigger>
                      <TabsTrigger value="mla">MLA</TabsTrigger>
                    </TabsList>
                    <TabsContent value={selectedFormat} className="mt-2">
                      <div className="relative">
                        <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                          {generateCitation(paper, selectedFormat)}
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(generateCitation(paper, selectedFormat))}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <p>No papers found matching your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 