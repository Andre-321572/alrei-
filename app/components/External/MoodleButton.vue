<template>
  <button 
    @click="handleMoodleAccess" 
    class="btn btn-main d-flex align-items-center justify-content-center gap-2 w-100 py-3"
    :disabled="loading"
  >
    <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <i v-else class="bi bi-mortarboard fs-4"></i>
    <span>Accéder à la plateforme Moodle</span>
  </button>
</template>

<script setup>
const props = defineProps({
  courseId: {
    type: Number,
    required: true
  }
})

const { loading, getMoodleLogin } = useExternal()

const handleMoodleAccess = async () => {
  try {
    await getMoodleLogin(props.courseId)
  } catch (error) {
    const errorMsg = error.response?._data?.message || error.message || "Erreur inconnue";
    alert("Impossible d'accéder à Moodle : " + errorMsg)
  }
}
</script>
