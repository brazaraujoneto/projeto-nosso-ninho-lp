<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { eventConfig } from '../config/event'

defineProps<{ active: boolean }>()

const milestones = [
  { date: '2013', title: 'O Início de uma amizade', text: 'Desde o início, a energia da nossa amizade sempre bateu positivamente.' },
  { date: '28/10/2024', title: 'Depois de tantos anos', text: 'Depois de anos sem nos falar, nossos caminhos se cruzaram novamente e voltamos a conversar.' },
  { date: '09/01/2025', title: 'O Pedido de Namoro', text: 'O dia em que nossa amizade ganhou um novo significado e começamos a escrever nossa história juntos.' },
  { date: '2025', title: 'Unimos as escovas de dentes', text: 'Decidimos unir nossas vidas e começar a construir nosso próprio caminho juntos.' },
  { date: '2025', title: 'Duas mudanças em busca do nosso lar', text: 'Mudamos duas vezes durante o ano, enfrentando desafios e construindo nossa vida lado a lado.' },
  { date: '2025', title: 'Nosso primeiro carrinho', text: 'Compramos nosso primeiro carro. Antigo, mas guerreiro, ótimo e cheio de histórias para viver com a gente.' },
  { date: '31/12/2025', title: 'Nosso primeiro Ano Novo em casa', text: 'Passamos nosso primeiro Ano Novo juntos em casa, celebrando tudo que estávamos construindo.' },
  { date: '2025', title: 'Nossa família Braz, Aldrey e Zoe', text: 'Assumimos de coração nossa família, junto com todos os nossos bichinhos que também fazem parte dela.' },
  { date: '03/2026', title: 'Nossa primeira viagem juntos', text: 'Vivemos nossa primeira viagem juntos, para São Paulo e Diadema, criando mais uma memória para guardar.' },
  { date: '2026', title: 'Nosso Lar oficial', text: 'Finalmente nos mudamos para o nosso verdadeiro lar e começamos uma nova fase da nossa história.' },
  { date: '2026', title: 'Nosso escritório e o quarto da Zoe', text: 'Montamos nosso escritório e preparamos o cantinho da Zoe super rosa como a Aldrey sempre quis, deixando nossa casa cada vez mais com a nossa cara.' },
  { date: '12/09/2026', title: 'O Pedido de Casamento', text: 'Uma noite romântica, um grande SIM e a decisão de viver juntos em comunhão, amor e parceria. Aqui começa o nosso noivado.' },
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
