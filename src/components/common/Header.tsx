import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Search,
  Briefcase,
  UserCheck,
  Compass,
  FileCheck2,
  Sparkles,
  MapPin,
  Menu,
  X,
  RotateCcw,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchRole,
    currentView,
    setCurrentView,
    bookings,
    artisans,
    openModal,
    resetDemoData,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Compute pending actionable tasks for the roles
  const customerAwaitingConfirmationCount = bookings.filter(
    (b) => b.status === 'work_submitted'
  ).length;

  const artisanPendingJobsCount = bookings.filter(
    (b) => b.artisanId === 'artisan-1' && (b.status === 'requested' || b.status === 'in_progress')
  ).length;

  const adminPendingVerificationsCount = artisans.filter(
    (a) => a.verification.overallStatus === 'under_review' || a.verification.physicalStatus === 'under_review'
  ).length;

  const adminDisputesCount = bookings.filter((b) => b.status === 'disputed').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Demo & Trust Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="font-medium text-teal-300">Hackathon Prototype:</span>
            <span className="text-slate-300 hidden sm:inline">
              Owerri, Imo State · Dual-Verification & Milestone Proof of Work
            </span>
            <span className="text-slate-400 text-[11px] hidden md:inline">
              (Simulated payment escrow & field verification)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Demo Flow Launcher */}
            <button
              onClick={() => openModal('demo_flow')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-teal-100" />
              <span>MVP Demo Tour (7-Steps)</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={resetDemoData}
              title="Reset mock data to fresh state"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

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
              <div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none font-display">
                  Trust<span className="text-teal-600">First</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-teal-600" />
                  Owerri Artisans
                </span>
              </div>
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
              <button
                onClick={() => setCurrentView('customer_dashboard')}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === 'customer_dashboard'
                    ? 'text-teal-700 bg-teal-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Customer Portal
                {customerAwaitingConfirmationCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-amber-600 rounded-full animate-pulse">
                    {customerAwaitingConfirmationCount} confirm!
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('artisan_dashboard')}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === 'artisan_dashboard'
                    ? 'text-teal-700 bg-teal-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Artisan Hub
                {artisanPendingJobsCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-teal-700 rounded-full">
                    {artisanPendingJobsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('admin_dashboard')}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentView === 'admin_dashboard'
                    ? 'text-teal-700 bg-teal-50/70 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Admin / Verifier
                {(adminPendingVerificationsCount > 0 || adminDisputesCount > 0) && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold text-white bg-rose-600 rounded-full">
                    {adminPendingVerificationsCount + adminDisputesCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Right Controls: Role Switcher & Artisan Register Button */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher (Functional Segmented Control) */}
            <div className="hidden sm:flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-500 uppercase px-2 tracking-wider">
                Role:
              </span>
              <button
                onClick={() => {
                  switchRole('customer');
                  setCurrentView('customer_dashboard');
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  currentUser.role === 'customer'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  switchRole('artisan');
                  setCurrentView('artisan_dashboard');
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  currentUser.role === 'artisan'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Artisan
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setCurrentView('admin_dashboard');
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  currentUser.role === 'admin'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>

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
          {/* Mobile Role Switcher */}
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Active Persona: {currentUser.name}
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  switchRole('customer');
                  setCurrentView('customer_dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs font-medium rounded text-center ${
                  currentUser.role === 'customer'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  switchRole('artisan');
                  setCurrentView('artisan_dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs font-medium rounded text-center ${
                  currentUser.role === 'artisan'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Artisan
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setCurrentView('admin_dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs font-medium rounded text-center ${
                  currentUser.role === 'admin'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

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
                <span>Find Artisans in Owerri</span>
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentView('customer_dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Customer Bookings</span>
              </div>
              {customerAwaitingConfirmationCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-amber-600 rounded-full">
                  {customerAwaitingConfirmationCount} to confirm
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setCurrentView('artisan_dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                <span>Artisan Dashboard</span>
              </div>
              {artisanPendingJobsCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-teal-600 rounded-full">
                  {artisanPendingJobsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setCurrentView('admin_dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                <span>Admin & Dispute Desk</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
