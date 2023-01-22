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
                        <SideBarHeader title={BLOG_NAME} avatarSrc={AVATAR_SRC} />
                        <BlogNavigator />
                    </div>
                    <div className={style.content}>{children}</div>
                </div>
            </div>
        </>
    );
};

const SideBarHeader: React.FC<{ title: string, avatarSrc: string }> = ({ title, avatarSrc }) => {
    return (
        <header className={style.blogHeader}>
            <h1 className={`${typoStyle.headingXl} ${style.blogTitle}`}>
                <Link href={'/'} >
                    { title }
                </Link>
            </h1>
            <img className={`${style.headerImage} + ${utilStyle.borderCircle}`} src={avatarSrc} alt="User Avatar" />
        </header>
    );
};

const BlogNavigator: React.FC = () => {
    const navigatorItems = [
        { text: 'Home', href: '/' },
        { text: 'Blog', href: '/posts' },
        { text: 'About', href: '/about' },
    ];

    return (
        <ul className={`${typoStyle.list} ${typoStyle.headingMd} ${style.navigator}`}>
            {
                navigatorItems.map(item => (
                    <li className={typoStyle.listItem} key={item.text}>{item.text}</li>
                ))
            }
        </ul>
    );
};
