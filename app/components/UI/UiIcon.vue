<template>
  <span 
    class="shadcn-icon" 
    :class="[
      `shadcn-icon-${name}`, 
      { 'shadcn-icon-animated': animated, 'shadcn-icon-spin': spin }
    ]"
    :style="customStyles"
  >
    <component :is="iconComponent" :size="numericSize" :stroke-width="strokeWidth" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Users,
  Globe,
  GraduationCap,
  BookOpen,
  Network,
  Newspaper,
  Award,
  Trophy,
  Tag,
  LayoutDashboard,
  User,
  MessageSquare,
  FileText,
  ShoppingBag,
  Heart,
  CreditCard,
  HelpCircle,
  ShieldCheck,
  Layers,
  PlayCircle,
  FileQuestion,
  Search,
  CheckCircle2,
  Plus,
  Trash2,
  Pencil,
  HelpCircle as QuestionIcon
} from '@lucide/vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  color?: string
  strokeWidth?: number
  animated?: boolean
  spin?: boolean
}>(), {
  size: 18,
  color: 'currentColor',
  strokeWidth: 2,
  animated: true,
  spin: false
})

const numericSize = computed<number>(() => {
  if (typeof props.size === 'number') return props.size
  const parsed = typeof props.size === 'string' ? parseFloat(props.size) : 18
  return isNaN(parsed) ? 18 : parsed
})

const iconComponent = computed(() => {
  switch (props.name) {
    case 'instructors':
    case 'user-badge':
      return Users
    case 'globe':
    case 'country':
      return Globe
    case 'students':
    case 'users':
      return GraduationCap
    case 'courses':
    case 'book':
      return BookOpen
    case 'groups':
    case 'diagram':
      return Network
    case 'blogs':
    case 'newspaper':
      return Newspaper
    case 'certificates':
    case 'certificate':
      return Award
    case 'scholarships':
    case 'award':
      return Trophy
    case 'categories':
    case 'tags':
      return Tag
    case 'dashboard':
    case 'grid':
      return LayoutDashboard
    case 'profile':
    case 'user':
      return User
    case 'messages':
    case 'chat':
      return MessageSquare
    case 'assignments':
    case 'file-text':
      return FileText
    case 'subscription':
    case 'basket':
      return ShoppingBag
    case 'wishlist':
    case 'heart':
      return Heart
    case 'payments':
    case 'credit-card':
      return CreditCard
    case 'help':
    case 'question':
      return QuestionIcon
    case 'shield':
    case 'lock':
      return ShieldCheck
    case 'plugin':
    case 'integrations':
      return Layers
    case 'play':
      return PlayCircle
    case 'quiz':
      return FileQuestion
    case 'search':
      return Search
    case 'check':
    case 'verify':
      return CheckCircle2
    case 'plus':
    case 'add':
      return Plus
    case 'trash':
    case 'delete':
      return Trash2
    case 'edit':
    case 'pencil':
      return Pencil
    default:
      return LayoutDashboard
  }
})

const customStyles = computed(() => {
  const parsedSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: parsedSize,
    height: parsedSize,
    color: props.color
  }
})
</script>

<style scoped>
.shadcn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  vertical-align: middle;
  transition: transform 0.2s ease, color 0.2s ease;
}

.shadcn-icon svg {
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease;
}

.shadcn-icon-animated:hover svg {
  transform: scale(1.1);
}

.shadcn-icon-spin svg {
  animation: spinIcon 1.5s linear infinite;
}

@keyframes spinIcon {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
