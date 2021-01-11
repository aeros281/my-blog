import Head from 'next/head'

import typo from '../styles/typography.module.scss'
import Layout, { BLOG_NAME } from '../components/layout'
import Counter from '../components/core/counter/counter'

export default function Home({ wreckedCounter }) {
  return (
    <Layout>
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
    </Layout>
  )
}

export async function getStaticProps() {
  const currentTime = new Date()
  const secondPassed = currentTime.getSeconds() + (60 * currentTime.getMinutes()) + (3600 * currentTime.getHours())
  return {
    props: {
      wreckedCounter: secondPassed,
      revalidate: 1,
    },

  }
}