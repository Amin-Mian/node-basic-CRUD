var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    content: {type: String, required: true, max: 100},
    date_of_creation: {type: Date, default: Date.now},
  }
);




// Virtual for author's URL
PostSchema
.virtual('url')
.get(function () {
  return '/blog/post/' + this._id;
});

//Export model
module.exports = mongoose.model('Post', PostSchema);