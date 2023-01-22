import Link from 'next/link';

import paginationStyle from '@styles/pagination.module.scss';

interface PageProps {
    pageSize: number;
    total: number;
    halfLimit?: number[];
    currentPage?: number;
}

const Pagination: React.FC<PageProps> = ({ pageSize, total, halfLimit = [5, 3], currentPage }) => {
    const pageCount = Math.ceil(total / pageSize);
    const pageList = Array(pageCount || 0).fill(0).map((_, index) => index + 1);
    const pageElements = limitPageItem(pageList, halfLimit).map(val =>
        <li className={currentPage === val ? paginationStyle.active : ''} key={`pageItem${val}`}>
            {val ? (<Link href={`/${val}`}>
                {val} 
            </Link>) : '...'}
        </li>
    );
    return <ul className={paginationStyle.pagination}>
        {pageElements}
    </ul>;
};

function limitPageItem<T>(pageItem: T[], halfLimit: number[]): T[] {
    if (pageItem.length <= halfLimit[0] + halfLimit[1]) {
        return pageItem;
    }

    return [
        ...pageItem.slice(0, halfLimit[0]),
        ...[null],
        ...pageItem.slice(-halfLimit[1]),
    ];
}

export default Pagination;