const topicQueries = require("../db/queries.Topic.js");


module.exports = {
    index(req, res, next){
      topicQueries.getAllTopics((err, Topic) => {
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("Topic/index", {Topic});
        }
      })
      },

    new(req, res, next){
        res.render("Topic/new");
      },

    create(req, res, next){
        let newTopic = {
          title: req.body.title,
          description: req.body.description
        };
        topicQueries.addTopic(newTopic, (err, Topic) => {
          if(err){
            res.redirect(500, "/topics/new");
          } else {
            res.redirect(303, `/Topic/${Topic.id}`);
          }
        });
    },

    show(req, res, next){

      //#1
           topicQueries.getTopic(req.params.id, (err, Topic) => {
      
      //#2
             if(err || Topic == null){
               res.redirect(404, "/");
             } else {
               res.render("Topic/show", {Topic});
             }
           });
         },

    destroy(req, res, next){
        topicQueries.deleteTopic(req.params.id, (err, Topic) => {
          if(err){
          res.redirect(500, `/Topic/${Topic.id}`)
          } else {
          res.redirect(303, "/Topic")
        }
      });
    },

    edit(req, res, next){
      topicQueries.getTopic(req.params.id, (err, Topic) => {
        if(err || Topic == null){
          res.redirect(404, "/");
        } else {
          res.render("Topic/edit", {Topic});
        }
      });
    },

    update(req, res, next){

           topicQueries.updateTopic(req.params.id, req.body, (err, Topic) => {
      
             if(err || Topic == null){
               res.redirect(404, `/Topic/${req.params.id}/edit`);
             } else {
               res.redirect(`/Topic/${Topic.id}`);
             }
           });
         }

  }