import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import axios from "axios";

const MidpaperForm = ({ loggedIn, checked }) => {
  const { subj } = useParams();
  const [year, setYear] = useState("");
  const [midpaper, setMidpaper] = useState("");
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  function validateSubmit(event) {
    event.preventDefault();
    if (!midpaper) {
      setError("Please upload a midterm paper file.");
    } else if (!year) {
      setError("Please select the year in which the midterm paper was asked.");
    } else if (midpaper.type !== "application/pdf") {
      setError("Please choose a pdf file");
    } else if (midpaper.size > 10 ** 7) {
      setError("Size of PDF should be less than 10MB.");
    } else {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    setIsPending(true);

    const formData = new FormData();

    formData.append("year", year);
    formData.append("file", midpaper, midpaper.name);
    axios({
      method: "POST",
      url: "/api/subj/" + subj + "/upload_midpaper",
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
        setError("Midpaper for the given year is already uploaded.");
        setIsPending(false);
      });
  };

  if (error) {
    setTimeout(() => setError(""), 7000);
  }

  useEffect(() => {
    if (!loggedIn && checked) {
      window.location = process.env.REACT_APP_AUTH_REDIRECT;
    }
  }, [loggedIn, checked]);

  return (
    <div className="midpaper-form">
      {error && (
        <Alert variant="danger" className="form-error">
          {error}
        </Alert>
      )}
      <h2 className="upload-form-heading">Upload Midterm Paper</h2>
      <hr></hr>
      <Form onSubmit={validateSubmit}>
        <Form.Group className="midpaper-year">
          <Form.Control
            as="select"
            id="year-selection"
            onChange={(e) => setYear(e.target.value)}
            aria-label="Choose year"
          >
            <option value="">Paper belongs to which year?</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload midpaper file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setMidpaper(e.target.files[0])}
            aria-describedby="fileHelp"
          />
          <Form.Text id="fileHelp" muted>
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

export default MidpaperForm;
