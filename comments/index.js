const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const {randomBytes}=require('crypto');
const axios = require('axios');

// randombytes is just used to create some random id's

const app=express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId={};

app.get('/posts/:id/comments',(req,res)=>{

  res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments',async(req,res)=>{

  const commentId=randomBytes(4).toString('hex');
  const {content}=req.body;
  const comments= commentsByPostId[req.params.id] || [];

  comments.push({id:commentId,content});
  commentsByPostId[req.params.id]=comments;
  await axios.post('http://localhost:4005/events',{
    type:'CommentCreated',
    data:{
      id:commentId,
      content,
      postId:req.params.id
    }
  })
  res.status(201).send(comments);
    
})

app.post('/events',(req,res)=>{
  console.log("Received event",req.body.type);
  res.send({});
});

app.listen(4001,()=>{
  console.log("listeneing on 4001");
})

