import { MsalProvider } from "@azure/msal-react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import App from "./pages/App";
import { Dashboard } from "./pages/Dashboard";
import { SingIn } from "./pages/SingIn";

export function AppRoutes({ msalInstance }: any) {

    return (
        <MsalProvider instance={msalInstance}>
            <Routes>
                <Route path="/" element={

                    <SingIn />
                }
                />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </MsalProvider>
    )
}