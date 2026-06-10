import { test as base } from '@playwright/test';
import { BookRequest } from '../api/requests/BookRequest';
import { BookService } from '../api/services/BookService';
import { Book, newBook } from '../data/Book';

type BookFixtures = {
  bookService: BookService;
  createdBook: Book;
};

export const test = base.extend<BookFixtures>({
  bookService: async ({ request }, use) => {
    await use(new BookService(new BookRequest(request)));
  },
  createdBook: async ({ bookService }, use) => {
    const book = await bookService.createBook(newBook);
    await use(book);
    try { await bookService.deleteBook(book.id); } catch {}
  },
});
