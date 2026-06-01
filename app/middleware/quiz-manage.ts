/**
 * Middleware: quiz-manage
 * Autorise les administrateurs ET les instructeurs approuvés à gérer les quiz.
 */
export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser, user } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo('/');
  }

  if (!user.value) {
    await fetchUser();
  }

  const role = user.value?.role;

  // Autoriser Admin sans conditions supplémentaires
  if (role === 'admin') {
    return;
  }

  // Autoriser Instructeur si approuvé
  if (role === 'instructor') {
    if (user.value?.instructor?.status === 'pending') {
      return navigateTo('/instructor/pending');
    }
    return;
  }

  // Autres rôles (ex: student) redirect
  return navigateTo('/student-dashboard');
});
