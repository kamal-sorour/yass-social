import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default function NotFound() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token && token !== 'null' && token !== 'undefined');
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 px-4 sm:px-6">
      
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-fuchsia-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link to="/" className="inline-block hover:scale-105 transition-transform">
          <Logo size="lg" />
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      >
        <h1 className="text-[40vw] md:text-[30vw] font-black text-neutral-900/3 dark:text-white/2 tracking-tighter leading-none">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="relative z-20 w-full max-w-lg"
      >
        <div className="flex flex-col items-center text-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/50 dark:border-neutral-700/50 shadow-2xl shadow-indigo-500/10 dark:shadow-black/50 rounded-[2.5rem] p-10 sm:p-12">
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mb-8 rounded-full bg-linear-to-tr from-indigo-100 to-fuchsia-100 dark:from-indigo-900/50 dark:to-fuchsia-900/50 border border-white/60 dark:border-white/10 flex items-center justify-center shadow-inner"
          >
            <div className="w-16 h-16 rounded-full border border-indigo-200 dark:border-indigo-700 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-bold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Off the grid
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            Looks like you're <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-fuchsia-500">lost.</span>
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-10">
            The page you're looking for has vanished into the digital void. Let's get you back to familiar territory.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Back to Home
                </span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link to="/app" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
                  Go to App
                </Button>
              </Link>
            ) : (
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
                  Log in
                </Button>
              </Link>
            )}
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}