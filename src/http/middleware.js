import { json } from "body-parser";
import { db } from "../config/db.js";
import { User } from "../repo/repo.js";

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

export default async function authmiddleware(req, res, next) {
    let auth = req.headers["authorization"]
    if (!auth){
        return res.status(401).json({"message": "Unauthorized"})
    }

    const auth_value = auth.split(' ')?.[1]
    if (auth_value == null) return res.status(401).json({"message": "Unauthorized"});

    console.log({ auth_value })

    const claim = jwt.verify(auth_value, env.JWT);

    console.log({ claim })
    const email = claim?.email;

    
    if (!email) {
        return res.status(401).json({"message": "Unauthorized"})
    }
    const user_repo = new User(db);    
    const user = await user_repo.getByEmail(email)
    if (user == null) {
        return res.status(401).json({"message": "Unauthorized"})
    }

    if(user.token != auth_value){
        return res.status(401).json({"message": "Unauthorized"})
    }
    req.user = user
    next();
}