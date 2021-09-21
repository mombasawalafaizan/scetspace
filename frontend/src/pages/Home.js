import image from '../assets/subject_combo.jpg';

const Home = () => {
    return (
        <div className='homepage'>
            <div className="home-img">
                <img src={image} alt="books-study" className="index-image" />
            </div>
            <div className='scetspace-info'>
                <b>Scetspace</b> helps you to cater to all your academics needs by providing you with academics materials like notes, previous year midterm papers
                and syllabus for various subjects from each semester. You can also view projects of your peers in the projects section. As the saying goes;
                <i> "Knowledge increases by sharing"</i>, you can upload these materials by logging in with your SCET email-id.
            </div>
        </div>
    );
}

export default Home;