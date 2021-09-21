import { Accordion } from 'react-bootstrap';
import Loading from '../components/Loading';
import Syllabus from '../components/Syllabus';
import { subjects } from '../assets/static-info';
import Error from './Error';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CardWrapper from '../components/CardWrapperComponent';

const SubjectPage = () => {
  const { subj } = useParams();

  const { data, error, isPending } = useFetch('/api/subj/' + subj);

  return (
    <>
      {isPending && <Loading />}
      {error && <Error error={error} />}
      {data && (
        <>
          <h2>{subjects[subj].name}</h2>
          <hr></hr>
          <Syllabus subject_name={subjects[subj].name} subject_code={subj} />
          <Accordion defaultActiveKey='0'>
            <CardWrapper subject={subj} data={data.notes} type='notes' />
            <CardWrapper subject={subj} data={data.practical} type='practical' />
            <CardWrapper subject={subj} data={data.midterm} type='midpaper' />
          </Accordion>
        </>
      )}
    </>
  );
};

export default SubjectPage;
