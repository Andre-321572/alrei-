<template>
  <div>
    <Preloader />
    <StudentNavbar v-if="userRole === 'student'" />
    <InstructorNavbar v-else />

    <section class="bg-cover page-title" style="background-image: url('/img/student-banner.png'); background-position: center; background-size: cover; height: 120px;"></section>

    <section class="bg-light py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="card shadow-sm border-0 rounded-4 overflow-hidden" style="height: 600px;">
              <div class="row g-0 h-100">
                
                <!-- Conversations List -->
                <div class="col-md-4 border-end h-100 d-flex flex-column">
                  <div class="p-3 bg-white border-bottom">
                    <h5 class="fw-bold mb-0">Messages</h5>
                  </div>
                  <div class="flex-grow-1 overflow-auto bg-white">
                    <div v-if="loadingConversations" class="text-center p-4">
                      <div class="spinner-border spinner-border-sm text-primary"></div>
                    </div>
                    <div v-else>
                      <div 
                        v-for="conv in conversations" 
                        :key="conv.id" 
                        @click="selectConversation(conv)"
                        :class="['p-3 conversation-item border-bottom cursor-pointer', { 'active-conv': activeConversation?.id === conv.id }]"
                      >
                        <div class="d-flex align-items-center gap-3">
                          <div class="square--45 circle bg-light-primary text-primary fw-bold">
                            {{ getOtherUser(conv).name.charAt(0) }}
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                              <h6 class="mb-0 fw-bold text-truncate">{{ getOtherUser(conv).name }}</h6>
                              <small class="text-muted tiny">{{ formatTime(conv.lastMessage?.created_at) }}</small>
                            </div>
                            <p class="mb-0 small text-muted text-truncate">{{ conv.lastMessage?.content || 'Aucun message' }}</p>
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
                    <div class="p-3 border-bottom d-flex align-items-center gap-3">
                      <div class="square--40 circle bg-light-primary text-primary fw-bold">
                        {{ getOtherUser(activeConversation).name.charAt(0) }}
                      </div>
                      <h6 class="mb-0 fw-bold">{{ getOtherUser(activeConversation).name }}</h6>
                    </div>

                    <!-- Messages List -->
                    <div class="flex-grow-1 overflow-auto p-4 bg-light" ref="messageBox">
                      <div v-for="msg in messages" :key="msg.id" :class="['d-flex mb-3', msg.user_id === currentUser.id ? 'justify-content-end' : 'justify-content-start']">
                        <div :class="['message-bubble p-3 rounded-4 shadow-sm', msg.user_id === currentUser.id ? 'bg-primary text-white' : 'bg-white']" style="max-width: 75%;">
                          <p class="mb-1 small">{{ msg.content }}</p>
                          <div :class="['tiny opacity-75 text-end', msg.user_id === currentUser.id ? 'text-white' : 'text-muted']">
                            {{ formatTime(msg.created_at) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Message Input -->
                    <div class="p-3 border-top bg-white">
                      <div class="input-group">
                        <input v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control border-0 bg-light rounded-pill px-4" placeholder="Tapez votre message...">
                        <button @click="sendMessage" :disabled="!newMessage || sending" class="btn btn-primary rounded-circle ms-2">
                          <i class="bi bi-send-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-else class="h-100 d-flex align-items-center justify-content-center text-center p-5">
                    <div>
                      <i class="bi bi-chat-dots display-1 text-muted opacity-25"></i>
                      <h5 class="text-muted mt-3">Sélectionnez une conversation</h5>
                      <p class="text-muted small">Commencez à discuter avec vos instructeurs ou étudiants.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterDark />
    <ScrollToTop />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useApi } from '@/composables/useApi'
import { useAuth } from '@/composables/useAuth'
import Preloader from '@/components/Preloader.vue';
import StudentNavbar from '@/components/Navbar/StudentNavbar.vue';
import InstructorNavbar from '@/components/Navbar/InstructorNavbar.vue';
import FooterDark from '@/components/Footer/FooterDark.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const api = useApi()
const { user: currentUser } = useAuth()
const userRole = currentUser.value?.role

const conversations = ref([])
const activeConversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const loadingConversations = ref(true)
const sending = ref(false)
const messageBox = ref(null)

const fetchConversations = async () => {
  try {
    const res = await api('/conversations')
    conversations.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loadingConversations.value = false
  }
}

const selectConversation = async (conv) => {
  activeConversation.value = conv
  try {
    const res = await api(`/conversations/${conv.id}`)
    messages.value = res.data.messages
    scrollToBottom()
  } catch (err) {
    console.error(err)
  }
}

const sendMessage = async () => {
  if (!newMessage.value || !activeConversation.value) return
  sending.value = true
  const recipient = getOtherUser(activeConversation.value)
  
  try {
    await api('/messages', {
      method: 'POST',
      body: {
        recipient_id: recipient.id,
        content: newMessage.value
      }
    })
    newMessage.value = ''
    await selectConversation(activeConversation.value)
  } catch (err) {
    console.error(err)
  } finally {
    sending.value = false
  }
}

const getOtherUser = (conv) => {
  return conv.users.find(u => u.id !== currentUser.value.id)
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

onMounted(fetchConversations)
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
.message-bubble {
  position: relative;
}
.bg-light { background-color: #f3f4f6 !important; }
</style>
