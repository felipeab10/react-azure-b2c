import { MsalProvider } from "@azure/msal-react";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Content } from "./Content";
import { Header } from "./Header";
interface LayoutProps {
    children: ReactNode;
}


export function Layout({ children }: LayoutProps) {
    //const { msalInstance } = useAuth();
    return (
        <>
            {/* <Header /> */}
            < Content >
                {children}
            </Content >
        </>
    )
}