import express from 'express';
const router = express.Router();
import ContactController from '../controllers/ContactController';
import verifyTokenAvailable from '../middleware/tokenAvailable';
import verifyRole from '../middleware/verifyRole';
import validateRequest from '../middleware/validateRequest';
import {Roles} from '../helpers/roles';

router.post('/', ContactController.create);
router.get('/', verifyTokenAvailable, verifyRole(Roles.User, Roles.Admin), ContactController.getAll);
router.get('/:id', verifyTokenAvailable, verifyRole(Roles.User, Roles.Admin), ContactController.getById);
router.patch('/:id', verifyTokenAvailable, verifyRole(Roles.User, Roles.Admin), ContactController.updateById);
router.delete('/:id', ContactController.deleteById);
router.get('/search', verifyTokenAvailable, verifyRole(Roles.User, Roles.Admin), ContactController.search)

export default router;