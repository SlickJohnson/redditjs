const Post = require('../models/post');

module.exports = app => {
  // INDEX
  app.get('/', (req, res) => {
    Post.find({})
      .then(posts => res.render('posts-index', { posts }))
      .catch(err => console.log(err.message));
  });

  // CREATE
  app.post('/posts/new', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => res.redirect(`/`));
  });

  // SHOW
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.render('posts-show', { post }))
      .catch(err => console.log(err.message));
  });
};
