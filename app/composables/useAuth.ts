export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
    path: '/',
  });
  const user = useState<any>('user', () => null);
  const api = useApi();

  /**
   * Redirige l'utilisateur vers son dashboard selon son rôle.
   * Les instructeurs en attente d'approbation sont redirigés vers /instructor/pending.
   */
  const redirectAfterLogin = (userData: any) => {
    const role = userData?.role;
    if (role === 'admin') {
      return navigateTo('/admin-dashboard');
    } else if (role === 'instructor') {
      if (userData?.instructor?.status === 'pending') {
        return navigateTo('/instructor/pending');
      }
      return navigateTo('/instructor-dashboard');
    } else {
      return navigateTo('/student-dashboard');
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response: any = await api('/login', {
        method: 'POST',
        body: credentials,
      });

      token.value = response.token;
      const userData = response.user?.data ?? response.user;
      user.value = userData;

      await redirectAfterLogin(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: Record<string, any>) => {
    try {
      const response: any = await api('/register', {
        method: 'POST',
        body: data,
      });

      token.value = response.token;
      const userData = response.user?.data ?? response.user;
      user.value = userData;

      await redirectAfterLogin(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api('/logout', { method: 'POST' });
    } catch {
      // Token déjà expiré côté serveur — on ignore
    } finally {
      token.value = null;
      user.value = null;
      navigateTo('/');
    }
  };

  const fetchUser = async () => {
    if (!token.value) return null;
    try {
      const response: any = await api('/profile');
      // UserResource wraps the payload inside a `data` key
      user.value = response?.data ?? response;
      return user.value;
    } catch (error: any) {
      // Ne pas intercepter les redirections de Nuxt (navigateTo lance une erreur)
      if (error.__nuxt_redirect) {
        throw error;
      }
      token.value = null;
      user.value = null;
      return null;
    }
  };

  return {
    user,
    token,
    login,
    register,
    logout,
    fetchUser,
    redirectAfterLogin,
    isAuthenticated: computed(() => !!token.value),
    isAdmin:        computed(() => user.value?.role === 'admin'),
    isInstructor:   computed(() => user.value?.role === 'instructor'),
    isStudent:      computed(() => user.value?.role === 'student'),
  };
};
