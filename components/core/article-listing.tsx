import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { BLOG_NAME, TwoColLayout as Layout } from '@components/layout';
import Date from '@components/core/date';
import Pagination from '@components/core/pagination';

import { GetPostResult } from '@lib/interface';

import typo from '@styles/typography.module.scss';

interface ArticleListingProps { posts: GetPostResult[], count: number, current?: number }

export default function ArticleListing({ posts = [], count, current = 1 }: ArticleListingProps): React.ReactElement {
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
                <Pagination pageSize={5} total={count} currentPage={current}></Pagination>
            </section>
        </Layout>
    );
}
