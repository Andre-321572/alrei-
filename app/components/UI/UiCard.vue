<template>
  <div class="uiverse-card" :class="{ 'uiverse-card-interactive': interactive }">
    <div v-if="$slots.header || title" class="uiverse-card-header">
      <slot name="header">
        <div class="d-flex align-items-center gap-2">
          <UiIcon v-if="iconName" :name="iconName" class="text-primary" />
          <h5 class="m-0 fw-bold">{{ title }}</h5>
        </div>
      </slot>
    </div>
    <div class="uiverse-card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="uiverse-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

withDefaults(defineProps<{
  title?: string
  iconName?: string
  interactive?: boolean
}>(), {
  title: '',
  iconName: '',
  interactive: true
})
</script>

<style scoped>
.uiverse-card {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.uiverse-card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(13, 110, 253, 0.12);
  border-color: rgba(13, 110, 253, 0.2);
}

.uiverse-card-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: #f8fafc;
}

.uiverse-card-body {
  padding: 20px;
}

.uiverse-card-footer {
  padding: 14px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: #f8fafc;
}
</style>
