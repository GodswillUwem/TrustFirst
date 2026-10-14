import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Artisan,
  Booking,
  CurrentUser,
  DisputeDetails,
  JobStatus,
  ProofOfWorkSubmission,
  Review,
  UserRole,
  VerificationDetails,
} from '../types';
import {
  INITIAL_ARTISANS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  DEMO_USERS,
} from '../data/mockData';

export type AppView =
  | 'landing'
  | 'discovery'
  | 'profile'
  | 'customer_dashboard'
  | 'artisan_dashboard'
  | 'admin_dashboard'
  | 'register_artisan';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: CurrentUser;
  switchRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedArtisanId: string | null;
  setSelectedArtisanId: (id: string | null) => void;
  
  artisans: Artisan[];
  bookings: Booking[];
  reviews: Review[];
  
  // Actions
  createBooking: (bookingData: {
    artisanId: string;
    serviceTitle: string;
    jobDescription: string;
    agreedPriceNgn: number;
    scheduledDate: string;
    scheduledTime: string;
    urgency: 'Standard' | 'Urgent (Within 4 hrs)' | 'Emergency';
    customerAddress: string;
    customerLocation: any;
  }) => Booking;
  
  updateBookingStatus: (bookingId: string, status: JobStatus) => void;
  submitProofOfWork: (bookingId: string, proof: Omit<ProofOfWorkSubmission, 'submittedAt'>) => void;
  confirmJobSatisfaction: (bookingId: string) => void;
  reportJobDispute: (
    bookingId: string,
    disputeData: {
      disputeReason: DisputeDetails['disputeReason'];
      customerNotes: string;
      evidencePhotos: string[];
      desiredResolution: DisputeDetails['desiredResolution'];
    }
  ) => void;
  resolveDispute: (
    bookingId: string,
    decision: 'Release to Artisan' | 'Full Refund to Customer' | '50/50 Split Resolution' | 'Mandated Rework',
    adminNotes: string
  ) => void;
  
  submitReview: (reviewData: {
    bookingId: string;
    artisanId: string;
    rating: number;
    qualityRating: number;
    punctualityRating: number;
    communicationRating: number;
    comment: string;
    jobTitle: string;
    proofPhotoUrl?: string;
  }) => void;
  
  registerArtisan: (artisan: Partial<Artisan>) => Artisan;
  updateArtisanVerification: (
    artisanId: string,
    verificationUpdates: Partial<VerificationDetails>
  ) => void;
  
  // Modals & Flows
  activeBookingForModal: Booking | null;
  setActiveBookingForModal: (booking: Booking | null) => void;
  openModal: (
    modalType: 'booking' | 'proof_submit' | 'customer_confirm' | 'dispute_report' | 'review' | 'demo_flow'
  ) => void;
  closeModal: () => void;
  currentModal: 'booking' | 'proof_submit' | 'customer_confirm' | 'dispute_report' | 'review' | 'demo_flow' | null;

  // Toast notifications
  toast: ToastNotification | null;
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  clearToast: () => void;

  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTISANS: 'trustfirst_artisans_v1',
  BOOKINGS: 'trustfirst_bookings_v1',
  REVIEWS: 'trustfirst_reviews_v1',
  ROLE: 'trustfirst_current_role_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;
    return DEMO_USERS[savedRole || 'customer'] || DEMO_USERS.customer;
  });

  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>('artisan-1');

  const [artisans, setArtisans] = useState<Artisan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTISANS);
      return saved ? JSON.parse(saved) : INITIAL_ARTISANS;
    } catch {
      return INITIAL_ARTISANS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [currentModal, setCurrentModal] = useState<
    'booking' | 'proof_submit' | 'customer_confirm' | 'dispute_report' | 'review' | 'demo_flow' | null
  >(null);
  const [activeBookingForModal, setActiveBookingForModal] = useState<Booking | null>(null);

  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(artisans));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [artisans]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [reviews]);

  const showToast = (toastData: Omit<ToastNotification, 'id'>) => {
    const id = Date.now().toString();
    setToast({ ...toastData, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 5500);
  };

  const clearToast = () => setToast(null);

  const switchRole = (role: UserRole) => {
    const user = DEMO_USERS[role];
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    showToast({
      type: 'info',
      title: `Switched to ${role.toUpperCase()} View`,
      message: `Operating as ${user.name} (${role === 'customer' ? 'Homeowner' : role === 'artisan' ? 'Master Plumber' : 'Imo Verification Officer'}).`,
    });
  };

  const openModal = (
    modalType: 'booking' | 'proof_submit' | 'customer_confirm' | 'dispute_report' | 'review' | 'demo_flow'
  ) => {
    setCurrentModal(modalType);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const createBooking = (bookingData: {
    artisanId: string;
    serviceTitle: string;
    jobDescription: string;
    agreedPriceNgn: number;
    scheduledDate: string;
    scheduledTime: string;
    urgency: 'Standard' | 'Urgent (Within 4 hrs)' | 'Emergency';
    customerAddress: string;
    customerLocation: any;
  }): Booking => {
    const artisan = artisans.find((a) => a.id === bookingData.artisanId);
    const trackingCode = `TF-OW-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      trackingCode,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerAddress: bookingData.customerAddress,
      customerLocation: bookingData.customerLocation,
      artisanId: bookingData.artisanId,
      artisanName: artisan ? artisan.fullName : 'Artisan',
      artisanCategory: artisan ? artisan.category : 'Plumbing',
      artisanAvatar: artisan ? artisan.avatarUrl : '',
      artisanPhone: artisan ? artisan.phone : '',
      serviceTitle: bookingData.serviceTitle,
      jobDescription: bookingData.jobDescription,
      agreedPriceNgn: bookingData.agreedPriceNgn,
      scheduledDate: bookingData.scheduledDate,
      scheduledTime: bookingData.scheduledTime,
      urgency: bookingData.urgency,
      status: 'requested',
      escrowStatus: 'held_in_escrow', // Held in prototype protection
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast({
      type: 'success',
      title: 'Booking Request Submitted!',
      message: `Job ${trackingCode} sent to ${artisan?.fullName}. ₦${bookingData.agreedPriceNgn.toLocaleString()} simulated funds held in escrow.`,
    });
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: JobStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status,
          escrowStatus:
            status === 'completed'
              ? 'released_to_artisan'
              : status === 'disputed'
              ? 'frozen_in_dispute'
              : b.escrowStatus,
        };
      })
    );

    const targetBooking = bookings.find((b) => b.id === bookingId);
    showToast({
      type: 'info',
      title: `Booking Status: ${status.replace('_', ' ').toUpperCase()}`,
      message: `Job ${targetBooking?.trackingCode || bookingId} updated.`,
    });
  };

  // Artisan submits proof of work
  const submitProofOfWork = (
    bookingId: string,
    proof: Omit<ProofOfWorkSubmission, 'submittedAt'>
  ) => {
    const fullProof: ProofOfWorkSubmission = {
      ...proof,
      submittedAt: new Date().toISOString(),
    };

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'work_submitted', // Crucial: Awaiting customer confirmation!
          proofOfWork: fullProof,
        };
      })
    );

    showToast({
      type: 'success',
      title: 'Proof of Work Submitted!',
      message:
        'Evidence uploaded. The customer has been alerted to review before funds can be released.',
    });
  };

  // Customer confirms satisfactory completion
  const confirmJobSatisfaction = (bookingId: string) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'approved_for_payout',
          escrowStatus: 'released_to_artisan',
        };
      })
    );

    // Update artisan completed jobs count
    setArtisans((prev) =>
      prev.map((a) => {
        if (a.id !== targetBooking.artisanId) return a;
        return {
          ...a,
          completedJobsCount: a.completedJobsCount + 1,
        };
      })
    );

    showToast({
      type: 'success',
      title: 'Work Confirmed & Payment Released!',
      message: `₦${targetBooking.agreedPriceNgn.toLocaleString()} released from escrow to ${targetBooking.artisanName}'s verified payout account.`,
    });
  };

  // Customer reports dispute / problem
  const reportJobDispute = (
    bookingId: string,
    disputeData: {
      disputeReason: DisputeDetails['disputeReason'];
      customerNotes: string;
      evidencePhotos: string[];
      desiredResolution: DisputeDetails['desiredResolution'];
    }
  ) => {
    const newDispute: DisputeDetails = {
      disputedAt: new Date().toISOString(),
      disputeReason: disputeData.disputeReason,
      customerNotes: disputeData.customerNotes,
      evidencePhotos: disputeData.evidencePhotos,
      desiredResolution: disputeData.desiredResolution,
      status: 'under_review',
      resolutionNotes: 'Dispute submitted. TrustFirst Owerri verification officer will mediate.',
    };

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'disputed',
          escrowStatus: 'frozen_in_dispute', // Escrow is strictly held!
          dispute: newDispute,
        };
      })
    );

    showToast({
      type: 'warning',
      title: 'Problem Reported — Funds Held on Freeze',
      message:
        'Payment release has been withheld. The job is now under TrustFirst mediation review.',
    });
  };

  // Admin resolves dispute
  const resolveDispute = (
    bookingId: string,
    decision: 'Release to Artisan' | 'Full Refund to Customer' | '50/50 Split Resolution' | 'Mandated Rework',
    adminNotes: string
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId || !b.dispute) return b;

        let newEscrow = b.escrowStatus;
        let newStatus: JobStatus = 'completed';

        if (decision === 'Release to Artisan') {
          newEscrow = 'released_to_artisan';
          newStatus = 'completed';
        } else if (decision === 'Full Refund to Customer') {
          newEscrow = 'refunded_to_customer';
          newStatus = 'completed';
        } else if (decision === '50/50 Split Resolution') {
          newEscrow = 'split_resolution';
          newStatus = 'completed';
        } else if (decision === 'Mandated Rework') {
          newEscrow = 'held_in_escrow';
          newStatus = 'in_progress';
        }

        return {
          ...b,
          status: newStatus,
          escrowStatus: newEscrow,
          dispute: {
            ...b.dispute,
            status: 'resolved',
            adminDecision: decision,
            resolutionNotes: adminNotes,
            resolvedAt: new Date().toISOString(),
          },
        };
      })
    );

    showToast({
      type: 'success',
      title: `Dispute Resolved: ${decision}`,
      message: adminNotes,
    });
  };

  // Customer leaves verified review
  const submitReview = (reviewData: {
    bookingId: string;
    artisanId: string;
    rating: number;
    qualityRating: number;
    punctualityRating: number;
    communicationRating: number;
    comment: string;
    jobTitle: string;
    proofPhotoUrl?: string;
  }) => {
    const newRevId = `rev-${Date.now()}`;
    const newReview: Review = {
      id: newRevId,
      bookingId: reviewData.bookingId,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerLocation: currentUser.location,
      artisanId: reviewData.artisanId,
      rating: reviewData.rating,
      qualityRating: reviewData.qualityRating,
      punctualityRating: reviewData.punctualityRating,
      communicationRating: reviewData.communicationRating,
      comment: reviewData.comment,
      createdAt: new Date().toISOString().split('T')[0],
      verifiedBookingBadge: true,
      jobTitle: reviewData.jobTitle,
      proofPhotoUrl: reviewData.proofPhotoUrl,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Update booking with reviewId
    setBookings((prev) =>
      prev.map((b) => (b.id === reviewData.bookingId ? { ...b, reviewId: newRevId, status: 'completed' } : b))
    );

    // Recalculate artisan average rating
    setArtisans((prev) =>
      prev.map((a) => {
        if (a.id !== reviewData.artisanId) return a;
        const currentArtisanReviews = reviews.filter((r) => r.artisanId === a.id);
        const allRatings = [...currentArtisanReviews.map((r) => r.rating), reviewData.rating];
        const newAvg = Number((allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length).toFixed(1));
        return {
          ...a,
          averageRating: newAvg,
          totalReviews: a.totalReviews + 1,
        };
      })
    );

    showToast({
      type: 'success',
      title: 'Verified Review Published!',
      message: 'Your review is linked to your confirmed booking and added to the artisan profile.',
    });
  };

  // Register new artisan
  const registerArtisan = (artisanData: Partial<Artisan>): Artisan => {
    const newId = `artisan-${Date.now()}`;
    const newArtisan: Artisan = {
      id: newId,
      fullName: artisanData.fullName || 'New Artisan',
      phone: artisanData.phone || '+234 800 000 0000',
      email: artisanData.email || 'artisan@trustfirst.ng',
      avatarUrl:
        artisanData.avatarUrl ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      category: artisanData.category || 'Plumbing',
      yearsExperience: artisanData.yearsExperience || 3,
      bio: artisanData.bio || 'Professional skilled artisan in Owerri, Imo State.',
      serviceAreas: artisanData.serviceAreas || ['New Owerri', 'Ikenegbu Layout'],
      workshopLocation: artisanData.workshopLocation || 'Owerri, Imo State',
      verification: {
        identityStatus: 'under_review',
        identityDocType: artisanData.verification?.identityDocType || 'National Identification Number (NIN)',
        identityDocNumber: artisanData.verification?.identityDocNumber || 'NIN: 1234******99',
        physicalStatus: 'pending',
        workshopAddress: artisanData.workshopLocation,
        apprenticeshipLineage: artisanData.verification?.apprenticeshipLineage || {
          masterCraftsmanName: 'Master Craftsman',
          workshopLocation: 'Owerri',
          yearsOfApprenticeship: 3,
          completionYear: 2022,
        },
        overallStatus: 'under_review',
      },
      hourlyOrBaseRateNgn: artisanData.hourlyOrBaseRateNgn || 8000,
      services: artisanData.services || [
        {
          id: `srv-${Date.now()}`,
          title: 'Standard Consultation & Diagnostic',
          description: 'On-site fault inspection and quotation.',
          indicativePriceNgn: 5000,
          durationEstimate: '1 hour',
        },
      ],
      portfolio: artisanData.portfolio || [],
      averageRating: 0,
      totalReviews: 0,
      completedJobsCount: 0,
      isAvailableToday: true,
      memberSince: 'Just now',
    };

    setArtisans((prev) => [newArtisan, ...prev]);
    showToast({
      type: 'success',
      title: 'Artisan Application Submitted!',
      message: 'Application recorded. Our Owerri field verification team has been notified.',
    });
    return newArtisan;
  };

  // Admin updates verification
  const updateArtisanVerification = (
    artisanId: string,
    verificationUpdates: Partial<VerificationDetails>
  ) => {
    setArtisans((prev) =>
      prev.map((a) => {
        if (a.id !== artisanId) return a;
        const updatedVerification = {
          ...a.verification,
          ...verificationUpdates,
        };

        // Determine overall status
        let overallStatus = updatedVerification.overallStatus;
        if (
          updatedVerification.identityStatus === 'verified' &&
          updatedVerification.physicalStatus === 'verified'
        ) {
          overallStatus = 'verified';
        } else if (
          updatedVerification.identityStatus === 'rejected' ||
          updatedVerification.physicalStatus === 'rejected'
        ) {
          overallStatus = 'rejected';
        } else {
          overallStatus = 'under_review';
        }

        return {
          ...a,
          verification: {
            ...updatedVerification,
            overallStatus,
          },
        };
      })
    );

    showToast({
      type: 'info',
      title: 'Artisan Verification Updated',
      message: 'Verification records and badge eligibility refreshed.',
    });
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.ARTISANS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    setArtisans(INITIAL_ARTISANS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setCurrentUser(DEMO_USERS.customer);
    setCurrentView('landing');
    setSelectedArtisanId('artisan-1');
    showToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'Default state restored with fresh bookings and verification requests.',
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        currentView,
        setCurrentView,
        selectedArtisanId,
        setSelectedArtisanId,
        artisans,
        bookings,
        reviews,
        createBooking,
        updateBookingStatus,
        submitProofOfWork,
        confirmJobSatisfaction,
        reportJobDispute,
        resolveDispute,
        submitReview,
        registerArtisan,
        updateArtisanVerification,
        activeBookingForModal,
        setActiveBookingForModal,
        openModal,
        closeModal,
        currentModal,
        toast,
        showToast,
        clearToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
