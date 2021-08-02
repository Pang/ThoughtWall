import ThreadCard from './ThreadCard';

const Threads = ({ threads }) => {

    return(
        <div className="d-flex flex-wrap justify-content-start">
            {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
            ))}
        </div>
    )
}

export default Threads;