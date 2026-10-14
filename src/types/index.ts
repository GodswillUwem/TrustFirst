export type UserRole = 'customer' | 'artisan' | 'admin';

export type VerificationStatus = 'pending' | 'under_review' | 'verified' | 'rejected';

export type JobStatus =
  | 'requested'
  | 'accepted'
  | 'declined'
  | 'in_progress'
  | 'work_submitted' // Proof submitted by artisan, awaiting customer confirmation
  | 'approved_for_payout' // Customer confirmed work is satisfactory
  | 'completed' // Payment disbursed / closed
  | 'disputed'; // Customer flagged an issue, on hold

export type EscrowStatus =
  | 'unfunded'
  | 'held_in_escrow'
  | 'released_to_artisan'
  | 'refunded_to_customer'
  | 'split_resolution'
  | 'frozen_in_dispute';

export type OwerriLocation =
  | 'Ikenegbu Layout'
  | 'Aladinma'
  | 'New Owerri'
  | 'World Bank Housing Estate'
  | 'Wetheral Road Axis'
  | 'Douglas Road'
  | 'Orji'
  | 'Nekede'
  | 'Umuguma'
  | 'Egbu Road';

export type ArtisanCategory =
  | 'Plumbing'
  | 'Electrical Work'
  | 'Carpentry & Woodwork'
  | 'Painting & Wall Finish'
  | 'Tiling & Flooring'
  | 'Welding & Metal Fabrication'
  | 'Tailoring & Fashion Design'
  | 'Generator & Appliance Repairs';

export interface VerificationDetails {
  identityStatus: VerificationStatus;
  identityDocType?: 'National Identification Number (NIN)' | "Voter's Card" | "Driver's License";
  identityDocNumber?: string; // Masked for privacy (e.g., "NIN: 5492******19")
  identityVerifiedDate?: string;
  
  physicalStatus: VerificationStatus;
  workshopAddress?: string;
  fieldVerifierName?: string;
  fieldInspectionDate?: string;
  workshopPhotoUrl?: string;
  fieldNotes?: string;

  // Technical apprenticeship / skill qualification (distinct from identity/physical)
  apprenticeshipLineage?: {
    masterCraftsmanName: string;
    workshopLocation: string;
    yearsOfApprenticeship: number;
    completionYear: number;
    guarantorName?: string;
    guarantorPhone?: string;
    tradeAssociation?: string; // e.g. "Imo State Association of Professional Plumbers"
  };
  overallStatus: VerificationStatus;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: ArtisanCategory;
  beforePhotoUrl?: string;
  afterPhotoUrl: string;
  completedDate: string;
  locationInOwerri: string;
  costEstimateNgn: number;
}

export interface ServiceOffer {
  id: string;
  title: string;
  description: string;
  indicativePriceNgn: number;
  durationEstimate: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerLocation: string;
  artisanId: string;
  rating: number; // 1-5
  qualityRating: number;
  punctualityRating: number;
  communicationRating: number;
  comment: string;
  createdAt: string;
  verifiedBookingBadge: boolean;
  jobTitle: string;
  proofPhotoUrl?: string;
}

export interface Artisan {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string;
  category: ArtisanCategory;
  yearsExperience: number;
  bio: string;
  serviceAreas: OwerriLocation[];
  workshopLocation: string;
  verification: VerificationDetails;
  hourlyOrBaseRateNgn: number;
  services: ServiceOffer[];
  portfolio: PortfolioItem[];
  averageRating: number;
  totalReviews: number;
  completedJobsCount: number;
  isAvailableToday: boolean;
  memberSince: string;
}

export interface ProofOfWorkSubmission {
  submittedAt: string;
  completionNotes: string;
  photos: string[];
  materialsUsed?: string[];
  materialsCostNgn?: number;
  warrantyPeriodDays?: number;
  customerSignatureAck?: boolean;
}

export interface DisputeDetails {
  disputedAt: string;
  disputeReason: 'Incomplete Work' | 'Poor Craftsmanship' | 'Property Damage' | 'Unauthorized Additional Cost' | 'Abandonment';
  customerNotes: string;
  evidencePhotos: string[];
  desiredResolution: 'Rework Required' | 'Full Refund' | 'Partial Refund with Discount' | 'Independent Inspection';
  status: 'open' | 'under_review' | 'resolved';
  resolutionNotes?: string;
  resolvedAt?: string;
  adminDecision?: 'Release to Artisan' | 'Full Refund to Customer' | '50/50 Split Resolution' | 'Mandated Rework';
}

export interface Booking {
  id: string;
  trackingCode: string; // e.g. "TF-OW-8921"
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerLocation: OwerriLocation;
  artisanId: string;
  artisanName: string;
  artisanCategory: ArtisanCategory;
  artisanAvatar: string;
  artisanPhone: string;
  serviceTitle: string;
  jobDescription: string;
  agreedPriceNgn: number;
  scheduledDate: string;
  scheduledTime: string;
  status: JobStatus;
  escrowStatus: EscrowStatus;
  createdAt: string;
  proofOfWork?: ProofOfWorkSubmission;
  dispute?: DisputeDetails;
  reviewId?: string;
  urgency: 'Standard' | 'Urgent (Within 4 hrs)' | 'Emergency';
}

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatarUrl: string;
  location: OwerriLocation;
  artisanProfileId?: string; // If role is artisan
}
