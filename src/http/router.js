import express from 'express'
import * as controller from './controller.js'

const router = express.Router()

router.get('/', controller.home);
router.post('/books', controller.upload);
router.get('/books', controller.getBooks);
router.get('/books/:id', controller.getBookById);
router.put('/books/:id', controller.replaceBook); // PUT = Replace
router.patch('/books/:id', controller.updateBook); // PATCH = Update


export default router;