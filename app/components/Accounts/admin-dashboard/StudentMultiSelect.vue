<template>
  <div class="student-multi-select">
    <!-- Search Bar & Controls -->
    <div class="mb-3">
      <div class="position-relative mb-2">
        <i class="bi bi-search position-absolute top-50 translate-middle-y start-0 ms-3 text-muted"></i>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control ps-5 pe-4 py-2 rounded-3 border bg-light-subtle shadow-none"
          placeholder="Rechercher un étudiant par nom ou email..."
        />
        <button
          v-if="searchQuery"
          type="button"
          class="btn btn-sm text-muted position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
          @click="searchQuery = ''"
        >
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>

      <!-- Actions bar & selection stats -->
      <div class="d-flex align-items-center justify-content-between px-1">
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2.5 py-1">
            <i class="bi bi-person-check-fill me-1"></i>
            {{ selectedCount }} / {{ students.length }} sélectionné(s)
          </span>
        </div>

        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary py-1 px-2.5 rounded-pill extra-small-text"
            @click="selectAll"
          >
            <i class="bi bi-check-all me-1"></i>Tout sélectionner
          </button>
          <button
            v-if="selectedCount > 0"
            type="button"
            class="btn btn-sm btn-outline-danger py-1 px-2.5 rounded-pill extra-small-text"
            @click="deselectAll"
          >
            <i class="bi bi-x-lg me-1"></i>Désélectionner
          </button>
        </div>
      </div>
    </div>

    <!-- Selected chips area -->
    <div v-if="selectedStudents.length > 0" class="selected-chips-area p-2.5 bg-light rounded-3 border mb-3">
      <div class="text-muted extra-small mb-1.5 fw-semibold text-uppercase tracking-wider">Étudiants sélectionnés :</div>
      <div class="d-flex flex-wrap gap-1.5 align-items-center" style="max-height: 100px; overflow-y: auto;">
        <div
          v-for="student in selectedStudents"
          :key="student.id"
          class="selected-chip badge bg-white text-dark border shadow-xs rounded-pill d-inline-flex align-items-center gap-1.5 py-1.5 px-2.5"
        >
          <span
            class="avatar-chip rounded-circle text-white d-inline-flex align-items-center justify-content-center fw-bold"
            :style="{ backgroundColor: getAvatarColor(student.id, student.name) }"
          >
            {{ getInitials(student.name) }}
          </span>
          <span class="chip-name text-truncate fw-semibold" style="max-width: 140px;">{{ student.name }}</span>
          <button
            type="button"
            class="btn-close-chip border-0 bg-transparent text-muted ms-1"
            title="Retirer"
            @click.stop="toggleStudent(student.id)"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- List of students -->
    <div class="students-list-wrapper border rounded-3 overflow-auto bg-white shadow-xs" style="max-height: 250px;">
      <div v-if="filteredStudents.length === 0" class="text-center py-4 text-muted">
        <i class="bi bi-search fs-3 d-block mb-1 opacity-50"></i>
        <span class="small" v-if="searchQuery">Aucun étudiant ne correspond à "{{ searchQuery }}"</span>
        <span class="small" v-else>Aucun étudiant disponible</span>
      </div>

      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="student-row d-flex align-items-center justify-content-between px-3 py-2 border-bottom user-select-none cursor-pointer"
        :class="{ 'is-selected': isSelected(student.id) }"
        @click="toggleStudent(student.id)"
      >
        <div class="d-flex align-items-center gap-3 overflow-hidden">
          <!-- Avatar -->
          <div class="square--36 circle overflow-hidden border flex-shrink-0">
            <img :src="getAvatarUrl(student.avatar, student.name)" class="img-fluid circle w-100 h-100" style="object-fit: cover;" alt="Avatar">
          </div>

          <!-- Info -->
          <div class="overflow-hidden">
            <div class="fw-bold text-dark text-truncate small mb-0.5">{{ student.name || 'Sans nom' }}</div>
            <div class="text-muted extra-small text-truncate">
              <i class="bi bi-envelope me-1 opacity-75"></i>{{ student.email }}
              <span v-if="student.country" class="ms-2 badge bg-light text-secondary border">
                {{ student.country }}
              </span>
            </div>
          </div>
        </div>

        <!-- Custom Checkbox Indicator -->
        <div class="checkbox-indicator flex-shrink-0 ms-2">
          <div
            class="custom-check-box d-flex align-items-center justify-content-center rounded-circle border transition-all"
            :class="isSelected(student.id) ? 'bg-warning border-warning text-white' : 'bg-white border-secondary-subtle'"
          >
            <i v-if="isSelected(student.id)" class="bi bi-check-lg fw-bold"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { getAvatarUrl } = useAvatar()

interface Student {
  id: number | string
  name: string
  email: string
  country?: string
  [key: string]: any
}

const props = withDefaults(
  defineProps<{
    modelValue?: (number | string)[]
    students?: Student[]
  }>(),
  {
    modelValue: () => [],
    students: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: (number | string)[]): void
}>()

const searchQuery = ref('')

const isSelected = (id: number | string) => {
  return props.modelValue.includes(id)
}

const selectedCount = computed(() => props.modelValue.length)

const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return props.students
  const q = searchQuery.value.toLowerCase().trim()
  return props.students.filter(
    (s) =>
      (s.name || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q)
  )
})

const selectedStudents = computed(() => {
  const map = new Map(props.students.map((s) => [s.id, s]))
  return props.modelValue
    .map((id) => map.get(id))
    .filter((s): s is Student => Boolean(s))
})

const toggleStudent = (id: number | string) => {
  const current = [...props.modelValue]
  const index = current.indexOf(id)
  if (index > -1) {
    current.splice(index, 1)
  } else {
    current.push(id)
  }
  emit('update:modelValue', current)
}

const selectAll = () => {
  const filteredIds = filteredStudents.value.map((s) => s.id)
  const set = new Set([...props.modelValue, ...filteredIds])
  emit('update:modelValue', Array.from(set))
}

const deselectAll = () => {
  if (searchQuery.value.trim()) {
    const visibleSet = new Set(filteredStudents.value.map((s) => s.id))
    const remaining = props.modelValue.filter((id) => !visibleSet.has(id))
    emit('update:modelValue', remaining)
  } else {
    emit('update:modelValue', [])
  }
}

const getInitials = (name: string) => {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const getAvatarColor = (id: number | string, name: string) => {
  const colors = [
    '#f59e0b', // Amber / ALREI gold
    '#2563eb', // Blue
    '#059669', // Emerald green
    '#7c3aed', // Purple
    '#db2777', // Pink
    '#ea580c', // Orange
    '#0891b2', // Cyan
    '#4f46e5'  // Indigo
  ]
  const str = String(id) + (name || '')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}
</script>

<style scoped>
.extra-small {
  font-size: 0.75rem;
}

.extra-small-text {
  font-size: 0.75rem;
}

.avatar-chip {
  width: 20px;
  height: 20px;
  font-size: 0.65rem;
}

.chip-name {
  font-size: 0.8rem;
}

.btn-close-chip {
  line-height: 1;
  font-size: 1rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  transition: color 0.15s ease;
}

.btn-close-chip:hover {
  color: #dc3545;
}

.student-avatar-lg {
  width: 36px;
  height: 36px;
  font-size: 0.85rem;
}

.student-row {
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.student-row:hover {
  background-color: #f8fafc;
}

.student-row.is-selected {
  background-color: rgba(242, 169, 0, 0.08);
  border-left: 3px solid #f2a900 !important;
}

.custom-check-box {
  width: 22px;
  height: 22px;
  font-size: 0.85rem;
  transition: all 0.15s ease;
}

.selected-chip {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
