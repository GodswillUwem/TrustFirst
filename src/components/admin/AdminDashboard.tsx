import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Artisan, Booking, DisputeDetails, VerificationDetails } from '../../types';
import { TrustBadge } from '../common/TrustBadge';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin,
  Camera,
  Calendar,
  Lock,
  Search,
  DollarSign,
  Award,
  Clock,
  RotateCcw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    artisans,
    bookings,
    updateArtisanVerification,
    resolveDispute,
    setCurrentView,
    setSelectedArtisanId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'disputes' | 'transactions'>('verifications');
  const [selectedArtisanForReview, setSelectedArtisanForReview] = useState<Artisan | null>(null);
  const [fieldNotesInput, setFieldNotesInput] = useState('');
  const [inspectorName, setInspectorName] = useState('Engr. Kenneth Nze (TrustFirst Field Officer)');

  // Dispute resolution state
  const [selectedDisputeBooking, setSelectedDisputeBooking] = useState<Booking | null>(null);
  const [adminResolutionDecision, setAdminResolutionDecision] = useState<
    'Release to Artisan' | 'Full Refund to Customer' | '50/50 Split Resolution' | 'Mandated Rework'
  >('Mandated Rework');
  const [adminResolutionNotes, setAdminResolutionNotes] = useState(
    'Field inspection confirmed surface was not primed correctly. Artisan instructed to scrape, apply anti-fungal primer, and recoat at no additional charge within 5 days.'
  );

  // Filter pending verifications
  const pendingArtisans = artisans.filter(
    (a) =>
      a.verification.overallStatus === 'under_review' ||
      a.verification.physicalStatus === 'under_review' ||
      a.verification.physicalStatus === 'pending'
  );

  const disputedBookings = bookings.filter((b) => b.status === 'disputed' || b.dispute);

  // KPI metrics
  const totalArtisansCount = artisans.length;
  const verifiedArtisansCount = artisans.filter((a) => a.verification.overallStatus === 'verified').length;
  const activeDisputesCount = bookings.filter((b) => b.status === 'disputed').length;
  const totalEscrowVolume = bookings.reduce((sum, b) => sum + b.agreedPriceNgn, 0);

  const handleApproveIdentity = (artisanId: string) => {
    updateArtisanVerification(artisanId, {
      identityStatus: 'verified',
      identityVerifiedDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleApprovePhysical = (artisanId: string) => {
    updateArtisanVerification(artisanId, {
      physicalStatus: 'verified',
      fieldVerifierName: inspectorName,
      fieldInspectionDate: new Date().toISOString().split('T')[0],
      fieldNotes: fieldNotesInput.trim() || 'Physical workshop and equipment verified in person by field team.',
    });
  };

  const handleRejectArtisan = (artisanId: string) => {
    updateArtisanVerification(artisanId, {
      overallStatus: 'rejected',
      fieldNotes: 'Verification criteria not met.',
    });
  };

  const handleExecuteDisputeResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisputeBooking) return;
    resolveDispute(selectedDisputeBooking.id, adminResolutionDecision, adminResolutionNotes);
    setSelectedDisputeBooking(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Imo State Artisan Verification & Oversight Bureau</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            TrustFirst Verifier & Admin Desk
          </h1>
          <p className="text-xs text-slate-300">
            Field Officer: <strong>Engr. Kenneth Nze</strong> · Owerri Municipal Operations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('discovery')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700"
          >
            Directory View
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Artisans
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalArtisansCount}
          </div>
          <span className="text-[11px] text-slate-500">Registered across Owerri</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Verified Badges Active
          </span>
          <div className="text-2xl font-extrabold text-teal-700 font-mono">
            {verifiedArtisansCount}
          </div>
          <span className="text-[11px] text-teal-700 font-medium">Dual verification approved</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Disputes
          </span>
          <div className="text-2xl font-extrabold text-rose-600 font-mono">
            {activeDisputesCount}
          </div>
          <span className="text-[11px] text-rose-600 font-medium">
            Escrow frozen awaiting decision
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Handled Escrow
          </span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            ₦{totalEscrowVolume.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500">Protected job volume</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'verifications'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Artisan Verification Queue ({pendingArtisans.length})
        </button>
        <button
          onClick={() => setActiveTab('disputes')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'disputes'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Dispute Resolution Center ({disputedBookings.length})
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-2.5 px-3.5 border-b-2 shrink-0 transition-colors cursor-pointer ${
            activeTab === 'transactions'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          All Bookings & Escrow Audit ({bookings.length})
        </button>
      </div>

      {/* TAB 1: ARTISAN VERIFICATION QUEUE */}
      {activeTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
              Reviewing <strong>{pendingArtisans.length}</strong> applications needing physical inspection or ID confirmation.
            </span>
            <span className="text-slate-400">
              Rule: Identity and Physical checks are distinct from technical apprenticeships.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {pendingArtisans.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                All registered artisans in Owerri have completed their verification checks!
              </div>
            ) : (
              pendingArtisans.map((artisan) => (
                <div
                  key={artisan.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={artisan.avatarUrl}
                        alt={artisan.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{artisan.fullName}</h3>
                        <p className="text-xs font-semibold text-teal-700">
                          {artisan.category} · {artisan.yearsExperience} yrs experience
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        Status: {artisan.verification.overallStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* 3 Pillars Status & Action Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Pillar 1: Identity */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">1. Legal Identity Check</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            artisan.verification.identityStatus === 'verified'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {artisan.verification.identityStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-600">
                        {artisan.verification.identityDocType || 'National ID (NIN)'}
                      </p>
                      <p className="text-slate-500 font-mono text-[11px]">
                        {artisan.verification.identityDocNumber || 'NIN: 5492******19'}
                      </p>

                      {artisan.verification.identityStatus !== 'verified' && (
                        <button
                          onClick={() => handleApproveIdentity(artisan.id)}
                          className="w-full mt-2 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-[11px] cursor-pointer"
                        >
                          Approve Identity Check
                        </button>
                      )}
                    </div>

                    {/* Pillar 2: Physical Workshop Inspection */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">2. Physical Workshop</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            artisan.verification.physicalStatus === 'verified'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {artisan.verification.physicalStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-600 truncate">{artisan.workshopLocation}</p>
                      <p className="text-slate-500 text-[11px] italic">
                        {artisan.verification.fieldNotes || 'Scheduled for physical inspection.'}
                      </p>

                      {artisan.verification.physicalStatus !== 'verified' && (
                        <button
                          onClick={() => handleApprovePhysical(artisan.id)}
                          className="w-full mt-2 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-[11px] cursor-pointer"
                        >
                          Record Field Inspection (Approve)
                        </button>
                      )}
                    </div>

                    {/* Pillar 3: Technical Apprenticeship */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">3. Apprenticeship Lineage</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                          RECORDED
                        </span>
                      </div>
                      <p className="text-slate-600 truncate">
                        Master:{' '}
                        <strong>
                          {artisan.verification.apprenticeshipLineage?.masterCraftsmanName}
                        </strong>
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        {artisan.verification.apprenticeshipLineage?.yearsOfApprenticeship} yrs ·{' '}
                        {artisan.verification.apprenticeshipLineage?.tradeAssociation}
                      </p>
                    </div>
                  </div>

                  {/* Reject option */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleRejectArtisan(artisan.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                    >
                      Reject Profile Application
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DISPUTE RESOLUTION CENTER */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-600">
            When a customer reports an issue, payment remains strictly <strong>on hold</strong>.
            The field officer reviews photographic evidence from both parties and issues an authoritative ruling.
          </div>

          <div className="space-y-4">
            {disputedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-rose-300 p-6 space-y-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {booking.trackingCode}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-rose-100 text-rose-900 font-bold border border-rose-200">
                      Dispute: {booking.dispute?.disputeReason || 'Unsatisfactory Work'}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                    Escrow Locked: ₦{booking.agreedPriceNgn.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Left: Customer claim & defect evidence */}
                  <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                    <span className="font-bold text-rose-900 block text-sm">
                      Customer Complaint ({booking.customerName})
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{booking.dispute?.customerNotes}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Location: {booking.customerAddress} ({booking.customerLocation})
                    </p>
                    <p className="text-[11px] font-semibold text-rose-800">
                      Customer Request: {booking.dispute?.desiredResolution}
                    </p>

                    {booking.dispute?.evidencePhotos && booking.dispute.evidencePhotos.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                          Defect Photos:
                        </span>
                        <div className="flex gap-2">
                          {booking.dispute.evidencePhotos.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt="Defect"
                              className="w-20 h-20 object-cover rounded-lg border border-rose-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Artisan proof & response */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block text-sm">
                      Artisan's Submitted Proof ({booking.artisanName})
                    </span>
                    <p className="text-slate-700 leading-relaxed italic">
                      "{booking.proofOfWork?.completionNotes || 'Work was done as agreed.'}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Materials reported: {booking.proofOfWork?.materialsUsed?.join(', ') || 'N/A'}
                    </p>

                    {booking.proofOfWork?.photos && booking.proofOfWork.photos.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                          Artisan Evidence:
                        </span>
                        <div className="flex gap-2">
                          {booking.proofOfWork.photos.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt="Proof"
                              className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resolution decision or trigger */}
                {booking.dispute?.status === 'resolved' ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                    ✓ Dispute Resolved by Field Officer: <strong>{booking.dispute.adminDecision}</strong>.
                    <p className="text-[11px] mt-0.5">{booking.dispute.resolutionNotes}</p>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setSelectedDisputeBooking(booking)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Arbitrate & Resolve Dispute →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ALL BOOKINGS & ESCROW AUDIT */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base">Comprehensive Escrow Ledger</h3>
            <span className="text-xs text-slate-500 font-mono">
              Total Volume: ₦{totalEscrowVolume.toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Job ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Artisan</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Escrow Status</th>
                  <th className="py-2.5 px-3">Job Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{b.trackingCode}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{b.customerName}</span>
                      <span className="block text-[10px] text-slate-400">{b.customerLocation}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">{b.artisanName}</span>
                      <span className="block text-[10px] text-teal-700">{b.artisanCategory}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[200px]">{b.serviceTitle}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₦{b.agreedPriceNgn.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.escrowStatus === 'released_to_artisan'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.escrowStatus === 'frozen_in_dispute'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-teal-50 text-teal-800'
                        }`}
                      >
                        {b.escrowStatus.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-700">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Arbitration Modal Dialog */}
      {selectedDisputeBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
                  Dispute Arbitration
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Resolve Dispute: {selectedDisputeBooking.trackingCode}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDisputeBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteDisputeResolution} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Select Administrative Binding Ruling
                </label>
                <select
                  value={adminResolutionDecision}
                  onChange={(e) => setAdminResolutionDecision(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
                >
                  <option value="Mandated Rework">
                    Mandated Rework (Artisan must fix defects, escrow funds remain held)
                  </option>
                  <option value="Full Refund to Customer">
                    Full Refund to Customer (100% returned to customer account)
                  </option>
                  <option value="50/50 Split Resolution">
                    50/50 Split Settlement (Funds split equally between parties)
                  </option>
                  <option value="Release to Artisan">
                    Release to Artisan (Work deemed compliant with agreed specs)
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Inspector Findings & Resolution Notes
                </label>
                <textarea
                  rows={3}
                  value={adminResolutionNotes}
                  onChange={(e) => setAdminResolutionNotes(e.target.value)}
                  placeholder="Official ruling notes communicated to both parties..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDisputeBooking(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Execute Administrative Ruling
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
