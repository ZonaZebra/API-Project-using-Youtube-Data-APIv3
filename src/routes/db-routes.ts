import express from 'express';
import DatabaseController from '../controllers/db-controller'

const router = express();
const dbController = new DatabaseController();

router.get('/findAll', dbController.get);
router.post('/addVideo', dbController.post);
router.patch('/updateVideo',dbController.patch);
router.delete('/deleteVideo',dbController.delete);

export = router;