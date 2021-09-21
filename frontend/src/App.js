import ScetSpaceHead from './components/ScetSpaceHead';
import Footer from './components/Footer';
import Home from './pages/Home';
import Error from './pages/Error';
import SemesterPage from './pages/SingleSemesterPage';
import SubjectPage from './pages/SubjectPage';
import ProjectsPage from './pages/ProjectsPage';
import NotesForm from './pages/NotesForm';
import SingleProject from './pages/SingleProjectPage';
import MidpaperForm from './pages/MidpaperForm';
import ProjectsForm from './pages/ProjectsForm';
import UserUploads from './pages/UserUploads';
import PracticalForm from './pages/PracticalForm';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios.get('/api/checkAuthentication')
      .then(res => {
        setLoggedIn(res.data.authenticated);
        setUser(res.data.user);
        setChecked(true);
      })
      .catch((error) => {
        setLoggedIn(false)
        setUser(null);
        setChecked(true);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <ScetSpaceHead loggedIn={loggedIn} user={user} />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/sems/:cur_sem'>
              <SemesterPage />
            </Route>
            <Route exact path='/subj/:subj'>
              <SubjectPage />
            </Route>
            <Route exact path='/subj/:subj/upload-notes'>
              <NotesForm loggedIn={loggedIn} checked={checked} />
            </Route>
            <Route exact path='/subj/:subj/upload-midpaper'>
              <MidpaperForm loggedIn={loggedIn} checked={checked} />
            </Route>
            <Route exact path='/subj/:subj/upload-practical'>
              <PracticalForm loggedIn={loggedIn} checked={checked} />
            </Route>
            <Route exact path='/projects/:id'>
              <SingleProject />
            </Route>
            <Route path='/projects'>
              <ProjectsPage />
            </Route>
            <Route exact path='/upload_project'>
              <ProjectsForm loggedIn={loggedIn} checked={checked} />
            </Route>
            <Route exact path='/uploads'>
              <UserUploads loggedIn={loggedIn} user={user} checked={checked} />
            </Route>
            <Route path="*">
              <Error error={{ status: 404, message: "Page not found" }} />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
