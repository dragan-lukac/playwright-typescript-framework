import { APIRequestContext } from '@playwright/test';
import { Book } from '../data/apiTypes';

export class BookClient {
  constructor(private readonly request: APIRequestContext) {}

  async getBooks() {
    return this.request.get('/api/v1/Books');
  }

  async getBook(id: number) {
    return this.request.get(`/api/v1/Books/${id}`);
  }

  async createBook(data: Omit<Book, 'id'>) {
    return this.request.post('/api/v1/Books', { data });
  }

  async updateBook(id: number, data: Book) {
    return this.request.put(`/api/v1/Books/${id}`, { data });
  }

  async deleteBook(id: number) {
    return this.request.delete(`/api/v1/Books/${id}`);
  }
}
