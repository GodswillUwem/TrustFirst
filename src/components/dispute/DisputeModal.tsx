import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DisputeDetails } from '../../types';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Camera,
  Trash2,
  Lock,
} from 'lucide-react';

export const DisputeModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    activeBookingForModal,
    reportJobDispute,
    setCurrentView,
  } = useApp();

  const booking = activeBookingForModal;

  const [disputeReason, setDisputeReason] = useState<DisputeDetails['disputeReason']>(
    'Poor Craftsmanship'
  );
  const [customerNotes, setCustomerNotes] = useState(
    'The water pipe connection is still weeping water behind the wall fitting. The wall began soaking up moisture within 2 hours of the repair. Work is incomplete and needs re-inspection.'
  );
  const [desiredResolution, setDesiredResolution] = useState<DisputeDetails['desiredResolution']>(
    'Rework Required'
  );
  const [evidencePhotos, setEvidencePhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  if (currentModal !== 'dispute_report' || !booking) return null;

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setEvidencePhotos([...evidencePhotos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setEvidencePhotos(evidencePhotos.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportJobDispute(booking.id, {
      disputeReason,
      customerNotes,
      evidencePhotos,
      desiredResolution,
    });
    closeModal();
    setCurrentView('customer_dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Dispute & Hold Protection</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Report Unsatisfactory Work
            </h2>
            <p className="text-xs text-slate-500">
              Job: <strong>{booking.trackingCode}</strong> · Artisan: {booking.artisanName}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Freeze Notice */}
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-950">
          <Lock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">
              Payment Immediately Frozen (₦{booking.agreedPriceNgn.toLocaleString()})
            </span>
            <span className="text-slate-600 text-[11px]">
              The artisan will not receive any payment while this dispute is open. A TrustFirst
              Owerri field officer will review the evidence and mediate a resolution or refund.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Dispute Category */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">Primary Issue / Reason</label>
            <select
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value as any)}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-rose-500 bg-white text-slate-800 font-medium"
            >
              <option value="Poor Craftsmanship">Poor Craftsmanship / Substandard Work</option>
              <option value="Incomplete Work">Incomplete Work / Abandoned Before Finishing</option>
              <option value="Property Damage">Property Damage Caused During Work</option>
              <option value="Unauthorized Additional Cost">Unauthorized Demands for Extra Cash</option>
              <option value="Abandonment">Artisan Absent or Non-Responsive</option>
            </select>
          </div>

          {/* Customer Explanation */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              Explain What is Wrong with the Work
            </label>
            <textarea
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="State the defects, what was agreed versus what was delivered, or safety concerns..."
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-rose-500 focus:outline-none text-slate-800"
              required
            />
          </div>

          {/* Evidence Photos */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Customer Photographic Evidence (Defects / Damage)</span>
              <span className="text-slate-400 font-normal">{evidencePhotos.length} photos</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {evidencePhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
                >
                  <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md opacity-90 hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[9px] bg-slate-900/80 px-1 py-0.5 rounded text-white font-mono">
                    Defect Photo #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Add defect photo URL"
                className="flex-1 p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg"
              >
                + Add Photo
              </button>
            </div>
          </div>

          {/* Desired Resolution */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">Desired Resolution</label>
            <select
              value={desiredResolution}
              onChange={(e) => setDesiredResolution(e.target.value as any)}
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-rose-500 bg-white text-slate-800 font-medium"
            >
              <option value="Rework Required">
                Mandated Rework: Artisan must correct defects at no additional cost
              </option>
              <option value="Full Refund">
                Full Refund: Return 100% of escrow funds to customer
              </option>
              <option value="Partial Refund with Discount">
                Partial Settlement: Discount price to reflect partial delivery
              </option>
              <option value="Independent Inspection">
                Independent Field Inspection: Send TrustFirst inspector to site
              </option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Submit Dispute & Freeze Payment →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
