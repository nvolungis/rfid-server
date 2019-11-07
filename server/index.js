const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/card', (req, res) => {
  console.log('got a post')
  console.log(req);

  res.send('ok');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
