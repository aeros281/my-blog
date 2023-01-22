import React from 'react';

import { GetStaticProps } from 'next';

import { getAllPosts, getPostCount } from '@lib/blog';
import { GetPostResult } from '@lib/interface';

import ArticleListing from '@components/core/article-listing';

interface HomeProps { posts: GetPostResult[], count: number }
interface StaticProps { posts: GetPostResult[], count: number }

export default function Home({ posts, count }: HomeProps): React.ReactElement {
    return <ArticleListing posts={posts} count={count}></ArticleListing>;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
    const postCount = await getPostCount();
    const posts = await getAllPosts();
    return {
        props: {
            posts: posts,
            count: postCount,
        },
        revalidate: 1,
    };
};
