const express = require('express')

const router = express.Router()
const controller = require('../controller/parseExcelController')



router.get('/test',controller.test)
router.post('/api/pet',controller.getdataFromExcel)
router.get('/api/pet',controller.getAllPet)
router.get('/api/pet/:petId',controller.getPetById)
router.patch('/api/pet/:petId',controller.editSpecificPet)
router.delete('/api/pet/:petId',controller.getPetByIdAndDelete)





module.exports=router