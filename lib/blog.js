import remark from 'remark';
import html from 'remark-html';

import pool from './db';

const POST_GET_ALL = { text: 'SELECT id, slug, title FROM posts' };
const POST_GET_ALL_SLUG = { text: 'SELECT slug FROM posts' };
const POST_GET_BY_SLUG = { text: 'SELECT id, slug, title, markdown_content FROM posts WHERE slug=$1', };

export async function getAllPosts() {
    const { rows } = await pool.query(POST_GET_ALL);
    return rows;
};

export async function getAllPostSlugs() {
    const { rows } = await pool.query(POST_GET_ALL_SLUG);
    return rows;
};

export async function getPostData(slug) {
    const { rows } = await pool.query(POST_GET_BY_SLUG, [slug]);
    return rows[0] || {};
}

export async function convertRemarkToHtml(remarkContent) {
    return (await remark().use(html).process(remarkContent)).toString();
}