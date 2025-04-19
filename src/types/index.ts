export interface Widget {
  id: string;
  name: string;
  content: string;
  categoryIds: string[];
}

export interface Category {
  id: string;
  name: string;
  widgetIds: string[];
}

export interface DashboardState {
  categories: Record<string, Category>;
  widgets: Record<string, Widget>;
}

export interface AddWidgetFormData {
  name: string;
  content: string;
  categoryId: string;
}