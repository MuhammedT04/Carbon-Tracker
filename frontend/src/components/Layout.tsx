import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900">CarbonTrackr</h1>
          <p className="text-gray-500">Track and offset your carbon footprint</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;