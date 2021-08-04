import { Link } from 'react-router-dom';
import ThreadCard from './ThreadCard';

const ThreadsPage = ({ threads }) => {
    return(
        <div>
            <h2 className="ml-5">Latest Threads</h2>
            <div className="d-flex flex-wrap justify-content-start">
                {threads.map((thread) => (
                    <Link key={thread.id} to={"/thread/" + thread.id}>
                        <ThreadCard thread={thread} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ThreadsPage;