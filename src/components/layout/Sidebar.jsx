import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuth';

function FeedIcon({ active, className }) {
  return (
    <svg className={`${className} ${active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

function MyPostsIcon({ active, className }) {
  return (
    <svg className={`${className} ${active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function CommunityIcon({ active, className }) {
  return (
    <svg className={`${className} ${active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function SavedIcon({ active, className }) {
  return (
    <svg className={`${className} ${active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

function SettingsIcon({ active, className }) {
  return (
    <svg className={`${className} ${active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const navItems = [
  { to: '/app', icon: FeedIcon, label: 'Feed' },
  { to: '/app/myposts', icon: MyPostsIcon, label: 'My Posts' },
  { to: '/app/community', icon: CommunityIcon, label: 'Community' },
  { to: '/app/saved', icon: SavedIcon, label: 'Saved' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthContext();
  
  return (
    <aside className="hidden lg:block lg:w-26 xl:w-80 shrink-0 h-[calc(100vh-8rem)] sticky top-24 transition-all duration-300">
      
      <div className="bg-white dark:bg-neutral-900 backdrop-blur-2xl rounded-4xl border border-neutral-200 dark:border-neutral-800 p-4 lg:p-6 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        
        <div className="absolute top-0 left-0 w-full h-32 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-center lg:justify-start lg:gap-3 sm:gap-4 mb-6 pb-5 border-b dark:border-white/5 border-neutral-800 relative z-10">
          <img
            src={user?.photo || "https://via.placeholder.com/150"}
            alt={user?.name || "User"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0 ring-2 ring-cyan-500/20 shadow-md"
          />
          <div className="hidden lg:flex flex-1 min-w-0 flex-col justify-center h-full">
            <h3 className="font-semibold dark:text-white text-neutral-800 truncate text-[15px] sm:text-base">
              {user?.name}
            </h3>
          </div>
        </div>

        <nav className="flex flex-col space-y-2 grow relative z-10">
          {navItems.map((item) => {
            const getIsActive = ({ isActive }) => {
              if (item.to === '/app/profile/settings') return location.pathname === '/app/profile/settings';
              if (item.to === '/app/profile') return (location.pathname === '/app/myposts') && location.pathname !== '/app/profile/settings';
              return isActive;
            };

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                className={({ isActive }) => {
                  const active = getIsActive({ isActive });
                  return `
                    flex items-center justify-center lg:justify-start lg:gap-4 px-0 lg:px-4 py-3 sm:py-3.5 rounded-2xl font-semibold transition-all duration-300 group
                    ${active 
                      ? 'bg-cyan-500/5 text-cyan-800 border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                      : 'text-neutral-800 dark:text-neutral-400 border border-transparent dark:hover:text-white hover:text-cyan-800 hover:bg-white/5 hover:border-white/10'
                    }
                  `;
                }}
              >
                {({ isActive }) => {
                  const active = getIsActive({ isActive });
                  return (
                    <>
                      <span className={`${active ? 'text-cyan-800' : 'text-neutral-500 group-hover:text-cyan-300'} transition-colors`}>
                        <item.icon active={active} className="w-6 h-6 shrink-0" />
                      </span>
                      <span className="hidden lg:block text-sm sm:text-[15px] tracking-wide truncate">{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-5 border-t dark:border-white/5 border-neutral-800 relative z-10">
          <NavLink
            to="/app/profile/settings"
            className={({ isActive }) => `
              flex items-center justify-center lg:justify-start lg:gap-4 px-0 lg:px-4 py-3 sm:py-3.5 rounded-2xl font-semibold transition-all duration-300 group
              ${isActive
                ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                : 'text-neutral-800 dark:text-neutral-400  border border-transparent dark:hover:text-white hover:text-cyan-200 hover:bg-white/5 hover:border-white/10'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`${isActive ? 'text-cyan-400' : 'text-neutral-800 dark:text-neutral-400 group-hover:text-cyan-300'} transition-colors`}>
                  <SettingsIcon active={isActive} className="w-6 h-6 shrink-0" />
                </span>
                <span className="hidden lg:block text-sm sm:text-[15px] tracking-wide truncate">Settings</span>
              </>
            )}
          </NavLink>
        </div>

      </div>
    </aside>
  );
}