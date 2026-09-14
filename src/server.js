import express from "express";
import router from "./http/router.js";

const app = express();
const PORT = 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", router)

app.use("/:all", (_res) => res.status(404).send("Not found"))
app.use((err, req, res, next) => {
  if(!!err) {
    return res.status(500).send(err.message)
  }
  next()
})


app.listen(PORT, () => {
  console.log("Server is up Sir");
});
