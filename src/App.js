import { useContext } from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { CreatorAuthContext } from './utils/CreatorAuthContext';
import CreatorLogin from './components/pages/CreatorLogin';
import CreatorSignUp from './components/pages/CreatorSignUp';
import CreatorSidebar from './components/CreatorSidebar';
import DiscoverCampaigns from './components/pages/DiscoverCampaigns';
import SelectIndustries from './components/pages/SelectIndustries';
import SimpleNavigationBar from './components/SimpleNavigationBar';
import AddSocials from './components/pages/AddSocials';
import PendingApproval from './components/pages/PendingApproval';
import InstagramSocials from './components/pages/InstagramSocials';
import AddMedia from './components/pages/AddMedia';
import FailedApproval from './components/pages/FailedApproval';

function App() {

  const { creatorId } = useContext(CreatorAuthContext);
  
  return (
    <div className="App">
      <Router>

        <div className="flex">
          {
            creatorId == null ? 
            <Routes>
                <Route path='/creator_login' element={
                  <>
                  <CreatorLogin />
                  </>
                }>
                </Route>

                <Route path='/creator_signup' element={
                  <>
                  <CreatorSignUp />
                  </>
                }>
                </Route>

                <Route path='/*' element={
                  <>
                  <CreatorLogin />
                  </>
                }>
                </Route>

            </Routes>

            :
            <Routes>

                <Route path="/select_industry" element={
                  <>
                  <SelectIndustries />
                  </>
                }>
                </Route>

                <Route path="/add_socials" element={
                  <>
                  <AddSocials />
                  </>
                }>
                </Route>

                <Route path="/add_media" element={
                  <>
                  <AddMedia />
                  </>
                }>
                </Route>

                <Route path="/instagram_social/*" element={
                  <>
                  <InstagramSocials />
                  </>
                }>
                </Route>

                <Route path="/pending_approval" element={
                  <>
                  <PendingApproval />
                  </>
                }>
                </Route>

                <Route path="/failed_approval" element={
                  <>
                  <FailedApproval />
                  </>
                }>
                </Route>


                <Route path="/discover_campaigns" element={
                  <>
                  <CreatorSidebar />
                  <DiscoverCampaigns />
                  </>
                }>
                </Route>

                <Route path="/*" element={
                  <>
                  <CreatorSidebar />
                  <DiscoverCampaigns />
                  </>
                }>
                </Route>

                
              
            </Routes>
          }
          </div>
        </Router>
    </div>
  );
}

export default App;
