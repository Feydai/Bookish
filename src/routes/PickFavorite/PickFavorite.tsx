import React, { useEffect, useState } from 'react';
import BookCard from './../../components/BookCard';
import { Book } from './../../types/Book';

interface PickFavoriteProps {}

const PickFavorite = ({}: PickFavoriteProps) => {
    // const [bookSelection, setBookSelection] = useState([]);

    const bookSelection: Book[] = [
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

    // Get 3 random books from API here
    useEffect(() => {}, []);
    return (
        <div>
            <h1>Choississez votre livre du mois</h1>
            {bookSelection &&
                !!bookSelection.length &&
                bookSelection.map((book: Book) => {
                    return (
                        <BookCard
                            key={book.id}
                            title={book.title}
                        />
                    );
                })}
        </div>
    );
};

export default PickFavorite;
