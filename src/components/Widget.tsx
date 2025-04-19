import React from 'react';
import { Widget as WidgetType } from '../types';

interface WidgetProps {
  widget: WidgetType;
  categoryId: string;
  onRemove: (widgetId: string, categoryId: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, categoryId, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-900">{widget.name}</h3>
      </div>
      <div className="aspect-square rounded-lg bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No graph data available</p>
      </div>
    </div>
  );
};

export default Widget;