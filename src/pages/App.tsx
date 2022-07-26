import { useState, useEffect } from 'react'
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "../services/B2C";
import { PageLayout, IdTokenClaims } from "../ui.js";
import Button from "react-bootstrap/Button";

import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/Layout';



const IdTokenContent = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance, 
   * an array of all accounts currently signed in and an inProgress value 
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { accounts } = useAuth();
  const [idTokenClaims, setIdTokenClaims] = useState(null);
  console.log('idTokenClaims ', idTokenClaims);
  function GetIdTokenClaims() {
    setIdTokenClaims(accounts[0].idTokenClaims)
  }

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      {idTokenClaims ?
        <IdTokenClaims idTokenClaims={idTokenClaims} />
        :
        <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
      }
    </>
  );
};

const MainContent = () => {

  const { instance, accounts } = useMsal();

  console.log(accounts);
  /**
   * Using the event API, you can register an event callback that will do something when an event is emitted. 
   * When registering an event callback in a react component you will need to make sure you do 2 things.
   * 1) The callback is registered only once
   * 2) The callback is unregistered before the component unmounts.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
   */


  return (
    <div className="App">
      <AuthenticatedTemplate>
        <IdTokenContent />
      </AuthenticatedTemplate>

      <button onClick={() => instance.loginRedirect(loginRequest)}>LOGIN</button>
      <UnauthenticatedTemplate>
        <h5 className="card-title">Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </div>
  );
};


function App() {
  return (
    <Layout>
      <MainContent />
    </Layout>

  )
}

export default App
