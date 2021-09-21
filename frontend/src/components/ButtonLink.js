import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

const ButtonLink = ({ data, type }) => {
    return (
        < LinkContainer to={`/${type}/${data.id}`}>
            <Button className='button-link'>
                {data.name}
            </Button>
        </ LinkContainer>

    );
}

export default ButtonLink;