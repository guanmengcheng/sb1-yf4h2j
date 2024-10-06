import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`mr-2 px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('zh')}
        className={`px-3 py-1 rounded ${i18n.language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSelector;