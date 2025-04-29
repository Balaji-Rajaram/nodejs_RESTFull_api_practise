const router = require('express').Router()
const simpleApiController = require('../controllers/simpleApiController')

router.get("/",simpleApiController.simpleGet)
router.post("/",simpleApiController.simplePost)
router.put("/", simpleApiController.simplePut)
router.delete("/", simpleApiController.simpleDelete)

//  Add missing routes


module.exports = router