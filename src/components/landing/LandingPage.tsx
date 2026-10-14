import React from 'react';
import { useApp } from '../../context/AppContext';
import { ARTISAN_CATEGORIES, OWERRI_LOCATIONS } from '../../data/mockData';
import { TrustBadge } from '../common/TrustBadge';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Camera,
  Star,
  Search,
  ArrowRight,
  Sparkles,
  MapPin,
  AlertTriangle,
  FileCheck,
  Users,
  ChevronRight,
  TrendingUp,
  Award,
  LogIn,
  ArrowDown,
  Briefcase,
  User,
  AlertCircle,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setSelectedArtisanId, artisans, openModal } = useApp();

  const featuredArtisans = artisans.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-800/25 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] font-display">
                Find Skilled Artisans.{' '}
                <span className="text-teal-400">Hire with Confidence.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Discover verified artisans, explore their work, and book trusted professionals. With proof of work and customer-confirmed job completion, we make artisan hiring more transparent and accountable.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('discovery')}
                  className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Find Artisans</span>
                </button>

                <button
                  onClick={() => setCurrentView('auth')}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md hover:border-slate-600"
                >
                  <LogIn className="w-4 h-4 text-teal-400" />
                  <span>Login</span>
                </button>
              </div>

              {/* 3 Value Pillars */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Dual Verification</span>
                    <span className="text-slate-400 text-[11px]">NIN + physical workshop inspection in Owerri.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 shrink-0 mt-0.5">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Mandatory Proof of Work</span>
                    <span className="text-slate-400 text-[11px]">Artisans submit clear photos and completion logs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Customer-Gated Payout</span>
                    <span className="text-slate-400 text-[11px]">Funds remain protected until customer confirms.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Live Interactive Trust Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Live Trust Architecture
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-400">TF-OW-8921</span>
                </div>

                {/* Example Artisan Card Inside Graphic */}
                <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80"
                    alt="Emeka Okonkwo"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm truncate">Emeka Okonkwo</span>
                      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-400">Master Plumber · 9 yrs exp · Ikenegbu</p>
                    <p className="text-[11px] text-teal-300/90 font-medium">
                      Apprenticed under Chief Linus Agbara (Nekede)
                    </p>
                  </div>
                </div>

                {/* Proof of Work Highlight Card */}
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-teal-500/30 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-teal-400" />
                      Submitted Proof of Work
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-mono border border-teal-800">
                      Awaiting Customer Approval
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative rounded-lg overflow-hidden border border-slate-700 aspect-video">
                      <img
                        src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80"
                        alt="Proof 1"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-slate-900/80 px-1 py-0.5 rounded text-white font-mono">
                        Pressure Test (6 bar)
                      </span>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border border-slate-700 aspect-video">
                      <img
                        src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=300&q=80"
                        alt="Proof 2"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-slate-900/80 px-1 py-0.5 rounded text-white font-mono">
                        PPR Joint Sealed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Escrow Amount</span>
                      <span className="text-sm font-bold text-white font-mono">₦18,000.00</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedArtisanId('artisan-1');
                        setCurrentView('customer_dashboard');
                      }}
                      className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect & Confirm Work →
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Protected by TrustFirst Customer-Gated Settlement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Breakdown Section (Matching Screenshot) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            Market Diagnosis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Problem
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The informal artisan economy is held back by systemic friction on both sides of the transaction. Here is the current state of things in today's market:
          </p>
        </div>

        {/* 2-Column Comparison: Artisan's End vs. Customer's End */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Artisan's End */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-5 hover:border-slate-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Supply Side
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    What is happening / Current state of things on the artisan’s end
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Difficulty finding customers</strong> beyond personal word-of-mouth referrals.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Artisans’ difficulty in proving competence & earning trust:</strong> Trust traditionally depends on word-of-mouth. Artisans have practical skills but limited ways to prove them, and there is no standardized way to verify practical skills.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Payment disputes and disagreements:</strong> Persistent friction over completed work with little accountability between payment, delivery, and customer satisfaction.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Inconsistent job opportunities:</strong> Volatile earnings and irregular work without a reliable digital pipeline.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Informal work is poorly documented:</strong> Previous project samples are scattered across WhatsApp chats or social media with no credible portfolio.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Unprotected delivery risks:</strong> Artisans risk arbitrary payment delays or unfair customer deductions even after delivering as agreed.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Impact on Artisans</span>
              <span className="text-rose-600 font-semibold">Limited growth & income insecurity</span>
            </div>
          </div>

          {/* Column 2: Customer's End */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-5 hover:border-slate-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Demand Side
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    What is happening / Current state of things on the customer’s end
                  </h3>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Lack of trust and fear of fraud:</strong> Customers take substantial risk when hiring someone they don’t already personally know.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Difficulty comparing artisan’s quotations:</strong> Arbitrary pricing with zero transparent standard cost breakdown.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Risk of poor-quality work:</strong> Substandard craftsmanship, peeling paint, or leaking pipes with zero warranty or recourse.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Risk of losing money through advance payments:</strong> Upfront deposits paid without certainty that the artisan will complete the job.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Difficulty distinguishing reliable artisans:</strong> Inability to separate master craftsmen from inexperienced handymen.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Artisans failing to show up as agreed:</strong> Missed appointments and delivery timelines taking far longer than promised.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>
                    <strong>Existing digital platforms aren't designed for this purpose:</strong> Generic marketplaces lack physical workshop verification and customer confirmation gates.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Impact on Customers</span>
              <span className="text-rose-600 font-semibold">High financial risk & anxiety</span>
            </div>
          </div>
        </div>

        {/* Strategic Transformation Pipeline (Matching Diagram at Bottom of Screenshot) */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1 mb-2">
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">
              Strategic Value Alignment
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display">
              Bridging the Trust Divide
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* Tier 1: The Problem */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-1.5 transition-all hover:border-rose-500/40">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                The Problem
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-200">
                Low trust + limited visibility + weak accountability
              </p>
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center text-teal-400 py-0.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </div>

            {/* Tier 2: Your Solution */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-slate-900 to-teal-950/80 border border-teal-500/40 text-center space-y-2 shadow-lg ring-1 ring-teal-500/20">
              <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wider block">
                Your Solution (TrustFirst)
              </span>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                Artisan verification + portfolios + structured bookings + customer-confirmed completion + verified reviews
              </p>
            </div>

            {/* Downward Connector Arrow */}
            <div className="flex justify-center text-teal-400 py-0.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Tier 3: The Intended Impact */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-1.5 transition-all hover:border-teal-500/40">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                The Intended Impact
              </span>
              <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
                Safer hiring decisions, greater customer confidence, stronger artisan reputations, and more business opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the 4-Step Trust Workflow Operates */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              How TrustFirst Protects Both Sides
            </h2>
            <p className="text-slate-600 text-sm">
              From discovery in Owerri to final payment release and verified reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Discover & Verify</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search plumbers, electricians, or carpenters by Owerri zone. Check their legal ID,
                workshop inspection report, and master apprenticeship background.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Book & Hold Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Agree on scope and price in Naira. Funds are held in secure simulated escrow — the
                artisan knows money is ready, but cannot touch it prematurely.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative border-teal-400 ring-2 ring-teal-500/10">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Submit Proof of Work</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Our Core Differentiator:</strong> The artisan finishes the job and uploads
                dated photos and completion notes. They cannot mark the job complete on their own!
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Customer Confirms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customer tests and approves the work to release funds. If defective, customer files
                a dispute and funds stay frozen until resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Artisans in Owerri */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
              Vetted Craftsmen
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Featured Verified Artisans in Owerri
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Every profile displays authentic apprenticeship lineage and physical inspection notes.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('discovery')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>View All Owerri Artisans</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-5 flex-1 space-y-4">
                {/* Header: Photo & Name */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={artisan.avatarUrl}
                    alt={artisan.fullName}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 text-base truncate">
                      {artisan.fullName}
                    </h3>
                    <p className="text-xs font-medium text-teal-700">{artisan.category}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-slate-800">{artisan.averageRating}</span>
                      <span>({artisan.totalReviews} verified reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Trust Verification Summary */}
                <TrustBadge verification={artisan.verification} size="sm" />

                {/* Apprenticeship Lineage Line */}
                {artisan.verification.apprenticeshipLineage && (
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-0.5">
                    <span className="font-semibold text-slate-700 block">
                      Apprenticeship Lineage:
                    </span>
                    <p className="truncate">
                      {artisan.verification.apprenticeshipLineage.yearsOfApprenticeship} yrs under{' '}
                      <strong>{artisan.verification.apprenticeshipLineage.masterCraftsmanName}</strong>
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {artisan.verification.apprenticeshipLineage.workshopLocation}
                    </p>
                  </div>
                )}

                {/* Service areas */}
                <div className="text-xs text-slate-500 flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{artisan.serviceAreas.slice(0, 3).join(', ')}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {artisan.bio}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Starting from</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    ₦{artisan.hourlyOrBaseRateNgn.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedArtisanId(artisan.id);
                    setCurrentView('profile');
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  View Profile & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Trades & Owerri Hubs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Local Artisan Hubs
            </span>
            <h2 className="text-2xl font-bold font-display">
              Skilled Trades Across All Owerri Quarters
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              From the mechanics & plumbers of Nekede and Douglas Road to the master carpenters of
              the Timber Market on Egbu Road.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ARTISAN_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentView('discovery')}
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold text-slate-200 group-hover:text-teal-300 block truncate">
                  {category}
                </span>
                <span className="text-[10px] text-slate-400">Verified specialists</span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>
                Covering: Ikenegbu, Aladinma, New Owerri, World Bank, Wetheral, Orji, Nekede, Umuguma, Egbu.
              </span>
            </div>

            <button
              onClick={() => setCurrentView('register_artisan')}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Are you an artisan in Owerri? Get Verified
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
