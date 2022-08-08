import * as THREE from 'three';

import {
  addBtn,
  addLink,
  authorInput,
  booksContainer,
  booksList,
  contactLink,
  contactSection,
  listLink,
  newBook,
  titleInput,
  year,
} from './modules/elements.js';
import BooksClass from './modules/book.js';

// import Book from './modules/bookClass.js';
const books = new BooksClass();
export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  // Method to load newly added books
  static loadBook(index) {
    booksContainer.innerHTML += `<div class="book-card">
        <div class="book-title"><strong>"${books[index].title}"</strong>&nbsp;by</div>
        <div class="book-author">${books[index].author}</div>
        <button class="card-remove-button" >Remove</button>
        </div>`;

    const removeBtn = document.querySelectorAll('.card-remove-button');
    removeBtn.forEach((button, index) =>
      button.addEventListener('click', () => {
        Book.removeCard(index);
      })
    );
  }

  // A Method to remove current object from the array
  static removeCard(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    Book.reloadBooks();
  }

  // A Method to reload the books cards
  static reloadBooks() {
    booksContainer.innerHTML = '';
    for (let index = 0; index < books.length; index += 1) {
      booksContainer.innerHTML += `<div class="book-card">
        <div class="book-title"><strong>"${books[index].title}"</strong>&nbsp;by</div>
        <div class="book-author">${books[index].author}</div>
        <button class="card-remove-button">Remove</button>
        </div>`;

      const removeBtn = document.querySelectorAll('.card-remove-button');
      removeBtn.forEach((button, index) =>
        button.addEventListener('click', () => {
          Book.removeCard(index);
        })
      );
    }
  }
}

const storedBooks = JSON.parse(localStorage.getItem('books'));
if (storedBooks) {
  books.push(...storedBooks);
  Book.reloadBooks();
}

addBtn.addEventListener('click', () => {
  const newBook = new Book(titleInput.value, authorInput.value);
  books.push(newBook);
  Book.loadBook(books.length - 1);
  localStorage.setItem('books', JSON.stringify(books));
});

const dateTime = new Date(Date.now());
year.textContent = dateTime.toUTCString();

listLink.addEventListener('click', () => {
  booksList.style.display = 'block';
  listLink.style.color = 'blue';
  newBook.style.display = 'none';
  contactSection.style.display = 'none';
  addLink.style.color = 'black';
  contactLink.style.color = 'black';
});

addLink.addEventListener('click', () => {
  booksList.style.display = 'none';
  addLink.style.color = 'blue';
  newBook.style.display = 'flex';
  listLink.style.color = 'black';
  contactSection.style.display = 'none';
  contactLink.style.color = 'black';
});

contactLink.addEventListener('click', () => {
  booksList.style.display = 'none';
  contactLink.style.color = 'blue';
  newBook.style.display = 'none';
  contactSection.style.display = 'block';
  addLink.style.color = 'black';
  listLink.style.color = 'black';
});
