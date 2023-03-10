const express = require('express');

const router = express.Router();
const UsuarioService = require('./../services/usuario.service');
const autJwt = require('../middlewares/veriLogJwt');
const errorHandler = require('../middlewares/error.handler');
const service = new UsuarioService();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin", "Content-Type", "Accept"
  );
  next();
});

router.get('/', async (req, res, next) => {

  try {

    if (autJwt.verifyToken(req, res) == 200) {
      let isAdmin = await autJwt.isAdmin(req, res)
      if (isAdmin.statusCode == 200) {
        res.status(200).json(await service.find());
      }

    }
  } catch (error) {
    errorHandler.errorHandler(error, req, res, next)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await service.findOne(id);
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

router.post('/update',
  async (req, res, next) => {
    try {
      const body = req.body
      const id = body.id_usuario;
      console.log(body);
      const newCategory = await service.update(id, body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

router.post('/delete',
  async (req, res, next) => {
    try {
      const id = req.body.id;
      const newCategory = await service.delete(id);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;



