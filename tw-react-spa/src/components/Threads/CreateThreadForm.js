import axios from "axios";
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

const CreateThreadForm = ({ onThreadPost, loggedIn }) => {
    const titleInputRef = useRef();
    const bodyInputRef = useRef();
    let history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!titleInputRef.current.value || !bodyInputRef.current.value) {
            alert('Please fill in all fields');
            return;
        }
        const postObj = {
            title: titleInputRef.current.value,
            body: bodyInputRef.current.value
        }
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
    // TODO: if loggedIn show form, else hide
    return (
        <div className="card p-4 mx-auto my-5" style={{width: '600px'}}>
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
                <button 
                    type="submit" 
                    className='btn btn-success mt-2 float-end'>
                        Create Thread
                </button>
            </form>
        </div>
    )
}

export default CreateThreadForm;