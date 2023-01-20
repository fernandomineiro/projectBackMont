module.exports = (app) => {
  const person = require("../controllers/person.controller.js");

  var router = require("express").Router();

  router.post("/", person.create);

  router.get("/", person.findAll);

  router.get("/all", person.findAllPerson);

  router.get("/:id", person.findOne);

  router.put("/:id", person.update);

  router.delete("/:id", person.delete);

  router.delete("/", person.deleteAll);

  app.use("/api/person", router);
};
