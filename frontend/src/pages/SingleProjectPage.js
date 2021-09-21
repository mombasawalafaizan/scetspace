import useFetch from "../hooks/useFetch";
import { useParams } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Button } from 'react-bootstrap';
import Loading from "../components/Loading";
import Error from "./Error";

const SingleProject = () => {
    const { id } = useParams();
    const { data, isPending, error } = useFetch("/api/projects/" + id);

    let github_link = <span className="no-github-link"></span>;
    let upload_date = "loading...";
    if (data) {
        let x = (new Date(data.project.uploadedAt)).toString().split(" ", 5);;
        upload_date = x[0] + "," + x[2] + " " + x[1] + ", " + x[3] + " at " + x[4];
        github_link = data.project.github ? (
            <a target="_blank" rel="noreferrer" className='github-icon' href={`${data.project.github}`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
            </a>
        ) : null;
    }

    return (
        <>
            {isPending && <Loading />}
            {error && <Error error={error} />}
            {data &&
                <div className="single-project">
                    <div className="single-project-body">
                        <h2 className="single-project-title">
                            {data.project.name}
                        </h2>
                        <div className="project-author-info">
                            <span>&#8212; </span>Published by {data.project.user.username} <br></br> on {upload_date}

                        </div>
                        <hr></hr>
                        <div className="single-project-description">
                            {data.project.description}
                        </div>
                        <div className="single-project-techstack">
                            {data.project.techstack.map(tag => (
                                <LinkContainer key={Math.random().toString(36).slice(2)} to={`/projects?tags=${tag}`}>
                                    <Button className="tag-btn" >
                                        {tag}
                                    </Button>
                                </LinkContainer>
                            ))}
                        </div>
                        <div className="single-project-contact-link">
                            <a target="_blank" rel="noreferrer" className='mail-icon' href={`mailto:${data.project.user.userid}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                </svg>
                            </a>
                            {github_link}

                        </div>
                    </div>
                </div>}
        </>
    );
}

export default SingleProject;