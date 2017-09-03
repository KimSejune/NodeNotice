const express = require('express')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

const app = express()
const urlencodeParser = bodyParser.urlencoded({
  extended: false
})

const adminAuth = basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp'
})

let i = 1;

const datas = [{
  id: i,
  writing: 'hello my name is sejune',
  answer: ['first', 'second']
}]

app.use('/static', express.static('public'))

// 처음 data의 값을 가져온다.
app.get('/', (req, res) => {
  res.render('first.ejs', {datas})
})

// 선택한 게시판의 화면으로 이동
app.get('/data/:id', (req, res) => {
  const data = datas.find(d => d.id.toString() === req.params.id)
  if (data) {
    res.render('second.ejs', {
      data
    })
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})

// 게시판의 글을 추가한다.
app.post('/data', urlencodeParser, (req, res) => {
  const writing = req.body.writing
  if (writing) {
    const data = {
      id: ++i,
      writing,
    }
    datas.push(data)
    res.redirect('/')
  } else {
    res.status(400)
    res.send('400 Bad Request')
  }
})

// 게시판의 댓글을 추가한다.

app.post('/data/:id/answer', urlencodeParser, (req, res) => {
  const data = datas.find(d => d.id.toString() === req.params.id)
  if (data) {
    const answer = req.body.answer
    if (answer) {
      // 댓글중의 마지막요소에 answer을 추가한다.
      if(data.answer == undefined){
        data.answer = [answer]
        res.redirect('/data/' + `${data.id}`)
      }else {
        data.answer[data.answer.length] = answer
        res.redirect('/data/' + `${data.id}`)
      }
    } else {
      res.status(400)
      res.send('400 Bad Request')
    }
  } else {
    res.status(400)
    res.send('400 Bad Request')
  }
})

// 관리자가 글을 삭제할 곳으로 이동.
app.get('/delete', adminAuth, (req, res) => {
  res.render('third.ejs', {datas})
})


// 관리자가 글을 삭제할 수 있도록 한다. input의 type은 submit이여야한다.
app.post('/delete/:id', adminAuth, (req, res) => {
  const dataIndex = datas.findIndex(data => data.id.toString() === req.params.id)
  if(dataIndex !== -1){
    datas.splice(dataIndex, 1)
    res.redirect('/delete')
  }else {
    res.status(400)
    res.send('400 Bad Request')
  }
})

app.listen('3100', () => {
  console.log('Connect Success!!!!!!!!!!!!!!!')
})