import { LinkContainer } from "react-router-bootstrap";
import { Button, Accordion, Card, Row, Container } from 'react-bootstrap';
import CardComponent from "./CardComponent";

const CardWrapper = ({ subject, setData, handler, data, type, upload = false }) => {
    let message, word, key, component;
    if (type === "notes") {
        word = "notes";
        key = "1";
    }
    else if (type === 'practical') {
        word = "practicals";
        key = "2";
    }
    else {
        word = "midterm papers";
        key = "3";
    }

    if (data.length === 0) {
        message = <div className="no-data">{`No ${word} are uploaded.`}</div>
    } else {
        let grid = data.map(obj => <CardComponent
            parentData={data}
            data={obj}
            type={type}
            setData={setData}
            handler={handler}
            upload={upload}
            key={obj._id} />)
        message = (
            <Container>
                <Row xs={1} md={2} lg={3}>
                    {grid}
                </Row>
            </Container>
        );
    }

    if (upload) {
        component = (<Card className='card-wrapper' >
            < Card.Header >
                {type}
            </Card.Header >
            <Card.Body>
                {message}
            </Card.Body>
        </Card >);

    } else {
        component = (
            <Card className='card-wrapper'>
                <Accordion.Toggle as={Card.Header} eventKey={key}>
                    {type}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={key}>
                    <Card.Body>
                        {message}
                    </Card.Body>
                </Accordion.Collapse>

                <Card.Footer>
                    <LinkContainer to={`${subject}/upload-${type}`} >
                        <Button className="upload-btn" variant="primary">Upload</Button>
                    </LinkContainer>
                </Card.Footer>

                <hr></hr>
            </Card>
        );
    }

    return component;
}

export default CardWrapper;