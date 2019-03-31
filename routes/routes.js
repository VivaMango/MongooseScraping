var express = require("express")
var router = express.Router();
var db = require("../models");
var axios = require("axios")
var cheerio = require("cheerio")

router.get("/" , function(req , res) {
    res.render("index")
})


router.get("/articles", function(req, res) {
   console.log(req , "article req")
    db.Article.find({})
      .then(function(dbArticle) {
        console.log(dbArticle, "dbArticle find")
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
});

router.get("/articles/:id", function(req, res) {
    console.log(req , "article req")
     db.Article.findById(req.params.id , function(err , article) {
        if (err) throw err; 
        console.log(article)
        res.json(article)
     })
 });

router.post("/articles/:id" , function(req, res) {
    console.log(req , "post note req")
    db.Comment.create(req.body).then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true })
    }).then(function(dbUpdate) {
        res.json(dbUpdate)
    }).catch(function(err) {
        res.json(err)
    })
})

router.get("/comments/:id" , function(req, res) {
    console.log(req , "get note req")
    db.Comment.findById(req.params.id , function(err, comment) {
        if (err) throw err;
        res.json(comment)
    })
})

router.get("/scrape", function(req, res) {
    axios.get("https://na.leagueoflegends.com/en/news/").then(function(response) {
        // console.log(response.data , "axios response data")
      var $ = cheerio.load(response.data);

      $("h4").each(function(i, element) {
        var result = {};
        console.log($(this).children("a")[0].attribs.href)
        var linkRef = $(this).children("a")[0].attribs.href
        var linkTitle = $(this).children("a").text()
        console.log(linkRef)
  
        result.title = linkTitle
        result.link = `https://na.leagueoflegends.com${linkRef}`
        console.log(result)
  
        db.Article.create(result).then(function(dbArticle) {
            console.log(dbArticle);
          }).catch(function(err) {
            console.log(err);
          });
      });
      res.send("Scrape Complete");
    });
  });

module.exports = router;