import { Button } from "react-bootstrap";

const Login = () => {
    return (
        <a href={process.env.REACT_APP_AUTH_REDIRECT}>
            <Button className='login-btn'>Login</Button>
        </a>
    );
}

export default Login;