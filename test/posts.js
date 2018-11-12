const chai = require('chai');

const chaiHttp = require('chai-http');

const should = chai.should();

const Post = require('../models/post');

chai.use(chaiHttp);

describe('Posts', () => {
  it('should create with valid attributes at POST /posts', done => {
    const post = {
      title: 'post title',
      url: 'https://www.google.com',
      summary: 'post summary',
    };

    Post.findOneAndRemove(post, () => {
      Post.find((err, posts) => {
        const postCount = posts.count;

        chai
          .request('localhost:3000')
          .post('/posts')
          .send(post)
          .then(res => {
            Post.find((err, posts) => {
              postCount.should.be.equal(posts.length + 1);
              res.should.have.status(200);
              return done();
            });
          })
          .catch(err => done(err));
      });
    });
  });
});
