import { db, createConnection } from "../config/db.js"

createConnection();

export class User{
    constructor(){
        this.db = db
    }
    async getByEmail(email){
        const [result] = await this.db.query("SELECT * from users where email = ?", [email]);

        return result?.[0];
    }

    async getById(id){
        const [result] = await this.db.query("SELECT * from users where id = ?", [id]);

        return result?.[0];
    }

    async create({username, password, email, fullname}){
        const [result] = await this.db.query("INSERT INTO users(username, password, email, fullname) values (?, ?, ?, ?)", [username, password, email, fullname]);
        return result;
    }

    async updateToken({id, token}){
        const [result] = await this.db.query("UPDATE users SET token = ?  where id = ? ", [token, id]);
        return result;
    }
}

export class Books{
    constructor(){
        this.db = db
    }
    async upload({book_title, book_author, user_id}){
        const [result] = await this.db.query("INSERT INTO books (book_title, book_author, user_id) values (?, ?, ?)", [book_title, book_author, user_id]);
        return result;
    }

    async getById(id, user_id){
        const [result] = await this.db.query("SELECT * from books where id = ? and user_id = ?", [id, user_id]);

        return result?.[0];
    }

    async getAll({ user_id }){
        const [result] = await this.db.query("SELECT * from books where  user_id = ?", [user_id]);

        return result;
    }

    async update({book_title, book_author, id,  user_id}){
        const payload = {book_title, book_author}
        // TODO check for user_id
        var fields = ""
        var values = []
        var index = 0;
        for (var key of Object.keys(payload)){
            if (payload[key] != null){
                fields += `${index != 0 ? ',' : ''} ${key} = ?`
                values.push(payload[key]);
                index++;
            }
        }

        const [result] = await this.db.query(`UPDATE books set ${fields} where id = ? user_id = ?`, [...values, id, user_id]);
        return result;


    }

    async delete({id, user_id}){
        const [result] = await this.db.query(`DELETE from books where id = ? AND user_id = ?`, [id, user_id]);
        return result;
    }
}