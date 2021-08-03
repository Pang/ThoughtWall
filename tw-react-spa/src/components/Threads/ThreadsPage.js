import ThreadCard from './ThreadCard';

const ThreadsPage = ({ threads }) => {

    return(
        <div className="d-flex flex-wrap justify-content-start">
            {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
            ))}
        </div>
    )
}

export default ThreadsPage;