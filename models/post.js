const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: [{ type: String, required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

PostSchema.pre('save', next => {
  // Set createdAt and updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model('Post', PostSchema);
