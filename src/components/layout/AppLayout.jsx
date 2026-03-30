import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import ScrollToTop from '../ScrollToTop';

export default function AppLayout() {
  return (
      <>
    <ScrollToTop />
    <div className="min-h-screen bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 font-sans relative">
      
      <TopNav />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 gap-6 lg:gap-10 pt-6 lg:pt-8">
        <Sidebar />
        

        <main className="flex-1 min-w-0 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
    </>
  );
}