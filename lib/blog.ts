import remark from 'remark';
import html from 'remark-html';

import pool from './db';

const POST_GET_ALL = { text: 'SELECT id, slug, title FROM posts WHERE published=true' };
const POST_GET_ALL_SLUG = { text: 'SELECT slug FROM posts WHERE published=true' };
const POST_GET_BY_SLUG = { text: 'SELECT id, slug, title, markdown_content, to_json(created_at) as created_at FROM posts WHERE slug=$1 AND published=true' };

export interface GetPostResult {
    id: number;
    slug: string;
    title: string;
}

export interface PostDataResult extends GetPostResult {
    markdown_content: string;
    created_at: string;
    htmlContent?: string;
}

export async function getAllPosts(): Promise<GetPostResult[]> {
    const { rows } = await pool.query(POST_GET_ALL);
    return rows;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
    const { rows } = await pool.query(POST_GET_ALL_SLUG);
    return rows;
}

export async function getPostData(slug: string): Promise<PostDataResult> {
    const { rows } = await pool.query(POST_GET_BY_SLUG, [slug]);
    return rows[0] || {};
}

export async function convertRemarkToHtml(remarkContent: string): Promise<string> {
    return (await remark().use(html).process(remarkContent)).toString();
}
