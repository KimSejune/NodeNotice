const express = require('express')
const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
// const uuidv4 = require('uuid/v4')
const app = express()


const datas = [
  {
    id: '1',
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

app.get('/', (req, res) => {
  res.render('index.ejs', {datas})
})

app.get('/data/:id', (req, res) => {
  const data = datas.find(d => d.id === req.params.id)
  if(data){
    res.render('data.ejs', {data})
  }else {
    res.status(404)
    res.send('404 Not Found')
  }
})


app.listen('3100', () => {
  console.log('NodeNotice Server Start!!!!!!!!!')
})