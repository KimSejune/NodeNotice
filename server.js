const express = require('express')
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const app = express()


const datas = [
  {
    id: uuidv4(),
    writing: 'my name is sejune kim'
  }
]

const authMiddleware = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})

const bodyParserMiddleWare = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')


app.use('/static', express.static('public'))

// 초기값 읽어오기
app.get('/', (req, res) => {
  res.render('index.ejs', {datas})
})

// 게시판 댓글달기 페이지 이동
app.get('/data/:id', (req, res) => {
  const data = datas.find(d => d.id === req.params.id)
  if(data){
    res.render('data.ejs', {data})
  }else {
    res.status(404)
    res.send('404 Not Found')
  }
})

// 게시판 추가
app.post('/data', bodyParserMiddleWare, (req,res) => {
  const writing = req.body.writing

  if(writing){
    const data = {
      id: uuidv4(),
      writing
    }
    datas.push(data)
    res.redirect('/')
  }else {
    res.status(400)
    res.send('400 Bad Requset')
  }
})

app.listen('3100', () => {
  console.log('NodeNotice Server Start!!!!!!!!!')
})