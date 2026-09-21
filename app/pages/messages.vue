<template>
  <div>
    <StudentNavbar v-if="isStudent" />
    <InstructorNavbar v-else />

    <section class="p-0 bg-cover" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover;">
      <div class="container-fluid px-0">
        <div class="ht-200"></div>
      </div>
    </section>

    <section class="pt-4 pb-5 bg-light">
      <div class="container">
        <div class="row gx-xl-5">
          <!-- Sidebar Column -->
          <div class="col-lg-3">
            <Sidebar v-if="isAdmin || isInstructor" />
            <StudentAdminSidebar v-else />
          </div>

          <!-- Main Messages Column -->
          <div class="col-lg-9 col-md-12">
            <div class="row mb-3">
              <div class="col-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item"><NuxtLink to="/">{{ $t('home') }}</NuxtLink></li>
                    <li class="breadcrumb-item">
                      <NuxtLink :to="isAdmin ? '/admin-dashboard' : isInstructor ? '/instructor-dashboard' : '/student-dashboard'">
                        {{ $t('dashboard') }}
                      </NuxtLink>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Messages</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div class="card shadow-sm border-0 rounded-4 overflow-hidden" style="height: 650px;">
              <div class="row g-0 h-100">
                
                <!-- Conversations List -->
                <div class="col-md-4 border-end h-100 d-flex flex-column">
                  <div class="p-3 bg-white border-bottom d-flex align-items-center justify-content-between">
                    <h5 class="fw-bold mb-0">Messages</h5>
                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill extra-small">
                      <i class="bi bi-circle-fill me-1" style="font-size: 0.5rem;"></i>En direct
                    </span>
                  </div>
                  <div class="flex-grow-1 overflow-auto bg-white">
                    <div v-if="loadingConversations" class="text-center p-4">
                      <div class="spinner-border spinner-border-sm text-primary"></div>
                    </div>
                    <div v-else-if="conversations.length === 0" class="text-center p-4 text-muted small">
                      <i class="bi bi-chat-left-text fs-3 d-block mb-2 text-secondary opacity-50"></i>
                      Aucune conversation disponible
                    </div>
                    <div v-else>
                      <div 
                        v-for="conv in conversations" 
                        :key="conv.id" 
                        @click="selectConversation(conv)"
                        :class="['p-3 conversation-item border-bottom cursor-pointer', { 'active-conv': activeConversation?.id === conv.id }]"
                      >
                        <div class="d-flex align-items-center gap-3">
                          <div class="square--45 circle overflow-hidden border flex-shrink-0">
                            <img :src="getAvatarUrl(getOtherUser(conv)?.avatar, getOtherUser(conv)?.name)" class="img-fluid circle w-100 h-100" style="object-fit: cover;" alt="Avatar">
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                              <h6 :class="['mb-0 text-truncate', hasUnread(conv) ? 'fw-bold text-dark' : 'fw-semibold']">
                                {{ getOtherUser(conv)?.name || 'Utilisateur' }}
                              </h6>
                              <small :class="['tiny', hasUnread(conv) ? 'fw-bold text-primary' : 'text-muted']">
                                {{ formatTime(conv.lastMessage?.created_at) }}
                              </small>
                            </div>
                            <p :class="['mb-0 small text-truncate', hasUnread(conv) ? 'fw-bold text-dark' : 'text-muted']">
                              {{ conv.lastMessage?.content || 'Aucun message' }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Chat Area -->
                <div class="col-md-8 h-100 d-flex flex-column bg-white">
                  <div v-if="activeConversation" class="h-100 d-flex flex-column">
                    <!-- Chat Header -->
                    <div class="p-3 border-bottom d-flex align-items-center gap-3 bg-light-subtle">
                      <div class="square--40 circle overflow-hidden border flex-shrink-0">
                        <img :src="getAvatarUrl(getOtherUser(activeConversation)?.avatar, getOtherUser(activeConversation)?.name)" class="img-fluid circle w-100 h-100" style="object-fit: cover;" alt="Avatar">
                      </div>
                      <div>
                        <h6 class="mb-0 fw-bold">{{ getOtherUser(activeConversation)?.name || 'Utilisateur' }}</h6>
                        <small class="text-muted extra-small">{{ getOtherUser(activeConversation)?.email }}</small>
                      </div>
                    </div>

                    <!-- Messages List -->
                    <div class="flex-grow-1 overflow-auto p-4 bg-light" ref="messageBox">
                      <div v-for="msg in messages" :key="msg.id || msg.temp_id" :class="['d-flex mb-3', msg.user_id === currentUser?.id ? 'justify-content-end' : 'justify-content-start']">
                        <div :class="['message-bubble p-3 rounded-4 shadow-sm', msg.user_id === currentUser?.id ? 'bg-primary text-white' : 'bg-white text-dark']" style="max-width: 75%;">
                          <p class="mb-1 small text-break">{{ msg.content }}</p>
                          <div :class="['tiny opacity-75 text-end d-flex align-items-center justify-content-end gap-1', msg.user_id === currentUser?.id ? 'text-white' : 'text-muted']">
                            <span>{{ formatTime(msg.created_at) }}</span>
                            <i v-if="msg.sending" class="bi bi-clock-history ms-1"></i>
                            <i v-else-if="msg.user_id === currentUser?.id" class="bi bi-check2-all ms-1"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Message Input -->
                    <div class="p-3 border-top bg-white">
                      <form @submit.prevent="sendMessage" class="input-group">
                        <input 
                          v-model="newMessage" 
                          type="text" 
                          class="form-control border-0 bg-light rounded-pill px-4" 
                          placeholder="Tapez votre message..."
                          :disabled="sending"
                        >
                        <button type="submit" :disabled="!newMessage.trim() || sending" class="btn btn-primary rounded-circle ms-2 square--40 d-flex align-items-center justify-content-center">
                          <i class="bi bi-send-fill"></i>
                        </button>
                      </form>
                    </div>
                  </div>

                  <div v-else class="h-100 d-flex align-items-center justify-content-center text-center p-5">
                    <div>
                      <i class="bi bi-chat-dots display-1 text-muted opacity-25"></i>
                      <h5 class="text-muted mt-3">Sélectionnez une conversation</h5>
                      <p class="text-muted small">Commencez à discuter en direct avec vos contacts.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Accounts/instructor-dashboard/Sidebar.vue';
import StudentAdminSidebar from '@/components/Accounts/student-dashboard/StudentAdminSidebar.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';

const api = useApi()
const route = useRoute()
const { user: currentUser, isAdmin, isInstructor, isStudent } = useAuth()
const { getAvatarUrl } = useAvatar()

const conversations = ref([])
const activeConversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const loadingConversations = ref(true)
const sending = ref(false)
const messageBox = ref(null)
let pollTimer = null

const fetchConversations = async (silent = false) => {
  if (!silent) loadingConversations.value = true
  try {
    const res = await api('/conversations')
    const freshConvs = res.data || []
    
    if (activeConversation.value?.isDraft) {
      const draftExists = freshConvs.some(c => c.id === activeConversation.value.id)
      if (!draftExists) {
        freshConvs.unshift(activeConversation.value)
      }
    }
    
    conversations.value = freshConvs

    if (!silent) {
      const targetUserId = route.query.user_id || route.query.recipient_id
      if (targetUserId && currentUser.value) {
        const targetIdNum = Number(targetUserId)
        const existingConv = conversations.value.find(c =>
          c.users && c.users.some(u => Number(u.id) === targetIdNum && Number(u.id) !== Number(currentUser.value.id))
        )

        if (existingConv) {
          await selectConversation(existingConv)
        } else {
          try {
            const userRes = await api(`/admin/users/${targetUserId}`)
            const recipient = userRes.data || userRes
            if (recipient && recipient.id) {
              const draftConv = {
                id: 'draft_' + recipient.id,
                isDraft: true,
                users: [currentUser.value, recipient],
                lastMessage: null
              }
              conversations.value.unshift(draftConv)
              activeConversation.value = draftConv
              messages.value = []
            }
          } catch (e) {
            console.warn('Could not fetch recipient details for draft:', e)
          }
        }
      }
    }
  } catch (err) {
    console.error('Fetch conversations error:', err)
  } finally {
    if (!silent) loadingConversations.value = false
  }
}

const selectConversation = async (conv) => {
  activeConversation.value = conv
  if (conv.isDraft) {
    messages.value = []
    return
  }
  if (hasUnread(conv)) {
    if (conv.lastMessage) conv.lastMessage.is_read = true
  }
  
  try {
    const res = await api(`/conversations/${conv.id}`)
    messages.value = res.data?.messages || res.messages || []
    scrollToBottom()
  } catch (err) {
    console.error('Select conversation error:', err)
  }
}

const pollActiveConversation = async () => {
  if (!activeConversation.value || activeConversation.value.isDraft) return
  try {
    const res = await api(`/conversations/${activeConversation.value.id}`)
    const freshMessages = res.data?.messages || res.messages || []
    
    if (freshMessages.length !== messages.value.length || 
        (freshMessages.length > 0 && freshMessages[freshMessages.length - 1].id !== messages.value[messages.value.length - 1]?.id)) {
      messages.value = freshMessages
      scrollToBottom()
    }
  } catch (err) {
    // Silent catch for background poll
  }
}

const sendMessage = async () => {
  const content = newMessage.value.trim()
  if (!content || !activeConversation.value) return
  
  const recipient = getOtherUser(activeConversation.value)
  if (!recipient || !recipient.id) return

  sending.value = true
  
  // Instant Optimistic Update (< 1ms UI feedback!)
  const tempId = 'temp_' + Date.now()
  const optimisticMsg = {
    id: tempId,
    temp_id: tempId,
    content: content,
    user_id: currentUser.value?.id,
    created_at: new Date().toISOString(),
    sending: true
  }

  messages.value.push(optimisticMsg)
  newMessage.value = ''
  scrollToBottom()

  try {
    const res = await api('/messages', {
      method: 'POST',
      body: {
        recipient_id: recipient.id,
        content: content
      }
    })

    if (activeConversation.value.isDraft) {
      activeConversation.value.isDraft = false
    }

    await fetchConversations(true)
    if (activeConversation.value) {
      await pollActiveConversation()
    }
  } catch (err) {
    console.error('Send message failed:', err)
    messages.value = messages.value.filter(m => m.id !== tempId)
    alert('Erreur lors de l\'envoi du message')
  } finally {
    sending.value = false
  }
}

const getOtherUser = (conv) => {
  if (!conv || !conv.users || !currentUser.value) return { name: 'Utilisateur' }
  return conv.users.find(u => Number(u.id) !== Number(currentUser.value.id)) || { name: 'Utilisateur' }
}

const hasUnread = (conv) => {
  return conv?.lastMessage && 
         conv.lastMessage.is_read === false && 
         Number(conv.lastMessage.user_id) !== Number(currentUser.value?.id)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageBox.value) {
      messageBox.value.scrollTop = messageBox.value.scrollHeight
    }
  })
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  fetchConversations()
  pollTimer = setInterval(() => {
    fetchConversations(true)
    pollActiveConversation()
  }, 3000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})

definePageMeta({
    layout: false,
    middleware: ['auth'],
});
</script>

<style scoped>
.conversation-item:hover {
  background-color: #f8f9fa;
}
.active-conv {
  background-color: #eef2ff !important;
  border-left: 4px solid var(--bs-primary);
}
.cursor-pointer { cursor: pointer; }
.tiny { font-size: 0.7rem; }
.extra-small { font-size: 0.75rem; }
.message-bubble {
  position: relative;
}
.bg-light { background-color: #f3f4f6 !important; }
</style>