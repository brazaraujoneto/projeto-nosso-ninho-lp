<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { eventConfig } from '../config/event'

defineProps<{ active: boolean; isAdmin: boolean }>()

interface Message {
  id: string
  author_name: string
  message: string
  created_at: string
}

const messages = ref<Message[]>([])
const authorName = ref('')
const messageText = ref('')
const submitting = ref(false)
const errorMsg = ref('')
const messagePhotos = eventConfig.messagePhotos

async function loadMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('id, author_name, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    errorMsg.value = 'Não foi possível carregar as mensagens.'
    return
  }
  messages.value = data || []
}

async function submitMessage() {
  if (!authorName.value.trim() || !messageText.value.trim()) return

  submitting.value = true
  errorMsg.value = ''

  const { data, error } = await supabase
    .from('messages')
    .insert({
      author_name: authorName.value.trim(),
      message: messageText.value.trim(),
    })
    .select('id, author_name, message, created_at')
    .single()

  submitting.value = false

  if (error) {
    errorMsg.value = 'Erro ao enviar mensagem. Tente novamente.'
    return
  }

  messages.value.unshift(data)
  authorName.value = ''
  messageText.value = ''
}

async function deleteMessage(id: string) {
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (!error) {
    messages.value = messages.value.filter(m => m.id !== id)
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

onMounted(() => {
  loadMessages()
})
</script>

<template>
  <section class="min-h-screen px-6 py-16 bg-cream">
    <div class="max-w-md mx-auto">
      <p class="text-sage text-sm tracking-[0.3em] uppercase mb-2 text-center">Recados</p>
      <h2 class="font-serif text-3xl text-center text-ink mb-8">Mural de Mensagens</h2>

      <!-- 2 fotos decorativas -->
      <div class="grid grid-cols-2 gap-3 mb-8">
        <div
          v-for="(photo, i) in messagePhotos"
          :key="i"
          class="rounded-xl overflow-hidden shadow-md border-2 border-white aspect-[4/3]"
        >
          <img
            :src="photo"
            alt="Foto do casal"
            class="w-full h-full object-cover"
            @error="(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')"
          />
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-md p-6 border border-stone mb-8">
        <div class="mb-4">
          <label class="block text-xs text-ink-light uppercase tracking-wider mb-1.5">Seu nome</label>
          <input
            v-model="authorName"
            type="text"
            placeholder="Digite seu nome"
            class="w-full bg-stone/30 rounded-xl px-4 py-3 text-sm text-ink border border-transparent focus:border-sage focus:outline-none transition-colors"
          />
        </div>
        <div class="mb-4">
          <label class="block text-xs text-ink-light uppercase tracking-wider mb-1.5">Mensagem</label>
          <textarea
            v-model="messageText"
            rows="3"
            placeholder="Deixe seu carinho aqui..."
            class="w-full bg-stone/30 rounded-xl px-4 py-3 text-sm text-ink border border-transparent focus:border-sage focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>
        <p v-if="errorMsg" class="text-sm text-red-500 mb-3">{{ errorMsg }}</p>
        <button
          @click="submitMessage"
          :disabled="submitting || !authorName.trim() || !messageText.trim()"
          class="w-full bg-sage text-cream py-3 rounded-xl font-sans text-sm tracking-wide shadow-sm hover:bg-sage-dark transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ submitting ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>
      </div>

      <!-- Messages list -->
      <div class="space-y-4">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="bg-white rounded-2xl shadow-sm border border-stone p-5 relative"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center font-serif text-rose-dark">
                {{ msg.author_name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-medium text-ink text-sm">{{ msg.author_name }}</p>
                <p class="text-xs text-ink-light">{{ formatDate(msg.created_at) }}</p>
              </div>
            </div>

            <button
              v-if="isAdmin"
              @click="deleteMessage(msg.id)"
              class="text-ink-light hover:text-red-500 transition-colors p-1"
              title="Excluir mensagem"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>

          <p class="text-sm text-ink-light leading-relaxed mt-3">{{ msg.message }}</p>
        </div>

        <p v-if="messages.length === 0" class="text-center text-ink-light text-sm py-8">
          Ainda não há mensagens. Seja o primeiro a deixar um recado!
        </p>
      </div>
    </div>
  </section>
</template>
