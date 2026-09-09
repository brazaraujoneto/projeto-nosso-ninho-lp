<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from './lib/supabase'
import { ADMIN_EMAIL } from './config/event'
import HeroSection from './components/HeroSection.vue'
import EventSection from './components/EventSection.vue'
import StorySection from './components/StorySection.vue'
import GiftListSection from './components/GiftListSection.vue'
import MessageBoardSection from './components/MessageBoardSection.vue'
import AdminPanel from './components/AdminPanel.vue'

type TabKey = 'home' | 'event' | 'story' | 'gifts' | 'messages'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Início' },
  { key: 'event', label: 'Evento' },
  { key: 'story', label: 'História' },
  { key: 'gifts', label: 'Presentes' },
  { key: 'messages', label: 'Recados' },
]

const activeTab = ref<TabKey>('home')
const isAdminRoute = ref(false)
const isAdmin = ref(false)

function navigate(tab: TabKey) {
  activeTab.value = tab
}

function goHome() {
  window.history.pushState({}, '', '/')
  isAdminRoute.value = false
}

function checkAdminRoute() {
  isAdminRoute.value = window.location.pathname === '/admin'
}

function handlePopState() {
  checkAdminRoute()
}

onMounted(() => {
  checkAdminRoute()
  window.addEventListener('popstate', handlePopState)

  supabase.auth.onAuthStateChange((_event, session) => {
    isAdmin.value = session?.user?.email === ADMIN_EMAIL
  })
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Admin panel route -->
    <AdminPanel v-if="isAdminRoute" @back="goHome" />

    <!-- Public site -->
    <div v-else>
      <header class="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-stone">
        <div class="max-w-md mx-auto flex items-center justify-center px-6 py-3">
          <p class="font-serif text-sm text-sage">Aldrey &amp; Braz</p>
        </div>
      </header>

      <main>
        <HeroSection v-show="activeTab === 'home'" :active="activeTab === 'home'" @navigate="navigate" />
        <EventSection v-show="activeTab === 'event'" :active="activeTab === 'event'" />
        <StorySection v-show="activeTab === 'story'" :active="activeTab === 'story'" />
        <GiftListSection v-show="activeTab === 'gifts'" :active="activeTab === 'gifts'" />
        <MessageBoardSection v-show="activeTab === 'messages'" :active="activeTab === 'messages'" :is-admin="isAdmin" />
      </main>

      <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone">
        <div class="max-w-md mx-auto flex">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="navigate(tab.key)"
            :class="[
              'flex-1 py-3 text-center transition-all duration-300 relative',
              activeTab === tab.key
                ? 'text-sage'
                : 'text-ink-light hover:text-sage'
            ]"
          >
            <span class="block text-xs tracking-wide">{{ tab.label }}</span>
            <span
              v-if="activeTab === tab.key"
              class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-sage rounded-full"
            ></span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>
