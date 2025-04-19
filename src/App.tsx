import React from 'react';
import Dashboard from './components/Dashboard';
import { initialDashboardState } from './data/initialData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard initialState={initialDashboardState} />
    </div>
  );
}

export default App;