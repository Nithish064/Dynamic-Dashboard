import { DashboardState, Widget, Category, AddWidgetFormData } from '../types';
import { generateId } from '../data/initialData';

// Add a widget to a category
export const addWidget = (
  state: DashboardState,
  formData: AddWidgetFormData
): DashboardState => {
  const widgetId = generateId();
  const { name, content, categoryId } = formData;

  // Create the new widget
  const newWidget: Widget = {
    id: widgetId,
    name,
    content,
    categoryIds: [categoryId],
  };

  // Update the category's widgetIds
  const updatedCategory = {
    ...state.categories[categoryId],
    widgetIds: [...state.categories[categoryId].widgetIds, widgetId],
  };

  return {
    ...state,
    widgets: {
      ...state.widgets,
      [widgetId]: newWidget,
    },
    categories: {
      ...state.categories,
      [categoryId]: updatedCategory,
    },
  };
};

// Remove a widget from a category
export const removeWidgetFromCategory = (
  state: DashboardState,
  widgetId: string,
  categoryId: string
): DashboardState => {
  // Get the current widget and category
  const widget = state.widgets[widgetId];
  const category = state.categories[categoryId];

  if (!widget || !category) {
    return state;
  }

  // Remove the category from the widget's categoryIds
  const updatedCategoryIds = widget.categoryIds.filter(id => id !== categoryId);

  // Remove the widget from the category's widgetIds
  const updatedWidgetIds = category.widgetIds.filter(id => id !== widgetId);

  let updatedWidgets = { ...state.widgets };
  const updatedCategories = {
    ...state.categories,
    [categoryId]: {
      ...category,
      widgetIds: updatedWidgetIds,
    },
  };

  // If the widget doesn't belong to any category anymore, remove it entirely
  if (updatedCategoryIds.length === 0) {
    const { [widgetId]: _, ...remainingWidgets } = updatedWidgets;
    updatedWidgets = remainingWidgets;
  } else {
    // Otherwise update its categoryIds
    updatedWidgets = {
      ...updatedWidgets,
      [widgetId]: {
        ...widget,
        categoryIds: updatedCategoryIds,
      },
    };
  }

  return {
    ...state,
    widgets: updatedWidgets,
    categories: updatedCategories,
  };
};

// Search widgets by name
export const searchWidgets = (
  state: DashboardState,
  searchTerm: string
): Widget[] => {
  if (!searchTerm.trim()) {
    return Object.values(state.widgets);
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();
  
  return Object.values(state.widgets).filter(widget => 
    widget.name.toLowerCase().includes(normalizedSearchTerm) ||
    widget.content.toLowerCase().includes(normalizedSearchTerm)
  );
};

// Add widget to additional category
export const addWidgetToCategory = (
  state: DashboardState,
  widgetId: string,
  categoryId: string
): DashboardState => {
  const widget = state.widgets[widgetId];
  const category = state.categories[categoryId];

  if (!widget || !category || widget.categoryIds.includes(categoryId)) {
    return state;
  }

  return {
    ...state,
    widgets: {
      ...state.widgets,
      [widgetId]: {
        ...widget,
        categoryIds: [...widget.categoryIds, categoryId],
      },
    },
    categories: {
      ...state.categories,
      [categoryId]: {
        ...category,
        widgetIds: [...category.widgetIds, widgetId],
      },
    },
  };
};