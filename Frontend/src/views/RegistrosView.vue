<template>
  <v-container>
    <v-card>
      <v-card-title class="bg-blue-darken-3 text-white">
        Registros de estacionamiento
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="registros"
          item-value="id"
          class="elevation-1"
        >
          <!-- Mostrar horaSalida o botón -->
          <template #item.horaSalida="{ item }">
            <span v-if="item.horaSalida">{{ item.horaSalida }}</span>
            <v-btn v-else color="green" @click="registrarSalida(item)">
              Registrar salida
            </v-btn>
          </template>

          <!-- Mostrar monto en acciones -->
          <template #item.acciones="{ item }">
            <span>{{ item.monto ? `$${item.monto}` : 'N/A' }}</span>
          </template>

          <!-- Mostrar monto también en columna monto -->
          <template #item.monto="{ item }">
            {{ item.monto ? `$${item.monto}` : 'N/A' }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '@/stores/cliente_store'

const clienteStore = useClienteStore()
const registros = ref([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Fecha', key: 'fecha' },
  { title: 'Hora entrada', key: 'horaEntrada' },
  { title: 'Hora salida', key: 'horaSalida' },
  { title: 'Placa', key: 'placa' },
  { title: 'Tipo de vehículo', key: 'tipoVehiculo' },
  { title: 'Monto', key: 'monto' },
  { title: 'Acciones', key: 'acciones', sortable: false }
]

onMounted(async () => {
  const datos = await clienteStore.obtenerRegistros()
  console.log('📦 Registros cargados:', datos)

  registros.value = datos.map((r, index) => ({
    id: r.id || index + 1,
    fecha: r.fecha || 'N/D',
    horaEntrada: r.horaEntrada || r.hora || 'N/D',
    horaSalida: r.horaSalida || null,
    placa: r.placa || 'N/A',
    tipoVehiculo: r.tipoVehiculo || 'N/A',
    monto: r.monto || null
  }))
})

const registrarSalida = async (item) => {
  try {
    // Verifica que exista hora_entrada válida
    const entradaStr = item.hora_entrada;
    if (!entradaStr || entradaStr === 'N/D') {
      console.warn('Hora de entrada no válida:', entradaStr);
      return;
    }

    const horaEntrada = new Date(entradaStr);
    const horaSalida = new Date(); // Ahora actual

    const diferenciaMs = horaSalida - horaEntrada;
    const horas = Math.ceil(diferenciaMs / (1000 * 60 * 60));
    const costoPorHora = 25;
    const monto = horas * costoPorHora;

    // Formato "HH:MM"
    const horaSalidaStr = horaSalida.toTimeString().slice(0, 5);

    const response = await fetch('http://localhost:3000/cliente/salida', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: item.id,
        horasalida: horaSalidaStr,
        monto
      })
    });

    const data = await response.json();
    console.log(data);

    // Actualiza en pantalla
    item.hora_salida = horaSalidaStr;
    item.monto = monto;
    alert("Salida registrada correctamente");

  } catch (error) {
    console.error("Error al registrar salida:", error);
  }
};

</script>
