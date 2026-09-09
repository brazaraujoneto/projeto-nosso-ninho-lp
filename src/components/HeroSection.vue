<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '../config/event'

defineProps<{ active: boolean }>()

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

const heroPhotos = eventConfig.heroPhotos
const currentPhoto = ref(0)
let photoInterval: ReturnType<typeof setInterval> | null = null

function updateCountdown() {
  const now = new Date().getTime()
  const target = eventConfig.eventDate.getTime()
  const diff = target - now

  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

function nextPhoto() {
  currentPhoto.value = (currentPhoto.value + 1) % heroPhotos.length
}

function prevPhoto() {
  currentPhoto.value = (currentPhoto.value - 1 + heroPhotos.length) % heroPhotos.length
}

function goToPhoto(i: number) {
  currentPhoto.value = i
}

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
  photoInterval = setInterval(nextPhoto, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (photoInterval) clearInterval(photoInterval)
})
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-cream relative overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose to-transparent"></div>

    <!-- Carrossel lateral de fotos -->
    <div class="w-full max-w-xs mb-8">
      <div class="relative rounded-2xl overflow-hidden shadow-lg border-4 border-rose">
        <div class="aspect-[4/3] bg-stone overflow-hidden">
          <img
            :src="heroPhotos[currentPhoto]"
            alt="Foto do casal"
            class="w-full h-full object-cover transition-opacity duration-500"
            @error="(e) => (e.target as HTMLImageElement).style.opacity = '0.3'"
          />
        </div>

        <!-- Setas de navegação -->
        <button
          @click="prevPhoto"
          class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/80 flex items-center justify-center hover:bg-cream transition-colors"
        >
          <svg class="w-4 h-4 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          @click="nextPhoto"
          class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cream/80 flex items-center justify-center hover:bg-cream transition-colors"
        >
          <svg class="w-4 h-4 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Indicadores -->
      <div class="flex justify-center gap-1.5 mt-3">
        <button
          v-for="(_, i) in heroPhotos"
          :key="i"
          @click="goToPhoto(i)"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            currentPhoto === i ? 'w-6 bg-sage' : 'w-1.5 bg-stone'
          ]"
        ></button>
      </div>
    </div>

    <p class="text-sage text-sm tracking-[0.3em] uppercase mb-3">Agora somos Noivos!</p>

    <h1 class="font-serif text-3xl md:text-4xl text-center text-ink leading-tight max-w-md mb-2">
      Chá de Casa Nova &amp; Noivado
    </h1>
    <p class="font-serif text-xl text-sage mb-10">
      {{ eventConfig.brideName }} &amp; {{ eventConfig.groomName }}
    </p>

    <!-- Countdown -->
    <div class="flex gap-3 md:gap-5 mb-10">
      <div class="flex flex-col items-center bg-white/60 rounded-2xl px-4 py-4 min-w-[70px] shadow-sm">
        <span class="font-serif text-3xl text-sage">{{ String(days).padStart(2, '0') }}</span>
        <span class="text-xs text-ink-light uppercase tracking-wider mt-1">Dias</span>
      </div>
      <div class="flex flex-col items-center bg-white/60 rounded-2xl px-4 py-4 min-w-[70px] shadow-sm">
        <span class="font-serif text-3xl text-sage">{{ String(hours).padStart(2, '0') }}</span>
        <span class="text-xs text-ink-light uppercase tracking-wider mt-1">Horas</span>
      </div>
      <div class="flex flex-col items-center bg-white/60 rounded-2xl px-4 py-4 min-w-[70px] shadow-sm">
        <span class="font-serif text-3xl text-sage">{{ String(minutes).padStart(2, '0') }}</span>
        <span class="text-xs text-ink-light uppercase tracking-wider mt-1">Min</span>
      </div>
      <div class="flex flex-col items-center bg-white/60 rounded-2xl px-4 py-4 min-w-[70px] shadow-sm">
        <span class="font-serif text-3xl text-sage">{{ String(seconds).padStart(2, '0') }}</span>
        <span class="text-xs text-ink-light uppercase tracking-wider mt-1">Seg</span>
      </div>
    </div>

    <button
      @click="$emit('navigate', 'gifts')"
      class="bg-sage text-cream px-8 py-3.5 rounded-full font-sans text-sm tracking-wide shadow-md hover:bg-sage-dark transition-all duration-300 hover:shadow-lg active:scale-95"
    >
      Ver Lista de Presentes
    </button>

    <div class="mt-12 flex items-center gap-3 text-rose">
      <div class="w-12 h-px bg-rose"></div>
      <span class="text-xs tracking-[0.2em] uppercase text-ink-light">Save the Date</span>
      <div class="w-12 h-px bg-rose"></div>
    </div>
  </section>
</template>
