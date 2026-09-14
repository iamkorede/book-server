import {AUTH} from "../config/db.js";

export default function authmiddleware(req, res, next) {
    let auth = req.headers["authorization"]
    if (!auth){
        return res.status(401).json({"message": "Unauthorized"})
    }
    let bufferObj = Buffer.from(auth?.split(" ")?.[1], "base64")
    const email = bufferObj.toString("utf-8")

    if (!email) {
        return res.status(401).json({"message": "Unauthorized"})
    }
    if (AUTH[email] == null) {
        return res.status(401).json({"message": "Unauthorized"})
    }
    req.user = AUTH[email]
    next();
}