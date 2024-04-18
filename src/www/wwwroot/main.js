import express from 'express'
import axios from 'axios'
import cors from 'cors'
import crypto from 'node:crypto'
import querystring from 'querystring'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.end()
})

app.post('/service/translate', (req, res) => {
  // 转发的目标URL
  const appKey = '310292b23f562f01'
  const key = 'xmymMQVG3ESoD5hQpu6u4FPAHmkIaltS'
  const salt = uuidv4()
  const curtime = Math.round(new Date().getTime() / 1000).toString()
  const from = 'auto'
  const to = req.body.target ?? 'zh-CHS'
  const str1 = appKey + (req.body.text.length > 20 ? `${req.body.text.substring(0, 10)}${req.body.text.length}${req.body.text.substring(req.body.text.length - 10, req.body.text.length)}` : req.body.text) + salt + curtime + key
  const sign = crypto.createHash('sha256').update(str1).digest('hex')
  const params = {
    q: req.body.text,
    appKey,
    salt: salt,
    from: from,
    to: to,
    sign: sign,
    signType: 'v3',
    curtime: curtime
  }
  const postData = querystring.stringify(params)

  axios.post('https://openapi.youdao.com/api', postData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }).then(response => {
    // 将axios返回的数据发送给客户端
    res.send(response.data)
  })
    .catch(error => {
      // 如果出现错误，发送错误信息给客户端
      res.status(500).send(error.toString())
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




