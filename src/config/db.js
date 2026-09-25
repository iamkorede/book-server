import mysql from 'mysql2/promise'
import { env } from './env.js';

/* @type {mysql.Connection} */ 
export var db = undefined;

export async function createConnection(){
    if (db == null){
        db = await  mysql.createConnection({
            host: env.DB_HOST,
            user: env.DB_USER,
            database: env.DB_NAME,
        })
    
        var [[result]] = await db.query("SELECT 1")
    
        if (result['1'] != 1){
            throw new Error("DB connection error");
            
        }
    }
}
