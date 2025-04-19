import { DashboardState } from '../types';

export const initialDashboardState: DashboardState = {
  categories: {
    cat1: {
      id: 'cat1',
      name: 'CSPM Executive Dashboard',
      widgetIds: ['widget1', 'widget2', 'widget3'],
    },
    cat2: {
      id: 'cat2',
      name: 'Security Metrics',
      widgetIds: ['widget4', 'widget5'],
    },
    cat3: {
      id: 'cat3',
      name: 'Compliance Overview',
      widgetIds: ['widget6', 'widget7'],
    },
  },
  widgets: {
    widget1: {
      id: 'widget1',
      name: 'Compliance Score',
      content: 'Current compliance score is 85%',
      categoryIds: ['cat1'],
    },
    widget2: {
      id: 'widget2',
      name: 'Security Alerts',
      content: '5 new security alerts detected in the last 24 hours',
      categoryIds: ['cat1'],
    },
    widget3: {
      id: 'widget3',
      name: 'Resource Monitoring',
      content: '245 resources currently being monitored',
      categoryIds: ['cat1'],
    },
    widget4: {
      id: 'widget4',
      name: 'Threat Detection',
      content: 'Threat detection system is operational',
      categoryIds: ['cat2'],
    },
    widget5: {
      id: 'widget5',
      name: 'Access Control',
      content: '15 users with elevated permissions',
      categoryIds: ['cat2'],
    },
    widget6: {
      id: 'widget6',
      name: 'Regulatory Status',
      content: 'All regulatory requirements are being met',
      categoryIds: ['cat3'],
    },
    widget7: {
      id: 'widget7',
      name: 'Audit Findings',
      content: '3 findings from the last security audit',
      categoryIds: ['cat3'],
    },
  },
};

// Helper functions for generating IDs
export const generateId = () => `id_${Date.now()}_${Math.floor(Math.random() * 1000)}`;