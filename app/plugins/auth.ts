export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth();
  
  // Tenter de récupérer l'utilisateur au démarrage si un token existe
  if (process.client) {
    await auth.fetchUser();
  }
});
