import Http from '../http'

export default class ClienteService extends Http {
  static _instance

  constructor() {
    super()

    if (ClienteService._instance) {
      return ClienteService._instance
    }

    ClienteService._instance = this
  }

  static get instance() {
    return this._instance ?? (this._instance = new this())
  }
  obtener() {
    return super.get('cliente', null, true)
  }

  registrar(payload) {
    console.log('clienteservice resgistrar')
    return super.post('cliente', payload, true)
  }
}
