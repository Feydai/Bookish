import { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard';
import { useParams } from 'react-router-dom';
import { Book } from '../../types/Book';
import { Button, Chip } from '@mui/material';
import type { Schema } from './../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { getCurrentUser } from 'aws-amplify/auth';

const BookPreview = () => {
    Amplify.configure(outputs);
    const { bookId } = useParams();
    const client = generateClient<Schema>();
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        (async () => {
            if (bookId) {
                const { data } = await client.models.BookOfTheMonth.get(
                    {
                        id: bookId,
                    },
                    {
                        selectionSet: [
                            'id',
                            'categories',
                            'title',
                            'authors',
                            'publishedDate',
                            'averageRating',
                            'pageCount',
                            'language',
                            'description',
                            'group.*',
                        ],
                    }
                );
                const book = data as Book;
                book && setBook(book);
            }
        })();
    }, []);

    const selectBook = async () => {
        const group = book?.group;
        if (group) {
            const user = await getCurrentUser();
            const newgroup = {
                ...group,
                members: [...group.members, user.userId],
            };
            await client.models.Group.update(newgroup);
            alert('Vous avez intégré le groupe de lecture');
        }
    };

    return (
        <div>
            {book && (
                <div className="p-3">
                    <BookCard
                        title={book.title}
                        desc={book.description}
                        authors={book.authors}
                    />
                    {book.categories?.map((cat: string) => (
                        <Chip
                            key={cat}
                            label={cat}
                        />
                    ))}
                    <Button onClick={selectBook}>Choisir ce livre</Button>
                </div>
            )}
        </div>
    );
};

export default BookPreview;
