const form = document.querySelector('.add_book');
const bookTitle = document.querySelector('#title');
const authorName = document.querySelector('#author');
const books = document.querySelector('.books');
const alertAdd = document.querySelector('.alert-add');
const alertRemove = document.querySelector('.alert-remove');
const links = document.querySelectorAll('.links a');
const pages = document.querySelectorAll('.page');
const time = document.querySelector('.time');
var DateTime = luxon.DateTime;

class AwesomeBooks {
  constructor(myBooks) {
    myBooks = [];
    this.myBooks = myBooks;
  }

  addBook(title, author) {
    const book = { title, author };
    this.myBooks.push(book);
  }

  removeBook(index) {
    const remove = this.myBooks[index];
    this.myBooks = this.myBooks.filter((item) => item !== remove);
    return this.myBooks;
  }

  static displayAlert(message, action) {
    if (action === 'danger') {
      alertRemove.textContent = message;
      alertRemove.classList.add(`alert-${action}`);
      setTimeout(() => {
        alertRemove.textContent = '';
        alertRemove.classList.remove(`alert-${action}`);
      }, 5000);
    } else {
      alertAdd.textContent = message;
      alertAdd.classList.add(`alert-${action}`);
      setTimeout(() => {
        alertAdd.textContent = '';
        alertAdd.classList.remove(`alert-${action}`);
      }, 5000);
    }
  }

  static getLocalStorage() {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
  }

  static addToLocalStorage(title, author) {
    const book = { title, author };
    const items = AwesomeBooks.getLocalStorage();
    items.push(book);
    localStorage.setItem('books', JSON.stringify(items));
  }

  static editLocalStorage = (index) => {
    const books = AwesomeBooks.getLocalStorage();
    const items = books.filter((item) => item !== books[index]);
    localStorage.setItem('books', JSON.stringify(items));
  }

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
        AwesomeBooks.editLocalStorage(index);
        if (books.children.length === 0) {
          books.classList.remove('border');
        }
        AwesomeBooks.displayAlert('book removed successfully', 'danger');
      });
    });
  }

  static backToDefault() {
    document.querySelector('.add_book').reset();
  }

  loadLocalStorage() {
    this.myBooks = AwesomeBooks.getLocalStorage();
    this.loadBook();
  }
}

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = e.currentTarget.getAttribute('href').slice(1);
    link.parentElement.classList.add('active');
    links.forEach((myLink) => {
      if (myLink !== link) {
        myLink.parentElement.classList.remove('active');
      }
    });
    pages.forEach((page) => {
      page.classList.remove('active');
    });
    const displaypage = document.getElementById(id);
    displaypage.classList.add('active');
  });
});

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = e.currentTarget.getAttribute('href').slice(1);
    link.parentElement.classList.add('active');
    links.forEach((myLink) => {
      if (myLink !== link) {
        myLink.parentElement.classList.remove('active');
      }
    });
    pages.forEach((page) => {
      page.classList.remove('active');
    });
    const displaypage = document.getElementById(id);
    displaypage.classList.add('active');
  });
});

const newBook = new AwesomeBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  newBook.addBook(bookTitle.value, authorName.value);
  newBook.loadBook();
  AwesomeBooks.addToLocalStorage(bookTitle.value, authorName.value);
  AwesomeBooks.backToDefault();
  if (books.children.length > 0) {
    books.classList.add('border');
  }
  AwesomeBooks.displayAlert('book added successfully', 'success');
});

window.addEventListener('DOMContentLoaded', () => {
  newBook.loadLocalStorage();
});

const dt = DateTime.now();
const today = dt.toLocaleString(DateTime.DATETIME_MED);
time.textContent = today;