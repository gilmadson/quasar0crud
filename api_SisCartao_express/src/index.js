const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const cors = require('cors')

const port = 3000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is runnig at localhost:${port}`)
})
