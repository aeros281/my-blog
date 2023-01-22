import { DEFAULT_PAGE_SIZE } from 'constants/pagination';

import { getArticleBySlug, getArticleCount, getArticles } from './api';
import { GetPostResult, PostDataResult } from './interface';

const POST_GET_LIMIT = {
    home: DEFAULT_PAGE_SIZE,
    slugStaticPath: 100,
};

export function getPostCount(): Promise<number> {
    return getArticleCount();
}

export async function getAllPosts(limit: number = POST_GET_LIMIT.home, start = 0): Promise<GetPostResult[]> {
    return getArticles({ _limit: limit, _start: start });
}

export async function getAllPostSlugs(limit: number = POST_GET_LIMIT.slugStaticPath): Promise<{ slug: string }[]> {
    const articles = await getArticles({ _limit: limit });
    return articles.map(item => Object.assign({}, { slug: item.slug }));
}

export async function getPostData(slug: string): Promise<PostDataResult> {
    const data = await getArticleBySlug(slug, false);
    return Object.assign({}, data, { markdown_content: data.content });
}
