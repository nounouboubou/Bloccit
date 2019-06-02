const advertisementsQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){
    //#2
    advertisementsQueries.getAllAdvertisements((err, advertisements) => {

      //#3
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("advertisements/index", {advertisements});
      }
    })
  },

  new(req, res, next){
    res.render("advertisements/new");
  },

  create(req, res, next){
    let newAdvertisements = {
      title: req.body.title,
      description: req.body.description
    };
    advertisementsQueries.addAdvertisements(newAdvertisements, (err, advertisements) => {
      if(err){
        res.redirect(500, "/advertisements/new");
      } else {
        res.redirect(303, `/advertisements/${advertisements.id}`);
      }
    });
  },

  show(req, res, next){

//#1
  advertisementsQueries.getAdvertisements(req.params.id, (err, advertisements) => {

//#2
    if(err || advertisements == null){
      res.redirect(404, "/");
    } else {
      res.render("advertisements/show", {advertisements});
    }
  });
},
destroy(req, res, next){
  advertisementsQueries.deleteAdvertisements(req.params.id, (err, advertisements) => {
    if(err){
      res.redirect(500, `/advertisements/${advertisements.id}`)
    } else {
      res.redirect(303, "/advertisements")
    }
  });
},
edit(req, res, next){
  advertisementsQueries.getAdvertisements(req.params.id, (err, advertisements) => {
    if(err || advertisements == null){
      res.redirect(404, "/");
    } else {
      res.render("advertisements/edit", {advertisements});
    }
  });
},
update(req, res, next){

//#1
  advertisementsQueries.updateAdvertisements(req.params.id, req.body, (err, advertisements) => {

//#2
    if(err || advertisements == null){
      res.redirect(404, `/advertisements/${req.params.id}/edit`);
    } else {
      res.redirect(`/advertisements/${advertisements.id}`);
    }
  });
}
}