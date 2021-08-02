import BgImg from '../../images/logo512.png';

const ThreadCard = ({ thread }) => {

    return(
        <div className="cardContainer m-2">
            <div style={{ backgroundImage: `url("${BgImg}")` }} className="card mx-auto threadCard">
                <h5 className="text-primary mb-0">{thread.title}</h5>
                <h6 className="text-secondary threadDt">01/01/21, 16:00</h6>
                <p className="text-light threadDesc">{thread.body.slice(0, 100)}{thread.body.length > 100 && '...'}</p>
                <span className="userTag">{thread.username}</span>
            </div>
        </div>
    )
}

export default ThreadCard;