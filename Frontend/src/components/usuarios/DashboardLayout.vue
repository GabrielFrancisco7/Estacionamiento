<template>
  <v-container fluid class="d-flex">
    <!-- Sidebar -->
    <v-navigation-drawer app permanent width="200">
      <v-list nav dense>
        <v-list-item-group v-model="opcionSeleccionada">
          <v-list-item value="registros">
            <v-list-item-title>Registros</v-list-item-title>
          </v-list-item>
          <v-list-item value="ticket">
            <v-list-item-title>Ticket</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido dinámico -->
    <v-main>
      <component :is="vistaActual" />
    </v-main>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import RegistrosView from '../../views/RegistrosView.vue'
import TicketView from '../../views/TicketView.vue'

const opcionSeleccionada = ref('registros')

const vistaActual = computed(() => {
  switch (opcionSeleccionada.value) {
    case 'ticket':
      return TicketView
    case 'registros':
    default:
      return RegistrosView
  }
})
</script>
