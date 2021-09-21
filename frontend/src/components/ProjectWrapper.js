import ProjectComponent from "./ProjectComponent";
import { Card, Row, Container, Col } from "react-bootstrap";

const ProjectWrapper = ({ projects, upload = false, setData, handler }) => {
    let project_info;
    if (projects.length === 0) {
        project_info = <div className="no-data">No projects found.</div>
    } else if (projects.length !== 0) {
        project_info = (
            <Container className='project-container'>
                <Row xs={1} sm={1} md={1} lg={2}>
                    {projects.map((project) => (
                        <Col key={project._id}>
                            <div className="project-tile">
                                <ProjectComponent
                                    project={project}
                                    upload={upload}
                                    setData={setData}
                                    handler={handler}
                                    parentData={projects} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
    return (upload ?
        <Card className='card-wrapper'>
            <Card.Header> Projects </Card.Header>
            <Card.Body> {project_info} </Card.Body>
        </Card>
        : project_info);
}

export default ProjectWrapper;