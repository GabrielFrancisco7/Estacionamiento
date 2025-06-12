<template>
  <v-container>
    <v-card>
      <v-card-title class="bg-blue-darken-3 text-white">Registros de Vehículos</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="usuarios" class="elevation-1" item-value="placa">
          <template #item="{ item }">
            <v-btn color="blue-darken-3" @click="verTicket(item)">Ver Ticket</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Mostrar Ticket -->
    <div v-if="ticketSeleccionado" class="mt-5">
      <Ticket :ticket="ticketSeleccionado" />
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Ticket from '@/components/usuarios/Ticket.vue'
import { useClienteStore } from '@/stores/cliente_store'

const clienteStore = useClienteStore()
const usuarios = ref([])
const ticketSeleccionado = ref(null)

const headers = [
  { text: 'Placa', value: 'placa' },
  { text: 'Dueño', value: 'duenio' },
  { text: 'Lugar', value: 'lugar' },
  { text: 'Tipo', value: 'tipoVehiculo' },
  { text: 'Color', value: 'color' },
  { text: 'Hora Entrada', value: 'horaentrada' },
  { text: 'Hora Salida', value: 'horasalida' },
  { text: 'Acciones', value: 'acciones', sortable: false },
]

const obtenerUsuarios = async () => {
  usuarios.value = await clienteStore.obtenerRegistros()
}

onMounted(() => {
  obtenerUsuarios()
})

const verTicket = (usuario) => {
  const entrada = new Date(usuario.horaentrada)
  const salida = new Date(usuario.horasalida)
  const horas = Math.max((salida - entrada) / (1000 * 60 * 60), 1)
  const monto = Math.round(horas * 10)
  const fechaActual = new Date()

  ticketSeleccionado.value = {
    id: usuario.id || Math.floor(Math.random() * 100000),
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    placa: usuario.placa,
    tipoVehiculo: usuario.tipoVehiculo,
    monto: monto,
  }
}
</script>
