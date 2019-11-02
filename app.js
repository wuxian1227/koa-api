const Koa = require('koa')
const InitManager = require('./core/init-manager')
const bodyParser = require('koa-bodyparser')
const catchException = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa()
app.use(catchException)
app.use(bodyParser())
InitManager.initCore(app)

app.listen(3000)
