const express=require('express');
const bodyParser=require('body-parser')
const routes=require('./connection')
const app=express();
// const path = require('path');
// const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Headers','Content-Type');
next();
})
app.use(routes)
app.listen(5000, () => console.log(`Listening on ${ 5000 }`));

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
  // .listen(PORT, () => console.log(`Listening on ${ PORT }`));
