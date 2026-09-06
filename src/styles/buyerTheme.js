/**
 * ============================================================================
 * KARIGAR BUYER PLATFORM — DESIGN SYSTEM TOKEN REFERENCE & RECONCILIATION GUIDE
 * ============================================================================
 * 
 * Palette Reconciliation:
 * - Surface / Warm Cream Background: #fff8f5 (surface)
 * - Container Surface (Cards/Sections): #f5ece7 (surface-container), #fbf2ec (surface-container-low), #ffffff (surface-container-lowest)
 * - Deep Terracotta / Rust (Primary Accent): #9b4428 (secondary)
 * - Warm Gold Zari Highlight: #785600 (primary), #ffdea6 (primary-fixed)
 * - Deep Charcoal Text: #1f1b18 (on-surface), #4f4535 (on-surface-variant)
 * - Muted Border & Outline: #817563 (outline), #d3c4af (outline-variant)
 * 
 * Typography System:
 * - Display / Headline Serifs: 'EB Garamond', serif (font-garamond)
 * - Body & Label Sans-serifs: 'Manrope', sans-serif (font-manrope)
 * 
 * Icon Reconciliation Matrix (Material Symbols -> lucide-react):
 * - expand_more             -> ChevronDown
 * - verified                -> BadgeCheck
 * - local_mall              -> ShoppingBag
 * - workspace_premium       -> Award
 * - location_on             -> MapPin
 * - zoom_in                 -> ZoomIn
 * - shield_with_heart       -> ShieldCheck
 * - assured_workload        -> ShieldCheck
 * - security                -> ShieldCheck
 * - verified_user           -> BadgeCheck
 * - play_circle             -> PlayCircle
 * - play_arrow              -> Play
 * - arrow_forward           -> ArrowRight
 * - fingerprint             -> Fingerprint
 * - biotech                 -> FlaskConical
 * - history_edu             -> ScrollText
 * - public                  -> Globe
 * - map                     -> Map
 * - close                   -> X
 * - account_balance_wallet  -> Wallet
 * - package_2               -> Package
 * - bookmark_heart          -> BookmarkHeart
 * - translate               -> Languages
 * - support_agent           -> Headset
 * - logout                  -> LogOut
 * - west / east             -> ChevronLeft / ChevronRight
 * - inventory_2             -> PackageCheck
 * - local_shipping          -> Truck
 * - auto_stories            -> BookOpen
 * - eco                     -> Leaf
 * - pan_tool                -> Hand
 * - water_drop              -> Droplet
 * - format_image_left       -> Image
 * - star / star_half        -> Star / StarHalf
 * - my_location             -> Target
 * - storefront              -> Store
 * - account_balance         -> Building2
 * ============================================================================
 */

export const BUYER_THEME = {
  colors: {
    surface: '#fff8f5',
    surfaceContainer: '#f5ece7',
    surfaceContainerLow: '#fbf2ec',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerHigh: '#f0e6e1',
    surfaceContainerHighest: '#eae1dc',
    onSurface: '#1f1b18',
    onSurfaceVariant: '#4f4535',
    secondary: '#9b4428',
    secondaryContainer: '#fd916e',
    onSecondary: '#ffffff',
    primary: '#785600',
    primaryFixed: '#ffdea6',
    outline: '#817563',
    outlineVariant: '#d3c4af',
  },
  fonts: {
    heading: "'EB Garamond', serif",
    body: "'Manrope', sans-serif",
  },
};
