<template>
  <div>
    <h1>Usuarios Registrados</h1>
    <ul v-if="usuarios.length">
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.usuario }} - {{ usuario.correo }}
      </li>
    </ul>
    <p v-else>No hay usuarios registrados.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const usuarios = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:9090/usuario')
    console.log('Usuarios recibidos:', response.data) // 👈 Verifica en consola
    usuarios.value = response.data
  } catch (error) {
    console.error('Error al cargar los usuarios:', error)
  }
})
</script>
