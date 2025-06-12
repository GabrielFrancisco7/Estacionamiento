<template>
  <v-container class="mt-5" max-width="500">
    <v-card style="background-color: #001f3f; color: white">
      <v-card-title>Registro de Vehiculo</v-card-title>
      <v-card-text>
        <v-form ref="frmUsuario" v-model="validForm">
          <v-text-field
            v-model="usuario.horaentrada"
            label="Hora de entrada"
            type="datetime-local"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          />

          <v-text-field
            v-model="usuario.horasalida"
            label="Hora de salida"
            type="datetime-local"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          />

          <v-text-field
            v-model="usuario.placa"
            label="Placa"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          ></v-text-field>

          <v-text-field
            v-model="usuario.duenio"
            label="Dueño"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          ></v-text-field>

          <v-select
            v-model="usuario.lugar"
            label="Lugar"
            :items="lugares"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          ></v-select>

          <v-select
            v-model="usuario.tipoVehiculo"
            label="Tipo de Vehículo"
            :items="tiposVehiculo"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          ></v-select>

          <v-text-field
            v-model="usuario.color"
            label="Color del Vehículo"
            :rules="[rules.required]"
            required
            color="blue-darken-4"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="limpiar" style="background-color: white; color: #001f3f"> Limpiar </v-btn>
        <v-btn style="background-color: #003366; color: white" @click="guardarUsuario">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>

<v-card-actions class="justify-end">
  <v-btn style="background-color: #0055a5; color: white" @click="irATickets">
    Ver Tickets
  </v-btn>
</v-card-actions>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useClienteStore } from '@/stores/cliente_store'
import { useRouter } from 'vue-router'

const router = useRouter()
const irATickets = () => {
  router.push('/tickets')
}

const clienteStore = useClienteStore()
const validForm = ref(false)
const frmUsuario = ref(null)
const usuario = ref({
  placa: '',
  duenio: '',
  lugar: '',
  tipoVehiculo: '',
  color: '',
  horaentrada: '',
  horasalida: '',
})

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio',
}

const lugares = ['Seccion 1', 'Seccion 2', 'Seccion 3', 'Seccion 4']
const tiposVehiculo = ['Automóvil', 'Motocicleta', 'Camioneta', 'Otro']

// Estado del ticket
const mostrarTicket = ref(false)
const datosTicket = ref(null)

const guardarUsuario = async () => {
  if (await frmUsuario.value.validate()) {
    try {
      const { placa, duenio, lugar, tipoVehiculo, color, horaentrada, horasalida } = usuario.value
      const payload = { placa, duenio, lugar, tipoVehiculo, color, horaentrada, horasalida }
      const resp = await clienteStore.crearCliente(payload)

      // Calcular monto (ej. $10 por hora)
      const entrada = new Date(horaentrada)
      const salida = new Date(horasalida)
      const horas = Math.max((salida - entrada) / (1000 * 60 * 60), 1)
      const monto = Math.round(horas * 10)

      const fechaActual = new Date()

      datosTicket.value = {
        id: Math.floor(Math.random() * 100000), // o usar resp.id si lo devuelve tu backend
        fecha: fechaActual.toLocaleDateString(),
        hora: fechaActual.toLocaleTimeString(),
        placa: placa,
        tipoVehiculo: tipoVehiculo,
        monto: monto
      }

      mostrarTicket.value = true
      limpiar()

    } catch (error) {
      console.log(error)
    }
  }
}

// Aquí la corrección: asignar el valor inicial a usuario.value.horaentrada
const now = new Date()
usuario.value.horaentrada = now.toISOString().slice(0, 16)

const limpiar = () => {
  usuario.value = {
    placa: '',
    duenio: '',
    lugar: '',
    tipoVehiculo: '',
    color: '',
    horaentrada: '',
    horasalida: '',
  }
}
</script>
