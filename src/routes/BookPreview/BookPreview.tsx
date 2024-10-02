import { useEffect } from 'react';
import BookCard from '../../components/BookCard';
import { useParams } from 'react-router-dom';
import { Book } from '../../types/Book';
import { Button, Chip } from '@mui/material';
import type { Schema } from './../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json';

const BookPreview = () => {
    Amplify.configure(outputs);
    const { bookId } = useParams();
    const client = generateClient<Schema>();
    const navigate = useNavigate();

    useEffect(() => {
        // function here to retrive book from API with bookId
    }, []);

    const book: Book = {
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
    };

    const selectBook = async () => {
        await client.models.Favorite.create({
            google_id: bookId,
        });
        navigate('/');
    };

    return (
        <div>
            <BookCard title={book.title} />
            {book.categories.map((cat: string) => (
                <Chip
                    key={cat}
                    label={cat}
                />
            ))}
            <Button onClick={selectBook}>Choisir ce livre</Button>
            <div>{book.description}</div>
        </div>
    );
};

export default BookPreview;
