import Head from 'next/head'

import utilStyle from '../styles/util.module.scss'
import typoStyle from '../styles/typography.module.scss'
import style from './layout.module.scss'

export const BLOG_NAME = 'My Dragon is Angry'
export const AVATAR_SRC = "images/alencia_epic7.jpg"

export default function Layout({ children }) {
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
                <h1 className={typoStyle.heading2Xl}>{BLOG_NAME}</h1>
                <img className={`${style.headerImage} + ${utilStyle.borderCircle}`} src={AVATAR_SRC} />
            </header>
            <section>{ children }</section> 
        </div>
    )
}