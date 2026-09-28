import dotenv from "dotenv"; 
dotenv.config({quiet: true});

const $ = process.env;

export const env = {
    PORT : +($.PORT ?? '8000'),
    SERVER_NAME: $.SERVER_NAME ?? "MY SERVER",
    HOST: $.HOST ?? "localhost",

    DB_HOST: $.DB_HOST,
    DB_USER: $.DB_USER,
    DB_NAME: $.DB_NAME,
    JWT: $.JWT_SECRET_KEY
};


(function(){
    const keys =  Object.keys(env);

    for (var key of keys){
        if (env[key] == null) throw new Error("invalid  env key: " + key);
    }
})();