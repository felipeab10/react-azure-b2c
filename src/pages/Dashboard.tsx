import { useMsal } from "@azure/msal-react";

export function Dashboard() {
    const { instance, accounts } = useMsal();
    // const { accounts } = useAuth();
    console.log('accounts', accounts);
    return (
        <h1>dashboard</h1>
    )
}