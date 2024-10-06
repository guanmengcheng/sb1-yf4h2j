import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchForm from './components/SearchForm';
import JournalList from './components/JournalList';
import LanguageSelector from './components/LanguageSelector';
import { Search } from 'lucide-react';

function App() {
  const [searchUrl, setSearchUrl] = useState('');
  const { t } = useTranslation();

  const handleSearch = (url: string) => {
    setSearchUrl(url);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
        <LanguageSelector />
      </header>
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <SearchForm onSearch={handleSearch} />
        <JournalList />
      </main>
      {searchUrl && (
        <div className="mt-4 text-center">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Search className="mr-2" size={20} />
            {t('openInGoogleScholar')}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;