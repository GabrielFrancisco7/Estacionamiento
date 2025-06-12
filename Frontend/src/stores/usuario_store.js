// archivo para hacer las peticiones
import { defineStore } from 'pinia'
import { UsuariosService } from '@/services'
import { crearSesion } from '@/seguridad/sesion'
import { OK } from '@/utilities/constantes'

export const useUsuarioStore = defineStore('usuario_store', {
  state: () => ({
    usuarios: [],
    logueado: false,
  }),

  getters: {
    esUsuarioLogueado: (state) => state.logueado === true,
  },

  actions: {
    login(payload) {
      return UsuariosService.instance
        .login(payload)
        .then((data) => {
          crearSesion(OK, {
            id: data.id,
          })

          this.logueado = true

          return Promise.resolve(data)
        })
        .catch((err) => {
          this.logueado = false
          return Promise.reject(err)
        })
    },

    crearUsuario(payload) {
      return UsuariosService.instance.registrar(payload)
    },

    obtenerUsuarios() {
      return UsuariosService.instance
        .obtener()
        .then((resp) => {
          this.usuarios = resp
          return Promise.resolve(OK)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },

    eliminarUsuario(id) {
      return UsuariosService.instance
      .eliminar(id)
      .then((resp) => {
        return Promise.resolve(resp)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
    },

        activarUsuario(id, activo) {
      return UsuariosService.instance
        .activar(id, activo)
        .then((resp) => {
          return Promise.resolve(resp)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },

    sucursalesUsuario(id, payload = []) {
      return UsuariosService.instance
        .sucursales(id, payload)
        .then((resp) => {
          return Promise.resolve(resp)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },
  },

  persist: true,
})
