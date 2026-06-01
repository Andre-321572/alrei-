/**
 * Middleware: instructor
 * Protège les pages réservées aux instructeurs approuvés.
 * Redirige les non-instructeurs vers leur dashboard respectif.
 */
export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser, user } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo('/');
  }

  // Hydrate user si nécessaire
  if (!user.value) {
    await fetchUser();
  }

  const role = user.value?.role;

  if (role !== 'instructor') {
    if (role === 'admin') return navigateTo('/admin-dashboard');
    return navigateTo('/student-dashboard');
  }

  // Instructeur en attente d'approbation
  if (user.value?.instructor?.status === 'pending') {
    return navigateTo('/instructor/pending');
  }
});
