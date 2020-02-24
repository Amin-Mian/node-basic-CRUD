const express = require('express')
const router = express.Router()
const Post = require('../models/post')

/* GET home page - list of posts. */
router.get('/', async (req, res, next) => {
  try{
  		const posts = await Post.find();
  		//res.json(posts);
  		res.render('index', {title: "Blog Homepage", posts: posts})
  }catch(err){
  	res.json({message: err});
  }
});

/* POST - create new post */
router.get('/post/new/',function(req,res,next){

	res.render('post_form')

	     
});

/* POST - create new post */
router.post('/post/new', async function(req,res,next){
	console.log(req.body)
	//do sanitization
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	})
	console.log('new post created')
	try{
		const savedPost = await post.save()
		//res.json(savedPost);
		res.redirect('/blog')
	}catch(err){
		res.json({message: err});
	}
	     
});
// SAME FUNCTION AS ABOVE (/post/new) BUT USING PROMISES INSTEAD OF AWAIT/ASYNC
/*router.post('/post/new', function(req,res,next){
	console.log(req.body)
	//do sanitization
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	})
	console.log('new post created')
	post.save()
	    .then(data =>{
		      res.json(data);
	     }).catch(err =>{
		      res.json({message: err});
	        })
});*/


/* GET detail of post. */
router.get('/post/:id', async (req, res, next) => {
  try{
  		const post = await Post.findById(req.params.id);
  		//res.json(post);
  		res.render('post_detail', {title: "Post Detail", post: post})
  }catch(err){
  	res.json({message: err});
  }
});



router.get('/post/:id/update', async (req, res, next) => {
	let params = { 
        title: req.body.title,
        content: req.body.content
	};

  try{
  		// or use req.body instead of params
  		const post = await Post.findById(req.params.id);

  		//res.json(post);
  		res.render('post_form', {post: post})
  }catch(err){
  	res.json({message: err});
  }
});


/* PUT - update post. */
router.post('/post/:id/update', async (req, res, next) => {
	let params = { 
        title: req.body.title,
        content: req.body.content
	};

	for(let prop in params) if(!params[prop]) delete params[prop];

  try{
  		// or use req.body instead of params
  		const post = await Post.updateOne({_id: req.params.id}, params);

  		//res.json(post);
  		res.redirect('/blog')
  }catch(err){
  	res.json({message: err});
  }
});


/* DELETE - delete  post. */
router.get('/post/:id/delete', async (req, res, next) => {
  try{
  		// or use req.body instead of params
  		const post = await Post.findById({_id: req.params.id});
  		//res.json(post);
  		res.render('post_delete', {title: "Delete Post", post: post})
  }catch(err){
  	res.json({message: err});
  }
});

/* DELETE - delete  post. */
router.post('/post/:id/delete', async (req, res, next) => {
  try{
  		// or use req.body instead of params
  		const post = await Post.remove({_id: req.params.id});
  		res.redirect('/blog')
  }catch(err){
  	res.json({message: err});
  }
});

module.exports = router;