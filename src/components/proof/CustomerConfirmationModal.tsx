import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const CustomerConfirmationModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    activeBookingForModal,
    confirmJobSatisfaction,
    openModal,
    setCurrentView,
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [satisfactionConfirmed, setSatisfactionConfirmed] = useState(false);

  const booking = activeBookingForModal;

  if (currentModal !== 'customer_confirm' || !booking) return null;

  const proof = booking.proofOfWork;

  const handleApprove = () => {
    confirmJobSatisfaction(booking.id);
    closeModal();
    // Prompt customer to leave a verified review!
    openModal('review');
  };

  const handleOpenDispute = () => {
    closeModal();
    openModal('dispute_report');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Milestone Customer Confirmation Gate</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Review Submitted Proof of Work
            </h2>
            <p className="text-xs text-slate-500">
              Job: <strong>{booking.trackingCode}</strong> · Artisan: {booking.artisanName} (
              {booking.artisanCategory})
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Accountability Explanation Banner */}
        <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-teal-300">You Hold the Release Key</span>
            <span className="font-mono text-emerald-400 font-bold">
              ₦{booking.agreedPriceNgn.toLocaleString()} Currently in Escrow
            </span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Funds will <strong>NOT</strong> leave the escrow account until you inspect the work,
            verify the photographic proof, and click "Confirm Satisfactory Completion" below.
          </p>
        </div>

        {/* Proof of Work Details */}
        <div className="space-y-4 text-xs">
          {/* Photos Submitted by Artisan */}
          {proof?.photos && proof.photos.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">
                Evidence Photos Uploaded by {booking.artisanName}
              </span>

              {/* Large Active Photo */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                <img
                  src={proof.photos[activePhotoIndex]}
                  alt="Proof large"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded font-mono">
                  Photo #{activePhotoIndex + 1} of {proof.photos.length}
                </span>
              </div>

              {/* Thumbnails */}
              {proof.photos.length > 1 && (
                <div className="flex gap-2">
                  {proof.photos.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-20 aspect-video rounded-lg overflow-hidden border cursor-pointer transition-all ${
                        activePhotoIndex === idx
                          ? 'border-teal-600 ring-2 ring-teal-500/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Completion Notes from Artisan */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-semibold text-slate-800 block">
              Artisan's Completion Notes & Technical Log:
            </span>
            <p className="text-slate-700 leading-relaxed italic">
              "{proof?.completionNotes || 'Work has been concluded according to agreed specifications.'}"
            </p>

            {proof?.materialsUsed && proof.materialsUsed.length > 0 && (
              <div className="pt-2 border-t border-slate-200 mt-2">
                <span className="font-medium text-slate-600 block mb-1">Parts & Materials Used:</span>
                <div className="flex flex-wrap gap-1">
                  {proof.materialsUsed.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {proof?.warrantyPeriodDays && (
              <div className="text-[11px] text-teal-800 font-medium pt-1">
                ✓ Guaranteed by artisan with {proof.warrantyPeriodDays}-Day workmanship warranty.
              </div>
            )}
          </div>

          {/* Checkbox Acknowledgment */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={satisfactionConfirmed}
              onChange={(e) => setSatisfactionConfirmed(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 mt-0.5"
            />
            <div className="text-slate-700 text-xs">
              <span className="font-bold text-slate-900 block">
                I have inspected the work and acknowledge it is complete & satisfactory.
              </span>
              <span className="text-slate-500 text-[11px]">
                Checking this box authorizes the immediate transfer of ₦{booking.agreedPriceNgn.toLocaleString()} from escrow to the artisan's payout wallet.
              </span>
            </div>
          </label>
        </div>

        {/* Decision Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Dispute trigger button */}
          <button
            type="button"
            onClick={handleOpenDispute}
            className="w-full sm:w-auto px-4 py-2.5 border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Report a Problem / Dispute Job</span>
          </button>

          {/* Confirm & Payout Release */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeModal}
              className="px-3.5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!satisfactionConfirmed}
              onClick={handleApprove}
              className={`flex-1 sm:flex-none px-5 py-2.5 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                satisfactionConfirmed
                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve & Release Payment (₦{booking.agreedPriceNgn.toLocaleString()})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
