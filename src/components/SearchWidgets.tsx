import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Widget as WidgetType, Category as CategoryType } from '../types';

interface SearchWidgetsProps {
  widgets: Record<string, WidgetType>;
  categories: Record<string, CategoryType>;
  onAddWidgetToCategory: (widgetId: string, categoryId: string) => void;
}

const SearchWidgets: React.FC<SearchWidgetsProps> = ({
  widgets,
  categories,
  onAddWidgetToCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md">
        <div className="px-3 py-2 text-gray-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search anything..."
          className="w-64 px-2 py-2 bg-transparent outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default SearchWidgets;