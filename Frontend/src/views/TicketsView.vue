<template>
  <v-container>
    <v-card>
      <v-card-title class="bg-blue-darken-3 text-white">Tickets Generados</v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="tickets"
          item-value="id"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '@/stores/cliente_store'

const clienteStore = useClienteStore()
const tickets = ref([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Fecha', key: 'fecha' },
  { title: 'Hora', key: 'hora' },
  { title: 'Placa', key: 'placa' },
  { title: 'Tipo de Vehículo', key: 'tipoVehiculo' },
  { title: 'Monto', key: 'monto' }
]

onMounted(async () => {
  try {
    // Supongamos que el ticket se guarda junto con el cliente
    const registros = await clienteStore.obtenerRegistros()
    console.log('Registros obtenidos:', registros)
    // Asegúrate que cada registro tenga los datos del ticket generados
    tickets.value = registros.map((r, index) => ({
      id: r.id || index + 1,
      fecha: r.fecha || 'N/D',
      hora: r.hora || 'N/D',
      placa: r.placa,
      tipoVehiculo: r.tipoVehiculo,
      monto: r.monto || 0
    }))
  } catch (e) {
    console.error(e)
  }
})
</script>
