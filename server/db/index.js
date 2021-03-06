var Sequelize = require('sequelize');


var database = process.env.DATABASE || 'mysql://b34e6d612ad7fa:79f05e4d@us-cdbr-iron-east-03.cleardb.net/heroku_6d939c68d418015?reconnect=true';
var dbUser = process.env.DBUSER || 'root';
var dbPass = process.env.DBPASS || "student";
var dbHost = process.env.DBHOST || 'localhost';

var db = new Sequelize(database, dbUser, dbPass, {
  host: dbHost
});


var Post = db.define('Post', {
  // used to define product or response
  isAResponse: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    //JUST FOR NOW
    defaultValue: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true
  },
  url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  provider_url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  thumbnail_width: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  thumbnail_height: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  thumbnail_url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  version: {
    type: Sequelize.STRING,
    allowNull: true
  },
  provider_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true
  },
  like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  response_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updatedAt: Sequelize.DATE
});

var User = db.define('User', {
  username: Sequelize.STRING,
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  image_url: {
    type: Sequelize.STRING(1000),
    allowNull: true,
    defaultValue: false
  },
  type : {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  post_like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  resp_like_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  picture : {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false
});

var Tag = db.define('Tag', {
  name: Sequelize.STRING,
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false
});

var Like = db.define('Like', {
  }, {
    timestamps: false
});

var Post_Tag = db.define('Post_Tag', {
  tag_name: Sequelize.STRING
  }, {
    timestamps: false
});

var Saved_Link = db.define('Saved_Link', {
  email: Sequelize.STRING,
  url: Sequelize.STRING,
  title: Sequelize.STRING
  }, {
    timestamps: false
});

User.hasMany(Post);
Post.belongsTo(User);

// set up many to many model for post and user on like
// Adds user id to post
User.belongsToMany(Post, {
    through: 'Like'
});
Post.belongsToMany(User, {
    through: 'Like'
});

// // set up many to many model for post and tag on post_tag
Post.belongsToMany(Tag, {
    through: 'Post_Tag'
});
Tag.belongsToMany(Post, {
    through: 'Post_Tag'
});

Post.hasMany(Post, {as: 'Responses', foreignKey: 'PostId'});

User.sync()
.then(function() {
  return Tag.sync();
})
.then(function() {
  return Post.sync();
})
.then(function() {
  return Like.sync();
})
.then(function() {
  return Post_Tag.sync();
})
.then(function() {
  return Saved_Link.sync();
});

exports.User = User;
exports.Tag = Tag;
exports.Post = Post;
exports.Like = Like;
exports.Post_Tag = Post_Tag;
exports.Saved_Link = Saved_Link;