import {DB, AUTH} from "../config/db.js"


/**
* 
* 
*/

export function signup (req, res) {
    const { username, password, email, fullname } = req.body;

    if (!username || !password || !email || !fullname){
        return res.status(400).json({message: "error, invalid field provided"})
    }

    if (AUTH[email] != undefined) {
        return res.status(400).json({message: "error, user already exist"})
    }

    AUTH[email] = { username, password, email, fullname, token: null };
    return res.json({"message": "Welcome to patricks book server"})
}

export function login (req, res) {
    const { password, email } = req.body;

    if (!password || !email){
        return res.status(400).json({message: "error, invalid field provided"})
    }
    let user = AUTH[email];
    if (user == undefined) {
        return res.status(400).json({message: "error, user doesnt exist"})
    }

    let bufferObj = Buffer.from(email, "utf8");
    let token = bufferObj.toString("base64")

    return res.json({"message": "Welcome to patricks book server", data : { token }})
}



export function home (req, res) {
    const { authorization } = req.headers;

    console.log(authorization)
    return res.json({"message": "Welcome to patricks book server"})
}



export function upload (req, res) {
    const {book_id, book_title, book_author} = req.body;

    if (DB[book_id] != null) {
        return res.json({"message": "Book exist in libray"})
    }
    DB[book_id] = {book_title, book_author, book_id};
    return res.json({
        "message": "Book added to libray successfully",
        data: DB[book_id]
    })
}

export function getBooks (req, res) {
    const result = Object.values(DB) //.map((item) => item);
    return res.json({book: result});
}

export function getBookById (req, res) {
    const {id} = req.params
    if (DB [id] == null) {
        res.json({"message": "Book with the ID is not available in the libray"})
    }
    return res.json({book : DB[id]});
}

export function replaceBook(req, res) { // Renamed to match PUT intent
    const bookId = req.params.id;
    const replacedData = req.body;

    if (!DB[bookId]) {
        return res.status(404).json({ message: "Book not found" });
    }

   //Completely overwrite. Do NOT spread ...DB[bookId]
    DB[bookId] = { ...replacedData, book_id: bookId }; 

    res.json({
        message: "Book replaced successfully",
        data: DB[bookId]
    });
}


export function updateBook(req, res) { // Renamed to match PATCH intent
    const bookId = req.params.id;
    const updatedData = req.body;

    if (DB[bookId] == null) {
        return res.json({ message: "Book not found" });
    }

    // PATCH: Merge old data with new data
    DB[bookId] = { ...DB[bookId], ...updatedData, book_id: bookId };

    res.json({
        message: "Book updated successfully",
        data: DB[bookId]
    });
}


export function deleteBook(req, res) {
    const bookId = req.params.id
    const deletedData = req.body

    if (DB[bookId] == null) {
        return res.json({ message: "Book not found in library!!" });
    }
    delete DB[bookId];
    return res.json({ message: "Book deleted from the library successfully" });
}


