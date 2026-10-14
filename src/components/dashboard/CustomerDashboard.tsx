import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking, JobStatus } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Camera,
  Star,
  CheckCircle2,
  Lock,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileCheck2,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    openModal,
    setActiveBookingForModal,
    setCurrentView,
    setSelectedArtisanId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'awaiting_confirmation' | 'active' | 'completed' | 'disputed'>('all');

  // Customer's bookings (cust-1 or all demo bookings for preview)
  const myBookings = bookings.filter(
    (b) => b.customerId === currentUser.id || currentUser.role !== 'customer' || true
  );

  const awaitingConfirmationBookings = myBookings.filter((b) => b.status === 'work_submitted');
  const activeBookings = myBookings.filter(
    (b) => b.status === 'requested' || b.status === 'accepted' || b.status === 'in_progress'
  );
  const completedBookings = myBookings.filter(
    (b) => b.status === 'completed' || b.status === 'approved_for_payout'
  );
  const disputedBookings = myBookings.filter((b) => b.status === 'disputed');

  const displayedBookings =
    activeTab === 'awaiting_confirmation'
      ? awaitingConfirmationBookings
      : activeTab === 'active'
      ? activeBookings
      : activeTab === 'completed'
      ? completedBookings
      : activeTab === 'disputed'
      ? disputedBookings
      : myBookings;

  const handleReviewProof = (booking: Booking) => {
    setActiveBookingForModal(booking);
    openModal('customer_confirm');
  };

  const handleLeaveReview = (booking: Booking) => {
    setActiveBookingForModal(booking);
    openModal('review');
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'requested':
        return (
          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
            Requested · Awaiting Artisan
          </span>
        );
      case 'accepted':
        return (
          <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 text-xs font-semibold">
            Accepted · Scheduled
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 text-xs font-semibold">
            Work in Progress
          </span>
        );
      case 'work_submitted':
        return (
          <span className="px-2.5 py-0.5 rounded bg-teal-100 text-teal-900 text-xs font-bold animate-pulse border border-teal-300">
            Proof Uploaded · Awaiting Your Confirmation
          </span>
        );
      case 'approved_for_payout':
        return (
          <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-xs font-bold">
            Approved for Payout Release
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold">
            Job Completed & Closed
          </span>
        );
      case 'disputed':
        return (
          <span className="px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
            Dispute Review · Escrow Frozen
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
              Customer Portal · Owerri Resident
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {currentUser.name}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{currentUser.location}, Imo State</span>
              <span>·</span>
              <span>{currentUser.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('discovery')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            + Book Another Artisan
          </button>
        </div>
      </div>

      {/* Critical Highlight Banner for Work Submitted (Core differentiator spotlight) */}
      {awaitingConfirmationBookings.length > 0 && (
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Camera className="w-5 h-5 text-teal-400" />
              <span>Action Required: Artisan Submitted Proof of Work</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono border border-teal-500/30">
              Payment Held Safe in Escrow
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {awaitingConfirmationBookings[0].artisanName} has completed{' '}
            <strong>"{awaitingConfirmationBookings[0].serviceTitle}"</strong> and uploaded photographic evidence.
            Inspect the work now to authorize payment release or report any defects.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleReviewProof(awaitingConfirmationBookings[0])}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Inspect Proof & Release Payment (₦{awaitingConfirmationBookings[0].agreedPriceNgn.toLocaleString()})</span>
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          All Bookings ({myBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('awaiting_confirmation')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'awaiting_confirmation'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Awaiting My Confirmation ({awaitingConfirmationBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'active'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Active in Progress ({activeBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Completed & Released ({completedBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('disputed')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'disputed'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Disputed ({disputedBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {displayedBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500 space-y-3">
            <p>No bookings in this category.</p>
            <button
              onClick={() => setCurrentView('discovery')}
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg"
            >
              Browse Owerri Artisans
            </button>
          </div>
        ) : (
          displayedBookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
                booking.status === 'work_submitted'
                  ? 'border-teal-400 ring-2 ring-teal-500/10'
                  : booking.status === 'disputed'
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              {/* Top Row: Tracking code, status badge, escrow badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {booking.trackingCode}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{booking.scheduledDate} at {booking.scheduledTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(booking.status)}

                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-teal-600" />
                    ₦{booking.agreedPriceNgn.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Middle Row: Artisan Details and Job description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Artisan Info */}
                <div className="flex items-start gap-3">
                  <img
                    src={booking.artisanAvatar}
                    alt={booking.artisanName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {booking.artisanName}
                    </h4>
                    <p className="text-teal-700 font-semibold">{booking.artisanCategory}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{booking.artisanPhone}</p>
                  </div>
                </div>

                {/* Job Description */}
                <div className="md:col-span-2 space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{booking.serviceTitle}</h4>
                  <p className="text-slate-600 leading-relaxed">{booking.jobDescription}</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Location: {booking.customerAddress} ({booking.customerLocation})
                  </p>
                </div>
              </div>

              {/* Dispute Box if Disputed */}
              {booking.status === 'disputed' && booking.dispute && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between text-rose-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Dispute Open: {booking.dispute.disputeReason}
                    </span>
                    <span className="font-mono text-[11px] uppercase">Funds on Hold</span>
                  </div>
                  <p className="text-slate-700 italic">"{booking.dispute.customerNotes}"</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Status: {booking.dispute.status.toUpperCase()} · Desired: {booking.dispute.desiredResolution}
                  </p>
                </div>
              )}

              {/* Bottom Actions based on status */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {/* Stepper Status Indicators */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span
                    className={
                      booking.status !== 'requested' ? 'text-teal-700 font-bold' : 'text-slate-900'
                    }
                  >
                    1. Booked
                  </span>
                  <span>→</span>
                  <span
                    className={
                      booking.status === 'in_progress' ||
                      booking.status === 'work_submitted' ||
                      booking.status === 'completed'
                        ? 'text-teal-700 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    2. In Progress
                  </span>
                  <span>→</span>
                  <span
                    className={
                      booking.status === 'work_submitted'
                        ? 'text-amber-600 font-bold'
                        : booking.status === 'completed' || booking.status === 'approved_for_payout'
                        ? 'text-teal-700 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    3. Proof Submitted
                  </span>
                  <span>→</span>
                  <span
                    className={
                      booking.status === 'completed' || booking.status === 'approved_for_payout'
                        ? 'text-emerald-700 font-bold'
                        : 'text-slate-400'
                    }
                  >
                    4. Confirmed & Paid
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-auto">
                  {booking.status === 'work_submitted' && (
                    <button
                      onClick={() => handleReviewProof(booking)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Inspect Proof & Confirm Work</span>
                    </button>
                  )}

                  {(booking.status === 'approved_for_payout' || booking.status === 'completed') && (
                    <>
                      {booking.reviewId ? (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Review Published
                        </span>
                      ) : (
                        <button
                          onClick={() => handleLeaveReview(booking)}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Leave Verified Review</span>
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => {
                      setSelectedArtisanId(booking.artisanId);
                      setCurrentView('profile');
                    }}
                    className="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    View Artisan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
