import { DEFAULT_PAGE_SIZE } from 'constants/pagination';

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    published_at: string;
}

interface PaginationOptions {
    _limit?: number,
    _start?: number,
}

const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
    _limit: DEFAULT_PAGE_SIZE,
    _start: 0,
};

export function getStrapiURL(path: string): string {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
    }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string, options = {}): Promise<any> {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
        console.error(response.statusText);
        throw new Error('An error occured please try again');
    }
    const data = await response.json();
    return data;
}

export async function getArticleCount(): Promise<number> {
    return fetchAPI('/articles/count').then(val => Number(val));
}

export async function getArticles(paginationOptions: PaginationOptions = {}): Promise<Article[]> {
    // Find the pages that match this slug
    const effectivePaginationOptions: PaginationOptions = {
        ...DEFAULT_PAGINATION_OPTIONS,
        ...paginationOptions,
    };

    const params = {
        '_sort': 'created_at:DESC',
        ...Object.entries(effectivePaginationOptions)
            // .map(([key, value]) => [`pagination[${key}]`, value])
            .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
    };
    const paramStr = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return fetchAPI(`/articles?${paramStr}`);
}

export async function getArticleBySlug(slug, preview): Promise<Article> {
    // Find the pages that match this slug
    const articleData = await fetchAPI(
        `/articles?slug=${slug}`
    );

    // Make sure we found something, otherwise return null
    if (articleData == null || articleData.length === 0) {
        return null;
    }

    // Return the first item since there should only be one result per slug
    return articleData[0];
}
