<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center" class="login-row">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card" elevation="12" rounded>
          <v-toolbar color="#4CAF50" dark flat>
            <v-toolbar-title>Iniciar sesión</v-toolbar-title>
          </v-toolbar>

          <v-card-text v-if="mensajeVisible">
            <v-alert :icon="icono" :text="mensaje" title="Respuesta" :type="tipo"> </v-alert>
          </v-card-text>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="usuario"
                label="Usuario"
                :rules="[rules.required]"
                required
                prepend-icon="mdi-account-circle"
                color="#4CAF50"
                dense
                outlined
                class="input-field"
              />
              <v-text-field
                v-model="contrasenia"
                label="Contraseña"
                type="password"
                :rules="[rules.required]"
                required
                prepend-icon="mdi-lock"
                color="#4CAF50"
                dense
                outlined
                class="input-field"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="actions-container">
            <v-spacer />
            <v-btn color="#4CAF50" dark :disabled="!valid" @click="login" class="login-button">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useUsuarioStore } from '@/stores/usuario_store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const usuarioStore = useUsuarioStore()
const router = useRouter()

const usuario = ref('')
const contrasenia = ref('')
const valid = ref(false)
const mensaje = ref('')
const tipo = ref('')
const mensajeVisible = ref(false)
const icono = ref('')

const rules = {
  required: (value) => !!value || 'Campo requerido.',
}

const login = async () => {
  mensajeVisible.value = false
  if (valid.value) {
    try {
      const payload = { usuario: usuario.value, contrasenia: contrasenia.value }
      const resp = await usuarioStore.login(payload)
      console.log(resp)
      mensaje.value = resp.mensaje
      tipo.value = 'success'
      icono.value = 'success'

      // ✅ Redirección automática a la vista de usuarios
      router.push('/usuarios')
    } catch (error) {
      mensaje.value = error.mensaje
      tipo.value = 'error'
      icono.value = 'error'
    } finally {
      mensajeVisible.value = true
    }
  }
}
</script>

<style scoped>
.login-row {
  min-height: 100vh;
  background: linear-gradient(135deg, #283593, #5c6bc0);
}

.login-card {
  background-color: #e8eaf6;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.input-field {
  margin-bottom: 1rem;
}

.actions-container {
  padding-right: 1rem;
}

.login-button {
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.6);
  transition: background-color 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background-color: #0d1549 !important;
}
</style>
