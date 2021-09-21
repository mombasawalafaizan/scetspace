import axios from 'axios';
import Tokenfield from "tokenfield";
import "tokenfield/dist/tokenfield.min.js";
import "tokenfield/dist/tokenfield.css";
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const ProjectsForm = ({ loggedIn, checked }) => {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [github_link, setGithubLink] = useState('');
    const [techstack, setTechStack] = useState();
    const [error, setError] = useState();
    const [isPending, setIsPending] = useState(false);
    const tokenfield_ref = useRef();
    const history = useHistory();

    function validateSubmit(event) {
        event.preventDefault();
        if (name.trim() === "") {
            setError('Please enter project\'s name.');
        } else if (description.trim() === '') {
            setError('Please enter description.');
        } else if (techstack.getItems().length === 0) {
            setError('Enter at least one language, framework or domain which you have used.');
        } else if (github_link.trim() && /^https:\/\/github.com\/([-\w]+)\/([-\w]+)$/.test(github_link.trim()) === false) {
            setError('Enter a valid github link.');
        } else {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        setIsPending(true);
        let tokenfield_str = '';
        let arr = techstack.getItems();
        for (let i = 0; i < arr.length - 1; i++) {
            tokenfield_str += arr[i].name + ", ";
        }
        tokenfield_str += arr[arr.length - 1].name;

        axios({
            method: 'POST',
            url: '/api/projects/upload_project',
            data: {
                project_name: name,
                description: description,
                tokenfield: tokenfield_str,
                github_link: github_link
            }
        })
            .then(response => {
                setIsPending(false);
                if (response.status === 200) {
                    history.go(-1);
                }
            }
            ).catch(e => {
                console.error(e);
            })
    }

    useEffect(() => {
        let technologies = [
            { id: 1, name: "javascript" }, { id: 2, name: "react" }, { id: 3, name: "node" }, { id: 4, name: "python" }, { id: 5, name: "html" }, { id: 6, name: "css" }, { id: 7, name: "c++" }, { id: 8, name: "typescript" }, { id: 9, name: "rust" }, { id: 10, name: "scheme" }, { id: 11, name: "java" }, { id: 12, name: "kotlin" }, { id: 13, name: "'c#'" }, { id: 14, name: "perl" }, { id: 15, name: "php" }, { id: 16, name: "scala" }, { id: 17, name: "swift" }, { id: 18, name: "matlab" }, { id: 19, name: "sql" }, { id: 20, name: "r" }, { id: 21, name: "golang" }, { id: 22, name: "go" }, { id: 23, name: "ruby" }, { id: 24, name: "flutter" }, { id: 25, name: "dart" }, { id: 26, name: "mongodb" }, { id: 27, name: "postgre" }, { id: 28, name: "ajax" }, { id: 29, name: "jquery" }, { id: 30, name: "mysql" }, { id: 31, name: "postgresql" }, { id: 32, name: "sqlite" }, { id: 33, name: "redis" }, { id: 34, name: "mariadb" }, { id: 35, name: "redux" }, { id: 36, name: "oracle" }, { id: 37, name: "firebase" }, { id: 38, name: "elasticsearch" }, { id: 39, name: "express" }, { id: 40, name: "django" }, { id: 41, name: "flask" }, { id: 42, name: "rails" }, { id: 43, name: "laravel" }, { id: 44, name: "spring" }, { id: 45, name: "angular" }, { id: 46, name: "vue" }, { id: 47, name: "ember" }, { id: 48, name: "react native" }, { id: 49, name: "javafx" }, { id: 50, name: "backbone" }, { id: 51, name: "web" }, { id: 52, name: "ios" }, { id: 53, name: "android" }, { id: 54, name: "machine learning" }, { id: 55, name: "deep learning" }, { id: 56, name: "cyber security" }
        ]

        var tf = new Tokenfield({
            el: tokenfield_ref.current,
            form: true,
            items: technologies,
            newItems: true
        });
        setTechStack(tf);

    }, []);

    useEffect(() => {
        if (!loggedIn && checked) {
            window.location = process.env.REACT_APP_AUTH_REDIRECT;
        }
    }, [loggedIn, checked]);

    if (error) {
        setTimeout(() => setError(''), 7000);
    }

    return (
        <div className='projects-form'>
            {error && <Alert variant='danger' className='form-error'>{error}</Alert>}
            <h2 className='upload-form-heading'>Upload Project</h2>
            <hr></hr>
            <Form onSubmit={validateSubmit} noValidate>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        placeholder='Enter name of project'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Describe your project'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tech Stack</Form.Label>
                    <Form.Control
                        placeholder='Enter technology'
                        ref={tokenfield_ref}
                        aria-describedby="techstackHelp"
                    />
                    <Form.Text id="techstackHelp" muted>
                        Enter the programming languages, frameworks, database or domain of your project (eg. type "java" and press Enter)
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Github Link <span id="optional">(optional)</span></Form.Label>
                    <Form.Control
                        placeholder='https://github.com/name/project'
                        value={github_link}
                        onChange={(e) => setGithubLink(e.target.value)}
                    />
                </Form.Group>
                {!isPending &&
                    <Button className='submit-btn' type='submit' variant='primary'>
                        Submit
                    </Button>}
                {isPending &&
                    <Button className='submit-btn' type='submit' variant='primary' disabled>
                        Submitting...
                    </Button>}
            </Form>
        </div>
    );
}

export default ProjectsForm;