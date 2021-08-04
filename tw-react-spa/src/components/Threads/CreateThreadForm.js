import axios from "axios";
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

const CreateThreadForm = ({ onThreadPost, loggedIn }) => {
    const titleInputRef = useRef();
    const bodyInputRef = useRef();
    const imgInputRef = useRef();
    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!titleInputRef.current.value || !bodyInputRef.current.value) {
            alert('Please fill in all fields');
            return;
        }
        const postObj = {
            title: titleInputRef.current.value,
            body: bodyInputRef.current.value,
            image: imgInputRef.current.value
        };
        // console.log(postObj);
        await axios.post(
            `http://localhost:5000/api/thread/submit`, postObj,
            { 
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                } 
            }).then((res) => {
                history.push(`/thread/${res.data.id}`);
                onThreadPost();
            });
    }

    const renderThread = () => {
        if(loggedIn) {
            return (
                <form onSubmit={onSubmit}>
                    <input
                        className='form-control my-1'
                        type='text'
                        placeholder='Title'
                        ref={titleInputRef} />
                    <textarea 
                        className='form-control my-1'
                        rows="7"
                        placeholder='Body'
                        ref={bodyInputRef}></textarea>
                    <input
                        id='thumbnailFile'
                        className='form-control my-1'
                        type='file' 
                        ref={imgInputRef} />
                    <label htmlFor="thumbnailFile" className="form-label">
                        <i>Thumbnail pixel size: 512x512</i>
                    </label>
                    <button 
                        type="submit" 
                        className='btn btn-success mt-2 float-end'>
                            Create Thread
                    </button>
                </form>
            );
        } else {
            return <h3 className="text-center">Login to create threads</h3>;
        }
    }
    return (
        <div className="card p-4 mx-auto my-5" style={{width: '600px'}}>
            {renderThread()}
        </div>
    )
}

export default CreateThreadForm;