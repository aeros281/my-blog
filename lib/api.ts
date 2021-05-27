export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    created_at: string;
    published_at: string;
}

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

export async function getArticles(): Promise<Article[]> {
    // Find the pages that match this slug
    return await fetchAPI('/articles?_sort=created_at:DESC');
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
