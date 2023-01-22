import Head from 'next/head';
import { useRouter } from 'next/router';

import { GetStaticPaths, GetStaticProps } from 'next';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import { TwoColLayout as Layout } from '@components/layout';
import Date from '@components/core/date';

import { getAllPostSlugs, getPostData } from '@lib/blog';
import { PostDataResult } from '@lib/interface';

import typo from '@styles/typography.module.scss';
import articleStyle from '@styles/article.module.scss';
import { ParsedUrlQuery } from 'querystring';

import 'highlight.js/styles/github.css';

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
                <div className={`${typo.lightText} + ${typo.small}`}>
                    Created at <Date dateString={postData.created_at} />
                </div>

                <ReactMarkdown className={articleStyle.articleContent} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {postData.markdown_content}
                </ReactMarkdown>

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
    return {
        props: {
            postData,
        },
        revalidate: 1,
    };
};
