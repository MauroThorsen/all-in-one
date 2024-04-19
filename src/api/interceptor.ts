import axios, {
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type InternalAxiosRequestConfig
} from 'axios'
import { CustomAxiosInstance } from '@/api/http.ts'

export interface CustomConfig extends AxiosRequestConfig {
  usedEnv?: string
  isPublic?: boolean
  excludeInterceptor?: boolean
  contentType?: 'multipart/form-data'
  [key: string]: unknown
  token?: string
}

type PendingRequest = {
  cancel: (message?: string) => void
  timestamp: number
}

type PendingRequests = Record<string, PendingRequest>
export default class Interceptors {
  instance: CustomAxiosInstance

  config: InternalAxiosRequestConfig = {
    data: undefined,
    headers: {} as AxiosRequestHeaders,
    method: '',
    url: ''
  }

  pendingRequests: PendingRequests = {}

  constructor() {
    this.instance = axios.create({})
    this.init()
  }

  static getPendingKey(config: InternalAxiosRequestConfig) {
    return [
      config?.method ?? '',
      config?.url ?? '',
      JSON.stringify(config?.params ?? {}),
      JSON.stringify(config?.data ?? {})
    ].join('&')
  }

  removePending(key: string) {
    const currentTime = new Date().getTime()
    if (
      this.pendingRequests[key] &&
      currentTime - (this.pendingRequests[key]?.timestamp ?? 0) <= 1000
    ) {
      this.pendingRequests[key].cancel('取消重复请求')
      delete this.pendingRequests[key]
    }
  }

  deletePending(config: InternalAxiosRequestConfig) {
    const pendingKey = Interceptors.getPendingKey(config)
    this.removePending(pendingKey)
  }

  init() {
    this.instance.interceptors.request.use((config) => {
      this.config = config
      const pendingKey = Interceptors.getPendingKey(config)
      // this.removePending(pendingKey)

      config.cancelToken = new axios.CancelToken((cancel) => {
        this.pendingRequests[pendingKey] = {
          cancel,
          timestamp: new Date().getTime()
        }
      })
      if (config.headers) {
        Object.assign(config.headers, {
          'Content-Type': 'application/json'
        })
      }
      return config
    })
    this.instance.interceptors.response.use(
      (response) => {
        this.deletePending(response.config)
        return response.data
      },
      (err) => {
        this.deletePending(err.config)
        if (err.name === 'CanceledError') {
          throw new Error('cancel upload')
        } else {
          throw new Error(err)
        }
      }
    )
  }

  // 返回一下
  getInterceptors() {
    return this.instance
  }
}
