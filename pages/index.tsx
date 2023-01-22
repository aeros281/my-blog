import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps } from 'next';

import { BLOG_NAME, TwoColLayout as Layout } from '@components/layout';
import { getAllPosts } from '@lib/blog';
import { GetPostResult } from '@lib/interface';

import typo from '@styles/typography.module.scss';
import Date from '@components/core/date';

interface HomeProps { posts: GetPostResult[] }
interface StaticProps { posts: GetPostResult[] }

export default function Home({ posts }: HomeProps): React.ReactElement {
    return (
        <Layout home>
            <Head>
                <title>{BLOG_NAME}</title>
            </Head>
            <section>
                <h2 className={typo.headingLg}>Blog</h2>
                <ul className={typo.list}>
                    {posts.map(post => (
                        <li key={post.id} className={typo.listItem}>
                            <Link href={`/posts/${post.slug}`}>
                                <React.Fragment>
                                    {post.title}
                                    <div className={`${typo.small} ${typo.lightText}`} >
                                        <Date dateString={post.created_at} />
                                    </div>
                                </React.Fragment>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
    const posts = await getAllPosts();
    return {
        props: {
            posts: posts,
        },
        revalidate: 1,
    };
};
