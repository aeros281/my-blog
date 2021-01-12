import Head from 'next/head'

import Layout from '../../components/layout'
import typo from '../../styles/typography.module.scss'
import articleStyle from '../../styles/article.module.scss'

import { convertRemarkToHtml, getAllPostSlugs, getPostData } from '../../lib/blog'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={typo.headingXl}>{postData.title}</h1>
                <div className={typo.lightText}>
                    {'<Created Date>'}
                </div>
                <div className={articleStyle.articleContent} dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = (await getAllPostSlugs()).map(({ slug }) => ({
        params: {
            slug,
        }
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.slug);
    postData.htmlContent = await convertRemarkToHtml(postData.markdown_content);
    return {
        props: {
            postData,
        }
    };
}