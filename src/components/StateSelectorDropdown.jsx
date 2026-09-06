import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Search, MapPin, ChevronRight } from 'lucide-react';
import { STATES_CRAFTS, REGIONS } from '../data/statesCrafts';

export default function StateSelectorDropdown({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRegions, setExpandedRegions] = useState({
    'East': true,
    'North': true,
    'South': true,
    'West': true,
    'Central': true,
    'Northeast': true,
    'Union Territory': true,
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter states by search query
  const filteredGroupedStates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = {};

    REGIONS.forEach(region => {
      const statesInRegion = STATES_CRAFTS.filter(s => s.region === region);
      if (!query) {
        result[region] = statesInRegion;
      } else {
        const matched = statesInRegion.filter(s =>
          s.name.toLowerCase().includes(query) ||
          s.crafts.some(c => c.items.some(i => i.toLowerCase().includes(query)))
        );
        if (matched.length > 0) {
          result[region] = matched;
        }
      }
    });

    return result;
  }, [searchQuery]);

  const toggleRegion = (region) => {
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };

  const handleSelectState = (slug) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(`/explore/${slug}`);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 font-label-md text-label-md uppercase tracking-[0.14em] text-on-surface-variant hover:text-secondary transition-colors py-space-xs font-semibold focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{t('buyer.nav.selectState', 'Select Your State')}</span>
        <ChevronDown
          className={`w-4 h-4 text-outline transition-transform duration-200 ${isOpen ? 'rotate-180 text-secondary' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 lg:left-auto lg:right-0 top-full mt-2 w-80 max-h-[480px] bg-surface-container-lowest border border-outline-variant/60 shadow-2xl rounded-none z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Header */}
          <div className="p-2.5 bg-surface-container-low border-b border-outline-variant/40 sticky top-0 z-10">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-outline pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('buyer.nav.searchStatePlaceholder', 'Search state or craft (e.g. Kashmir, Saree)...')}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface text-on-surface border border-outline-variant/60 focus:border-secondary focus:outline-none placeholder:text-outline/70 font-sans"
                autoFocus
              />
            </div>
          </div>

          {/* Region Grouped List */}
          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30 py-1">
            {Object.keys(filteredGroupedStates).length === 0 ? (
              <div className="p-4 text-center text-xs text-outline font-sans">
                {t('buyer.nav.noStatesFound', 'No states found matching search query')}
              </div>
            ) : (
              REGIONS.map(region => {
                const states = filteredGroupedStates[region];
                if (!states || states.length === 0) return null;

                const isExpanded = expandedRegions[region] || searchQuery.trim().length > 0;

                return (
                  <div key={region} className="bg-surface-container-lowest">
                    {/* Region Section Header */}
                    <button
                      type="button"
                      onClick={() => toggleRegion(region)}
                      className="w-full px-3 py-1.5 bg-surface-container-low/70 hover:bg-surface-container-low flex items-center justify-between text-left transition-colors"
                    >
                      <span className="font-label-sm text-[11px] uppercase tracking-[0.16em] font-bold text-secondary">
                        {region} {region === 'Union Territory' ? 'Territories' : 'Guilds'} ({states.length})
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 text-outline transition-transform duration-200 ${isExpanded ? 'rotate-90 text-secondary' : ''}`}
                      />
                    </button>

                    {/* States List in Region */}
                    {isExpanded && (
                      <div className="py-0.5">
                        {states.map(state => (
                          <button
                            key={state.slug}
                            type="button"
                            onClick={() => handleSelectState(state.slug)}
                            className="w-full px-4 py-2 hover:bg-surface-container flex items-start gap-2 text-left transition-colors group"
                          >
                            <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                            <div className="min-w-0 flex-1">
                              <div className="font-label-sm text-[12px] uppercase tracking-[0.1em] font-semibold text-on-surface group-hover:text-secondary truncate">
                                {state.name}
                              </div>
                              <div className="font-body-sm text-[11px] text-outline truncate leading-tight">
                                {state.crafts.map(c => c.items.slice(0, 1).join('')).slice(0, 2).join(' • ')}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2 bg-surface-container-high/60 border-t border-outline-variant/30 text-[10px] text-outline text-center uppercase tracking-wider">
            {t('buyer.nav.all36Territories', 'All 36 Indian States & UTs Registered')}
          </div>
        </div>
      )}
    </div>
  );
}
