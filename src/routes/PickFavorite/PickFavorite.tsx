import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './../../components/BookCard';
import { Book } from './../../types/Book';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json';
import type { Schema } from './../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

interface PickFavoriteProps {}

const PickFavorite = ({}: PickFavoriteProps) => {
    const [bookSelection, setBookSelection] = useState<Book[]>([]);
    Amplify.configure(outputs);
    const client = generateClient<Schema>();

    const googleBooksOfTheMonth: Book[] = [
        {
            id: '1',
            title: 'To Kill a Mockingbird',
            authors: ['Harper Lee'],
            publishedDate: '1960',
            description:
                'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
            categories: ['Fiction', 'Historical'],
            averageRating: 4.8,
            pageCount: 324,
            language: 'en',
        },
        {
            id: '2',
            title: '1984',
            authors: ['George Orwell'],
            publishedDate: '1949',
            description:
                'A dystopian novel set in a totalitarian regime where surveillance and control is omnipresent.',
            categories: ['Fiction', 'Dystopian'],
            averageRating: 4.6,
            pageCount: 328,
            language: 'en',
        },
        {
            id: '3',
            title: 'The Great Gatsby',
            authors: ['F. Scott Fitzgerald'],
            publishedDate: '1925',
            description:
                "A novel set in the Roaring Twenties, it tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
            categories: ['Fiction', 'Classics'],
            averageRating: 4.2,
            pageCount: 180,
            language: 'en',
        },
    ];

    // Get 3 random books from API here and set it to books of the month if
    // no books for current month
    const getData = async () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        try {
            const { data, errors } = await client.models.BookOfTheMonth.list({
                filter: {
                    year: {
                        eq: year,
                    },
                    month: {
                        eq: month,
                    },
                },
            });

            if (errors) {
                console.error('Error fetching books of the month', errors);
                return [];
            }
            const books = data as unknown;
            return books ? (books as Book[]) : [];
        } catch (err) {
            console.error('Error fetching books of the month', err);
            return [];
        }
    };

    useEffect(() => {
        (async () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const booksOfTheMonth: Book[] = await getData();

            if (booksOfTheMonth?.length === 0) {
                // Get 3 random books from API here and set it to books of the month if
                // no books for current month
                let books: Book[] = [];
                googleBooksOfTheMonth.forEach(async (book) => {
                    const { data: group } = await client.models.Group.create({
                        members: [],
                    });
                    if (group) {
                        const { data } =
                            await client.models.BookOfTheMonth.create({
                                ...book,
                                year,
                                month,
                                groupId: group.id,
                            });
                        const newBook = data as unknown;
                        books.push(newBook as Book);
                    }
                });
                setBookSelection(books);
            } else {
                setBookSelection(booksOfTheMonth);
            }
        })();
    }, []);

    return (
        <div>
            <h1>Choississez votre livre du mois</h1>
            {bookSelection &&
                !!bookSelection.length &&
                bookSelection.map((book: Book) => {
                    return (
                        <Link
                            key={book.id}
                            to={`/bookPreview/${book.id}`}
                        >
                            <BookCard title={book.title} />
                        </Link>
                    );
                })}
        </div>
    );
};

export default PickFavorite;
