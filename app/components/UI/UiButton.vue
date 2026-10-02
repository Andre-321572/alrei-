<template>
  <button 
    :type="type" 
    class="uiverse-button" 
    :class="[
      `uiverse-btn-${variant}`,
      `uiverse-btn-${size}`,
      { 'uiverse-btn-loading': loading }
    ]" 
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span class="uiverse-button-content">
      <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
      <span v-else-if="iconName" class="uiverse-btn-icon">
        <UiIcon :name="iconName" :size="iconSize" />
      </span>
      <span class="uiverse-btn-text">
        <slot></slot>
      </span>
    </span>
    <span class="uiverse-button-glow"></span>
  </button>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

withDefaults(defineProps<{
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  iconName?: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  iconName: '',
  loading: false,
  disabled: false,
  type: 'button'
})

defineEmits(['click'])

const iconSize = computed(() => '18px')
</script>

<style scoped>
.uiverse-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.uiverse-button-content {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.uiverse-button-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.uiverse-button:hover .uiverse-button-glow {
  opacity: 1;
}

.uiverse-button:hover {
  transform: translateY(-2px);
}

.uiverse-button:active {
  transform: translateY(0);
}

/* Sizes */
.uiverse-btn-sm {
  padding: 6px 14px;
  font-size: 0.82rem;
}
.uiverse-btn-md {
  padding: 9px 20px;
  font-size: 0.9rem;
}
.uiverse-btn-lg {
  padding: 12px 28px;
  font-size: 1rem;
}

/* Variants */
.uiverse-btn-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(13, 110, 253, 0.35);
}
.uiverse-btn-primary:hover {
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.5);
}

.uiverse-btn-success {
  background: linear-gradient(135deg, #198754 0%, #146c43 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(25, 135, 84, 0.35);
}

.uiverse-btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
  color: #000000;
  box-shadow: 0 4px 14px rgba(255, 193, 7, 0.35);
}

.uiverse-btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(220, 53, 69, 0.35);
}

.uiverse-btn-outline {
  background: transparent;
  color: #475569;
  border: 1px solid #cbd5e1;
  box-shadow: none;
}
.uiverse-btn-outline:hover {
  background: #f8fafc;
  color: #0d6efd;
  border-color: #0d6efd;
}

.uiverse-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}
</style>
