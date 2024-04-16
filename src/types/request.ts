export type BaseRequest<T> = {
  usedEnv?: string
  url: string
  data?: T
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'head'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PUT'
  isPublic?: boolean
  ignoreError?: boolean
  excludeInterceptor?: boolean
  cache?: number
}
