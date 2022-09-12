import { Route, Routes } from 'react-router-dom';
import { PeopleProvider, PatientsProvider, MasterProvider, LoginProvider } from './providers';
import { PeoplePage, LoginPage, SelectionPanelPage, PatientsPage } from './pages';
/* import { LoginPage } from './pages/LoginPage'; */

function App() {
  return (
    <>
      <PeopleProvider>
        <PatientsProvider>
          <MasterProvider>
            <LoginProvider>
              <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/people" element={<PeoplePage />}></Route>
                <Route path="/patient" element={<PatientsPage />}></Route>
                <Route path="/selectionPanel" element={<SelectionPanelPage />}></Route>


                <Route path="*" element={<LoginPage />}></Route>
              </Routes>
            </LoginProvider>
          </MasterProvider>
        </PatientsProvider>
      </PeopleProvider>
    </>
  );
}

export default App;
