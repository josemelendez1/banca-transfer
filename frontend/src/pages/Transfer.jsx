import { useState } from "react";
import AllTransactions from "../components/AllTransactions";
import Layout from "../components/Layout";
import { useAuth } from "../provider/AuthProvider";
import { HeadProvider } from "../provider/HeadProvider";

const Transfer = () => {
    const title = "Transacciones";
    const { user } = useAuth();

    const [search, setSearch] = useState(""); 

    return (
        <>
            <HeadProvider title={title} />
            <Layout title={title} user={user} search={search} setSearch={(e) => setSearch(e.target.value)}>
                <AllTransactions search={search} />
            </Layout>
        </>
    );
}

export default Transfer;