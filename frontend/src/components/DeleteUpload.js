import axios from "axios";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

const DeleteUpload = ({ type, id }) => {
    const history = useHistory();
    const clickHandler = () => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        axios({
            method: "DELETE",
            url: "/api/uploads/" + type + "/" + id,
            cancelToken: source.token,
        })
            .then(response => {
                if (response.status === 200) {
                    history.push("/uploads");
                }
            }
            ).catch(err => {
                if (!axios.isCancel(err)) {
                    console.log('error from file', err)
                }
            })

        return () => source.cancel("Axios request cancelled");
    };

    return (
        <Button variant='outline-primary' className='pdf-link' onClick={clickHandler}>
            Delete
        </Button>
    );
}

export default DeleteUpload;