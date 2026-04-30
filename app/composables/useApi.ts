export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie('auth_token');

  return $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
          Accept: 'application/json',
        };
      } else {
        options.headers = {
          ...options.headers,
          Accept: 'application/json',
        };
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        // Éviter de rediriger si on est déjà sur la page de login pour éviter les boucles
        const route = useRoute();
        if (route.path !== '/login' && route.path !== '/') {
          navigateTo('/login');
        }
      }
    }
  });
};
