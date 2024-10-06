import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchFormProps {
  onSearch: (url: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = useState('');
  const [journals, setJournals] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUrl = 'https://scholar.google.com/scholar?q=';
    const keywordsQuery = keywords.split(',').map(k => k.trim()).join(' AND ');
    const journalsQuery = journals.split(',').map(j => `source:"${j.trim()}"`).join(' OR ');
    const query = `(${keywordsQuery}) (${journalsQuery})`;
    const encodedQuery = encodeURIComponent(query);
    const yearRange = startYear && endYear ? `&as_ylo=${startYear}&as_yhi=${endYear}` : '';
    const searchUrl = `${baseUrl}${encodedQuery}${yearRange}`;
    onSearch(searchUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">{t('keywords')}</label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="e.g., Dimensionality reduction, evaluation"
          required
        />
      </div>
      <div>
        <label htmlFor="journals" className="block text-sm font-medium text-gray-700">{t('journals')}</label>
        <input
          type="text"
          id="journals"
          value={journals}
          onChange={(e) => setJournals(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="e.g., Academy of Management Journal, Journal of Finance"
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">{t('startYear')}</label>
          <input
            type="number"
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., 2016"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">{t('endYear')}</label>
          <input
            type="number"
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., 2017"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {t('search')}
      </button>
    </form>
  );
};

export default SearchForm;