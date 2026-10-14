import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  Camera,
  MessageSquare,
} from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    activeBookingForModal,
    submitReview,
    setCurrentView,
  } = useApp();

  const booking = activeBookingForModal;

  const [rating, setRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [comment, setComment] = useState(
    'Emeka did a phenomenal job repairing the hidden pipe leak in New Owerri. He arrived with complete PPR hot welding gear, carried out pressure tests without rushing, and provided clear photo evidence before I approved payment. Highly recommended!'
  );

  if (currentModal !== 'review' || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      bookingId: booking.id,
      artisanId: booking.artisanId,
      rating,
      qualityRating,
      punctualityRating,
      communicationRating,
      comment,
      jobTitle: booking.serviceTitle,
      proofPhotoUrl: booking.proofOfWork?.photos[0],
    });
    closeModal();
    setCurrentView('customer_dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Completed Booking Review</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Rate & Review {booking.artisanName}
            </h2>
            <p className="text-xs text-slate-500">
              For completed job: <strong>{booking.serviceTitle}</strong> (₦
              {booking.agreedPriceNgn.toLocaleString()})
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Overall Rating Star Selector */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
            <span className="font-semibold text-slate-700 text-xs block">Overall Experience</span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'}`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800 block">
              {rating === 5
                ? '5 Stars — Exceptional Work'
                : rating === 4
                ? '4 Stars — Good Quality'
                : rating === 3
                ? '3 Stars — Average'
                : 'Needs Improvement'}
            </span>
          </div>

          {/* Sub-Criteria Breakdown */}
          <div className="space-y-3 bg-white p-3 rounded-xl border border-slate-100">
            {/* Quality */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Quality of Craftsmanship:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQualityRating(s)}
                    className="p-0.5 text-amber-500"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${s <= qualityRating ? 'fill-amber-500' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Punctuality */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Punctuality & Arrival in Owerri:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPunctualityRating(s)}
                    className="p-0.5 text-amber-500"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${s <= punctualityRating ? 'fill-amber-500' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Communication */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Communication & Professionalism:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCommunicationRating(s)}
                    className="p-0.5 text-amber-500"
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${s <= communicationRating ? 'fill-amber-500' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              Share details for other homeowners in Owerri
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did this artisan do well? How was the proof-of-work confirmation?"
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 text-slate-800"
              required
            />
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              This review will carry a <strong>Verified Booking Badge</strong> and link to the completed proof of work.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Publish Verified Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
