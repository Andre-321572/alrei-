/**
 * Middleware: auth
 * Redirige vers '/' si l'utilisateur n'est pas authentifié.
 * À appliquer sur toutes les pages protégées (dashboard, profil, etc.)
 */
export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo('/');
  }

  // Hydrate l'état utilisateur si on est côté client et que user est vide
  const { user } = useAuth();
  if (!user.value) {
    await fetchUser();
  }
});
