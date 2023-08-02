const express = require("express");
const app = express();
const port = 8000;


//use express router 
app.use('/',require('./routes'));
app.set('view engine','ejs')
app.set('views', './views')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})