let awesomeBooks = [];
const form = document.querySelector('.add_book');
const bookTitle = document.querySelector('#title');
const authorName = document.querySelector('#author');
const books = document.querySelector('.books');

const addBook = (title, author) => {
  const book = { title, author };
  awesomeBooks.push(book);
};

const removeBook = (index) => {
  const remove = awesomeBooks[index];
  awesomeBooks = awesomeBooks.filter( item => {
    if (item !== remove) {
      return item;
    }
  });
  return awesomeBooks;
};

const getLocalstorage = () => localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];

const addToLocalStorage = (title, author) => {
  const book = { title, author };
  const items = getLocalstorage();
  items.push(book);
  localStorage.setItem('books', JSON.stringify(items));
};

const editLocalStorage = (index) => {
  const books = getLocalstorage();
  const items = books.filter(item => {
    if (item !== books[index]) {
      return item;
    }
  });
  localStorage.setItem('books', JSON.stringify(items));
};

function loadBook(obj) {
  let items = obj.map(item => `<article class="list">
    <p class="book-title">${item.title}</p>
    <p class="author-author">${item.author}</p>
    <button class="remove-btn">Remove</button>
    <hr>
  </article>`);
  items = items.join('');
  books.innerHTML = items;
  const deleteBookBtn = document.querySelectorAll('.remove-btn');
  deleteBookBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      loadBook(removeBook(index));
      editLocalStorage(index);
    });
  });

}
let backToDefault = () => {
  authorName.value = '';
  bookTitle.value = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook(bookTitle.value, authorName.value);
  addToLocalStorage(bookTitle.value, authorName.value);
  loadBook(awesomeBooks);
  backToDefault();
});

window.addEventListener('DOMContentLoaded', () => {
  let items = getLocalstorage();
  awesomeBooks = items;
  loadBook(awesomeBooks);
});
