import { Book } from '../../data/Book';
import { BaseRequest } from './BaseRequest';

const BASE = '/api/v1/Books';

export class BookRequest extends BaseRequest {
  getBooks()                         { return this.get(BASE); }
  getBook(id: number)                { return this.get(`${BASE}/${id}`); }
  createBook(data: Omit<Book, 'id'>) { return this.post(BASE, data); }
  updateBook(id: number, data: Book) { return this.put(`${BASE}/${id}`, data); }
  deleteBook(id: number)             { return this.delete(`${BASE}/${id}`); }
}
