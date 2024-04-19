import { Log } from '@/utils/Log.ts'

export {}

declare global {
  interface Window extends Window {
    __log__: Log
  }
}

declare module 'jquery'
