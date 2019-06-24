module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const TopicRoutes = require("../routes/Topic");
    const advertisementsRoutes = require("../routes/advertisements");

    app.use(staticRoutes);
    app.use(TopicRoutes);
    app.use(advertisementsRoutes);

  }
}