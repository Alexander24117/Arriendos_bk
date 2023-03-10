const express = require('express');

const router = express.Router();
const PuntoDeVentaService = require('./../services/puntodeventa.service');

const service = new PuntoDeVentaService();

router.get('/', async(req,res,next)=>{
  try {
    const puntosdeventa = await service.find();

    res.status(201).json(puntosdeventa);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req,res,next)=>{
  try {
    const {id}= req.params;
    const puntoDeVenta = await service.findOne(id)
    res.status(200).json(puntoDeVenta);
  } catch (error) {
    next(error);
  }
})

router.post('/', async(req,res,next)=>{
  try {
    const body = req.body;
    /*
    al momento de crear un punto de venta este
    debe estar relacionaco con un propietario(arrendador)
    */
    const newPuntoDeVenta = await service.create(body);
    res.status(201).json({
      estado:'1',
      id:newPuntoDeVenta,
      respuesta:'se agrego correctamente el punto de venta'});
  } catch (error) {
    next(error);
  }
})

router.post('/update',
  async (req, res, next) => {
    try {
      const body = req.body
      const id = body.id_punto_venta;
      console.log(body);
      const newPuntoDeVenta = await service.update(id, body);
      res.status(201).json(newPuntoDeVenta);
    } catch (error) {
      next(error);
    }
  });

router.post('/delete', async(req, res, next)=>{
  try {
    const {id} = req.body;
    const puntoDeVenta = await service.delete(id);
    res.status(201).json(puntoDeVenta);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
