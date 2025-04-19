import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category, AddWidgetFormData } from '../types';

interface AddWidgetFormProps {
  categories: Record<string, Category>;
  selectedCategoryId: string;
  onSubmit: (formData: AddWidgetFormData) => void;
  onCancel: () => void;
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({
  categories,
  selectedCategoryId,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<AddWidgetFormData>({
    name: '',
    content: '',
    categoryId: selectedCategoryId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.content.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-in">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Widget
              </h2>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {Object.values(categories).map(category => (
                    <label key={category.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="categoryId"
                        value={category.id}
                        checked={formData.categoryId === category.id}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Widget
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetForm;