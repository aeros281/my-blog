import Head from 'next/head';
import Link from 'next/link';

import utilStyle from '@styles/util.module.scss';
import typoStyle from '@styles/typography.module.scss';

import style from './layout.module.scss';
import { BLOG_NAME, AVATAR_SRC } from './const';
import { LayoutProps } from './interfaces';

export const Layout: React.FC<LayoutProps> = ({ children, home = false }) => {
    return (
        <div className={style.container} >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="There is nothing here"
                />
            </Head>
            <header className={style.blogHeader}>
                <h1 className={typoStyle.heading2Xl}>
                    <Link href={'/'} >
                        {BLOG_NAME}
                    </Link>
                </h1>
                <img className={`${style.headerImage} + ${utilStyle.borderCircle}`} src={AVATAR_SRC} alt="User Avatar" />
            </header>
            <section>{ children }</section> 
            {home || (
                <Link href={'/'} >
                    Back to home
                </Link>
            )}
        </div>
    );
};
