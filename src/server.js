import express from "express";
import router from "./http/router.js";
import { env } from "./config/env.js";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { jsonMorganLogger } from "./http/middleware/log.js";

import { createConnection } from "./config/db.js";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const limiter = rateLimit({
    windowMs: 10 * 1000,
    limit: 2,
    message: "you have exceeded the allowed number of request"
});

async function main(){
  await createConnection();
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(jsonMorganLogger)
  // app.use(jsonLogger);
  app.use(limiter);


  
  
  app.use("/api/v1", router)
  
  app.use("/:all", (_res) => res.status(404).send("Not found"))
  app.use((err, req, res, next) => {
    if(!!err) {
      return res.status(500).send(err.message)
    }
    next()
  })
  
  
  app.listen(env.PORT, env.HOST , () => {
    console.log(`${env.SERVER_NAME} SERVER is up at port ${env.PORT} sir`);
  });
}
  
main()