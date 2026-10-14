import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OWERRI_LOCATIONS } from '../../data/mockData';
import { OwerriLocation, UserRole } from '../../types';
import {
  ShieldCheck,
  User,
  Briefcase,
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  UserCheck,
  ArrowRight,
} from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  initialRole?: 'customer' | 'artisan';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  initialRole = 'customer',
}) => {
  const {
    setCurrentView,
    loginUser,
    registerCustomer,
    artisans,
    currentUser,
    switchRole,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'artisan'>(initialRole);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Customer registration state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+234 ');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState<OwerriLocation>('New Owerri');
  const [customerPassword, setCustomerPassword] = useState('');

  // Selected demo artisan for login
  const [selectedArtisanLoginId, setSelectedArtisanLoginId] = useState('artisan-1');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'customer') {
      loginUser('customer');
      setCurrentView('customer_dashboard');
    } else {
      loginUser('artisan', selectedArtisanLoginId);
      setCurrentView('artisan_dashboard');
    }
  };

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerCustomer({
      name: customerName.trim() || 'Owerri Homeowner',
      phone: customerPhone.trim() || '+234 803 000 1122',
      email: customerEmail.trim() || 'homeowner@trustfirst.ng',
      location: customerLocation,
    });
    setCurrentView('customer_dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Brand & Trust Value Banner */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 p-6 sm:p-8 text-white flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block font-display">
                  Trust<span className="text-teal-400">First</span>
                </span>
                <span className="text-[10px] text-teal-300 font-medium tracking-wide uppercase flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  Owerri, Imo State
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display leading-tight">
                {mode === 'login'
                  ? 'Welcome back to verified craftsmanship'
                  : 'Join Owerri’s verified artisan community'}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with vetted tradespeople with dual NIN verification, workshop inspections,
                and milestone escrow hold.
              </p>
            </div>
          </div>

          {/* Value Bullet Points */}
          <div className="space-y-3 text-xs border-t border-slate-800 pt-6">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 leading-snug">
                <strong>Customers:</strong> Inspect proof of work before any payment release.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <p className="text-slate-300 leading-snug">
                <strong>Artisans:</strong> Build verified reputation and eliminate payment disputes.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2">
            Protected by TrustFirst Customer-Gated Settlement System.
          </div>
        </div>

        {/* Right Side: Auth Tabs & Form */}
        <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Mode Switcher: Sign In vs Create Account */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-center rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role Switcher: Customer vs Artisan */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              {mode === 'login' ? 'Select Your Account Type:' : 'I want to register as:'}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  selectedRole === 'customer'
                    ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-bold ring-1 ring-teal-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selectedRole === 'customer'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Customer</span>
                  <span className="text-[10px] text-slate-500 font-normal">Hire & confirm work</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('artisan')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  selectedRole === 'artisan'
                    ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-bold ring-1 ring-teal-600'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selectedRole === 'artisan'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Artisan</span>
                  <span className="text-[10px] text-slate-500 font-normal">Provide verified trade</span>
                </div>
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* VIEW A: SIGN IN (CUSTOMER OR ARTISAN) */}
          {/* ============================================================== */}
          {mode === 'login' && (
            <div className="space-y-4">
              {/* Quick 1-Click Persona Login Preset */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Quick Demo Access:
                </span>

                {selectedRole === 'customer' ? (
                  <button
                    type="button"
                    onClick={() => {
                      loginUser('customer');
                      setCurrentView('customer_dashboard');
                    }}
                    className="w-full p-2.5 rounded-lg bg-white border border-teal-300 hover:bg-teal-50/50 text-left flex items-center justify-between text-xs transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                        alt="Chidera Okafor"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">Chidera Okafor</span>
                        <span className="text-[10px] text-slate-500">Homeowner · New Owerri</span>
                      </div>
                    </div>
                    <span className="text-teal-700 font-bold text-xs">Sign In Instant →</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <label htmlFor="artisan-select" className="text-[11px] text-slate-600 block">
                      Choose Artisan Profile to Log Into:
                    </label>
                    <select
                      id="artisan-select"
                      value={selectedArtisanLoginId}
                      onChange={(e) => setSelectedArtisanLoginId(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-200 text-xs bg-white font-medium"
                    >
                      {artisans.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.fullName} — {a.category} ({a.serviceAreas[0]})
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        loginUser('artisan', selectedArtisanLoginId);
                        setCurrentView('artisan_dashboard');
                      }}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Sign In as Selected Artisan →</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Standard Email / Phone & Password Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs pt-1">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Email or Phone Number</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        selectedRole === 'customer'
                          ? 'chidera.okafor@gmail.com or +234...'
                          : 'emeka.plumbing@trustfirst.ng'
                      }
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>Remember me</span>
                  </label>
                  <span className="text-teal-700 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Log in as {selectedRole === 'customer' ? 'Customer' : 'Artisan'}
                </button>
              </form>

              {/* Admin login hint */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    loginUser('admin');
                    setCurrentView('admin_dashboard');
                  }}
                  className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
                >
                  Are you an authorized field officer? Sign in as Admin
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW B: CREATE ACCOUNT (CUSTOMER OR ARTISAN) */}
          {/* ============================================================== */}
          {mode === 'register' && (
            <div>
              {selectedRole === 'customer' ? (
                /* Customer Registration Form */
                <form onSubmit={handleCustomerRegister} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Uchechi Amadi"
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">
                        Phone Number (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+234 803 000 1122"
                        className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-800 block">Email Address</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="uchechi@gmail.com"
                        className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">
                      Primary Owerri Neighborhood
                    </label>
                    <select
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value as OwerriLocation)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                    >
                      {OWERRI_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800 block">Create Password</label>
                    <input
                      type="password"
                      value={customerPassword}
                      onChange={(e) => setCustomerPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                      required
                    />
                  </div>

                  <div className="p-2.5 bg-teal-50/70 border border-teal-200 rounded-lg text-[11px] text-teal-900 leading-snug">
                    ✓ As a registered customer, every booking you make is protected by simulated
                    escrow: funds are only released after you confirm the artisan's proof of work.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Create Customer Account & Start Hiring →
                  </button>
                </form>
              ) : (
                /* Artisan Registration Gateway */
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                      <UserCheck className="w-5 h-5 text-teal-600" />
                      <span>Artisan Onboarding & Verification Protocol</span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      To protect customers and build credible reputations in Owerri, artisans
                      complete a 4-step registration:
                    </p>

                    <div className="space-y-2 text-[11px] text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Step 1: Trade craft, years of active experience & bio</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Step 2: Master Craftsman apprenticeship lineage & trade union</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Step 3: Physical workshop location in Owerri & service zones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Step 4: Government ID (NIN) & schedule field officer site visit</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentView('register_artisan')}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Begin Artisan Onboarding Wizard</span>
                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Switch Note */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
