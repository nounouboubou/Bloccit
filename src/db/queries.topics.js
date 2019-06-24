const Topic = require("./models").Topic;

module.exports = {


  getAllTopics(callback){
    return Topic.all()

    .then((Topic) => {
      callback(null, Topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addTopic(newTopic, callback){
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((Topic) => {
      callback(null, Topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTopic(id, callback){
    return Topic.findById(id)
    .then((Topic) => {
      callback(null, Topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteTopic(id, callback){
    return Topic.destroy({
      where: {id}
    })
    .then((Topic) => {
      callback(null, Topic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((Topic) => {
      if(!Topic){
        return callback("Topic not found");
      }

      Topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, Topic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}