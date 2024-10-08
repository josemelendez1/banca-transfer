import { useState } from "react";
import AllAccounts from "../../components/AllAccounts";
import Layout from "../../components/Layout";
import { useAuth } from "../../provider/AuthProvider";
import { HeadProvider } from "../../provider/HeadProvider";

const Accounts = () => {
    const title = "Cuentas";
    const { user } = useAuth();
    const [ search, setSearch ] = useState("");

    return (
        <>
            <HeadProvider title={title} />
            <Layout title={title} user={user} search={search} setSearch={(e) => setSearch(e.target.value)}>
                <div className="w-full h-auto grid grid-col-1 grid-rows-[auto]">
                    <AllAccounts search={search} />
                </div>
            </Layout>
        </>
    );
}

export default Accounts;