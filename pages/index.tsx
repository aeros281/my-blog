import Head from 'next/head'
import Link from 'next/link'

import { GetStaticProps } from 'next'

import Layout, { BLOG_NAME } from '@components/layout'
import { getAllPosts } from '@lib/blog'
import typo from '@styles/typography.module.scss'

export default function Home({ wreckedCounter, posts }) {
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
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const currentTime = new Date();

  const posts = await getAllPosts();
  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  };
}