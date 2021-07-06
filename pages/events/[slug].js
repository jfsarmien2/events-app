import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Link from 'next/link'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router'

export default function EventPage({evt}) {
    const router = useRouter();

    const deleteEvent = async (e) => {
        if(confirm('Are you sure you want to delete?')) {
           const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'DELETE',
           })

           const data = await res.json();
           if(!res.ok) {
              toast.error(data.message);
              return;
           } else {
               router.push('/events');
           }
        }
    }
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a><FaPencilAlt /> Edit Event</a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <span>
                    {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                 <ToastContainer />
                <h1>{evt.name}</h1>
                
                {evt.image && (
                    <div className={styles.image}>
                        <Image 
                         src={evt.image.formats.medium.url}
                         width={960}
                         height={600}
                         />
                    </div>
                 )}

                 <h3>Hosted By:</h3>
                 <p>{evt.host}</p>
                 <h3>Description:</h3>
                 <p>{evt.description}</p>
                 <h3>Venue: {evt.venue}</h3>
                 <p>{evt.address}</p>
                 <Link href="/events">
                     <a className={styles.back}>
                         {'<'} Go Back
                     </a>
                 </Link>
            </div>
        </Layout>
    )
}


export async function getServerSideProps({query: {slug} }) {
    
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();
    return {
       props: {evt: events[0]},
    }
}
