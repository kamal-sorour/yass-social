import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/app', icon: FeedIcon, label: 'Feed' },
  { to: '/app/myposts', icon: MyPostsIcon, label: 'My Posts' },
  { to: '/app/community', icon: CommunityIcon, label: 'Community' },
  { to: '/app/saved', icon: SavedIcon, label: 'Saved' },
];

function FeedIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

function MyPostsIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function CommunityIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );
}

function SavedIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:block md:w-56 lg:w-64 shrink-0">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-4 sticky top-24">
        <h2 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4 px-2">
          Menu
        </h2>

        <nav className="flex flex-col space-y-1">
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
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group ${
                    getIsActive({ isActive })
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`
                }
              >
                {({ isActive }) => {
                  const active = getIsActive({ isActive });
                  return (
                    <>
                      <span className={`${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'} transition-colors`}>
                        <item.icon active={active} />
                      </span>
                      <span className="text-[15px]">{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}