const db = require("../models");
const Tasks = db.task;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "El contenido no puede ser vacio"
    });
    return;
  }

  const task = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Tasks.create(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hubo un error al crear la tarea"
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tasks.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hubo un error al obtener las tareas"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tasks.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener la tarea con el id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tasks.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La tarea se ha publicado exitosamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar la tarea con el id=${id}. Probablemente la tarea no fue encontrada o req.body esta vacio`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede actualizar la tarea con el id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tasks.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La tarea se ha borrado existosamente"
        });
      } else {
        res.send({
          message: `No se pudo borrar la tarea con el id=${id}. Probablemente la tarea no se encontro`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la tarea con el id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Tasks.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todas las tareas han sido eliminadas` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error eliminando las tareas"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Tasks.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hubo un error al obtener todas las tareas"
      });
    });
};
