import BgImg from '../../images/logo512.png';

const ThreadCard = ({ thread }) => {
    const timeStamp = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(thread.timeStamp));
    return(
        <div className="cardContainer m-2">
            <div style={{ backgroundImage: `url("${BgImg}")` }} className="card mx-auto threadCard">
                <h5 className="text-primary mb-0">{thread.title}</h5>
                <h6 className="text-secondary threadDt">{timeStamp}</h6>
                <p className="text-light threadDesc">{thread.body.slice(0, 100)}{thread.body.length > 100 && '...'}</p>
                <span className="userTag">{thread.username}</span>
            </div>
        </div>
    )
}

export default ThreadCard;