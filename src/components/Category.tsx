import React from 'react';
import Widget from './Widget';
import { Category as CategoryType, Widget as WidgetType } from '../types';
import { Plus } from 'lucide-react';

interface CategoryProps {
  category: CategoryType;
  widgets: Record<string, WidgetType>;
  onRemoveWidget: (widgetId: string, categoryId: string) => void;
  onAddWidgetClick: (categoryId: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  widgets,
  onRemoveWidget,
  onAddWidgetClick,
}) => {
  const categoryWidgets = category.widgetIds
    .map(id => widgets[id])
    .filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
        <button
          onClick={() => onAddWidgetClick(category.id)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <Plus size={16} className="mr-1" />
          Add Widget
        </button>
      </div>
      
      {categoryWidgets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No graph data available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categoryWidgets.map(widget => (
            <Widget
              key={widget.id}
              widget={widget}
              categoryId={category.id}
              onRemove={onRemoveWidget}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;