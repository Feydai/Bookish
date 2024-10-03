import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './../../components/BookCard';
import { Book } from './../../types/Book';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json';
import type { Schema } from './../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

import { Typography, Container } from '@mui/material';

interface PickFavoriteProps {}

const PickFavorite = ({}: PickFavoriteProps) => {
    const [bookSelection, setBookSelection] = useState<Book[]>([]);
    Amplify.configure(outputs);
    const client = generateClient<Schema>();

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
                const result = await client.queries.getAISuggestions();
                const iaData = result.data ? JSON.parse(result.data) : null;

                const books = await Promise.all(
                    iaData.livres.map(async (book: Record<string, string>) => {
                        const data = await client.queries.getGoogleBook({
                            title: book.titre,
                        });
                        const googleBook = data.data
                            ? JSON.parse(data.data)
                            : null;

                        const { data: group } =
                            await client.models.Group.create({
                                members: [],
                            });

                        if (group && googleBook) {
                            console.log(googleBook);
                            const { data } =
                                await client.models.BookOfTheMonth.create({
                                    ...googleBook,
                                    year,
                                    month,
                                    groupId: group.id,
                                });
                            return data;
                        }
                        return null;
                    })
                );
                setBookSelection(
                    books.filter((book) => book !== null) as Book[]
                );
            } else {
                setBookSelection(booksOfTheMonth);
            }
        })();
    }, []);

    useEffect(() => {}, []);

    return (
        <Container maxWidth="md">
            <Typography
                variant="h4"
                component="h1"
                sx={{ mt: 4 }}
            >
                Par quel livre vous laisserez vous tenter ce mois-ci ?
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 4, mb: 4 }}
                color="text.secondary"
            >
                Voici notre séléction
            </Typography>
            {bookSelection &&
                !!bookSelection.length &&
                bookSelection.map((book: Book) => {
                    return (
                        <Link
                            key={book.id}
                            to={`/bookPreview/${book.id}`}
                        >
                            <BookCard
                                title={book.title}
                                authors={book.authors}
                                desc={book.description}
                            />
                        </Link>
                    );
                })}
        </Container>
    );
};

export default PickFavorite;
