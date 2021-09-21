import { Card, Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';

const ProjectComponent = ({ project, upload = false, handler, setData, parentData }) => {
    const [show, setShow] = useState(false);

    const description = project.description.trim() === '' ? (
        <span className='no-descriptor'> No description </span>
    ) : (
        project.description
    );
    let tags = project.techstack.map(tag => (
        <LinkContainer key={Math.random().toString(36).slice(2)} to={`/projects?tags=${tag}`}>
            <Button className='tag-btn'>{tag}</Button>
        </LinkContainer>
    ));

    let x = (new Date(project.uploadedAt)).toString().split(" ", 5);;
    let upload_date = x[0] + "," + x[2] + " " + x[1] + ", " + x[3] + " at " + x[4];

    const remover = (event) => {
        handleClose();
        handler("project", event, setData, parentData);
    }

    const handleClose = () => setShow(false);
    const confirmation = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button id={project._id} variant="success" onClick={remover}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <Card.Body>
                    <Card.Title className="project-name">{project.name}
                        <LinkContainer to={`/projects/${project._id}`} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="arrow-image bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </LinkContainer>
                    </Card.Title>
                    <Card.Text className="project-description">{description}</Card.Text>
                    <div className="project-techstack">
                        <span className="descriptor">Tags: </span> {tags}
                    </div>
                    <div className='contact-links'>
                        <a target="_blank" rel="noreferrer" className='mail-icon' href={`mailto:${project.user.userid}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                            </svg>
                        </a>
                        {project.github ? (
                            <a target="_blank" rel="noreferrer" className='github-icon' href={`${project.github}`} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </a>
                        ) : null}
                    </div>
                </Card.Body>
                <Card.Footer>
                    {upload === false ?
                        <div className="upload-user">
                            <span className='footer-descriptor'> Uploaded by:  </span>{project.user.username}
                        </div>
                        : <span className='no-data'></span>}
                    <div className="upload-date">
                        <span className='footer-descriptor'> Uploaded on:  </span>{upload_date}
                    </div>
                    {upload ?
                        <Button className='delete-btn' variant='danger' onClick={confirmation}>
                            Delete
                        </Button>
                        : null}
                </Card.Footer>
            </Card >
        </>
    )
}

export default ProjectComponent
