var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    link: {
      type: String,
      required: true,
      unique: true
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
});

ArticleSchema.plugin(uniqueValidator);

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
