import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loginRequest } from '../services/B2C';

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
                <h1>teta</h1>
                :
                <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
            }
        </>
    );
};


export function SingIn() {
    const { instance, accounts } = useMsal();
    // const { accounts } = useAuth();
    console.log('accounts', accounts);

    return (
        <Flex
            width="100vw"
            maxWidth={1100}
            justify="center"
            align="center"
            mx="auto"
            height="100vh"
        >
            <Button
                colorScheme="blue"
                onClick={() => instance.loginRedirect(loginRequest)}
            >LOGIN
            </Button>
            <AuthenticatedTemplate>
                {accounts[0]?.name}
            </AuthenticatedTemplate>
        </Flex>
        // <div className="App">
        //     <AuthenticatedTemplate>
        //         <IdTokenContent />
        //     </AuthenticatedTemplate>

        //     <button onClick={() => instance.loginRedirect(loginRequest)}>LOGIN</button>
        //     <UnauthenticatedTemplate>
        //         <h5 className="card-title">Please sign-in to see your profile information.</h5>
        //     </UnauthenticatedTemplate>
        // </div>

    )
}