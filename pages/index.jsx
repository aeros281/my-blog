import Head from 'next/head'

import typo from '../styles/typography.module.scss'
import Layout, { BLOG_NAME } from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <section className={typo.headingMd}>
        <p>There's nothing here</p>
        <p>Seriously, instead of doing some coding I need to put gear on my Drag first.</p>
      </section>
    </Layout>
  )
}
