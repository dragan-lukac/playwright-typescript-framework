import { test, expect } from '../../fixtures/baseApiFixtures';
import { Book, newBook, updatedBook } from '../../data/Book';

test.describe('Books API', () => {
  test('GET /books returns a non-empty list', async ({ bookService }) => {
    const books: Book[] = await bookService.getBooks();
    expect(Array.isArray(books)).toBe(true);
    expect(books.length).toBeGreaterThan(0);
  });

  test('GET /books/:id returns correct shape', async ({ bookService }) => {
    const book: Book = await bookService.getBook(1);
    expect(book).toMatchObject({
      id: 1,
      title: expect.any(String),
      description: expect.any(String),
      pageCount: expect.any(Number),
      excerpt: expect.any(String),
      publishDate: expect.any(String),
    });
  });

  test('POST /books creates a new book', async ({ bookService }) => {
    const book: Book = await bookService.createBook(newBook);
    expect(book).toMatchObject({
      id: expect.any(Number),
      title: newBook.title,
      pageCount: newBook.pageCount,
    });
  });

  test('PUT /books/:id updates a book', async ({ bookService, createdBook }) => {
    const book: Book = await bookService.updateBook(createdBook.id, { ...updatedBook, id: createdBook.id });
    expect(book).toMatchObject({
      id: createdBook.id,
      title: updatedBook.title,
      pageCount: updatedBook.pageCount,
    });
  });

  test('DELETE /books/:id deletes successfully', async ({ bookService, createdBook }) => {
    await bookService.deleteBook(createdBook.id);
  });
});
