<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { ADMIN_EMAIL } from '../config/event'

const emit = defineEmits<{ back: [] }>()

// Auth state
const email = ref('')
const password = ref('')
const authError = ref('')
const authLoading = ref(false)
const isLoggedIn = ref(false)

// Gift management
interface Gift {
  id: string
  title: string
  price: string
  image_url: string
  reserved: boolean
  reserved_by: string | null
}

const gifts = ref<Gift[]>([])
const showGiftForm = ref(false)
const editingGiftId = ref<string | null>(null)
const giftForm = ref({ title: '', price: '', image_url: '', reserved: false, reserved_by: '' })
const giftError = ref('')
const giftSaving = ref(false)

// Messages management
interface Message {
  id: string
  author_name: string
  message: string
  created_at: string
}
const messages = ref<Message[]>([])

async function handleLogin() {
  authLoading.value = true
  authError.value = ''

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value,
  })

  authLoading.value = false

  if (error) {
    authError.value = 'Email ou senha incorretos.'
    return
  }

  if (data.user?.email !== ADMIN_EMAIL) {
    authError.value = 'Esta conta não tem permissão de administrador.'
    await supabase.auth.signOut()
    return
  }

  isLoggedIn.value = true
  await loadData()
}

async function handleLogout() {
  await supabase.auth.signOut()
  isLoggedIn.value = false
  email.value = ''
  password.value = ''
}

async function loadData() {
  const [giftsRes, msgsRes] = await Promise.all([
    supabase.from('gifts').select('id, title, price, image_url, reserved, reserved_by').order('created_at', { ascending: true }),
    supabase.from('messages').select('id, author_name, message, created_at').order('created_at', { ascending: false }),
  ])
  if (giftsRes.data) gifts.value = giftsRes.data
  if (msgsRes.data) messages.value = msgsRes.data
}

function startAddGift() {
  editingGiftId.value = null
  giftForm.value = { title: '', price: '', image_url: '', reserved: false, reserved_by: '' }
  showGiftForm.value = true
}

function startEditGift(gift: Gift) {
  editingGiftId.value = gift.id
  giftForm.value = {
    title: gift.title,
    price: gift.price,
    image_url: gift.image_url,
    reserved: gift.reserved,
    reserved_by: gift.reserved_by || '',
  }
  showGiftForm.value = true
}

async function saveGift() {
  giftSaving.value = true
  giftError.value = ''

  const payload = {
    title: giftForm.value.title.trim(),
    price: giftForm.value.price.trim(),
    image_url: giftForm.value.image_url.trim(),
    reserved: giftForm.value.reserved,
    reserved_by: giftForm.value.reserved ? giftForm.value.reserved_by.trim() || null : null,
  }

  let error: { message: string } | null = null

  if (editingGiftId.value) {
    const res = await supabase.from('gifts').update(payload).eq('id', editingGiftId.value)
    error = res.error
  } else {
    const res = await supabase.from('gifts').insert(payload)
    error = res.error
  }

  giftSaving.value = false

  if (error) {
    giftError.value = 'Erro ao salvar presente. Verifique se está logado.'
    return
  }

  showGiftForm.value = false
  await loadData()
}

async function deleteGift(id: string) {
  if (!confirm('Excluir este presente?')) return
  await supabase.from('gifts').delete().eq('id', id)
  await loadData()
}

async function deleteMessage(id: string) {
  if (!confirm('Excluir esta mensagem?')) return
  await supabase.from('messages').delete().eq('id', id)
  messages.value = messages.value.filter(m => m.id !== id)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session?.user?.email === ADMIN_EMAIL) {
    isLoggedIn.value = true
    await loadData()
  }
})
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-stone">
      <div class="max-w-md mx-auto flex items-center justify-between px-6 py-3">
        <button @click="emit('back')" class="text-xs text-ink-light hover:text-sage transition-colors uppercase tracking-wider">
          ← Voltar ao site
        </button>
        <button v-if="isLoggedIn" @click="handleLogout" class="text-xs text-ink-light hover:text-sage transition-colors uppercase tracking-wider">
          Sair
        </button>
      </div>
    </header>

    <!-- Login screen -->
    <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center px-6">
      <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-stone">
        <h2 class="font-serif text-2xl text-ink text-center mb-2">Painel Admin</h2>
        <p class="text-sm text-ink-light text-center mb-6">Acesso restrito aos noivos</p>

        <div class="mb-4">
          <label class="block text-xs text-ink-light uppercase tracking-wider mb-1.5">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            class="w-full bg-stone/30 rounded-xl px-4 py-3 text-sm text-ink border border-stone focus:border-sage focus:outline-none transition-colors"
          />
        </div>
        <div class="mb-4">
          <label class="block text-xs text-ink-light uppercase tracking-wider mb-1.5">Senha</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
            class="w-full bg-stone/30 rounded-xl px-4 py-3 text-sm text-ink border border-stone focus:border-sage focus:outline-none transition-colors"
          />
        </div>
        <p v-if="authError" class="text-sm text-red-500 mb-3">{{ authError }}</p>
        <button
          @click="handleLogin"
          :disabled="authLoading"
          class="w-full bg-sage text-cream py-3 rounded-xl font-sans text-sm tracking-wide shadow-sm hover:bg-sage-dark transition-all duration-300 active:scale-95 disabled:opacity-50"
        >
          {{ authLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </div>
    </div>

    <!-- Admin panel -->
    <div v-else class="max-w-md mx-auto px-6 py-8 pb-24">
      <h1 class="font-serif text-2xl text-ink mb-6">Painel Administrativo</h1>

      <!-- Gifts section -->
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-serif text-lg text-ink">Presentes Físicos</h2>
          <button
            @click="startAddGift"
            class="bg-sage text-cream px-4 py-2 rounded-lg text-xs font-medium tracking-wide hover:bg-sage-dark transition-colors"
          >
            + Adicionar
          </button>
        </div>

        <!-- Gift form -->
        <div v-if="showGiftForm" class="bg-white rounded-2xl shadow-md p-5 border border-stone mb-4">
          <div class="mb-3">
            <label class="block text-xs text-ink-light uppercase tracking-wider mb-1">Título</label>
            <input v-model="giftForm.title" type="text" placeholder="Ex: Jogo de Panelas"
              class="w-full bg-stone/30 rounded-xl px-4 py-2.5 text-sm border border-stone focus:border-sage focus:outline-none" />
          </div>
          <div class="mb-3">
            <label class="block text-xs text-ink-light uppercase tracking-wider mb-1">Preço</label>
            <input v-model="giftForm.price" type="text" placeholder="Ex: R$ 189,90"
              class="w-full bg-stone/30 rounded-xl px-4 py-2.5 text-sm border border-stone focus:border-sage focus:outline-none" />
          </div>
          <div class="mb-3">
            <label class="block text-xs text-ink-light uppercase tracking-wider mb-1">URL da Imagem</label>
            <input v-model="giftForm.image_url" type="text" placeholder="/fotos/presente1.jpg ou URL completa"
              class="w-full bg-stone/30 rounded-xl px-4 py-2.5 text-sm border border-stone focus:border-sage focus:outline-none" />
          </div>
          <div class="mb-3 flex items-center gap-2">
            <input v-model="giftForm.reserved" type="checkbox" id="reserved" class="w-4 h-4 accent-sage" />
            <label for="reserved" class="text-sm text-ink">Marcar como reservado</label>
          </div>
          <div v-if="giftForm.reserved" class="mb-3">
            <label class="block text-xs text-ink-light uppercase tracking-wider mb-1">Reservado por</label>
            <input v-model="giftForm.reserved_by" type="text" placeholder="Nome de quem reservou"
              class="w-full bg-stone/30 rounded-xl px-4 py-2.5 text-sm border border-stone focus:border-sage focus:outline-none" />
          </div>
          <p v-if="giftError" class="text-sm text-red-500 mb-3">{{ giftError }}</p>
          <div class="flex gap-2">
            <button @click="saveGift" :disabled="giftSaving"
              class="flex-1 bg-sage text-cream py-2.5 rounded-xl text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50">
              {{ giftSaving ? 'Salvando...' : 'Salvar' }}
            </button>
            <button @click="showGiftForm = false"
              class="px-4 py-2.5 rounded-xl text-sm text-ink-light border border-stone hover:bg-stone/30 transition-colors">
              Cancelar
            </button>
          </div>
        </div>

        <!-- Gifts list -->
        <div class="space-y-3">
          <div v-for="gift in gifts" :key="gift.id"
            class="bg-white rounded-xl shadow-sm border border-stone p-4 flex items-center gap-3">
            <img :src="gift.image_url" :alt="gift.title" class="w-14 h-14 rounded-lg object-cover bg-stone flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-ink truncate">{{ gift.title }}</p>
              <p class="text-xs text-sage">{{ gift.price }}</p>
              <p v-if="gift.reserved" class="text-xs text-rose-dark">Reservado<span v-if="gift.reserved_by"> por {{ gift.reserved_by }}</span></p>
            </div>
            <div class="flex gap-1">
              <button @click="startEditGift(gift)" class="p-2 text-ink-light hover:text-sage transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button @click="deleteGift(gift.id)" class="p-2 text-ink-light hover:text-red-500 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          <p v-if="gifts.length === 0" class="text-center text-ink-light text-sm py-4">
            Nenhum presente cadastrado. Clique em "Adicionar".
          </p>
        </div>
      </div>

      <!-- Messages section -->
      <div>
        <h2 class="font-serif text-lg text-ink mb-4">Mensagens</h2>
        <div class="space-y-3">
          <div v-for="msg in messages" :key="msg.id"
            class="bg-white rounded-xl shadow-sm border border-stone p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-ink">{{ msg.author_name }}</p>
                <p class="text-xs text-ink-light">{{ formatDate(msg.created_at) }}</p>
              </div>
              <button @click="deleteMessage(msg.id)" class="p-1 text-ink-light hover:text-red-500 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-ink-light mt-2">{{ msg.message }}</p>
          </div>
          <p v-if="messages.length === 0" class="text-center text-ink-light text-sm py-4">
            Nenhuma mensagem recebida.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
