import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const PracticalForm = ({ loggedIn, checked }) => {
    const { subj } = useParams();
    const [practicalNo, setPracticalNo] = useState();
    const [description, setDescription] = useState("");
    const [practicalFile, setPracticalFile] = useState();
    const [error, setError] = useState();
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    let options = [...Array(30).keys()].map((i) => (<option value={i + 1}>{i + 1}</option>))

    function validateSubmit(event) {
        event.preventDefault();
        if (!practicalFile) {
            setError("Please upload a file.");
        } else if (!practicalNo) {
            setError("Please select practical number.");
        } else if (practicalFile.type !== "application/pdf") {
            setError("Please choose a pdf file");
        } else if (practicalFile.size > 10 ** 7) {
            setError("Size of PDF should be less than 10MB.");
        } else {
            handleSubmit();
        }
    }

    useEffect(() => {
        if (!loggedIn && checked) {
            window.location = process.env.REACT_APP_AUTH_REDIRECT;
        }
    }, [loggedIn, checked]);

    const handleSubmit = () => {
        setIsPending(true);
        const formData = new FormData();
        formData.append("description", description);

        formData.append("file", practicalFile, practicalFile.name);

        formData.append("practical_number", practicalNo);

        axios({
            method: "POST",
            url: "/api/subj/" + subj + "/upload_practical",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                setIsPending(false);
                history.go(-1);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    if (error) {
        setTimeout(() => setError(""), 7000);
    }

    console.log(practicalNo, practicalFile, description);
    return (
        <div className="practical-form">
            {error && (
                <Alert variant="danger" className="form-error">
                    {error}
                </Alert>
            )}
            <h2 className="upload-form-heading">Upload a practical</h2>
            <hr></hr>
            <Form onSubmit={validateSubmit} noValidate>
                <Form.Group className="practical-selection">
                    <Form.Label>{'Practical Number'}</Form.Label>
                    <Form.Control
                        as="select"
                        id="practical-selection"
                        onChange={(e) => setPracticalNo(e.target.value)}
                        aria-label="Choose practical"
                    >
                        <option value="">Choose a number</option>
                        {options}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="practical-description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Enter description for the practical"
                        value={description}
                        area-describedby="description-help"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Text id="description-help" muted>
                        Description can be like: Stacks, queues and their functions with
                        examples
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Upload practical file</Form.Label>
                    <Form.File
                        type="file"
                        onChange={(e) => setPracticalFile(e.target.files[0])}
                        aria-describedby="file-help"
                    />
                    <Form.Text id="file-help" muted>
                        File should be in pdf format.
                    </Form.Text>
                </Form.Group>
                {!isPending && (
                    <Button className="submit-btn" type="submit" variant="primary">
                        Submit
                    </Button>
                )}
                {isPending && (
                    <Button
                        className="submit-btn"
                        type="submit"
                        variant="primary"
                        disabled
                    >
                        Submitting...
                    </Button>
                )}
            </Form>
        </div>
    );
};

export default PracticalForm;
