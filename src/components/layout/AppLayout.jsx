import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MobileNav from './MobileNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans">
      
      <TopNav />

      <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 gap-8 pt-8">
        
        <Sidebar />
        
        <main className="flex-1 min-w-0 pb-20 lg:pb-8">
          <Outlet />
        </main>

      </div>
      
      <MobileNav />
    </div>
  );
}