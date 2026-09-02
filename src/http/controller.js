import DB from "../config/db.js"
import express from "express"

/**
* 
* 
*/
export function home (req, res) {
    return res.json({"message": "Welcome to my book server"})
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
        res.json({"message": "Book with the ID is not available"})
    }
    return res.json({book : DB[id]});
}

export function updateBook(req, res) {
    const bookId = req.params.id;
    const updatedData = req.body;

    if (DB[bookId] == null) {
        return res.json({message: "Book with the ID not available"})
    }

    DB[bookId] = {...DB[bookId], ...updatedData, book_id: bookId}

    res.json({
        message: "Book updated succesfully",
        data: DB[bookId]
    })
}