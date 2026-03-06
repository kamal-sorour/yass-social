import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import HomeFeed from './pages/app/HomeFeed';
import Profile from './pages/app/Profile';
import ProfileSettings from './pages/app/ProfileSettings';
import ExploreFriends from './pages/app/ExploreFriends';
import Saved from './pages/app/Saved';
import PostDetail from './pages/app/PostDetail';
import Notifications from './pages/app/Notifications';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/guards/ProtectedRoute';
import GuestRoute from './components/guards/GuestRoute';
import Community from './pages/app/Community';
import MyPosts from './pages/app/MyPosts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestRoute><Landing /></GuestRoute>,
  },
  {
    path: '/login',
    element: <GuestRoute><Login /></GuestRoute>,
  },
  {
    path: '/signup',
    element: <GuestRoute><Signup /></GuestRoute>,
  },

  {
    path: '/app',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <HomeFeed />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'profile/settings',
        element: <ProfileSettings />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
      {
        path: 'suggestions',
        element: <ExploreFriends />,
      },
      {
        path: 'saved',
        element: <Saved />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "myposts",
        element: <MyPosts />,
      },
      {
        path: 'post/:id',
        element: <PostDetail />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
  { path: '*', element: <NotFound />, },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;