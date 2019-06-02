const Advertisements = require("./models").Advertisements;

module.exports = {

//#1
  getAllAdvertisements(callback){
    return Advertisements.all()

//#2
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisements(id, callback){
  return advertisements.findById(id)
  .then((advertisementsRoutes) => {
    callback(null, advertisements);
  })
  .catch((err) => {
    callback(err);
  })
},

  addAdvertisements(newAdvertisements, callback){
  return Advertisements.create({
    title: newAdvertisements.title,
    description: newAdvertisements.description
  })
  .then((advertisements) => {
    callback(null, advertisements);
  })
  .catch((err) => {
    callback(err);
  })
},
deleteAdvertisements(id, callback){
  return Advertisements.destroy({
    where: {id}
  })
  .then((advertisements) => {
    callback(null, advertisements);
  })
  .catch((err) => {
    callback(err);
  })
},
updateAdvertisements(id, updatedAdvertisements, callback){
  return Advertisements.findById(id)
  .then((advertisements) => {
    if(!advertisements){
      return callback("Advertisements not found");
    }

//#1
    advertisements.update(updatedAdvertisements, {
      fields: Object.keys(updatedAdvertisements)
    })
    .then(() => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    });
  });
}
}