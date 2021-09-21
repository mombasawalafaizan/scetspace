import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error = ({ error }) => {
    return (
        <div className="error-main">
            <h2 className="error-status">Error - {error.status}</h2>
            <hr></hr>
            <div className="error-message">{error.message}</div>
            <Link to="/">
                <Button className="back-to-home-btn" variant="outline-secondary">
                    Back to Home Page
                </Button>
            </Link>
        </div>
    );
}

export default Error;