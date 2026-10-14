import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, openModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white font-display">
                Trust<span className="text-teal-400">First</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A Trust-First Digital Artisan Platform built to bridge the informal trust gap in Owerri, Imo State, Nigeria. We replace blind word-of-mouth with legal identity checks, physical workshop inspections, milestone proof-of-work, and customer-confirmed payouts.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Owerri Hub: Tetlow Rd, Ikenegbu, Wetheral & Timber Market Zones</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Platform Hubs</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('discovery')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Find Verified Artisans
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('customer_dashboard')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Customer Booking Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('artisan_dashboard')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Artisan Workspace & Earnings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin_dashboard')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Verification & Dispute Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Prototype notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Prototype Compliance</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This prototype simulates identity verification (NIN checks), physical field inspections, and milestone escrow holds. In production, real-time banking escrow APIs (e.g. Flutterwave/Paystack escrow) and authorized Imo State Artisan Guild field verifiers integrate seamlessly.
            </p>
            <button
              onClick={() => openModal('demo_flow')}
              className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-medium"
            >
              <span>Explore 7-Step Hackathon Demo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 TrustFirst Nigeria. Designed for Owerri Informal Economy Hackathon.</p>
          <p className="flex items-center gap-1">
            Built with integrity for skilled artisans in Imo State.
          </p>
        </div>
      </div>
    </footer>
  );
};
