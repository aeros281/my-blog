import Head from 'next/head';
import Link from 'next/link';

import typoStyle from '@styles/typography.module.scss';
import utilStyle from '@styles/util.module.scss';

import { AVATAR_SRC, BLOG_NAME } from '../const';
import { LayoutProps } from '../interfaces';
import style from './two-column-layout.module.scss';

export const TwoColLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className={style.pageWrapper}>
                <div className={style.container}>
                    <div className={style.sidebar}>
                        <header className={style.blogHeader}>
                            <h1 className={`${typoStyle.headingXl} ${style.blogTitle}`}>
                                <Link href={'/'} >
                                    <a>{BLOG_NAME}</a>
                                </Link>
                            </h1>
                            <img className={`${style.headerImage} + ${utilStyle.borderCircle}`} src={AVATAR_SRC} alt="User Avatar" />
                        </header>
                    </div>
                    <div className={style.content}>{children}</div>
                </div>
            </div>
        </>
    );
};