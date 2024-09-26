import { useEffect, useState } from "react";
import axios from "axios";

const AllAccounts = ({ search }) => {

    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8090/account/")
        .then(response => {
            if (Array.isArray(response.data)) {
                setAccounts(response.data);
            }
        });
    }, []);
    
    return (
        <div className="w-full h-auto overflow-x-auto">
            <table className="mt-5 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[0.7rem] text-gray-400 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numero de Cuenta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Saldo Actual
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    { accounts.filter(e => {
                        if (search.trim().length === 0) {
                            return true;
                        } else {
                            return e.user?.username.includes(search) || `${e.accountNumber}`.includes(search);
                        }
                    }).map(account => (
                        <tr key={account.id} className="bg-white dark:bg-gray-800 ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {account.user?.username}
                            </th>
                            <td className="px-6 py-4">
                                {account.accountNumber}
                            </td>
                            <td className="px-6 py-4">
                                ${account.balance}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllAccounts;