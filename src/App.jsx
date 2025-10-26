import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroCover from './components/HeroCover';
import Dashboard from './components/Dashboard';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main>
          <HeroCover />
          <section className="px-4 sm:px-6 lg:px-10 -mt-24 relative z-10">
            <Dashboard />
          </section>
        </main>
      </div>
    </div>
  );
}
