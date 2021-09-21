import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const NotesForm = ({ loggedIn, checked }) => {
  const { subj } = useParams();
  const [description, setDescription] = useState("");
  const [noteFile, setNoteFile] = useState();
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  function validateSubmit(event) {
    event.preventDefault();
    if (!noteFile) {
      setError("Please upload a file.");
    } else if (noteFile.type !== "application/pdf") {
      setError("Please choose a pdf file");
    } else if (noteFile.size > 10 ** 7) {
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

    formData.append("file", noteFile, noteFile.name);
    axios({
      method: "POST",
      url: "/api/subj/" + subj + "/upload_notes",
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

  return (
    <div className="notes-form">
      {error && (
        <Alert variant="danger" className="form-error">
          {error}
        </Alert>
      )}
      <h2 className="upload-form-heading">Upload notes</h2>
      <hr></hr>
      <Form onSubmit={validateSubmit} noValidate>
        <Form.Group className="notes-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Enter description of notes"
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
          <Form.Label>Upload notes</Form.Label>
          <Form.File
            type="file"
            onChange={(e) => setNoteFile(e.target.files[0])}
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

export default NotesForm;
