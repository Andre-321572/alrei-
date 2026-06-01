<template>
  <div class="auth-callback-container d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="text-center p-5 shadow-sm rounded-4 bg-white" style="max-width: 400px;">
      <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <h4 class="fw-bold text-dark mb-2">Authentification en cours</h4>
      <p class="text-muted">Veuillez patienter pendant que nous vous connectons à votre compte Alrei...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { setToken, fetchUser } = useAuth()

onMounted(async () => {
  const token = route.query.token as string
  
  if (token) {
    try {
      // Stocker le token
      setToken(token)
      
      // Récupérer les infos utilisateur
      await fetchUser()
      
      // Rediriger vers le dashboard approprié
      const auth = useAuth()
      if (auth.isAdmin.value) {
        navigateTo('/admin-dashboard')
      } else if (auth.isInstructor.value) {
        navigateTo('/instructor-dashboard')
      } else {
        navigateTo('/student-dashboard')
      }
    } catch (error) {
      console.error('Erreur lors du traitement du token social:', error)
      navigateTo('/login?error=auth_sync_failed')
    }
  } else {
    console.error('Aucun token reçu de Google')
    navigateTo('/login?error=no_token')
  }
})
</script>

<style scoped>
.auth-callback-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
</style>
