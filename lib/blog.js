import pool from './db'

const POST_GET_ALL = {
    text: 'SELECT id, slug, title FROM posts'
};

export async function getAllPosts() {
    const { rows } = await pool.query(POST_GET_ALL);
    return rows;
};