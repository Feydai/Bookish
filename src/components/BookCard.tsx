import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyIcon from './../assets/react.svg';

interface BookCardProps {
    imgUrl?: string;
    title: string;
}

const BookCard = ({ imgUrl, title }: BookCardProps) => {
    return (
        <Card>
            <CardContent>
                <img
                    src={imgUrl ? imgUrl : MyIcon}
                    alt={title}
                />
                <div>{title}</div>
            </CardContent>
        </Card>
    );
};

export default BookCard;
