import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Search,
  UserCheck,
  Menu,
  X,
  LogIn,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & City Badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shadow-sm border border-slate-700">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight block font-display">
                Trust<span className="text-teal-600">First</span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4 border-l border-slate-200 pl-4">
              <button
                onClick={() => setCurrentView('discovery')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === 'discovery'
                    ? 'text-teal-700 bg-teal-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Find Artisans
              </button>
              <button
                onClick={() => setCurrentView('landing')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === 'landing'
                    ? 'text-teal-700 bg-teal-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Trust Architecture
              </button>
            </nav>
          </div>

          {/* Right Controls: Role Switcher & Artisan Register Button */}
          <div className="flex items-center gap-3">

            {/* Login button */}
            <button
              onClick={() => setCurrentView('auth')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                currentView === 'auth'
                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                  : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-teal-600" />
              <span>Login</span>
            </button>

            {/* Register as Artisan CTA */}
            <button
              onClick={() => setCurrentView('register_artisan')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Join as Artisan</span>
              <span className="sm:hidden">Join</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setCurrentView('discovery');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-600" />
                <span>Find Artisans</span>
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Trust Architecture</span>
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentView('auth');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4 text-teal-700" />
                <span>Sign In / Create Account</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
