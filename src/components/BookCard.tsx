import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';

interface BookCardProps {
    imgUrl?: string;
    title: string;
    desc: string;
    authors: string[];
}
const BookCard = ({ imgUrl, title, desc, authors }: BookCardProps) => {
    return (
        <Card sx={{ p: 2, mb: 5 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={imgUrl}
                title="Book Cover"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                >
                    {authors?.join(', ')}{' '}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        my: 2,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 3,
                    }}
                >
                    {desc}
                </Typography>
                <CardActions sx={{ p: 0 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            backgroundColor: '#1F2937',
                            '&:hover': { backgroundColor: '#374151' },
                        }}
                    >
                        En savoir plus
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default BookCard;
