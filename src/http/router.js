import express from "express";
import * as controller from "./controller.js";
import authmiddleware from "./middleware/auth.js";
import validatormiddleware from "./middleware/validator.js";
import * as bookDto from "./dto/books.dto.js";
import * as userDto from "./dto/user.dto.js";
import upload from "./middleware/upload.js";

const router = express.Router();

router.get("/", authmiddleware, controller.home);

router.post(
  "/signup",
  validatormiddleware(userDto.userSignupSchema),
  controller.signup,
);

router.post(
  "/login",
  validatormiddleware(userDto.userLoginSchema),
  controller.login,
);

router.get("/logout", authmiddleware, controller.logout);

router.post(
  "/books",
  authmiddleware,
  validatormiddleware(bookDto.bookUploadSchema),
  controller.upload,
);

router.get("/books", authmiddleware, controller.getBooks);

router.get("/books/:id", authmiddleware, controller.getBookById);

router.put(
  "/books/:id",
  authmiddleware,
  validatormiddleware(bookDto.bookUpdateSchema),
  controller.replaceBook,
);

router.delete("/books/:id", authmiddleware, controller.deleteBook);


router.post("/upload-db", upload.single("file"), controller.uploadDb);


export default router;
