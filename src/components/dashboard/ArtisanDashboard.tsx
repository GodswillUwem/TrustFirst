import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { TrustBadge } from '../common/TrustBadge';
import {
  Briefcase,
  Camera,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
  MapPin,
  ShieldCheck,
  Star,
  AlertCircle,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const ArtisanDashboard: React.FC = () => {
  const {
    currentUser,
    artisans,
    bookings,
    openModal,
    setActiveBookingForModal,
    updateBookingStatus,
    setCurrentView,
    setSelectedArtisanId,
  } = useApp();

  // Find active artisan profile (defaults to Emeka Okonkwo)
  const currentArtisan =
    artisans.find((a) => a.id === currentUser.artisanProfileId) || artisans[0];

  const [activeTab, setActiveTab] = useState<'leads' | 'active_jobs' | 'submitted_proof' | 'completed'>('leads');

  // Bookings for this artisan
  const artisanBookings = bookings.filter((b) => b.artisanId === currentArtisan.id);

  const incomingRequests = artisanBookings.filter((b) => b.status === 'requested');
  const activeJobs = artisanBookings.filter((b) => b.status === 'accepted' || b.status === 'in_progress');
  const awaitingCustomerJobs = artisanBookings.filter((b) => b.status === 'work_submitted');
  const completedJobs = artisanBookings.filter((b) => b.status === 'completed' || b.status === 'approved_for_payout');

  // Compute earnings metrics
  const releasedEarnings = completedJobs.reduce((sum, b) => sum + b.agreedPriceNgn, 0);
  const heldInEscrow = [...activeJobs, ...awaitingCustomerJobs, ...incomingRequests].reduce(
    (sum, b) => sum + b.agreedPriceNgn,
    0
  );

  const handleOpenProofModal = (booking: Booking) => {
    setActiveBookingForModal(booking);
    openModal('proof_submit');
  };

  const handleAcceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'in_progress');
  };

  const handleDeclineBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'declined');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={currentArtisan.avatarUrl}
            alt={currentArtisan.fullName}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                Artisan Workspace · {currentArtisan.category}
              </span>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {currentArtisan.fullName}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{currentArtisan.workshopLocation}</span>
              <span>·</span>
              <span>{currentArtisan.yearsExperience} Years Exp</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedArtisanId(currentArtisan.id);
              setCurrentView('profile');
            }}
            className="px-4 py-2 border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            View Public Profile
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Released Payouts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Released to Payout
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            ₦{releasedEarnings.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block">
            Confirmed by customers & disbursed
          </span>
        </div>

        {/* Metric 2: Escrow Protected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Held in Escrow Protection
          </span>
          <div className="text-2xl font-extrabold text-teal-700 font-mono">
            ₦{heldInEscrow.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Releases upon customer confirmation
          </span>
        </div>

        {/* Metric 3: Rating */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Verified Reputation
          </span>
          <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{currentArtisan.averageRating}</span>
            <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Based on {currentArtisan.totalReviews} verified bookings
          </span>
        </div>

        {/* Metric 4: Completed Jobs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Confirmed Deliveries
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {currentArtisan.completedJobsCount}
          </div>
          <span className="text-[11px] text-slate-500 block">
            100% photographic proof backed
          </span>
        </div>
      </div>

      {/* Verification Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Artisan Credential & Verification Status
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
            Active Verified Badge
          </span>
        </div>

        <TrustBadge verification={currentArtisan.verification} showDetails={true} size="md" />

        <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <strong>Field Verifier Notes:</strong> {currentArtisan.verification.fieldNotes}
          </div>
        </div>
      </div>

      {/* Booking Tabs & Workflow Operations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            New Job Requests ({incomingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('active_jobs')}
            className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'active_jobs'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Active in Progress ({activeJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('submitted_proof')}
            className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'submitted_proof'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Awaiting Customer Confirmation ({awaitingCustomerJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
              activeTab === 'completed'
                ? 'border-teal-600 text-teal-700 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed & Paid ({completedJobs.length})
          </button>
        </div>

        {/* Tab 1: New Job Requests */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {incomingRequests.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No new incoming booking requests at this time.
              </div>
            ) : (
              incomingRequests.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {booking.trackingCode}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">
                        Requested for {booking.scheduledDate} at {booking.scheduledTime}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                      Escrow Deposit: ₦{booking.agreedPriceNgn.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[11px]">Customer</span>
                      <span className="font-bold text-slate-900 text-sm block">
                        {booking.customerName}
                      </span>
                      <span className="text-slate-600 block">{booking.customerPhone}</span>
                      <span className="text-slate-500 block">
                        {booking.customerAddress} ({booking.customerLocation})
                      </span>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <span className="text-slate-400 block text-[11px]">Requested Scope</span>
                      <h4 className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</h4>
                      <p className="text-slate-700 leading-relaxed">{booking.jobDescription}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleDeclineBooking(booking.id)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg text-xs"
                    >
                      Decline Request
                    </button>
                    <button
                      onClick={() => handleAcceptBooking(booking.id)}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      Accept Booking & Start Job
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Active in Progress */}
        {activeTab === 'active_jobs' && (
          <div className="space-y-4">
            {activeJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No active jobs currently in progress.
              </div>
            ) : (
              activeJobs.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-teal-200 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {booking.trackingCode}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-semibold">
                        In Progress
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded">
                      Escrow: ₦{booking.agreedPriceNgn.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[11px]">Site Address</span>
                      <p className="font-semibold text-slate-800">{booking.customerAddress}</p>
                      <p className="text-slate-500">{booking.customerLocation}, Owerri</p>
                      <p className="text-teal-700 font-medium">Customer: {booking.customerName}</p>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <span className="text-slate-400 block text-[11px]">Job Scope</span>
                      <h4 className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</h4>
                      <p className="text-slate-700 leading-relaxed">{booking.jobDescription}</p>
                    </div>
                  </div>

                  {/* Submission CTA Banner */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Finished with the repairs? Take completion photos to submit for customer
                      release.
                    </p>

                    <button
                      onClick={() => handleOpenProofModal(booking)}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Submit Proof of Work →</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Awaiting Customer Confirmation */}
        {activeTab === 'submitted_proof' && (
          <div className="space-y-4">
            {awaitingCustomerJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No jobs currently awaiting customer confirmation.
              </div>
            ) : (
              awaitingCustomerJobs.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {booking.trackingCode}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-teal-100 text-teal-900 text-xs font-bold animate-pulse">
                        Proof Submitted · Awaiting Customer Sign-off
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-900">
                      ₦{booking.agreedPriceNgn.toLocaleString()} Pending Release
                    </span>
                  </div>

                  <div className="text-xs space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</h4>
                    <p className="text-slate-600">Customer: {booking.customerName} ({booking.customerLocation})</p>

                    {booking.proofOfWork && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="font-semibold text-slate-700 block">Submitted Evidence:</span>
                        <p className="text-slate-600 italic">"{booking.proofOfWork.completionNotes}"</p>
                        <div className="flex gap-2">
                          {booking.proofOfWork.photos.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt="Proof"
                              className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500">
                    Once {booking.customerName} tests and confirms satisfaction, ₦{booking.agreedPriceNgn.toLocaleString()} will be automatically released to your payout balance.
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Completed Jobs */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No completed jobs yet.
              </div>
            ) : (
              completedJobs.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{booking.trackingCode}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                      Payout Released
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</h4>
                  <p className="text-slate-600">Customer: {booking.customerName} · {booking.customerLocation}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-mono">
                    <span className="text-slate-500">Paid out via simulated settlement:</span>
                    <span className="font-bold text-emerald-700">₦{booking.agreedPriceNgn.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
