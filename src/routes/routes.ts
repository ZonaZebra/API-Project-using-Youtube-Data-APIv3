import express from 'express';
import basic_controller from '../controllers/health_check';
import youtube_controller from '../controllers/youtube';
import db from 'db';

const router = express();

router.get('/ping', basic_controller.health_check);
router.get('/youtube', youtube_controller.queryYoutubeAPI);

export = router;
