import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface JournalCategory {
  name: string;
  journals: string[];
}

const journalCategories: JournalCategory[] = [
  {
    name: 'UTD24',
    journals: [
      'Academy of Management Journal',
      'Academy of Management Review',
      'Journal of Finance',
      'Journal of Financial Economics',
      'Journal of International Business Studies',
      'Journal of Marketing',
      'Journal of Marketing Research',
      'Management Science',
      'MIS Quarterly',
      'Operations Research',
      'Strategic Management Journal',
      'The Accounting Review',
      'Information Systems Research',
      'Journal of Accounting and Economics',
      'Journal of Accounting Research',
      'Journal of Consumer Research',
      'Journal of Operations Management',
      'Manufacturing and Service Operations Management',
      'Marketing Science',
      'Organization Science',
      'Production and Operations Management',
      'Journal of Applied Psychology',
      'Review of Financial Studies',
      'Journal of Management'
    ]
  },
  {
    name: 'FT50',
    journals: [
      'Academy of Management Journal',
      'Academy of Management Review',
      'Accounting, Organizations and Society',
      'Administrative Science Quarterly',
      'American Economic Review',
      'Contemporary Accounting Research',
      'Econometrica',
      'Entrepreneurship Theory and Practice',
      'Harvard Business Review',
      'Human Relations',
      'Human Resource Management',
      'Information Systems Research',
      'Journal of Accounting and Economics',
      'Journal of Accounting Research',
      'Journal of Applied Psychology',
      'Journal of Business Ethics',
      'Journal of Business Venturing',
      'Journal of Consumer Psychology',
      'Journal of Consumer Research',
      'Journal of Finance',
      'Journal of Financial and Quantitative Analysis',
      'Journal of Financial Economics',
      'Journal of International Business Studies',
      'Journal of Management',
      'Journal of Management Information Systems',
      'Journal of Management Studies',
      'Journal of Marketing',
      'Journal of Marketing Research',
      'Journal of Operations Management',
      'Journal of Political Economy',
      'Journal of the Academy of Marketing Science',
      'Management Science',
      'Manufacturing & Service Operations Management',
      'Marketing Science',
      'MIS Quarterly',
      'Operations Research',
      'Organization Science',
      'Organization Studies',
      'Organizational Behavior and Human Decision Processes',
      'Production and Operations Management',
      'Quarterly Journal of Economics',
      'Research Policy',
      'Review of Accounting Studies',
      'Review of Economic Studies',
      'Review of Finance',
      'Review of Financial Studies',
      'Sloan Management Review',
      'Strategic Entrepreneurship Journal',
      'Strategic Management Journal',
      'The Accounting Review'
    ]
  }
];

const subCategories = [
  { name: 'Accounting', journals: ['The Accounting Review', 'Journal of Accounting and Economics', 'Journal of Accounting Research', 'Contemporary Accounting Research', 'Review of Accounting Studies', 'Accounting, Organizations and Society'] },
  { name: 'Finance', journals: ['Journal of Finance', 'Journal of Financial Economics', 'Review of Financial Studies', 'Journal of Financial and Quantitative Analysis', 'Review of Finance'] },
  { name: 'Information Systems', journals: ['MIS Quarterly', 'Information Systems Research', 'Journal of Management Information Systems'] },
  { name: 'Management', journals: ['Academy of Management Journal', 'Academy of Management Review', 'Administrative Science Quarterly', 'Journal of International Business Studies', 'Journal of Management', 'Organization Science', 'Strategic Management Journal'] },
  { name: 'Marketing', journals: ['Journal of Marketing', 'Journal of Marketing Research', 'Journal of Consumer Research', 'Marketing Science', 'Journal of the Academy of Marketing Science'] },
  { name: 'Operations Management', journals: ['Management Science', 'Operations Research', 'Journal of Operations Management', 'Manufacturing and Service Operations Management', 'Production and Operations Management'] }
];

const JournalList: React.FC = () => {
  const [selectedJournals, setSelectedJournals] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleCategoryChange = (category: string) => {
    const categoryJournals = journalCategories.find(c => c.name === category)?.journals || [];
    setSelectedJournals(prev => {
      const isFullySelected = categoryJournals.every(journal => prev.includes(journal));
      if (isFullySelected) {
        return prev.filter(journal => !categoryJournals.includes(journal));
      } else {
        return [...new Set([...prev, ...categoryJournals])];
      }
    });
  };

  const handleSubCategoryChange = (category: string) => {
    const categoryJournals = subCategories.find(c => c.name === category)?.journals || [];
    setSelectedJournals(prev => {
      const isFullySelected = categoryJournals.every(journal => prev.includes(journal));
      if (isFullySelected) {
        return prev.filter(journal => !categoryJournals.includes(journal));
      } else {
        return [...new Set([...prev, ...categoryJournals])];
      }
    });
  };

  const handleJournalChange = (journal: string) => {
    setSelectedJournals(prev => 
      prev.includes(journal) ? prev.filter(j => j !== journal) : [...prev, journal]
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{t('journalList')}</h2>
      {journalCategories.map(category => (
        <div key={category.name} className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`category-${category.name}`}
              checked={category.journals.every(journal => selectedJournals.includes(journal))}
              onChange={() => handleCategoryChange(category.name)}
              className="mr-2"
            />
            <label htmlFor={`category-${category.name}`} className="font-semibold text-lg">{t(`categories.${category.name}`)}</label>
          </div>
        </div>
      ))}
      {subCategories.map(category => (
        <div key={category.name} className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`subcategory-${category.name}`}
              checked={category.journals.every(journal => selectedJournals.includes(journal))}
              onChange={() => handleSubCategoryChange(category.name)}
              className="mr-2"
            />
            <label htmlFor={`subcategory-${category.name}`} className="font-semibold text-lg">{t(`categories.${category.name}`)}</label>
          </div>
          <ul className="pl-6 space-y-1">
            {category.journals.map(journal => (
              <li key={journal} className="flex items-center">
                <input
                  type="checkbox"
                  id={`journal-${journal}`}
                  checked={selectedJournals.includes(journal)}
                  onChange={() => handleJournalChange(journal)}
                  className="mr-2"
                />
                <label htmlFor={`journal-${journal}`} className="text-sm">{journal}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JournalList;