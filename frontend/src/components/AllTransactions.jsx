import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../provider/AuthProvider";


const AllTransactions = ({ search }) => {
    const { account } = useAuth();
    const [transfers, setTransfers] = useState([]);
    var localizedFormat = require("dayjs/plugin/localizedFormat");
    var localeFormat = require("dayjs/locale/es");
    dayjs.extend(localizedFormat);
    dayjs.locale(localeFormat);

    useEffect(() => {
        if (account) {
            axios.get(`http://localhost:8090/transfer/origin?accountNumber=${account.accountNumber}`)
            .then(response => {
                setTransfers(prev => [
                    ...prev,
                    ...response.data ? response.data : []
                ]);
            });

            axios.get(`http://localhost:8090/transfer/dest?accountNumber=${account.accountNumber}`)
            .then(response => {
                setTransfers(prev => [
                    ...prev,
                    ...response.data ? response.data : []
                ]);
            });
        }
        return () => setTransfers([]);
    }, [account]);

    const isWoner = (transfer) => {
        return transfer.originAccount?.accountNumber === account?.accountNumber;
    }

    return (
        <div className="w-full h-auto relative overflow-x-auto ">
            <table className="mt-5 w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-[0.7rem] text-gray-400 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Usuario responsable
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Numero de cuenta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Monto
                        </th>
                        <th scope="col" className=" px-6 py-3">
                            Tipo
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    { transfers.filter((value, index, self) =>
                        index === self.findIndex((t) => (t.id === value.id)
                        )).filter(e => {
                            if (search.trim().length === 0) {
                                return true;
                            }

                            if (isWoner(e)) {
                                return e.destAccount.user.username.includes(search) || `${e.destAccount.accountNumber}`.includes(search);
                            } else {
                                return e.originAccount.user.username.includes(search) || `${e.originAccount.accountNumber}`.includes(search);
                            }
                        })
                        .sort((a, b) => new Date(b.date) - new Date(a.date)).map(transfer => (
                        <tr key={transfer.id} className="bg-white dark:bg-gray-800 ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {dayjs(transfer.date).format("LLL")}
                            </th>
                            <td className="px-6 py-4">
                                { isWoner(transfer) 
                                    ? transfer.destAccount?.user?.username 
                                    : transfer.originAccount?.user?.username 
                                }
                            </td>
                            <td className="px-6 py-4">
                                { isWoner(transfer) 
                                    ? transfer.destAccount?.accountNumber 
                                    : transfer.originAccount?.accountNumber 
                                }
                            </td>
                            <td className="px-6 py-4">
                                ${transfer.amount}
                            </td>
                            <td className="px-6 py-4">
                                { !isWoner(transfer)
                                    ?
                                    <span className="rounded-2xl bg-green-200 px-3 py-1.5 text-green-700 text-xs inline-flex items-center gap-2">
                                        <span>
                                            Deposito
                                        </span>
                                        <ArrowLeft className="size-3" />
                                    </span>
                                    :
                                    <span className="rounded-2xl bg-red-200 px-3 py-1.5 text-red-700 text-xs inline-flex items-center gap-2">
                                        <span>
                                            Retiro
                                        </span>
                                        <ArrowRight className="size-3" />
                                    </span>
                                }
                            </td>
                        </tr>    
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllTransactions;