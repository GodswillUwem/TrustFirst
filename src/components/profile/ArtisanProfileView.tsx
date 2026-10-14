import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrustBadge } from '../common/TrustBadge';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Star,
  Camera,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';

export const ArtisanProfileView: React.FC = () => {
  const {
    selectedArtisanId,
    artisans,
    reviews,
    setCurrentView,
    openModal,
    setSelectedArtisanId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'services' | 'verification' | 'reviews'>('overview');
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<string | null>(null);

  const artisan = artisans.find((a) => a.id === selectedArtisanId) || artisans[0];
  const artisanReviews = reviews.filter((r) => r.artisanId === artisan.id);

  if (!artisan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p>Artisan not found.</p>
        <button
          onClick={() => setCurrentView('discovery')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('discovery')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Artisan Directory</span>
        </button>
      </div>

      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Banner pattern */}
        <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 relative">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="text-[11px] bg-white/10 backdrop-blur-md text-white px-2.5 py-1 rounded-md border border-white/20 font-mono">
              Verified Owerri Artisan
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-14 mb-4">
            {/* Avatar & Core Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative">
                <img
                  src={artisan.avatarUrl}
                  alt={artisan.fullName}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
                />
                {artisan.isAvailableToday && (
                  <span
                    className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                    title="Available for booking today"
                  />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 font-display">
                    {artisan.fullName}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                </div>
                <p className="text-sm font-semibold text-teal-700">
                  {artisan.category} · {artisan.yearsExperience} Years Practical Experience
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {artisan.workshopLocation}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {artisan.averageRating} ({artisan.totalReviews} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA Header Action */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedArtisanId(artisan.id);
                  openModal('booking');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer text-center"
              >
                Book This Artisan
              </button>
            </div>
          </div>

          {/* Quick Trust Summary Strip */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <TrustBadge verification={artisan.verification} showDetails={true} size="md" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview & Bio
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'portfolio'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Verified Projects ({artisan.portfolio.length})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'services'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Services & Pricing ({artisan.services.length})
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'verification'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Verification Audit Trail
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'reviews'
              ? 'border-teal-600 text-teal-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Customer Reviews ({artisanReviews.length})
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Tab Dynamic Views */}
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Bio & Practical Experience */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Professional Background</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {artisan.bio}
                </p>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Experience</span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {artisan.yearsExperience} Years
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Completed Jobs</span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {artisan.completedJobsCount} Confirmed
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Member Since</span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {artisan.memberSince}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apprenticeship Lineage (Distinct from formal education) */}
              {artisan.verification.apprenticeshipLineage && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                    <Award className="w-5 h-5 text-teal-600" />
                    <h3>Apprenticeship Lineage & Master Craftsman</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    In Nigeria's informal craftsmanship economy, technical competence is acquired through years of rigorous on-site training under a master craftsman. TrustFirst audits and records this lineage.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Trained Under</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {artisan.verification.apprenticeshipLineage.masterCraftsmanName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Training Location</span>
                        <span className="font-semibold text-slate-800">
                          {artisan.verification.apprenticeshipLineage.workshopLocation}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Apprenticeship Duration</span>
                        <span className="font-semibold text-slate-800">
                          {artisan.verification.apprenticeshipLineage.yearsOfApprenticeship} Full Years (Completed {artisan.verification.apprenticeshipLineage.completionYear})
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Trade Association</span>
                        <span className="font-semibold text-slate-800">
                          {artisan.verification.apprenticeshipLineage.tradeAssociation || 'Registered Artisan Union'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Areas in Owerri */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="font-bold text-slate-900 text-base">Service Coverage Areas</h3>
                <p className="text-xs text-slate-500">
                  This artisan travels to residences and project sites across the following Owerri zones:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {artisan.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Verified Project Portfolio</h3>
                  <p className="text-xs text-slate-500">
                    All projects include authenticated completion photography and descriptions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artisan.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-video bg-slate-100">
                      <img
                        src={item.afterPhotoUrl}
                        alt={item.title}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedPortfolioImage(item.afterPhotoUrl)}
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded font-mono">
                        {item.locationInOwerri}
                      </span>
                    </div>

                    <div className="p-4 flex-1 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>Completed: {item.completedDate}</span>
                        <span className="font-bold text-slate-900">
                          ₦{item.costEstimateNgn.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES & PRICING */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Services & Indicative Pricing</h3>
                  <p className="text-xs text-slate-500">
                    Final price is agreed before work begins and held in escrow protection.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {artisan.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-lg">
                      <h4 className="font-bold text-slate-900 text-sm">{service.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                      <span className="text-[11px] text-slate-400 block">
                        Estimated timeframe: {service.durationEstimate}
                      </span>
                    </div>

                    <div className="sm:text-right shrink-0 space-y-2">
                      <span className="text-xs text-slate-500 block">Indicative Rate</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">
                        ₦{service.indicativePriceNgn.toLocaleString()}
                      </span>
                      <div>
                        <button
                          onClick={() => {
                            setSelectedArtisanId(artisan.id);
                            openModal('booking');
                          }}
                          className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Book Service
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VERIFICATION AUDIT TRAIL */}
          {activeTab === 'verification' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  TrustFirst Verification Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  Every badge on this profile is verified through a rigorous 3-pillar protocol.
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                {/* Pillar 1 Details */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      1. Government Identity Verification
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Document Type: <strong>{artisan.verification.identityDocType || 'NIN'}</strong>
                  </p>
                  <p className="text-xs text-slate-600 font-mono">
                    Masked Record: {artisan.verification.identityDocNumber || 'Verified in Government Database'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Verification Date: {artisan.verification.identityVerifiedDate || '2025-08-14'}
                  </p>
                </div>

                {/* Pillar 2 Details */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      2. Physical Workshop & Equipment Inspection
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
                      INSPECTED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Workshop Address: <strong>{artisan.verification.workshopAddress}</strong>
                  </p>
                  <p className="text-xs text-slate-600">
                    Field Verifier: <strong>{artisan.verification.fieldVerifierName}</strong>
                  </p>
                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded border border-slate-200">
                    "{artisan.verification.fieldNotes || 'Physical workshop and equipment verified in person.'}"
                  </p>
                </div>

                {/* Pillar 3 Details */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      3. Technical Skill Assessment & Apprenticeship
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
                      VALIDATED
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Master Craftsman: <strong>{artisan.verification.apprenticeshipLineage?.masterCraftsmanName}</strong>
                  </p>
                  <p className="text-xs text-slate-600">
                    Years Served: <strong>{artisan.verification.apprenticeshipLineage?.yearsOfApprenticeship} years</strong>
                  </p>
                  <p className="text-xs text-slate-600">
                    Guarantor on file: <strong>{artisan.verification.apprenticeshipLineage?.guarantorName || 'Community Leader'}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Verified Customer Reviews</h3>
                  <p className="text-xs text-slate-500">
                    Reviews can ONLY be posted after confirmed completed work on TrustFirst.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{artisan.averageRating} / 5.0</span>
                </div>
              </div>

              {artisanReviews.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  No reviews posted yet. Be the first to book and review this artisan!
                </div>
              ) : (
                <div className="space-y-3">
                  {artisanReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-5 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{rev.customerName}</span>
                            <span className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded border border-teal-200">
                              Verified Job
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {rev.customerLocation} · {rev.createdAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-500' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>

                      {/* Attached Proof photo if available */}
                      {rev.proofPhotoUrl && (
                        <div className="pt-2">
                          <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                            Verified Proof of Work:
                          </span>
                          <img
                            src={rev.proofPhotoUrl}
                            alt="Completed Job Proof"
                            className="w-24 h-24 object-cover rounded-lg border border-slate-200 cursor-pointer"
                            onClick={() => setSelectedPortfolioImage(rev.proofPhotoUrl || null)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Booking Widget & Escrow Assurance */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 sticky top-24">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Standard Callout & Diagnostic
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  ₦{artisan.hourlyOrBaseRateNgn.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">base charge</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Availability:</span>
                <span className="font-semibold text-emerald-600">
                  {artisan.isAvailableToday ? 'Available Today in Owerri' : 'Book in Advance'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Average Response:</span>
                <span className="font-semibold text-slate-800">Under 30 mins</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Warranty on Work:</span>
                <span className="font-semibold text-slate-800">30 to 90 Days</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedArtisanId(artisan.id);
                openModal('booking');
              }}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Request Booking with Escrow
            </button>

            {/* Escrow Guarantee Pill Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>The TrustFirst Payment Gate</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Your payment is held in prototype escrow. The artisan cannot receive payout until they upload photographic proof of work and you confirm 100% satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for portfolio images */}
      {selectedPortfolioImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPortfolioImage(null)}
        >
          <div className="max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden p-2">
            <img
              src={selectedPortfolioImage}
              alt="Enlarged Project View"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center text-xs text-slate-400">
              Click anywhere to close preview
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
