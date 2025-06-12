import { defineStore } from 'pinia'
import { ClienteService } from '@/services'
import { OK } from '@/utilities/constantes'

export const useClienteStore = defineStore('cliente_store', {
  state: () => ({
    usuarios: [] // ← importante para guardar los registros
  }),

  getters: {},

  actions: {
    crearCliente(payload) {
      console.log('crearCliente')
      return ClienteService.instance.registrar(payload)
    },

    // 🔴 Antes: obtenerCliente
    // ✅ Cambiar a: obtenerRegistros
    obtenerRegistros() {
      return ClienteService.instance
        .obtener()
        .then((resp) => {
          this.usuarios = resp
          return resp // ← importante retornar los datos aquí
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },
  },

  persist: true,
})
