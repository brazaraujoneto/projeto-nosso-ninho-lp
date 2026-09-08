<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { eventConfig } from '../config/event'
import { supabase } from '../lib/supabase'

defineProps<{ active: boolean }>()

type GiftTab = 'pix' | 'vales' | 'fisicos'
const activeTab = ref<GiftTab>('pix')

interface Gift {
  id: string
  title: string
  price: string
  image_url: string
  reserved: boolean
  reserved_by: string | null
}

const physicalGifts = ref<Gift[]>([])
const loadingGifts = ref(false)
const pixCopied = ref(false)

async function loadGifts() {
  loadingGifts.value = true
  const { data, error } = await supabase
    .from('gifts')
    .select('id, title, price, image_url, reserved, reserved_by')
    .order('created_at', { ascending: true })

  loadingGifts.value = false
  if (!error && data) {
    physicalGifts.value = data
  }
}

function copyPix() {
  navigator.clipboard.writeText(eventConfig.pixKey)
  pixCopied.value = true
  setTimeout(() => { pixCopied.value = false }, 2000)
}

const tabs = [
  { key: 'pix' as GiftTab, label: 'Opção A', sub: 'PIX' },
  { key: 'vales' as GiftTab, label: 'Opção B', sub: 'Vales' },
  { key: 'fisicos' as GiftTab, label: 'Opção C', sub: 'Físicos' },
]

onMounted(() => {
  loadGifts()
})
</script>

<template>
  <section class="min-h-screen px-6 py-16 bg-cream">
    <div class="max-w-md mx-auto">
      <p class="text-sage text-sm tracking-[0.3em] uppercase mb-2 text-center">Presentes</p>
      <h2 class="font-serif text-3xl text-center text-ink mb-8">Lista de Presentes</h2>

      <!-- Tabs -->
      <div class="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm border border-stone">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'flex-1 py-3 px-2 rounded-xl text-center transition-all duration-300',
            activeTab === tab.key
              ? 'bg-sage text-cream shadow-md'
              : 'text-ink-light hover:bg-stone/50'
          ]"
        >
          <span class="block text-xs tracking-wider uppercase">{{ tab.label }}</span>
          <span class="block text-sm font-medium">{{ tab.sub }}</span>
        </button>
      </div>

      <!-- Opção A: PIX -->
      <div v-if="activeTab === 'pix'" class="bg-white rounded-2xl shadow-md p-6 border border-stone text-center">
        <div class="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="font-serif text-xl text-ink mb-2">Presente via PIX</h3>
        <p class="text-sm text-ink-light mb-4">Contribua com qualquer valor para a nossa casa nova.</p>

        <div class="bg-stone/40 rounded-xl p-4 mb-4">
          <p class="text-xs text-ink-light uppercase tracking-wider mb-1">Chave PIX</p>
          <p class="font-mono text-sm text-ink break-all">{{ eventConfig.pixKey }}</p>
          <p class="text-xs text-ink-light mt-2">{{ eventConfig.pixName }}</p>
        </div>

        <button
          @click="copyPix"
          class="w-full bg-sage text-cream py-3 rounded-xl font-sans text-sm tracking-wide shadow-sm hover:bg-sage-dark transition-all duration-300 active:scale-95"
        >
          {{ pixCopied ? 'Chave copiada!' : 'Copiar Chave PIX' }}
        </button>
      </div>

      <!-- Opção B: Vales -->
      <div v-else-if="activeTab === 'vales'" class="space-y-4">
        <div class="bg-white rounded-2xl shadow-md p-5 border border-stone mb-4">
          <p class="text-sm text-ink-light leading-relaxed">
            Escolha uma das lojas abaixo para acessar a nossa lista de presentes.
            Você pode gerar créditos ou vales-presente que usaremos para montar nossa casa nova.
          </p>
        </div>

        <a
          v-for="store in eventConfig.externalGiftLists"
          :key="store.name"
          :href="store.url"
          target="_blank"
          class="block bg-white rounded-2xl shadow-md p-5 border border-stone hover:border-sage transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="font-serif text-lg text-ink mb-1">{{ store.name }}</h3>
              <p class="text-sm text-ink-light">{{ store.description }}</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center group-hover:bg-sage/10 transition-colors">
              <svg class="w-5 h-5 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>
        </a>
      </div>

      <!-- Opção C: Físicos -->
      <div v-else>
        <p v-if="loadingGifts" class="text-center text-ink-light text-sm py-8">Carregando presentes...</p>
        <p v-else-if="physicalGifts.length === 0" class="text-center text-ink-light text-sm py-8">
          Nenhum presente cadastrado ainda.
        </p>
        <div v-else class="grid grid-cols-2 gap-4">
          <div
            v-for="gift in physicalGifts"
            :key="gift.id"
            class="bg-white rounded-2xl shadow-sm border border-stone overflow-hidden relative"
            :class="{ 'opacity-60': gift.reserved }"
          >
            <div
              v-if="gift.reserved"
              class="absolute top-2 left-2 right-2 z-10 bg-sage/90 text-cream text-xs text-center py-1.5 rounded-lg font-medium"
            >
              Reservado<span v-if="gift.reserved_by"> · Comprado por {{ gift.reserved_by }}</span>
            </div>

            <div class="aspect-square overflow-hidden bg-stone">
              <img :src="gift.image_url" :alt="gift.title" class="w-full h-full object-cover" />
            </div>

            <div class="p-3">
              <h3 class="font-serif text-sm text-ink leading-tight mb-1">{{ gift.title }}</h3>
              <p class="text-sm text-sage font-medium mb-2">{{ gift.price }}</p>
              <button
                v-if="!gift.reserved"
                class="w-full bg-sage/10 text-sage py-2 rounded-lg text-xs font-medium tracking-wide hover:bg-sage hover:text-cream transition-all duration-300"
              >
                Presentear
              </button>
              <button
                v-else
                disabled
                class="w-full bg-stone text-ink-light py-2 rounded-lg text-xs font-medium cursor-not-allowed"
              >
                Reservado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
