
  const form = document.querySelector('.add_book');
  const bookTitle = document.querySelector('#title');
  const authorName = document.querySelector('#author');
  const books = document.querySelector('.books');

  // let awesomeBooks = [];

  class awesomeBooks {
    constructor(myBooks) {
      myBooks=[];
      this.myBooks = myBooks;
    };

    addBook(title, author) {
      const book = { title, author };
      this.myBooks.push(book);
    };

    removeBook(index){
      const remove = this.myBooks[index];
      this.myBooks = this.myBooks.filter((item) => item !== remove);
      return this.myBooks;
    }; 

    getLocalStorage() {
      return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    };

    addToLocalStorage(title, author){
      const book = { title, author };
      const items = this.getLocalStorage();
      items.push(book);
      localStorage.setItem('books', JSON.stringify(items));
    };

    editLocalStorage = (index) => {
      const books = this.getLocalStorage();
      const items = books.filter((item) => item !== books[index]);
      localStorage.setItem('books', JSON.stringify(items));
    };

    loadBook() {
      let items = this.myBooks.map((item) => `<article class="list">
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
          this.removeBook(index);
          this.loadBook();
          this.editLocalStorage(index);
        });
      });
    };

    backToDefault() {
      authorName.value = '';
      bookTitle.value = '';
    };

    loadLocalStorage(){
      this.myBooks = this.getLocalStorage();
      this.loadBook();
    };

  }  ; 




