const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
module.exports = { User, Post, Comment };

//user has many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//post has one user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//user has many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//comment has one user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//post has many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

//comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
