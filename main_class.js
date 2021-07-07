// Book Div and Template const
// eslint-disable-next-line max-classes-per-file
const temp = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.library = [];
    this.startLibrary();
  }

  startLibrary() {
    this.reloadLibrary();
    this.idBook = this.library.length;
  }

  addBook() {
    const title = inputTitle.value;
    const author = inputAuthor.value;
    this.idBook += 1;

    const book = new Book(this.idBook, title, author);
    this.library.push(book);

    localStorage.library = JSON.stringify(this.library);

    this.reloadLibrary();

    inputTitle.value = '';
    inputAuthor.value = '';
  }

  displayBook(book) {
    this.clon = temp.content.cloneNode(true);
    this.clon.querySelectorAll('p')[0].innerHTML = book.title;
    this.clon.querySelectorAll('p')[1].innerHTML = book.author;

    this.clon.querySelector('button').addEventListener('click', () => { this.deleteBook(book.id); });

    bookshelf.appendChild(this.clon);
  }

  deleteBook(id) {
    this.library = this.library.filter((book) => book.id !== id);

    localStorage.library = JSON.stringify(this.library);

    this.reloadLibrary();
  }

  reloadLibrary() {
    if (localStorage.getItem('library') !== null) {
      this.library = (JSON.parse(localStorage.library));
    }

    bookshelf.innerHTML = '';
    bookshelf.appendChild(temp);

    for (let i = 0; i < this.library.length; i += 1) {
      this.displayBook(this.library[i]);
    }
  }
}

const library = new Library();

document.querySelector('#add-book').addEventListener('click', () => { library.addBook(); });
