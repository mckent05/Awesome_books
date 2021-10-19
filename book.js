const form = document.querySelector('.add_book');
const bookTitle = document.querySelector('#title');
const authorName = document.querySelector('#author');
const books = document.querySelector('.books');

class awesomeBooks {
  constructor(myBooks) {
    myBooks=[];
    this.myBooks = myBooks;
  };

  addBook(title, author) {
    this.myBooks.push({ title, author });
  };

  removeBook(index) {
    this.myBooks = this.myBooks.filter((item) => item !== this.myBooks[index]);
    return this.myBooks;
  };

  loadBook() {
    let items = this.myBooks.map((item) => `<article class="list">
    <p class="book-title">${item.title} by ${item.author}</p>
    <button class="remove-btn">Remove</button>
  </article>`);
    items = items.join('');
    books.innerHTML = items;
    const deleteBookBtn = document.querySelectorAll('.remove-btn');
    deleteBookBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.removeBook(index);
        this.loadBook();
        this.editLocalStorage(index);
        if (books.children.length === 0) {
          books.classList.remove('border')
        }
      });
    });
  };

  getLocalStorage() {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
  };

  addToLocalstorage(title, author) {
    const book = { title, author };
    const items = this.getLocalStorage();
    items.push(book);
    localStorage.setItem('books', JSON.stringify(items));
  };

  editLocalStorage(index) {
    const books = this.getLocalStorage();
    const items = books.filter((item) => item !== books[index]);
    localStorage.setItem('books', JSON.stringify(items));
  };

  backToDefault() {
    authorName.value = '';
    bookTitle.value = '';
  };
  
  loadLocalStorage() {
    this.myBooks = this.getLocalStorage();
    this.loadBook();
  };
};

let newBook = new awesomeBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  newBook.addBook(bookTitle.value, authorName.value);
  newBook.loadBook();
  newBook.addToLocalstorage(bookTitle.value, authorName.value);
  newBook.backToDefault();
  if (books.children.length > 0) {
    books.classList.add('border')
  }
});

window.addEventListener('DOMContentLoaded', () => {
  newBook.loadLocalStorage();
});



