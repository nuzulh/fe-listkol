import { baseUrl } from './consts'
import { ApiResponse } from './models/api'

const defaultHeader = { 'Content-Type': 'application/json' }

export default class API {
  constructor(args?: { applyAuth: boolean }) {
    this.applyAuth = args?.applyAuth || false
  }

  private applyAuth: boolean
  private applyAuthHeader = () => {
    const token = localStorage.getItem('token')
    return {
      ...defaultHeader,
      Authorization: `Bearer ${token}`
    }
  }

  public get = async <T>(path: string) => {
    const response = await fetch(baseUrl + path, {
      headers: this.applyAuth ? this.applyAuthHeader() : defaultHeader
    })
    const result = await response.json() as ApiResponse<T>

    return result
  }

  public post = async <T>(path: string, data: unknown | null) => {
    const response = await fetch(baseUrl + path, {
      method: 'POST',
      body: JSON.stringify(data || {}),
      headers: this.applyAuth ? this.applyAuthHeader() : defaultHeader
    })
    const result = await response.json() as ApiResponse<T>

    return result
  }

}
