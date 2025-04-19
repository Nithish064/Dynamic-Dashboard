import React, { useState } from 'react';
import Category from './Category';
import AddWidgetForm from './AddWidgetForm';
import SearchWidgets from './SearchWidgets';
import { DashboardState, AddWidgetFormData } from '../types';
import { addWidget, removeWidgetFromCategory, addWidgetToCategory } from '../utils/dashboardUtils';
import { Plus } from 'lucide-react';

interface DashboardProps {
  initialState: DashboardState;
}

const Dashboard: React.FC<DashboardProps> = ({ initialState }) => {
  const [dashboardState, setDashboardState] = useState<DashboardState>(initialState);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleAddWidgetClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setShowAddForm(true);
  };

  const handleAddWidgetSubmit = (formData: AddWidgetFormData) => {
    setDashboardState(currentState => addWidget(currentState, formData));
    setShowAddForm(false);
  };

  const handleRemoveWidget = (widgetId: string, categoryId: string) => {
    setDashboardState(currentState => 
      removeWidgetFromCategory(currentState, widgetId, categoryId)
    );
  };

  const handleAddWidgetToCategory = (widgetId: string, categoryId: string) => {
    setDashboardState(currentState => 
      addWidgetToCategory(currentState, widgetId, categoryId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex items-center gap-4">
            <SearchWidgets
              widgets={dashboardState.widgets}
              categories={dashboardState.categories}
              onAddWidgetToCategory={handleAddWidgetToCategory}
            />
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Add Widget
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(dashboardState.categories).map(category => (
            <Category
              key={category.id}
              category={category}
              widgets={dashboardState.widgets}
              onRemoveWidget={handleRemoveWidget}
              onAddWidgetClick={handleAddWidgetClick}
            />
          ))}
        </div>
      </div>

      {showAddForm && (
        <AddWidgetForm
          categories={dashboardState.categories}
          selectedCategoryId={selectedCategoryId}
          onSubmit={handleAddWidgetSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;