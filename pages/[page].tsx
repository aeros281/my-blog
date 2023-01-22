import React from 'react';

import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';

import { DEFAULT_PAGE_SIZE } from 'constants/pagination';

import { getAllPosts, getPostCount } from '@lib/blog';
import { GetPostResult } from '@lib/interface';

import ArticleListing from '@components/core/article-listing';

interface HomeProps { posts: GetPostResult[], count: number, currentPage: number }
interface StaticProps { posts: GetPostResult[], count: number }
interface StaticPropsParams extends ParsedUrlQuery { page: string }

export default function ArticlePaging({ posts, count, currentPage }: HomeProps): React.ReactElement {
    return <ArticleListing posts={posts} count={count} current={currentPage}></ArticleListing>;
}

export const getStaticPaths: GetStaticPaths<StaticPropsParams> = async () => {
    const postCount = await getPostCount();
    const paths = Array(Math.ceil(postCount / DEFAULT_PAGE_SIZE)).fill(0).map((_, index) => ({
        params: {
            page: String(index + 1),
        }
    }));
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<StaticProps, StaticPropsParams> = async ({ params }) => {
    const currentPage = Number(params.page);
    const postCount = await getPostCount();
    const posts = await getAllPosts(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE * (currentPage - 1));
    return {
        props: {
            posts: posts,
            count: postCount,
            currentPage,
        },
        revalidate: 1,
    };
};
