const express = require('express')
const roots = require("./roots.js")

const app = express()



app.get('/', roots.homepage())
app.get('/login', roots.login())

app.listen(3000)