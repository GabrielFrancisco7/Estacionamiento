<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(true) // Drawer abierto por defecto
const router = useRouter()

const navegar = (ruta) => {
  if(!ruta) return
  router.push(ruta)
}
</script>

<template>
  <v-app>
    <!-- Sidebar lateral -->
    <v-navigation-drawer app v-model="drawer" color="#f5f5f5">
      <v-list dense>
        <v-list-item @click="navegar('/registros')" link>
          <v-list-item-icon>
            <v-icon>mdi-car</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Registros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="navegar('/tickets')" link>
          <v-list-item-icon>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Ticket</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Barra superior -->
    <v-app-bar app color="black" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="text-center" style="flex: 1 1 auto">
        ESTACIONAMIENTO
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-toolbar-title.text-center {
  text-align: center;
}
</style>
