// import {DB, AUTH} from "../config/db.js"
import { db } from "../config/db.js";
import { User, Books } from "../repo/repo.js";

//   const user = new User(db)
//   const books = new Books(db)




export async function signup (req, res) {
    const { username, password, email, fullname } = req.body;

    if (!username || !password || !email || !fullname){
        return res.status(400).json({message: "error, invalid field provided"})
    }

    const user_repo = new User(db);    
    const user = await user_repo.getByEmail(email)


    if (user != null) {
        return res.status(400).json({message: "error, user already exist"})
    }

    await user_repo.create({ username, password, email, fullname });
    return res.json({"message": "Welcome to patricks book server"})
}

export async function login (req, res) {
    const { password, email } = req.body;

    if (!password || !email){
        return res.status(400).json({message: "error, invalid field provided"})
    }
    const user_repo = new User(db);    
    const user = await user_repo.getByEmail(email)

    console.log(user)

    if (user == undefined) {
        return res.status(400).json({message: "error, user doesnt exist"})
    }

    if (user.password !== password) {
        return res.status(400).json({message: "error, inavlid username and password"})
    }

    let bufferObj = Buffer.from(email, "utf8");
    let token = bufferObj.toString("base64")

    await user_repo.updateToken({token: token, id: user.id})

    return res.json({"message": "Welcome to patricks book server", data : { token }})
}



export async function home (req, res) {
    const data=  {...req.user, password: undefined};
    return res.json({"message": "Welcome to patricks book server", data})
}



export async function upload (req, res) {
    const {book_title, book_author} = req.body;

    const book_repo = new Books(db);
    const result = await book_repo.upload({book_title, book_author, user_id: req.user.id});

    return res.json({
        "message": "Book added to libray successfully",
        data: result
    })
}

export async function getBooks (req, res) {
    const book_repo = new Books(db);
    const result = await book_repo.getAll(req.user.id)
    return res.json({book: result});
}

export async  function getBookById (req, res) {
    const {id} = req.params
    const book_repo = new Books(db);
    const result = await book_repo.getById(id, req.user.id)
    if (result == null) {
        res.json({"message": "Book with the ID is not available in the libray"})
    }
    return res.json({book : result});
}

export async function replaceBook(req, res) { // Renamed to match PUT intent
    const bookId = req.params.id;
    const replacedData = req.body;

    const book_repo = new Books(db);
    let result = await book_repo.getById(id, req.user.id)
    if (result == null) {
        res.json({"message": "Book not found"})
    }

    await book_repo.update({...replacedData, id: bookId, user_id: req.user.id })

    result = await book_repo.getById(id, req.user.id)

    res.json({
        message: "Book replaced successfully",
        data: result
    });
}


export async function deleteBook(req, res) {
    const bookId = req.params.id

    const book_repo = new Books(db);
    await book_repo.delete(bookId, req.user.id)
    return res.json({ message: "Book deleted from the library successfully" });
}


