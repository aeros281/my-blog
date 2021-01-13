import { parseISO, format } from 'date-fns';

interface DateOps {
    dateString: string;
}

export default function Date({ dateString }: DateOps) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}