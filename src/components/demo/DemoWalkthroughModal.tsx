import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Search,
  UserCheck,
  Calendar,
  Camera,
  CheckCircle2,
  Lock,
  Star,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const DemoWalkthroughModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    setCurrentView,
    setSelectedArtisanId,
    switchRole,
    bookings,
    setActiveBookingForModal,
    openModal,
  } = useApp();

  const [activeStep, setActiveStep] = useState(1);

  if (currentModal !== 'demo_flow') return null;

  const steps = [
    {
      num: 1,
      title: 'Search for a Plumber in Owerri',
      desc: 'Browse verified artisans across Ikenegbu, Aladinma, and New Owerri with dual identity and workshop inspection badges.',
      actionLabel: 'Go to Artisan Directory',
      action: () => {
        switchRole('customer');
        setCurrentView('discovery');
        closeModal();
      },
    },
    {
      num: 2,
      title: "Inspect Emeka Okonkwo's Profile & Lineage",
      desc: 'Examine his 9-year experience, apprenticeship under Chief Linus in Nekede, verified workshop inspection notes, and past project photos.',
      actionLabel: "Open Emeka's Verified Profile",
      action: () => {
        setSelectedArtisanId('artisan-1');
        setCurrentView('profile');
        closeModal();
      },
    },
    {
      num: 3,
      title: 'Book a Plumbing Job with Escrow Hold',
      desc: 'Submit job details for an emergency leak repair. ₦18,000 simulated funds are securely held in escrow.',
      actionLabel: 'Launch Booking Modal',
      action: () => {
        setSelectedArtisanId('artisan-1');
        openModal('booking');
      },
    },
    {
      num: 4,
      title: 'Artisan Submits Proof of Work',
      desc: 'Artisan Emeka uploads high-res completion photos, pressure test logs, and materials used. Funds stay strictly locked.',
      actionLabel: 'Switch to Artisan Hub & Submit Proof',
      action: () => {
        switchRole('artisan');
        setCurrentView('artisan_dashboard');
        const inProgressBooking =
          bookings.find((b) => b.status === 'in_progress') || bookings[0];
        setActiveBookingForModal(inProgressBooking);
        openModal('proof_submit');
      },
    },
    {
      num: 5,
      title: 'Customer Inspects Proof & Confirms Work',
      desc: 'Homeowner Chidera reviews the photos of the sealed PPR pipe and tests the installation before releasing funds.',
      actionLabel: 'Inspect Proof & Confirm as Customer',
      action: () => {
        switchRole('customer');
        setCurrentView('customer_dashboard');
        const submittedBooking =
          bookings.find((b) => b.status === 'work_submitted') || bookings[0];
        setActiveBookingForModal(submittedBooking);
        openModal('customer_confirm');
      },
    },
    {
      num: 6,
      title: 'Approved for Payment Release',
      desc: 'Customer confirmation triggers immediate status change to "Approved for Payment Release". Funds disburse to the artisan.',
      actionLabel: 'View Released Escrow in Dashboard',
      action: () => {
        setCurrentView('customer_dashboard');
        closeModal();
      },
    },
    {
      num: 7,
      title: 'Publish Verified Customer Review',
      desc: 'Only confirmed completed jobs can submit reviews, updating the artisan’s public reputation with a verified booking badge.',
      actionLabel: 'Leave a Verified Review',
      action: () => {
        const completedBooking =
          bookings.find((b) => b.status === 'completed' || b.status === 'approved_for_payout') ||
          bookings[0];
        setActiveBookingForModal(completedBooking);
        openModal('review');
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Hackathon Evaluation Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              TrustFirst 7-Step Demonstration Flow
            </h2>
            <p className="text-xs text-slate-500">
              Follow the end-to-end journey from artisan search to proof of work, customer sign-off, and verified ratings.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Step List */}
        <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                activeStep === s.num
                  ? 'border-teal-500 bg-teal-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50/80'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                  activeStep === s.num
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {s.num}
              </div>

              <div className="flex-1 min-w-0 space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                  <button
                    onClick={s.action}
                    className="shrink-0 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Run Step</span>
                    <ArrowRight className="w-3 h-3 text-teal-400" />
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bonus: Dispute Review Flow Callout */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-950">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Bonus Flow: Customer Reports Problem / Dispute Hold
            </span>
            <button
              onClick={() => {
                switchRole('admin');
                setCurrentView('admin_dashboard');
                closeModal();
              }}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded text-[11px] transition-colors cursor-pointer"
            >
              View Admin Dispute Resolution →
            </button>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Witness how funds remain frozen in escrow when Dr. Ijeoma Madu reports flaking paint on Egbu Road, requiring field officer arbitration before any release can occur.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span>Owerri, Imo State Informal Economy Prototype</span>
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
