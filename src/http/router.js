import express from "express";
import * as controller from "./controller.js";
import authmiddleware from "./middleware.js";

const router = express.Router();

router.get("/", authmiddleware, controller.home);
router.post("/signup",  controller.signup);
router.post("/login", controller.login);
router.post("/books",authmiddleware, controller.upload);
router.get("/books",authmiddleware, controller.getBooks);
router.get("/books/:id",authmiddleware, controller.getBookById);
router.put("/books/:id",authmiddleware, controller.replaceBook);
router.patch("/books/:id",authmiddleware, controller.updateBook);
router.delete("/books/:id",authmiddleware, controller.deleteBook);


export default router;
