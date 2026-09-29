/**
 * Middleware: instructor
 * Protège les pages réservées aux instructeurs approuvés et aux administrateurs.
 * Redirige les apprenants vers leur dashboard respectif.
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

  if (role !== 'instructor' && role !== 'admin') {
    return navigateTo('/student-dashboard');
  }

  // Instructeur en attente d'approbation (ne s'applique pas aux admins)
  if (role === 'instructor' && user.value?.instructor?.status === 'pending') {
    return navigateTo('/instructor/pending');
  }
});
