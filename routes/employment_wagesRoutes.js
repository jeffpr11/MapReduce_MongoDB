var express = require('express');
var router = express.Router();
var employment_wagesController = require('../controllers/employment_wagesController.js');

/*
 * GET
 */
router.get('/', employment_wagesController.list);

/*
 * GET
 */
router.get('/:id', employment_wagesController.show);

/*
 * POST
 */
router.post('/', employment_wagesController.create);

/*
 * PUT
 */
router.put('/:id', employment_wagesController.update);

/*
 * DELETE
 */
router.delete('/:id', employment_wagesController.remove);

module.exports = router;
