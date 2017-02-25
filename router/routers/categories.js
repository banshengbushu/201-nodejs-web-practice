const {Router} =require('express');
const CategoriesController = require('../../controller/category-controller');

const router = Router();
const categoriesCtrl = new CategoriesController();

router.get('/', categoriesCtrl.getAll);
router.get('/:categoryId', categoriesCtrl.getOne);
router.post('/', categoriesCtrl.create);
router.put('/:categoryId', categoriesCtrl.update);
router.delete('/:categoryId', categoriesCtrl.delete);

module.exports = router;