<template>
  <div class="card border rounded-3 mb-3 shadow-sm">
    <div class="card-body p-3">
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <div :class="`icon-box rounded-circle p-3 me-3 ${providerStyle.bg} ${providerStyle.text}`">
            <i :class="`fs-4 ${providerStyle.icon}`"></i>
          </div>
          <div>
            <h6 class="mb-1 fw-bold">{{ meeting.title }}</h6>
            <div class="text-muted small mb-1">{{ meeting.course?.title }}</div>
            <div class="d-flex align-items-center text-muted small">
              <i class="bi bi-calendar-event me-1"></i>
              <span>{{ formatDate(meeting.start_time) }}</span>
              <span class="mx-2">|</span>
              <i class="bi bi-clock me-1"></i>
              <span>{{ meeting.duration }} min</span>
            </div>
          </div>
        </div>
        
        <div class="text-end">
          <div v-if="isLive" class="badge bg-danger mb-2 pulse-animation">
            <span class="pulse-dot"></span> LIVE NOW
          </div>
          <button 
            @click="joinMeeting"
            class="btn btn-sm d-block w-100"
            :class="isLive ? 'btn-main pulse-button' : 'btn-outline-main'"
          >
            Rejoindre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  meeting: {
    type: Object,
    required: true
  }
})

const providerStyle = computed(() => {
  switch (props.meeting.provider) {
    case 'google':
      return { bg: 'bg-light-danger', text: 'text-danger', icon: 'bi-google' }
    case 'microsoft':
      return { bg: 'bg-light-info', text: 'text-info', icon: 'bi-microsoft-teams' }
    case 'zoom':
    default:
      return { bg: 'bg-light-primary', text: 'text-primary', icon: 'bi-camera-video-fill' }
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const isLive = computed(() => {
  const now = new Date()
  const start = new Date(props.meeting.start_time)
  const end = new Date(start.getTime() + props.meeting.duration * 60000)
  // Allow joining 10 mins before start
  const bufferStart = new Date(start.getTime() - 10 * 60000)
  return now >= bufferStart && now <= end
})

const joinMeeting = () => {
  if (props.meeting.join_url) {
    window.open(props.meeting.join_url, '_blank')
  }
}
</script>

<style scoped>
.pulse-animation {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: pulse-dot 1.5s infinite;
}

.pulse-button {
  animation: pulse-btn 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

@keyframes pulse-btn {
  0% { box-shadow: 0 0 0 0 rgba(var(--main-color-rgb), 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(var(--main-color-rgb), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--main-color-rgb), 0); }
}

.bg-light-primary {
  background-color: rgba(var(--main-color-rgb), 0.1);
}
</style>
