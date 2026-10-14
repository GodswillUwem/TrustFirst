import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ARTISAN_CATEGORIES, OWERRI_LOCATIONS } from '../../data/mockData';
import { Artisan, ArtisanCategory, OwerriLocation } from '../../types';
import { TrustBadge } from '../common/TrustBadge';
import {
  Search,
  Filter,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

export const DiscoveryPage: React.FC = () => {
  const { artisans, setSelectedArtisanId, setCurrentView, setActiveBookingForModal, openModal } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price_low'>('rating');

  // Filtered artisans
  const filteredArtisans = useMemo(() => {
    return artisans
      .filter((artisan) => {
        // Category filter
        if (selectedCategory !== 'All' && artisan.category !== selectedCategory) {
          return false;
        }

        // Location filter
        if (
          selectedLocation !== 'All' &&
          !artisan.serviceAreas.includes(selectedLocation as OwerriLocation) &&
          !artisan.workshopLocation.toLowerCase().includes(selectedLocation.toLowerCase())
        ) {
          return false;
        }

        // Only verified filter
        if (onlyVerified && artisan.verification.overallStatus !== 'verified') {
          return false;
        }

        // Availability filter
        if (onlyAvailableToday && !artisan.isAvailableToday) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = artisan.fullName.toLowerCase().includes(q);
          const matchCategory = artisan.category.toLowerCase().includes(q);
          const matchBio = artisan.bio.toLowerCase().includes(q);
          const matchServices = artisan.services.some(
            (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
          );
          const matchMaster =
            artisan.verification.apprenticeshipLineage?.masterCraftsmanName
              .toLowerCase()
              .includes(q);
          if (!matchName && !matchCategory && !matchBio && !matchServices && !matchMaster) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.averageRating - a.averageRating;
        if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
        if (sortBy === 'price_low') return a.hourlyOrBaseRateNgn - b.hourlyOrBaseRateNgn;
        return 0;
      });
  }, [artisans, searchQuery, selectedCategory, selectedLocation, onlyVerified, onlyAvailableToday, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setOnlyVerified(false);
    setOnlyAvailableToday(false);
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="max-w-2xl space-y-1">
          <span className="text-xs font-semibold text-teal-400 tracking-wider uppercase">
            Artisan Directory · Owerri Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Discover Verified Artisans in Owerri
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare master plumbers, electricians, carpenters, and tailors. View physical workshop inspection notes, apprenticeship lineage, and verified reviews.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by trade (e.g. Plumber, Solar Inverter), master craftsman, or service..."
            className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter and Category Controls */}
      <div className="space-y-4">
        {/* Category Horizontal Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-2 rounded-lg font-medium shrink-0 transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Trades ({artisans.length})
          </button>
          {ARTISAN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg font-medium shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Location Filter */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <label htmlFor="location-select" className="sr-only">Owerri Location</label>
              <select
                id="location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:ring-1 focus:ring-teal-500"
              >
                <option value="All">All Owerri Locations</option>
                {OWERRI_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes for quick filters */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
              />
              <span>Field Verified Only</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyAvailableToday}
                onChange={(e) => setOnlyAvailableToday(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
              />
              <span>Available Today</span>
            </label>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort by */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Sort by:</span>
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-800 font-medium focus:ring-1 focus:ring-teal-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Years Experience</option>
                <option value="price_low">Lowest Base Rate</option>
              </select>
            </div>

            {/* Reset */}
            {(selectedCategory !== 'All' ||
              selectedLocation !== 'All' ||
              onlyVerified ||
              onlyAvailableToday ||
              searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Notification */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <strong>{filteredArtisans.length}</strong> verified artisans in Owerri, Imo State
        </span>
        <span className="text-slate-400 hidden sm:inline">
          All bookings backed by milestone proof of work
        </span>
      </div>

      {/* Artisan Card Grid */}
      {filteredArtisans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">No artisans match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your filters or searching for broader terms like "Plumbing", "Electrical", or "New Owerri".
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Body */}
              <div className="p-5 flex-1 space-y-4">
                {/* Header: Photo & Name & Rating */}
                <div className="flex items-start gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={artisan.avatarUrl}
                      alt={artisan.fullName}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                    />
                    {artisan.isAvailableToday && (
                      <span
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                        title="Available Today in Owerri"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-slate-900 text-base truncate group-hover:text-teal-700 transition-colors">
                        {artisan.fullName}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-teal-700">{artisan.category}</p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                      </div>
                      <span className="font-bold text-slate-900">{artisan.averageRating}</span>
                      <span>·</span>
                      <span>{artisan.totalReviews} reviews</span>
                      <span>·</span>
                      <span>{artisan.completedJobsCount} jobs</span>
                    </div>
                  </div>
                </div>

                {/* Verification Badge */}
                <TrustBadge verification={artisan.verification} size="sm" />

                {/* Master Apprenticeship Lineage Box */}
                {artisan.verification.apprenticeshipLineage && (
                  <div className="text-[11px] bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 text-slate-700 space-y-0.5">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>Apprenticeship Lineage</span>
                    </div>
                    <p className="truncate">
                      {artisan.verification.apprenticeshipLineage.yearsOfApprenticeship} yrs under{' '}
                      <strong>{artisan.verification.apprenticeshipLineage.masterCraftsmanName}</strong>
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {artisan.verification.apprenticeshipLineage.workshopLocation}
                    </p>
                  </div>
                )}

                {/* Workshop Location in Owerri */}
                <div className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{artisan.workshopLocation}</span>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {artisan.bio}
                </p>

                {/* Services preview */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Core Services
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-700">
                    {artisan.services.slice(0, 2).map((srv) => (
                      <span
                        key={srv.id}
                        className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] truncate max-w-full"
                      >
                        {srv.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing and CTAs */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                    Base Callout Rate
                  </span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    ₦{artisan.hourlyOrBaseRateNgn.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedArtisanId(artisan.id);
                      setCurrentView('profile');
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArtisanId(artisan.id);
                      openModal('booking');
                    }}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
