const express = require('express');

const router = express.Router();

const ContratoConceptoService = require('../services/contratoConcepto.service')

const service = new ContratoConceptoService()

router.get('/', async(req,res,next)=>{
    try {
      const contrato = await service.find();
      res.json(contrato);
    } catch (error) {
      next(error)
    }
  })

module.exports = router;