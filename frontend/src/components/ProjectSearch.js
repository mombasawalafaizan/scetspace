import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Tokenfield from "tokenfield";
import "tokenfield/dist/tokenfield.min.js";
import "tokenfield/dist/tokenfield.css";

const ProjectSearch = () => {
    const [tech_tag, setTechTag] = useState();
    const tokenfield_ref = useRef();
    const history = useHistory();

    const handleClick = (event) => {
        event.preventDefault();
        let tags = tech_tag.getItems();
        if (tags.length !== 0) {
            let query_string = "?";
            for (let i = 0; i < tags.length - 1; i++) {
                query_string += ("tags=" + tags[i].name + "&");
            }
            query_string += ("tags=" + tags[tags.length - 1].name);
            history.push('/projects' + query_string);
        }
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
        setTechTag(tf);
    }, []);

    return (
        <div className="project-search-bar">
            <Form.Control
                placeholder='Enter tech stack to search for projects'
                ref={tokenfield_ref}
                aria-describedby="techstackHelp"
            />
            <Button className="search-btn" onClick={handleClick}>Search</Button>
        </div>
    );
}

export default ProjectSearch;