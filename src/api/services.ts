import http from '@/api/http.ts'

export function translationService(text: string, target_lang: string) {
  return http.request({
    url: `http://127.0.0.1:3000/service/translate`,
    method: 'post',
    data: {
      text,
      target: target_lang
    }
  })
}
