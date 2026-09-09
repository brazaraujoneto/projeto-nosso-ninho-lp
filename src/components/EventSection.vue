<script setup lang="ts">
import { eventConfig } from '../config/event'

defineProps<{ active: boolean }>()
</script>

<template>
  <section class="min-h-screen px-6 py-16 bg-cream">
    <div class="max-w-md mx-auto">
      <p class="text-sage text-sm tracking-[0.3em] uppercase mb-2 text-center">Detalhes</p>
      <h2 class="font-serif text-3xl text-center text-ink mb-10">O Evento &amp; Entrega</h2>

      <!-- Event card -->
      <div class="bg-white rounded-2xl shadow-md p-6 mb-5 border border-stone">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="font-serif text-lg text-ink">{{ eventConfig.eventDateLabel }}</p>
            <p class="text-sm text-ink-light">{{ eventConfig.eventTimeLabel }}</p>
          </div>
        </div>

        <!-- Foto do local -->
        <div class="relative h-32 rounded-xl bg-sage/5 border border-stone mb-4 overflow-hidden">
          <img 
            src="/fotos/vistariocafe.jpeg" 
            alt="Foto do local" 
            class="w-full h-full object-cover"
          />
          <a 
            href="https://maps.app.goo.gl/uAy4UNNN7TtTaqX79" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="absolute bottom-2 right-2 text-xs text-ink-light bg-cream/80 hover:bg-cream px-2 py-1 rounded cursor-pointer transition-colors"
          >
            Ver no mapa
          </a>
        </div>

        <p class="font-medium text-ink">{{ eventConfig.eventAddress }}</p>
        <p class="text-sm text-ink-light mt-1">{{ eventConfig.eventAddressDetail }}</p>
      </div>

      <!-- Delivery card -->
      <div class="bg-white rounded-2xl shadow-md p-6 border border-stone">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-rose-dark" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
          </div>
          <div>
            <p class="font-serif text-lg text-ink">{{ eventConfig.deliveryAddress }}</p>
          </div>
        </div>

        <p class="font-medium text-ink">{{ eventConfig.deliveryAddressDetail }}</p>
        <p class="text-sm text-ink-light mt-1">{{ eventConfig.deliveryNote }}</p>
      </div>
    </div>
  </section>
</template>