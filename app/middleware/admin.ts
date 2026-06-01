/**
 * Middleware: admin
 * Protège les pages réservées aux administrateurs.
 */
export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser, user } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo('/');
  }

  if (!user.value) {
    await fetchUser();
  }

  if (user.value?.role !== 'admin') {
    return navigateTo('/');
  }
});
