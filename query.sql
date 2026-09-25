CREATE TABLE users (
	id int AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fullname TEXT,
    PRIMARY KEY (id)
);

ALTER TABLE users ADD COLUMN token TEXT;

CREATE TABLE books (
	id int AUTO_INCREMENT,
    book_title VARCHAR(25) NOT NULL,
    book_author VARCHAR(500) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);