import useFetch from "../hooks/useFetch";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ProjectSearch from "../components/ProjectSearch";
import Loading from "../components/Loading";
import Error from './Error';
import ProjectWrapper from "../components/ProjectWrapper";

const ProjectsPage = () => {
    let query = new URLSearchParams(useLocation().search);
    let tags = query.getAll("tags");
    let query_string = "";
    let search_results;
    if (tags.length !== 0) {
        query_string += "?";
        let search = "Search results for"
        for (let i = 0; i < tags.length - 1; i++) {
            search += ' "' + tags[i] + '", '
            query_string += "tags=" + tags[i] + "&";
        }
        search += ' "' + tags[tags.length - 1] + '"';
        search_results = <div className='search-results'>{search}</div>
        query_string += "tags=" + tags[tags.length - 1];
    } else {
        search_results = <span className="no-search"></span>;
    }

    const { data, isPending, error } = useFetch("/api/projects" + query_string);

    return (
        <>
            {isPending && <Loading />}
            {error && <Error error={error} />}
            {data && (
                <>
                    <h2 id="project-heading">Projects</h2>
                    <LinkContainer to="/upload_project">
                        <Button
                            id="project-upload-btn"
                            className="upload-btn"
                            variant="primary"
                        >
                            Upload Project
                        </Button>
                    </LinkContainer>
                    <hr></hr>
                    <ProjectSearch />
                    {search_results}
                    <ProjectWrapper projects={data.projects} />
                </>
            )}
        </>
    );
};

export default ProjectsPage;
