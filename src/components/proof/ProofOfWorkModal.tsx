import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Plus,
  Trash2,
  ShieldAlert,
} from 'lucide-react';

export const ProofOfWorkModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    activeBookingForModal,
    submitProofOfWork,
    setCurrentView,
  } = useApp();

  const booking = activeBookingForModal;

  const [completionNotes, setCompletionNotes] = useState(
    'Successfully identified and sealed the hidden leak using 25mm high-grade German PPR pipe. Ran full hydraulic pressure test for 45 minutes with zero leak observed. Cleaned up site and re-cemented the wall.'
  );
  const [photoUrls, setPhotoUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState<string[]>([
    '25mm PPR Heat-Weld Elbow (2 pcs)',
    'High-pressure test union',
    'Dangote Fast-Cure Cement',
  ]);
  const [newMaterial, setNewMaterial] = useState('');
  const [materialsCostNgn, setMaterialsCostNgn] = useState(7500);
  const [warrantyDays, setWarrantyDays] = useState(90);

  if (currentModal !== 'proof_submit' || !booking) return null;

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotoUrls([...photoUrls, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setMaterialsUsed([...materialsUsed, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setMaterialsUsed(materialsUsed.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProofOfWork(booking.id, {
      completionNotes,
      photos: photoUrls,
      materialsUsed,
      materialsCostNgn,
      warrantyPeriodDays: warrantyDays,
      customerSignatureAck: true,
    });
    closeModal();
    setCurrentView('artisan_dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
              Step 4: Proof of Work Submission
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Submit Completion Evidence
            </h2>
            <p className="text-xs text-slate-500">
              Job: <strong>{booking.trackingCode}</strong> · Customer: {booking.customerName} (
              {booking.customerLocation})
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Essential Rule Notice */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Artisan Accountability Protocol</span>
            <span>
              Submitting proof of work does <strong>NOT</strong> automatically release payout. Your
              evidence is sent to <strong>{booking.customerName}</strong> for physical inspection and
              satisfaction confirmation.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Completion Notes */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              Detailed Completion Notes & Diagnostic Summary
            </label>
            <textarea
              rows={3}
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              placeholder="Explain exactly what was repaired, tested, and resolved..."
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 focus:outline-none text-slate-800"
              required
            />
          </div>

          {/* Photo Upload & Gallery */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Photographic Evidence (Finished Work & Testing)</span>
              <span className="text-slate-400 font-normal">{photoUrls.length} photos added</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {photoUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-100"
                >
                  <img
                    src={url}
                    alt={`Proof ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-md opacity-90 hover:opacity-100 transition-opacity"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-1 left-1 text-[9px] bg-slate-900/80 px-1 py-0.5 rounded text-white font-mono">
                    Evidence #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Add Photo Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Paste image URL (or use default samples)"
                className="flex-1 p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors cursor-pointer"
              >
                + Add Photo
              </button>
            </div>
          </div>

          {/* Materials Used Breakdown */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block">
              Materials & Parts Installed
            </label>
            <div className="flex flex-wrap gap-1.5">
              {materialsUsed.map((mat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md"
                >
                  <span>{mat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(i)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                placeholder="Add part e.g. 32A Breaker, Brass Valve..."
                className="flex-1 p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg"
              >
                + Add Part
              </button>
            </div>
          </div>

          {/* Warranty & Cost Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Craftsman Warranty Period</label>
              <select
                value={warrantyDays}
                onChange={(e) => setWarrantyDays(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 bg-white"
              >
                <option value={30}>30 Days Workmanship Guarantee</option>
                <option value={60}>60 Days Workmanship Guarantee</option>
                <option value={90}>90 Days Workmanship Guarantee</option>
                <option value={180}>180 Days Workmanship Guarantee</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Agreed Escrow Payout</label>
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 font-mono font-bold text-slate-900 text-sm">
                ₦{booking.agreedPriceNgn.toLocaleString()} (Awaiting Customer Sign-off)
              </div>
            </div>
          </div>

          {/* Action buttons */}
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
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Submit Proof for Customer Confirmation →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
