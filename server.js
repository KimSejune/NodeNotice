const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const urlencodeParser = bodyParser.urlencoded({extended: false})

let i = 1;

const datas = [
  {
    id : i,
    writing : 'hello my name is sejune',
    answer : ['first', 'second']
  }
]

app.use('/static', express.static('public'))

// 처음 data의 값을 가져온다.
app.get('/', (req,res) => {
  res.render('first.ejs', {datas})
})

// 선택한 게시판의 화면으로 이동
app.get('/data/:id', (req, res) => {
  const data = datas.find(d => d.id.toString() === req.params.id)
  if(data){
    res.render('second.ejs', {data})  
  }else {
    res.status(404)
    res.send('404 Not Found')
  }
})

// 게시판의 글을 추가한다.
app.post('/data', urlencodeParser, (req, res) => {
  const writing = req.body.writing
  if(writing){
    const data = {
      id : ++i,
      writing,
    }
    datas.push(data)
    res.redirect('/')
  }else {
    res.status(400)
    res.send('400 Bad Request')
  }
})




app.listen('3100', () => {
  console.log('Connect Success!!!!!!!!!!!!!!!')
})