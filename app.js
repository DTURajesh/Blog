const express= require("express");
const mongoose = require('mongoose');
const BlogModel= require('./models/Blog/Blogs');
const bodyParser = require('body-parser');
const methodOverride= require('method-override');


const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/BlogDB')
.then(()=> console.log("Mongoose is connected"))
.catch((err)=> console.log("Error in MongoDB",err));

app.post('/Blogs',async (req, res)=>{
     console.log(req.body);
     const {Tittle, Author, Content} = req.body;
     //const Tittle= req.body.Tittle;
     const result= await BlogModel.create({  Tittle, Author, Content});
     console.log(result);

    //  res.render('Blogs');
     res.redirect('/Blogs');
})


app.get('/Blogs',  async (req, res)=>{
    
     const result= await BlogModel.find();
     //console.log(result);
     res.render('Blogs', {result} );
})
app.get('/blogs/new', (req, res)=>{
    res.render('newBlog');
})

app.get('/', (req, res)=>{
      res.render('index');
})

app.get('/Blogs/:id', async (req, res)=>{      
     const BlogID= req.params.id;
     const blog= await BlogModel.findById({_id : BlogID});
       console.log("hello ",blog);
       res.render('OneBlog', {blog});

})
app.get('/Blogs/:id/edit', async (req, res)=>{    
     const BlogID= req.params.id;
     const blog= await BlogModel.findById({_id : BlogID});

     res.render('editBlog', {blog});
})

app.put('/blogs/:id', async (req, res)=>{
     const {Tittle, Author, Content}=req.body;
     const BlogID= req.params.id;
     const blog= await BlogModel.findById({_id : BlogID});
     
     blog.Tittle=Tittle;
     blog.Author=Author;
     blog.Content=Content;

     blog.save();
     res.redirect('/Blogs');

})

app.delete('/Blogs/:id', async (req, res)=>{
   
     const BlogID= req.params.id;
     await BlogModel.deleteOne({_id : BlogID});
     //console.log("hello from it");
     res.redirect('/Blogs');
})
const port= 3000;
app.listen(port,()=>{
   console.log(`Server is Started at ${port}`);
})

