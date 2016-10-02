import express from 'express';
import bodyParser from 'body-parser';

import actionResponse from './actionResponse';


const router = express();

// TODO: Implement CSRF handling
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/actionResponse', actionResponse);

export default router;
