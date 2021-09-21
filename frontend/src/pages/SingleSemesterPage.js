import { semester as sems } from '../assets/static-info';
import { useParams } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';
import Error from './Error';

const SingleSemester = () => {
    const { cur_sem } = useParams();
    let cur_sem_name = "sem" + cur_sem;
    if (!(cur_sem_name in sems)) {
        return <Error error={{ status: 404, message: "Page not found" }} />;
    }
    let semLinks = sems[cur_sem_name].subjects.map(subj => {
        return (
            <div className="subject-link" key={subj.id}>
                <ButtonLink data={subj} type='subj' />
            </div>
        )
    });

    return (
        <>
            <h2>Subjects offered in Semester {cur_sem}</h2>
            <hr></hr>
            {semLinks}
        </>
    );
}

export default SingleSemester;