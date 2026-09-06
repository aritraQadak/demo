/**
 * Karigar Role-Based Navigation & Route Resolution
 */

export const EXISTING_PATRON_ROUTE = '/';
export const EXISTING_ARTISAN_ROUTE = '/seller/dashboard';

/**
 * Returns the default home destination route for a given user or role
 * @param {Object|string} userOrRole - User object containing role or role string ('ARTISAN' | 'PATRON')
 * @returns {string} Target path
 */
export function getHomeRouteForRole(userOrRole) {
  const role = typeof userOrRole === 'string' ? userOrRole : userOrRole?.role;
  if (role === 'ARTISAN') {
    return EXISTING_ARTISAN_ROUTE;
  }
  if (role === 'PATRON') {
    return EXISTING_PATRON_ROUTE;
  }
  return '/login';
}

/**
 * Reusable helper to navigate the authenticated user to their role interface
 * @param {Function} navigate - react-router navigate function
 * @param {Object} user - Authenticated user object
 * @param {string|null} fallbackFrom - Optional location state 'from' path to preserve deep-linking
 */
export function navigateByRole(navigate, user, fallbackFrom = null) {
  if (!user || !user.role) {
    navigate('/login', { replace: true });
    return;
  }

  // If a specific deep link exists and is allowed for this role, we can honor it
  if (fallbackFrom && fallbackFrom !== '/login' && fallbackFrom !== '/auth') {
    if (user.role === 'ARTISAN' && (fallbackFrom.startsWith('/seller') || fallbackFrom.startsWith('/dashboard'))) {
      navigate(fallbackFrom, { replace: true });
      return;
    }
    if (user.role === 'PATRON' && !fallbackFrom.startsWith('/seller') && !fallbackFrom.startsWith('/dashboard')) {
      navigate(fallbackFrom, { replace: true });
      return;
    }
  }

  const destination = getHomeRouteForRole(user.role);
  navigate(destination, { replace: true });
}
