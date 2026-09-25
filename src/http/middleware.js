import { db } from "../config/db.js";
import { User } from "../repo/repo.js";

export default async function authmiddleware(req, res, next) {
    let auth = req.headers["authorization"]
    if (!auth){
        return res.status(401).json({"message": "Unauthorized"})
    }
    let bufferObj = Buffer.from(auth?.split(" ")?.[1], "base64")
    const email = bufferObj.toString("utf-8")

    
    if (!email) {
        return res.status(401).json({"message": "Unauthorized"})
    }
    const user_repo = new User(db);    
    const user = await user_repo.getByEmail(email)
    if (user == null) {
        return res.status(401).json({"message": "Unauthorized"})
    }
    req.user = user
    next();
}