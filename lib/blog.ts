import remark from 'remark';
import html from 'remark-html';
import { getArticleBySlug, getArticles } from './api';
import { GetPostResult, PostDataResult } from './interface';

const POST_GET_LIMIT = {
    home: 10,
    slugStaticPath: 100,
};

export async function getAllPosts(limit: number = POST_GET_LIMIT.home): Promise<GetPostResult[]> {
    return await getArticles();
}

export async function getAllPostSlugs(limit: number = POST_GET_LIMIT.slugStaticPath): Promise<{ slug: string }[]> {
    const articles = await getArticles();
    return articles.map(item => Object.assign({}, { slug: item.slug }));
}

export async function getPostData(slug: string): Promise<PostDataResult> {
    const data = await getArticleBySlug(slug, false);
    return Object.assign({}, data, { markdown_content: data.content });
}

export async function convertRemarkToHtml(remarkContent: string): Promise<string> {
    return (await remark().use(html).process(remarkContent)).toString();
}
