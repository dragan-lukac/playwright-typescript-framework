import { Book } from '../../data/Book';
import { BookRequest } from '../requests/BookRequest';
import { BaseService } from './BaseService';

export class BookService extends BaseService {
  constructor(private readonly request: BookRequest) { super(); }

  async getBooks(): Promise<Book[]> {
    return this.parse<Book[]>(await this.request.getBooks(), 200);
  }

  async getBook(id: number): Promise<Book> {
    return this.parse<Book>(await this.request.getBook(id), 200);
  }

  async createBook(data: Omit<Book, 'id'>): Promise<Book> {
    return this.parse<Book>(await this.request.createBook(data), 200);
  }

  async updateBook(id: number, data: Book): Promise<Book> {
    return this.parse<Book>(await this.request.updateBook(id, data), 200);
  }

  async deleteBook(id: number): Promise<void> {
    this.assertStatus(await this.request.deleteBook(id), 200);
  }

  async getNonExistingBook(id: number): Promise<number> {
    return (await this.request.getBook(id)).status();
  }
}
