import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

const Header = ({ signOut }) => {
  const handleSignOut = () => {
    signOut();  
  };

  return (
    <header className="main-head">
      <nav>
        <h1 id="logo"><b>Yelp Analytica</b></h1>
        <button onClick={handleSignOut} className="headerbutton">
          Sign Out
        </button>
      </nav>
    </header>
  );
};

function MyComponent({ url }) {
  return (
    <div>
      <iframe
        title="Quicksight Dashboard"
        width="1250"
        height="1450"
        src={url}>
      </iframe>
    </div>
  );
}

function Dashboard({ url }) {
  return (
    <div>
      <MyComponent url={url} />
    </div>
  );
}

function App({ signOut, user }) {
  const [dashboardUrl, setDashboardUrl] = useState("");

  const handleGeneralDashboardClick = () => {
    setDashboardUrl("https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/108439130681/dashboards/661f7b73-4c08-425b-a59b-24749ae013b7?directory_alias=madhurabhatsoori")
  };

  const handleBusinessDashboardClick = () => {
    setDashboardUrl("https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/108439130681/dashboards/7094838e-6ddf-4bec-9829-36e0c5c2c326?directory_alias=madhurabhatsoori");
  };

  return (
    <Router>
      <>
        <Header signOut={signOut} />
        <div className="content-container">
          <h1><b>Yelp Business Analysis</b></h1>

          {dashboardUrl && <Dashboard url={dashboardUrl} />}
          <div className="content-container">
            <button className="button" onClick={handleGeneralDashboardClick}>General Dashboard</button>
            <button className="button" onClick={handleBusinessDashboardClick}>Business specific Dashboard</button>
          </div>
        </div>
      </>
    </Router>
  );
}

export default withAuthenticator(App);