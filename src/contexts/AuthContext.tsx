import { createContext, ReactNode, useEffect } from "react";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { EventType, PublicClientApplication, InteractionType } from "@azure/msal-browser";
//@ts-ignore
import { msalConfig, loginRequest, b2cPolicies } from '../services/B2C';

interface AuthProps {
    children: ReactNode;

}

interface EventCallBack {
    eventType: string;
    error: {
        errorMessage: string;
    };
    interactionType: string;
    payload: any;
}


interface AuthContextProps {
    instance: any;
    accounts: any;

}

export const AuthContext = createContext({} as AuthContextProps);


export function AuthProvider({ children }: AuthProps) {

    const { instance, accounts } = useMsal();

    useEffect(() => {
        const callbackId = instance.addEventCallback((event: EventCallBack) => {
            if (event.eventType === EventType.LOGIN_FAILURE) {
                if (event.error && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
                    if (event.interactionType === InteractionType.Redirect) {
                        instance.loginRedirect(b2cPolicies.authorities.forgotPassword);
                    } else if (event.interactionType === InteractionType.Popup) {
                        instance.loginPopup(b2cPolicies.authorities.forgotPassword)
                            .catch(e => {
                                return;
                            });
                    }
                }
            }

            if (event.eventType === EventType.LOGIN_SUCCESS) {
                if (event?.payload) {
                    /**
                     * We need to reject id tokens that were not issued with the default sign-in policy.
                     * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
                     * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                     */
                    if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.forgotPassword) {
                        window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
                        return instance.logout();
                    }
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, []);



    return (
        <AuthContext.Provider value={{ instance, accounts }}>
            {children}
        </AuthContext.Provider>
    )
}