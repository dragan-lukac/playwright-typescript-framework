import { test, expect } from '../../fixtures/apiFixtures';
import { Book, newBook, updatedBook } from '../../data/Book';

test.describe('Books API', () => {
  test('GET /books returns a non-empty list', async ({ bookClient }) => {
    const response = await bookClient.getBooks();

    expect(response.status()).toBe(200);
    const body: Book[] = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /books/:id returns correct shape', async ({ bookClient }) => {
    const response = await bookClient.getBook(1);

    expect(response.status()).toBe(200);
    const body: Book = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: expect.any(String),
      description: expect.any(String),
      pageCount: expect.any(Number),
      excerpt: expect.any(String),
      publishDate: expect.any(String),
    });
  });

  test('POST /books creates a new book', async ({ bookClient }) => {
    const response = await bookClient.createBook(newBook);

    expect(response.status()).toBe(200);
    const body: Book = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      title: newBook.title,
      pageCount: newBook.pageCount,
    });
  });

  test('PUT /books/:id updates a book', async ({ bookClient }) => {
    const response = await bookClient.updateBook(updatedBook.id, updatedBook);

    expect(response.status()).toBe(200);
    const body: Book = await response.json();
    expect(body).toMatchObject({
      id: updatedBook.id,
      title: updatedBook.title,
      pageCount: updatedBook.pageCount,
    });
  });

  test('DELETE /books/:id returns 200', async ({ bookClient }) => {
    const response = await bookClient.deleteBook(1);

    expect(response.status()).toBe(200);
  });
});
