import Head from 'next/head';
import Link from 'next/link';

import { GetStaticProps } from 'next';

import Layout, { BLOG_NAME } from '@components/layout';
import { getAllPosts, GetPostResult } from '@lib/blog';
import typo from '@styles/typography.module.scss';

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
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link href={`/posts/${post.slug}`}>
                                <a>{post.title}</a>
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
