const db = require("../models");
const Person = db.person;

exports.create = (req, res) => {
  if (!req.body.name && !req.body.cpf) {
    res
      .status(400)
      .send({ message: "Campos nome e CPF não podem ser vazios!" });
    return;
  }

  const person = new Person({
    name: req.body.name,
    cpf: req.body.cpf,
    age: req.body.age,
    city: req.body.city,
    uf: req.body.uf,
    email: req.body.email,
  });

  person
    .save(person)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo teve erro na hora da criação.",
      });
    });
};

exports.findAll = (req, res) => {
  if (!req.body.name && !req.body.cpf) {
    res
      .status(400)
      .send({ message: "Campos nome ou CPF precisa ser escrito!" });
    return;
  }

  let condition = req.body.name
    ? { name: req.body.name }
    : { cpf: req.body.cpf };

  console.log(condition);

  Person.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo teve erro na hora na busca.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Person.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Pessoa não encontrada pelo id=" + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Erro no back com o id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Não se atualiza campo vazios!",
    });
  }

  const id = req.params.id;

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não pode ser encontrado o id=${id}.!`,
        });
      } else res.send({ message: "Pessoa atualizada com sucesso." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro no back com o id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Person.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Não pode encontrar pessoa com id=${id}.`,
        });
      } else {
        res.send({
          message: "Pessoa atualizada com sucesso!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro no back para atualizar oid=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Person.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Todos as pessoas foram deletadas!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao deletar todas as pessoas",
      });
    });
};


exports.findAllPerson = (req, res) => {
  Person.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Alguma coisa deu errado",
      });
    });
};
