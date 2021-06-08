import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"
import styles from '@/styles/Layout.module.css'


export default function Layout({
    title, 
    keywords, 
    description,
    children
}) {
    return (
        <div>
          <Head>
              <title> { title } </title>
              <meta name="description" content={ description }/>
              <meta name="keywords" content={keywords}/>
          </Head>
            <Header />
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
