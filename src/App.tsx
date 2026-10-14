/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { DiscoveryPage } from './components/discovery/DiscoveryPage';
import { ArtisanProfileView } from './components/profile/ArtisanProfileView';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { ArtisanDashboard } from './components/dashboard/ArtisanDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ArtisanRegistrationModal } from './components/onboarding/ArtisanRegistrationModal';
import { AuthPage } from './components/auth/AuthPage';
import { BookingModal } from './components/booking/BookingModal';
import { ProofOfWorkModal } from './components/proof/ProofOfWorkModal';
import { CustomerConfirmationModal } from './components/proof/CustomerConfirmationModal';
import { DisputeModal } from './components/dispute/DisputeModal';
import { ReviewModal } from './components/reviews/ReviewModal';
import { DemoWalkthroughModal } from './components/demo/DemoWalkthroughModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="min-h-[calc(100vh-140px)]">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'discovery' && <DiscoveryPage />}
      {currentView === 'profile' && <ArtisanProfileView />}
      {currentView === 'customer_dashboard' && <CustomerDashboard />}
      {currentView === 'artisan_dashboard' && <ArtisanDashboard />}
      {currentView === 'admin_dashboard' && <AdminDashboard />}
      {currentView === 'register_artisan' && <ArtisanRegistrationModal />}
      {currentView === 'auth' && <AuthPage />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-500/20 selection:text-teal-900">
        <Header />
        <MainContent />
        <Footer />

        {/* Global Action Modals */}
        <BookingModal />
        <ProofOfWorkModal />
        <CustomerConfirmationModal />
        <DisputeModal />
        <ReviewModal />
        <DemoWalkthroughModal />

        {/* Toast Alerts */}
        <Toast />
      </div>
    </AppProvider>
  );
}
