import { test, expect } from '../../fixtures/apiFixtures';
import { Book } from '../../data/apiTypes';

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
    const payload: Omit<Book, 'id'> = {
      title: 'Test Book',
      description: 'A test book description',
      pageCount: 100,
      excerpt: 'Test excerpt',
      publishDate: '2025-01-01T00:00:00.000Z',
    };

    const response = await bookClient.createBook(payload);

    expect(response.status()).toBe(200);
    const body: Book = await response.json();
    expect(body).toMatchObject({
      id: expect.any(Number),
      title: payload.title,
      pageCount: payload.pageCount,
    });
  });

  test('PUT /books/:id updates a book', async ({ bookClient }) => {
    const updated: Book = {
      id: 1,
      title: 'Updated Book',
      description: 'Updated description',
      pageCount: 250,
      excerpt: 'Updated excerpt',
      publishDate: '2025-06-01T00:00:00.000Z',
    };

    const response = await bookClient.updateBook(1, updated);

    expect(response.status()).toBe(200);
    const body: Book = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: 'Updated Book',
      pageCount: 250,
    });
  });

  test('DELETE /books/:id returns 200', async ({ bookClient }) => {
    const response = await bookClient.deleteBook(1);

    expect(response.status()).toBe(200);
  });
});
