import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const RecentTransactions = ({ accountNumber }) => {

    const [transfers, setTransfers] = useState([]);
    var localizedFormat = require("dayjs/plugin/localizedFormat");
    var localeFormat = require("dayjs/locale/es");
    dayjs.extend(localizedFormat);
    dayjs.locale(localeFormat);

    useEffect(() => {
        if (accountNumber) {
            axios.get(`http://localhost:8090/transfer/origin?accountNumber=${accountNumber}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTransfers(prev => [
                        ...prev,
                        ...response.data ? response.data : []
                    ]);
                }
            });

            axios.get(`http://localhost:8090/transfer/dest?accountNumber=${accountNumber}`)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTransfers(prev => [
                        ...prev,
                        ...response.data ? response.data : []
                    ]);
                }
            });
        }
    }, [accountNumber]);

    const isWoner = (transfer) => {
        return transfer.originAccount?.accountNumber === accountNumber;
    }

    console.log(transfers);

    return (
        <div className="w-full rounded-xl border border-gray-200 p-7 shadow-sm col-span-3">
            <div className="w-full h-auto flex items-center justify-between">
                <p className="uppercase text-gray-400 font-medium text-sm">
                    Transacciones Recientes
                </p>
                <Link to="/transacciones" className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 hover:underline">
                    <span>Ver todas las transacciones</span>
                    <ArrowRight className="size-4" />
                </Link>
            </div>
            <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    { transfers.filter((value, index, self) =>
                        index === self.findIndex((t) => (t.id === value.id)
                        )).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0,3).map(transfer => (
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

export default RecentTransactions;