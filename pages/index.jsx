import Head from 'next/head'
import Link from 'next/link'

import typo from '../styles/typography.module.scss'
import Layout, { BLOG_NAME } from '../components/layout'
import Counter from '../components/core/counter/counter'
import { getAllPosts } from '../lib/blog'

export default function Home({ wreckedCounter, posts }) {
  return (
    <Layout home>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <section className={typo.headingMd}>
        <p>There's nothing here</p>
        <p>Seriously, instead of doing some coding I need to put gear on my Drag first.</p>
      </section>
      <section>
        <p>Just FYI,</p>
        <Counter countNum={wreckedCounter} subtitle={'..people got wretch by the little old hag today'} />
      </section>
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

export async function getStaticProps() {
  const currentTime = new Date()
  const secondPassed = currentTime.getSeconds() + (60 * currentTime.getMinutes()) + (3600 * currentTime.getHours())

  const posts = await getAllPosts()
  return {
    props: {
      wreckedCounter: secondPassed,
      posts: posts,
    },
    revalidate: 1,
  }
}