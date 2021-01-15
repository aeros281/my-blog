import Head from 'next/head';
import { useRouter } from 'next/router';

import { GetStaticPaths, GetStaticProps } from 'next';

import { TwoColLayout as Layout } from '@components/layout';
import Date from '@components/core/date';

import { convertRemarkToHtml, getAllPostSlugs, getPostData, PostDataResult } from '@lib/blog';

import typo from '@styles/typography.module.scss';
import articleStyle from '@styles/article.module.scss';
import { ParsedUrlQuery } from 'querystring';

interface StaticProps { postData: PostDataResult }
interface StaticPropsParams extends ParsedUrlQuery { slug: string }

export default function Post({ postData }: { postData: PostDataResult }): React.ReactNode {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout home={true} >
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={typo.headingXl}>{postData.title}</h1>
                <div className={typo.lightText}>
                    <Date dateString={postData.created_at} />
                </div>
                <div className={articleStyle.articleContent} dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
            </article>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths<StaticPropsParams> = async () => {
    const paths = (await getAllPostSlugs()).map(({ slug }) => ({
        params: {
            slug,
        }
    }));
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<StaticProps, StaticPropsParams> = async ({ params }) => {
    const postData = await getPostData(params.slug);
    postData.htmlContent = await convertRemarkToHtml(postData.markdown_content);
    return {
        props: {
            postData,
        },
        revalidate: 1,
    };
};
