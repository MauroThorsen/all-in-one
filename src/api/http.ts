import Interceptors, { CustomConfig } from '@/api/interceptor.ts'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface CustomAxiosInstance extends AxiosInstance {
  <R = BaseResponse, D = unknown>(config: AxiosRequestConfig<D>): Promise<R>
  <R = BaseResponse, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>
}

export type BaseResponse = {
  msg: string
  code: number
  data?: Record<string, unknown>
  rows?: Record<string, unknown>[]
  token?: string
  total?: number
}

// 请求配置
export class HttpServer {
  axios: CustomAxiosInstance

  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }

  // @Permission
  request(config: CustomConfig): Promise<BaseResponse> {
    return new Promise<BaseResponse>((resolve, reject) => {
      this.axios(config)
        .then((res: BaseResponse) => {
          resolve(res)
        })
        .catch((err: Error) => {
          if (err.message.includes('timeout of')) {
            /* empty */
          }
          // 抛出其他异常
          reject(err)
        })
    })
  }
}

const http = new HttpServer()

export default http
