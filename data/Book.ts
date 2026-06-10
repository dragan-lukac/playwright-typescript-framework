export interface Book {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
}

export const newBook: Omit<Book, 'id'> = {
  title: 'Test Book',
  description: 'A test book description',
  pageCount: 100,
  excerpt: 'Test excerpt',
  publishDate: '2025-01-01T00:00:00.000Z',
};

export const updatedBook: Book = {
  id: 1,
  title: 'Updated Book',
  description: 'Updated description',
  pageCount: 250,
  excerpt: 'Updated excerpt',
  publishDate: '2025-06-01T00:00:00.000Z',
};
