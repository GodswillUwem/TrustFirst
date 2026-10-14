import React from 'react';
import { VerificationDetails } from '../../types';
import { CheckCircle2, ShieldCheck, MapPin, Award, AlertCircle, Clock } from 'lucide-react';

interface TrustBadgeProps {
  verification: VerificationDetails;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  verification,
  showDetails = false,
  size = 'md',
}) => {
  const isOverallVerified = verification.overallStatus === 'verified';
  const isUnderReview = verification.overallStatus === 'under_review';
  const isIdentityVerified = verification.identityStatus === 'verified';
  const isPhysicalVerified = verification.physicalStatus === 'verified';
  const hasApprenticeship = !!verification.apprenticeshipLineage?.masterCraftsmanName;

  if (size === 'sm') {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs">
        {isOverallVerified ? (
          <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Verified Artisan
          </span>
        ) : isUnderReview ? (
          <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Verification in Progress
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            Unverified
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Primary Status Banner */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
          isOverallVerified
            ? 'bg-teal-50/80 border-teal-200 text-teal-900'
            : isUnderReview
            ? 'bg-amber-50/80 border-amber-200 text-amber-900'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <ShieldCheck
          className={`w-4 h-4 shrink-0 ${
            isOverallVerified ? 'text-teal-600' : isUnderReview ? 'text-amber-600' : 'text-slate-400'
          }`}
        />
        <div className="flex-1 flex items-center justify-between">
          <span className="font-semibold">
            {isOverallVerified
              ? 'TrustFirst Verified Artisan'
              : isUnderReview
              ? 'Verification Under Field Review'
              : 'Pending Verification'}
          </span>
          <span className="text-[11px] opacity-75 font-mono">Owerri Registry</span>
        </div>
      </div>

      {/* Distinct 3-Pillar Verification Breakdown (Anti-Slop / Clear Separation) */}
      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
          {/* Pillar 1: Identity */}
          <div
            className={`p-2.5 rounded-lg border ${
              isIdentityVerified
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-slate-50/60 border-slate-200 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium mb-1">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${isIdentityVerified ? 'text-teal-600' : 'text-slate-300'}`}
              />
              <span>1. Legal Identity</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              {isIdentityVerified
                ? `${verification.identityDocType || 'NIN'} Verified by Imo registry`
                : 'ID verification pending'}
            </p>
          </div>

          {/* Pillar 2: Physical Workshop Inspection */}
          <div
            className={`p-2.5 rounded-lg border ${
              isPhysicalVerified
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-slate-50/60 border-slate-200 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium mb-1">
              <MapPin
                className={`w-3.5 h-3.5 ${isPhysicalVerified ? 'text-teal-600' : 'text-amber-500'}`}
              />
              <span>2. Workshop Inspected</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              {isPhysicalVerified
                ? 'Field officer visited workshop in Owerri'
                : 'Physical visit scheduled'}
            </p>
          </div>

          {/* Pillar 3: Technical Apprenticeship Lineage */}
          <div
            className={`p-2.5 rounded-lg border ${
              hasApprenticeship
                ? 'bg-white border-slate-200 text-slate-800'
                : 'bg-slate-50/60 border-slate-200 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium mb-1">
              <Award
                className={`w-3.5 h-3.5 ${hasApprenticeship ? 'text-teal-600' : 'text-slate-300'}`}
              />
              <span>3. Master Apprenticeship</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug truncate">
              {hasApprenticeship
                ? `${verification.apprenticeshipLineage?.yearsOfApprenticeship} yrs under ${verification.apprenticeshipLineage?.masterCraftsmanName}`
                : 'Self-trained or lineage unverified'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
