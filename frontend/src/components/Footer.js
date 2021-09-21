import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                        <div className='developer-contact'>
                            <h4>Developer:</h4>
                            Faizan Mombasawala<br />
                            <small>Sarvajanik College of Engineering and Technology</small><br />
                            <span className='footer-mail-descriptor'>Mail: </span>
                            <a target="_blank" rel="noreferrer" className='developer-mail' href={`mailto:mombasawalafaizan6@gmail.com`}>
                                mombasawalafaizan6@gmail.com
                            </a>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-techstack">
                            <h4>Tech Stack</h4>
                            <ul className="techs-list">
                                <li>Node.js</li>
                                <li>Express.js</li>
                                <li>React.js</li>
                                <li>MongoDB</li>
                                <li>Bootstrap CSS</li>
                                <li>Azure Blob</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;