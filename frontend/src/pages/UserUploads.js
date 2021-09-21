import axios from 'axios';
import Error from './Error';
import Loading from '../components/Loading';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';
import CardWrapper from '../components/CardWrapperComponent';
import ProjectWrapper from '../components/ProjectWrapper';

const UserUploads = ({ loggedIn, checked, user }) => {
    const [notes, updateNotes] = useState([]);
    const [midterm, updateMidterm] = useState([]);
    const [practical, updatePractical] = useState([]);
    const [project, updateProject] = useState([]);

    // Fetching the data for current user
    const { data, isPending, error } = useFetch('/api/uploads');

    // Delete the particular data on pressing delete button
    // Sending a DELETE request to server and setting the new states
    const clickHandler = (type, event, setData, data) => {
        let id = event.target.getAttribute('id');
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        axios({
            method: 'DELETE',
            url: '/api/uploads/' + type + '/' + id,
            cancelToken: source.token,
        })
            .then(response => {
                if (response.status === 200) {
                    setData(data.filter(item => item._id !== id))
                }
            }
            ).catch(err => {
                if (!axios.isCancel(err)) {
                    console.error(err);
                }
            })

        return () => source.cancel('Axios request cancelled');
    };

    // Whenever new data is available, update the data
    // As useEffect will run 2 times, 
    // a) Before rendering, by default useEffect hook is fired.Here, data is undefined (not important as condition fails)
    // b) After rendering, data is available, update the states

    useEffect(() => {
        if (data) {
            updateNotes(data.notes);
            updateMidterm(data.midterm);
            updateProject(data.projects);
            updatePractical(data.practical);
        }
    }, [data]);

    useEffect(() => {
        if (!loggedIn && checked) {
            window.location = process.env.REACT_APP_AUTH_REDIRECT;
        }
    }, [loggedIn, checked]);

    return (
        <>
            {isPending && <Loading />}
            {error && <Error error={error} />}
            {data && (
                <>
                    <h2>Uploads</h2>
                    <hr></hr>
                    <div className="uploads-user-info">
                        <h3>User Info</h3>
                        <h6>Username: </h6><span className="username">{user.username}</span>
                        <br></br>
                        <h6>User ID: </h6><span className="userid">{user.userid}</span>
                    </div>
                    <CardWrapper
                        data={notes}
                        type="notes"
                        setData={updateNotes}
                        handler={clickHandler}
                        upload={true} />

                    <CardWrapper
                        data={practical}
                        type="practical"
                        setData={updatePractical}
                        handler={clickHandler}
                        upload={true} />

                    <CardWrapper
                        data={midterm}
                        type="midterm"
                        setData={updateMidterm}
                        handler={clickHandler}
                        upload={true} />

                    <ProjectWrapper
                        projects={project}
                        upload={true}
                        setData={updateProject}
                        handler={clickHandler} />
                </>
            )}
        </>
    );
}

export default UserUploads;