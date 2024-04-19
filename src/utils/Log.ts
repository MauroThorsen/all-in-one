interface InterLog {
  instance: Log
  getInstance: () => Log
  queue: LogInfo[]
  log: (
    message: string,
    stack?: string[],
    payload?: Record<string, unknown>
  ) => void
  info: (
    message: string,
    stack?: string[],
    payload?: Record<string, unknown>
  ) => void
  warn: (
    message: string,
    stack?: string[],
    payload?: Record<string, unknown>
  ) => void
  error: (
    message: string,
    stack?: string[],
    payload?: Record<string, unknown>
  ) => void
  debug: (
    message: string,
    stack?: string[],
    payload?: Record<string, unknown>
  ) => void
}
type LogInfo = {
  timestamp: number
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  stack?: string[]
  payload?: Record<string, unknown>
}
export class Log implements InterLog {
  instance: Log = new Log()
  queue: LogInfo[] = []
  getInstance() {
    return this.instance
  }
  log(message: string, stack?: string[], payload?: Record<string, unknown>) {
    this.queue.push({
      timestamp: Date.now(),
      level: 'info',
      message,
      stack,
      payload
    })
  }
  info(message: string, stack?: string[], payload?: Record<string, unknown>) {
    this.queue.push({
      timestamp: Date.now(),
      level: 'info',
      message,
      stack,
      payload
    })
  }
  warn(message: string, stack?: string[], payload?: Record<string, unknown>) {
    this.queue.push({
      timestamp: Date.now(),
      level: 'warn',
      message,
      stack,
      payload
    })
  }
  error(message: string, stack?: string[], payload?: Record<string, unknown>) {
    this.queue.push({
      timestamp: Date.now(),
      level: 'error',
      message,
      stack,
      payload
    })
  }
  debug(message: string, stack?: string[], payload?: Record<string, unknown>) {
    this.queue.push({
      timestamp: Date.now(),
      level: 'debug',
      message,
      stack,
      payload
    })
  }
}

export function overrideConsole() {
  const log = new Log().getInstance()
  window.__log__ = log
  const oldConsole = console
  console.log = function (message: string, ...args: unknown[]) {
    log.log(message, [], { args })
    oldConsole.log(message, ...args)
  }
}
