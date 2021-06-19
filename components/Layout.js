import Head from "next/head"
import { useRouter } from 'next/router'
import Showcase from './Showcase'
import Footer from "./Footer"
import Header from "./Header"
import styles from '@/styles/Layout.module.css'


export default function Layout({
    title, 
    keywords, 
    description,
    children
}) {
    const router = useRouter()
    return (
        <div>
          <Head>
              <title> { title } </title>
              <meta name="description" content={ description }/>
              <meta name="keywords" content={keywords}/>
          </Head>
            <Header />
            { router.pathname === '/' && <Showcase /> }
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Tech Meetup | Find out what is happening in information technology meetup',
    description: 'Find the latest events in information technology',
    keywords: 'technology, information, events'
}
