import { Card, Col } from 'react-bootstrap';
import PDFLinker from './PDFLinker';
import { subjects } from '../assets/static-info.json';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const CardComponent = ({ data, setData, handler, type, upload, parentData }) => {
    const [show, setShow] = useState(false);
    let descriptor, description;
    if (type === 'notes' || type === 'practical') {
        descriptor = 'Description';
        if (data.description.trim() === '') {
            description = <span className='no-description'>No description found</span>
        } else {
            description = <span className='description'>{data.description.trim()}</span>
        }
    } else {
        descriptor = 'Year';
        description = <span className='description'>{data.year}</span>
    }

    let x = (new Date(data.uploadedAt)).toString().split(' ', 5);;
    let upload_date = x[0] + ',' + x[2] + ' ' + x[1] + ', ' + x[3] + ' at ' + x[4];
    x = data.name.split('-');
    const displayName = x.slice(1, x.length-1).join('-');

    const remover = (event) => {
        handleClose();
        handler(type, event, setData, parentData);
    }
    const handleClose = () => setShow(false);
    const confirmation = () => setShow(true);

    return (

        <>
            <Col className='card-component'>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            {type === 'practical'
                                ?
                                <Card.Text>
                                    <span className='descriptor'>{'Practical No.:'} </span>
                                    <span>{data.practical_number}</span>
                                </Card.Text>
                                :
                                null
                            }
                            <span className='descriptor'>{descriptor}: </span> <span>{description}</span>
                        </Card.Text>
                        {
                            upload === true ?
                                (<Card.Text className='subject-description' >
                                    <span className='descriptor'>Subject:</span> {subjects[data.subject].name}
                                </Card.Text>)
                                : null
                        }
                        <PDFLinker fileName={data.name} displayName={displayName} />
                    </Card.Body>
                    <Card.Footer>
                        {upload === false ?
                            <div className='upload-user'>
                                <span className='footer-descriptor'> Uploaded by:  </span>{data.user.username}
                            </div>
                            : null}
                        <div className='upload-date'>
                            <span className='footer-descriptor'> Uploaded on:  </span>{upload_date}
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body>Are you sure you want to delete?</Modal.Body>
                            <Modal.Footer>
                                <Button id={data._id} variant='success' onClick={remover}>
                                    Yes
                                </Button>
                                <Button variant='secondary' onClick={handleClose}>
                                    No
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {upload ?
                            <Button className='delete-btn' variant='danger' onClick={confirmation}>
                                Delete
                            </Button>
                            : null}
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )

}

export default CardComponent;