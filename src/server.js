import express from "express";
import router from "./http/router.js";

const app = express();
const PORT = 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router)

//GET POST PUT PATCH DELETE
//GET & DELETE -> cannot have a body
//POST PUT BATCH


app.listen(PORT, () => {
  console.log("Server is up Sir");
});
