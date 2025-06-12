<template>
  <v-card class="pa-4" elevation="3" style="max-width: 400px; margin: auto; background-color: white;">
    <v-card-title class="text-center text-h6 font-weight-bold">
      TICKET DE ESTACIONAMIENTO
    </v-card-title>
    <v-card-text class="text-body-2">
      <div><strong>Ticket #:</strong> {{ ticket.id }}</div>
      <div><strong>Fecha:</strong> {{ ticket.fecha }}</div>
      <div><strong>Hora:</strong> {{ ticket.hora }}</div>
      <div><strong>Placas:</strong> {{ ticket.placa }}</div>
      <div><strong>Tipo de Vehículo:</strong> {{ ticket.tipoVehiculo }}</div>
      <div><strong>Monto a Pagar:</strong> ${{ ticket.monto }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true
  }
})
</script>
