import axios from "axios";
import { useEffect, useRef } from 'react';

const ThreadCard = ({ thread }) => {
    const timeStamp = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(thread.timeStamp));
    const cardRef = useRef();
    let hasImg = false;

    useEffect(() => {
        axios.get(`https://picsum.photos/512`).then((res) => {
            console.log(res.request.responseURL);
            cardRef.current.style.backgroundImage = `url(${res.request.responseURL})`;
            hasImg = true; // will reset on rerender
        })
    }, [])

    return(
        <div className="cardContainer m-2">
            <div ref={cardRef} className="card mx-auto threadCard">
                <h5 className="text-primary mb-0">{thread.title}</h5>
                <h6 className="text-secondary threadDt">{timeStamp}</h6>
                <p className="text-light threadDesc">{thread.body.slice(0, 100)}{thread.body.length > 100 && '...'}</p>
                <span className="userTag">{thread.username}</span>
            </div>
        </div>
    )
}

export default ThreadCard;