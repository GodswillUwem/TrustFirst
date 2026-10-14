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
          {/* Owerri Localization Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Built for Owerri, Imo State · Powered by Proof of Work & Escrow</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] font-display">
                Find skilled artisans.{' '}
                <span className="text-teal-400">Verify their credibility.</span> Confirm the work
                before payment is released.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                In Owerri, thousands of master plumbers, electricians, carpenters, and fabricators
                learn via rigorous multi-year apprenticeships — yet lack formal credentials.
                TrustFirst solves the trust gap with dual identity checks, physical workshop visits,
                and proof-of-work customer confirmation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('discovery')}
                  className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-950" />
                  <span>Find Artisans in Owerri</span>
                </button>

                <button
                  onClick={() => openModal('demo_flow')}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Interactive MVP Demo (7 Steps)</span>
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

      {/* The Owerri Reality & Problem Breakdown */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-teal-600 tracking-wider uppercase">
            The Trust Gap in Owerri
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Why Traditional Artisan Hiring Breaks Down in Imo State
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In neighborhoods from Ikenegbu to New Owerri and World Bank Estate, informal hiring leads
            to frustration on both sides. TrustFirst introduces verifiable accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Way (Problem) */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>The Traditional Blind-Trust Way</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold mt-0.5">✕</span>
                <span>
                  <strong>Unverified Word-of-Mouth:</strong> Relying on phone numbers passed on
                  scraps of paper with zero identity validation or workshop trace.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold mt-0.5">✕</span>
                <span>
                  <strong>Upfront Cash Risk:</strong> Artisan demands 70% mobilization, buys
                  inferior counterfeit pipes/wires, and disappears when issues arise.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold mt-0.5">✕</span>
                <span>
                  <strong>Zero Recourse or Evidence:</strong> Incomplete work or damaged property has
                  no photographic paper trail and no mediation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold mt-0.5">✕</span>
                <span>
                  <strong>Honest Artisans Suffer:</strong> Brilliant master craftsmen cannot prove
                  their track record to high-value homeowners.
                </span>
              </li>
            </ul>
          </div>

          {/* TrustFirst Way (Solution) */}
          <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>The TrustFirst Accountability Engine</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dual Identity & Physical Check:</strong> Government ID verified + physical
                  inspection of the artisan's workshop in Owerri by an authorized officer.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Apprenticeship Lineage Recorded:</strong> Master craftsman trainer, years of
                  service, and trade union affiliation clearly documented.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Mandatory Proof of Work:</strong> Artisan uploads high-res completion
                  photos, materials list, and pressure/testing logs before requesting payment.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Customer-Gated Escrow:</strong> Payment is ONLY released when the customer
                  confirms satisfaction. Reported issues trigger instant mediation hold.
                </span>
              </li>
            </ul>
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
