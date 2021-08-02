import BgImg from '../images/logo512.png';

const ThreadCard = () => {
    return(
        <div className="cardContainer">
            <div style={{ backgroundImage: `url("${BgImg}")` }} className="card mx-auto bg-light threadCard">
                <h5 className="text-primary mb-0">New portfolio blog</h5>
                <h6 className="text-secondary threadDt">Mon 12th Aug, 2021 - 16:00</h6>
                <p className="text-light threadDesc">This will hold some description of the thread.</p>
            </div>
        </div>
    )
}

export default ThreadCard;