export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie('auth_token');
  const route = useRoute();

  let currentLocale = 'fr';
  try {
    const { locale } = useI18n();
    if (locale && locale.value) {
      currentLocale = locale.value;
    }
  } catch (e) {
    // i18n fallback
  }

  return $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const headers = new Headers(options.headers);
      if (!headers.has('Accept-Language')) {
        headers.set('Accept-Language', currentLocale);
      }
      if (!headers.has('Accept')) {
        headers.set('Accept', 'application/json');
      }
      if (token.value) {
        headers.set('Authorization', `Bearer ${token.value}`);
      }
      options.headers = headers;
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        // Rediriger vers l'accueil si on n'y est pas déjà (le formulaire de connexion est sur '/')
        if (route.path !== '/') {
          navigateTo('/');
        }
      }
    }
  });
};
