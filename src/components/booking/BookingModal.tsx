import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OWERRI_LOCATIONS } from '../../data/mockData';
import { OwerriLocation } from '../../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    currentModal,
    closeModal,
    selectedArtisanId,
    artisans,
    createBooking,
    setCurrentView,
  } = useApp();

  const artisan = artisans.find((a) => a.id === selectedArtisanId) || artisans[0];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    artisan?.services[0]?.id || 'custom'
  );
  const [jobDescription, setJobDescription] = useState('');
  const [customerAddress, setCustomerAddress] = useState(
    'House 18, Road 4, Off Port Harcourt Road, New Owerri'
  );
  const [customerLocation, setCustomerLocation] = useState<OwerriLocation>('New Owerri');
  const [scheduledDate, setScheduledDate] = useState('2026-10-15');
  const [scheduledTime, setScheduledTime] = useState('10:00 AM');
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent (Within 4 hrs)' | 'Emergency'>(
    'Standard'
  );

  if (currentModal !== 'booking' || !artisan) return null;

  const selectedService = artisan.services.find((s) => s.id === selectedServiceId);
  const agreedPriceNgn = selectedService
    ? selectedService.indicativePriceNgn
    : artisan.hourlyOrBaseRateNgn * 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking({
      artisanId: artisan.id,
      serviceTitle: selectedService ? selectedService.title : 'Custom Repair & Diagnostic Request',
      jobDescription:
        jobDescription.trim() ||
        (selectedService
          ? selectedService.description
          : 'Inspection and repair of faulty installation in Owerri.'),
      agreedPriceNgn,
      scheduledDate,
      scheduledTime,
      urgency,
      customerAddress,
      customerLocation,
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
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
              Direct Booking · Escrow Protected
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Book {artisan.fullName}
            </h2>
            <p className="text-xs text-slate-500">
              {artisan.category} · Workshop at {artisan.workshopLocation}
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
          {/* Service Selection */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800 block">Select Service or Project</label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {artisan.services.map((srv) => (
                <label
                  key={srv.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    selectedServiceId === srv.id
                      ? 'border-teal-600 bg-teal-50/50 text-slate-900 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="service"
                      value={srv.id}
                      checked={selectedServiceId === srv.id}
                      onChange={() => setSelectedServiceId(srv.id)}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <span className="block font-semibold">{srv.title}</span>
                      <span className="text-[11px] text-slate-500">{srv.durationEstimate}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ₦{srv.indicativePriceNgn.toLocaleString()}
                  </span>
                </label>
              ))}

              <label
                className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                  selectedServiceId === 'custom'
                    ? 'border-teal-600 bg-teal-50/50 text-slate-900 font-medium'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="service"
                    value="custom"
                    checked={selectedServiceId === 'custom'}
                    onChange={() => setSelectedServiceId('custom')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <span className="block font-semibold">Custom Inspection & Problem Diagnostic</span>
                    <span className="text-[11px] text-slate-500">Based on diagnostic inspection</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900">
                  ₦{(artisan.hourlyOrBaseRateNgn * 2).toLocaleString()}
                </span>
              </label>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-800 block">
              Describe the problem or project in detail
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g. Master bedroom ensuite ceiling pipe leaking heavily, causing water damage. Need pressure test and replacement of joint with German PPR."
              className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Location & Address in Owerri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Owerri Neighborhood</label>
              <select
                value={customerLocation}
                onChange={(e) => setCustomerLocation(e.target.value as OwerriLocation)}
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 bg-white"
              >
                {OWERRI_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Specific Street / House</label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="e.g. House 18, Road 4, New Owerri"
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* Date & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Preferred Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Preferred Time</label>
              <select
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 bg-white"
              >
                <option value="08:00 AM">08:00 AM - Morning</option>
                <option value="10:00 AM">10:00 AM - Midday</option>
                <option value="01:00 PM">01:00 PM - Afternoon</option>
                <option value="04:00 PM">04:00 PM - Evening</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-800 block">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 bg-white font-medium"
              >
                <option value="Standard">Standard</option>
                <option value="Urgent (Within 4 hrs)">Urgent (Within 4 hrs)</option>
                <option value="Emergency">Emergency Immediate</option>
              </select>
            </div>
          </div>

          {/* Prototype Escrow Explanation Box */}
          <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1 text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Simulated Escrow Protection
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                ₦{agreedPriceNgn.toLocaleString()} Held
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Your funds remain held in demo protection. The artisan cannot mark the job complete
              or receive payout until they upload photographic proof of work and you confirm 100%
              satisfaction.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
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
              Confirm & Book with Escrow Hold
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
