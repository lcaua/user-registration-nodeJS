//carregando modulos :)
const express = require('express')
const site = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const cad = require('./routes/cad')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//configurações

//Sessão
site.use(
  session({
    secret: '123456789',
    resave: true,
    saveUninitialized: true,
  })
)
site.use(flash())

//middleware
site.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

//body parser
site.use(bodyParser.urlencoded({ extended: true }))
site.use(bodyParser.json())
//handlebars
site.engine('handlebars', handlebars({ defaultLayout: 'main' }))
site.set('view engine', 'handlebars')

//Public
site.use(express.static(path.join(__dirname, 'public')))

//mongoose
mongoose.Promise = global.Promise
mongoose
  .connect('mongodb://localhost/site')
  .then(() => {
    console.log('Connect to Mongo!!')
  })
  .catch(err => {
    console.log('Deu ruim' + err)
  })

//rotas
site.get('/', (req, res) => {
  res.render('corposite')
})

site.get('/cadastro', cad)
site.post('/cad/nova', cad)

//outros
const PORT = process.env.PORT || 8081
site.listen(PORT, () => {
  console.log('Servidor Rodando!!')
})

/*site.use((req, res,next) => {
       console.log("oi eu sou um midware!")
       next()
   })*/

/*site.get("/", (req,res) => {
    res.send("hello world!!");
})

site.get("/",function(req,res){
    res.sendFile(__dirname + "/html/index.html");
});
*/
