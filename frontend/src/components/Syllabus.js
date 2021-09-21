import PDFLinker from "./PDFLinker";
import { Card } from "react-bootstrap";

const Syllabus = ({ subject_name, subject_code }) => {
  return (
    <>
      <Card className="syllabus-container">
        <Card.Header>Syllabus</Card.Header>
        <Card.Body>
          <PDFLinker
            fileName={`${subject_code}_syllabus.pdf`}
            displayName={`${subject_name} Syllabus`}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Syllabus;
