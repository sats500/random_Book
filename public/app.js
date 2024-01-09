const express=require('express');
const app=express();
const port=3000;
const Books=require('./book.js');
const bodyParser = require('body-parser');

app.get('/Books',(req,res)=>{
  res.send(Books.findAll());
});
app.get('/Books/:bookId',(req,res)=>{
 const bookId=parseInt(req.params.bookId,10);
 const boo=Books.findOne(bookId);
 if(!boo){
    res.status(404).send({
        message:"Book not foud"
    })
    return ;
 }   
 res.send(boo);         
});
app.post('/',(req,res)=>{
  res.send(`Post request`);
});
app.use(bodyParser.json());
app.post('/Books',(req,res)=>{
   //middleware->middleman between your incoming request and route
   //body-parser
   res.send(Books.create(req.body))
});
app.put('/Books/:bookId',(req,res)=>{
   const bookId=parseInt(req.params.bookId,10);
   const updatebook=Books.update(bookId,req.body);
   if(!updatebook){
      return res.status(404).send({
         message:'Book does not exists'
      });
   }
   res.send(updatebook);
});
app.delete('/Books/:bookId',(req,res)=>{
    const bookId=parseInt(req.params.bookId,10);
    const bookf=Books.findOne(bookId);
    if(!bookf){
      return res.status(404).send({
          message:'Book is not found'
      });
    }
    const destroyId=Books.destroy(bookId);
    if(destroyId!==null){
      return res.status(204)
    }
    res.status(500).send({
      message:'Could not delete the book'
    })
});
app.listen(port, ()=>{
   console.log(`Server is listening at ${port}`);
});
