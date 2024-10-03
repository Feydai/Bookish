import { Book } from './Book';

export interface Group {
    members: string[];
    id: string;
    bookOfTheMonth?: Book;
}
