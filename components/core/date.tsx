import { parseISO, format } from 'date-fns';

interface DateProps {
    dateString: string;
}

export default function Date({ dateString }: DateProps): React.ReactElement<DateProps> {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'HH:mm:ss - LLLL d, yyyy')}</time>;
}
