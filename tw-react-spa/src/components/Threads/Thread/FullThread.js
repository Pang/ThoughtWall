import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FullThread = ({ thread }) => {
    const { id } = useParams();
    const [threadData, setThreadData] = useState('');

    const getters = {
        get isLoaded() {
            return threadData?.id;
        },
        get timeStamp() {
            return new Intl.DateTimeFormat(
                'en-GB', 
                { dateStyle: 'full', timeStyle: 'short' }
            ).format(new Date(threadData?.timeStamp))
        }
    }
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get(`http://localhost:5000/api/thread/${id}`).then((res) => {
            console.info('thisThread', res.data)
            setThreadData(res.data);
        });
    }

    const renderThread = () => {
        if(getters.isLoaded) {
            return (
                <div className="p-4 text-center">
                    <h1 className="mb-0">{threadData.title}</h1>
                    <span className="text-dark">{getters.timeStamp}</span>
                    <p className="my-5">{threadData.body}</p>
                </div>
            );
        } else {
            return <h3>Loading...</h3>
        }
     }

    return (
        <div>
            {getters.isLoaded && renderThread()}
        </div>
    )
}

export default FullThread;