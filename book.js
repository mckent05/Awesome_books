let awesomeBooks = [];
const form = document.querySelector('.add_book');
const bookTitle = document.querySelector('#title');
const authorName = document.querySelector('#author');
const books= document.querySelector('.books')

let addBook = (title, author) => {
    let book = {title, author}
    awesomeBooks.push(book)
}

const removeBook = (index) => {
    let remove = awesomeBooks[index]
    awesomeBooks = awesomeBooks.filter((item) => {
        if(item !== remove) {
            return item
        }
    })
    return awesomeBooks
}




