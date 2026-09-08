<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '../config/event'

defineProps<{ active: boolean }>()

const milestones = [
  { date: '2019', title: 'O Primeiro Encontro', text: 'Foi num café simples, mas foi onde tudo começou.' },
  { date: '2020', title: 'Primeira Viagem Juntos', text: 'Conhecemos a praia e descobrimos que éramos inseparáveis.' },
  { date: '2022', title: 'Mudança Juntos', text: 'Decidimos dividir o mesmo teto e a mesma vida.' },
  { date: '2025', title: 'O Pedido', text: 'De joelhos, sob as estrelas, veio o sim que mudou tudo.' },
  { date: '2026', title: 'O Grande Dia', text: 'Agora é a hora de celebrar com quem amamos.' },
]

const storyPhotos = eventConfig.storyPhotos
const scrollY = ref(0)

function handleScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section class="min-h-screen px-6 py-16 bg-cream relative overflow-hidden">
    <div class="max-w-md mx-auto">
      <p class="text-sage text-sm tracking-[0.3em] uppercase mb-2 text-center">Nossa Jornada</p>
      <h2 class="font-serif text-3xl text-center text-ink mb-8">Nossa História</h2>

      <!-- Capa com 4 fotos flutuantes em retrato -->
      <div class="relative h-56 mb-10">
        <div
          v-for="(photo, i) in storyPhotos"
          :key="i"
          class="absolute rounded-xl overflow-hidden shadow-lg border-2 border-white transition-transform duration-500"
          :style="{
            left: `${10 + i * 22}%`,
            top: `${(i % 2) * 30}px`,
            width: '70px',
            height: '100px',
            transform: `translateY(${scrollY * 0.05 * (i % 2 === 0 ? 1 : -1)}px) rotate(${(i - 1.5) * 6}deg)`,
            zIndex: 10 - i,
          }"
        >
          <img
            :src="photo"
            alt="Foto do casal"
            class="w-full h-full object-cover"
            @error="(e) => ((e.target as HTMLImageElement).style.opacity = '0.3')"
          />
        </div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <div class="absolute left-[19px] top-2 bottom-2 w-px bg-rose"></div>

        <div
          v-for="(item, i) in milestones"
          :key="i"
          class="relative pl-12 pb-8 last:pb-0"
        >
          <div class="absolute left-3 top-1.5 w-4 h-4 rounded-full border-2 border-rose bg-cream z-10"></div>

          <p class="font-serif text-sage text-sm mb-1">{{ item.date }}</p>
          <h3 class="font-serif text-lg text-ink mb-1.5">{{ item.title }}</h3>
          <p class="text-sm text-ink-light leading-relaxed">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
