module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const topicRoutes = require("../routes/topics");
    const advertisementsRoutes = require("../routes/advertisements");

    app.use(staticRoutes);
    app.use(topicRoutes);
    app.use(advertisementsRoutes);

  }
}