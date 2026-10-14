import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ARTISAN_CATEGORIES, OWERRI_LOCATIONS } from '../../data/mockData';
import { ArtisanCategory, OwerriLocation } from '../../types';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Camera,
  Upload,
  Award,
  ChevronRight,
  Info,
  Clock,
} from 'lucide-react';

export const ArtisanRegistrationModal: React.FC = () => {
  const { registerArtisan, setCurrentView, switchRole, setSelectedArtisanId } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+234 ');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<ArtisanCategory>('Plumbing');
  const [yearsExperience, setYearsExperience] = useState(5);
  const [bio, setBio] = useState('');

  // Apprenticeship details
  const [masterName, setMasterName] = useState('');
  const [masterLocation, setMasterLocation] = useState('Nekede Mechanic & Artisan Cluster, Imo State');
  const [apprenticeshipYears, setApprenticeshipYears] = useState(4);
  const [completionYear, setCompletionYear] = useState(2021);
  const [guarantorName, setGuarantorName] = useState('');
  const [tradeUnion, setTradeUnion] = useState('');

  // Workshop & areas
  const [workshopAddress, setWorkshopAddress] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<OwerriLocation[]>([
    'Ikenegbu Layout',
    'New Owerri',
  ]);

  // ID & Verification details
  const [idType, setIdType] = useState<'National Identification Number (NIN)' | "Voter's Card" | "Driver's License">('National Identification Number (NIN)');
  const [idNumber, setIdNumber] = useState('');
  const [requestFieldInspection, setRequestFieldInspection] = useState(true);
  const [baseCalloutRate, setBaseCalloutRate] = useState(7000);

  const toggleArea = (loc: OwerriLocation) => {
    if (selectedAreas.includes(loc)) {
      if (selectedAreas.length > 1) {
        setSelectedAreas(selectedAreas.filter((a) => a !== loc));
      }
    } else {
      setSelectedAreas([...selectedAreas, loc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = registerArtisan({
      fullName: fullName.trim() || 'Kelechi Amadi',
      phone: phone.trim() || '+234 803 123 4567',
      email: email.trim() || 'artisan.owerri@trustfirst.ng',
      category,
      yearsExperience,
      bio:
        bio.trim() ||
        `Experienced ${category} specialist based in Owerri with ${yearsExperience} years on commercial and residential projects.`,
      workshopLocation: workshopAddress.trim() || 'Plot 8, Tetlow Road, Owerri',
      serviceAreas: selectedAreas,
      hourlyOrBaseRateNgn: baseCalloutRate,
      verification: {
        identityStatus: 'under_review',
        identityDocType: idType,
        identityDocNumber: idNumber.trim() ? `${idType.slice(0, 3)}: ${idNumber}` : 'NIN: 7729******10',
        physicalStatus: requestFieldInspection ? 'under_review' : 'pending',
        workshopAddress: workshopAddress.trim() || 'Owerri, Imo State',
        apprenticeshipLineage: {
          masterCraftsmanName: masterName.trim() || 'Master Craftsman Linus',
          workshopLocation: masterLocation,
          yearsOfApprenticeship: apprenticeshipYears,
          completionYear,
          guarantorName: guarantorName || 'Community Chief',
          tradeAssociation: tradeUnion || 'Imo State Artisan Union',
        },
        overallStatus: 'under_review',
      },
    });

    setSelectedArtisanId(created.id);
    switchRole('artisan');
    setCurrentView('artisan_dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header */}
        <div>
          <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
            Artisan Onboarding · Owerri Registry
          </span>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Register as a Verified Artisan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build verified credibility, escape upfront deposit disputes, and receive customer-confirmed payouts.
          </p>
        </div>

        {/* Wizard Stepper */}
        <div className="grid grid-cols-4 gap-2 text-xs font-semibold pt-1">
          <div
            className={`p-2.5 rounded-lg border text-center transition-colors ${
              step === 1
                ? 'border-teal-600 bg-teal-50/70 text-teal-900'
                : step > 1
                ? 'border-teal-200 bg-slate-50 text-slate-700'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            1. Trade & Bio
          </div>
          <div
            className={`p-2.5 rounded-lg border text-center transition-colors ${
              step === 2
                ? 'border-teal-600 bg-teal-50/70 text-teal-900'
                : step > 2
                ? 'border-teal-200 bg-slate-50 text-slate-700'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            2. Master Lineage
          </div>
          <div
            className={`p-2.5 rounded-lg border text-center transition-colors ${
              step === 3
                ? 'border-teal-600 bg-teal-50/70 text-teal-900'
                : step > 3
                ? 'border-teal-200 bg-slate-50 text-slate-700'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            3. Workshop Site
          </div>
          <div
            className={`p-2.5 rounded-lg border text-center transition-colors ${
              step === 4
                ? 'border-teal-600 bg-teal-50/70 text-teal-900'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            4. ID & Inspection
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* STEP 1: Basic Info & Trade */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kelechi Amadi"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Primary Trade Craft</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArtisanCategory)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 bg-white"
                  >
                    {ARTISAN_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Years of Active Experience</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Short Professional Bio & Specialty
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe the type of jobs you specialize in (e.g. PPR pipe welding, solar inverter balancing, hardwood cabinetry)..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 text-slate-800"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Next: Master Apprenticeship Lineage →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Apprenticeship Lineage */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-950 text-xs space-y-1">
                <span className="font-bold block flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-teal-700" />
                  Why Apprenticeship Lineage Matters
                </span>
                <p className="text-[11px] text-slate-600">
                  In Nigeria, technical certification isn't just about university diplomas. Your time served under a respected master craftsman proves your discipline and technical standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Master Craftsman Name (Who trained you?)
                  </label>
                  <input
                    type="text"
                    value={masterName}
                    onChange={(e) => setMasterName(e.target.value)}
                    placeholder="e.g. Chief Linus Agbara"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Master's Workshop Cluster
                  </label>
                  <input
                    type="text"
                    value={masterLocation}
                    onChange={(e) => setMasterLocation(e.target.value)}
                    placeholder="e.g. Nekede Mechanic Village, Owerri"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Years Served as Apprentice
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={apprenticeshipYears}
                    onChange={(e) => setApprenticeshipYears(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Year of Freedom / Completion
                  </label>
                  <input
                    type="number"
                    min={1990}
                    max={2026}
                    value={completionYear}
                    onChange={(e) => setCompletionYear(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    Guarantor / Community Elder Name
                  </label>
                  <input
                    type="text"
                    value={guarantorName}
                    onChange={(e) => setGuarantorName(e.target.value)}
                    placeholder="e.g. Elder Barnabas Okonkwo"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Trade Association</label>
                  <input
                    type="text"
                    value={tradeUnion}
                    onChange={(e) => setTradeUnion(e.target.value)}
                    placeholder="e.g. Imo State Association of Professional Plumbers"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Next: Workshop & Service Areas →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Workshop Site & Service Areas */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-1">
                <label className="font-semibold text-slate-800 block">
                  Physical Workshop / Shop Address in Owerri
                </label>
                <input
                  type="text"
                  value={workshopAddress}
                  onChange={(e) => setWorkshopAddress(e.target.value)}
                  placeholder="e.g. Shop 14, Tetlow Road by Ikenegbu Junction, Owerri"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500"
                  required
                />
                <span className="text-[11px] text-slate-400">
                  Our field officer will physically visit this location to inspect tools and equipment.
                </span>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-800 block">
                  Select Owerri Neighborhoods You Serve
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {OWERRI_LOCATIONS.map((loc) => {
                    const isSelected = selectedAreas.includes(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => toggleArea(loc)}
                        className={`p-2 rounded-lg border text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{loc}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <label className="font-semibold text-slate-800 block">
                  Base Callout / Diagnostic Rate (₦ Naira)
                </label>
                <input
                  type="number"
                  step={500}
                  value={baseCalloutRate}
                  onChange={(e) => setBaseCalloutRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Next: ID Verification & Field Visit →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Legal Identity & Field Inspection Request */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">Government ID Document</label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="National Identification Number (NIN)">
                      National Identification Number (NIN)
                    </option>
                    <option value="Voter's Card">Permanent Voter's Card (PVC)</option>
                    <option value="Driver's License">Driver's License (FRSC)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-800 block">
                    ID Document Number (Will be masked for privacy)
                  </label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="e.g. 54928192019"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-1 focus:ring-teal-500 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Physical Field Inspection Request Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requestFieldInspection}
                  onChange={(e) => setRequestFieldInspection(e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 mt-0.5"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-teal-950 block">
                    Schedule Physical Field Verification by Imo Verification Officer
                  </span>
                  <span className="text-slate-600 text-[11px] leading-relaxed block">
                    An authorized officer (Engr. Kenneth Nze) will visit your workshop to verify tools,
                    apprentices, and active practice. You will receive the <strong>TrustFirst Verified Badge</strong> once both ID and physical visit are signed off.
                  </span>
                </div>
              </label>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-relaxed">
                By submitting this application, you agree to uphold TrustFirst workmanship standards, provide transparent photographic proof of work upon job completion, and accept customer-gated payment releases.
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg cursor-pointer shadow-sm"
                >
                  Submit Application for Field Verification →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
