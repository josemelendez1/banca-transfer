import { Button, Dialog, DialogPanel, DialogTitle, Textarea } from "@headlessui/react";
import AccountBalance from "../components/AccountBalance";
import Layout from "../components/Layout";
import RecentTransactions from "../components/RecentTransactions";
import Welcome from "../components/Welcome";
import { useAuth } from "../provider/AuthProvider";
import { HeadProvider } from "../provider/HeadProvider";
import { useState } from "react";
import { Info } from "lucide-react";

import axios from "axios";

const Dashboard = () => {
    const title = "Inicio";
    const { user, account, setAccount } = useAuth();
    const [ depositOpen, setDepositOpen ] = useState(false);
    const [ withDrawOpen, setwithDrawOpen ] = useState(false);
    const [ transferOpen, setTransferOpen ] = useState(false);

    const [ depositForm, setDepositForm ] = useState({
        accountNumber: account ? account.accountNumber : null,
        amount: 0
    });

    const [ depositErrors, setDepositErrors ] = useState({
        amount: null
    });

    const [ withDrawForm, setWithDrawForm ] = useState({
        amount: 0
    });

    const [ withDrawErrors, setWithDrawErrors ] = useState({
        amount: null,
        limit: null
    });

    const [transferForm, setTransferForm] = useState({
        destAccount: "",
        amount: 0,
        description: ""
    });

    const [transferErrors, setTransferErrors] = useState({
        destAccount: null,
        amount: null,
        description: null,
        transferLimit: null,
        sameAccount: null
    });

    const handleDeposit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8090/account/deposit", {
            "accountNumber": account.accountNumber,
            "amount": depositForm.amount
        })
        .then(response => {
            const data = response.data;
            if (data) {
                setAccount({
                    ...account,
                    balance: data.balance
                });

                setDepositForm({
                    ...depositForm,
                    amount: 0
                });

                setDepositOpen(false);
            }
        })
        .catch(error => {
            const amount = error.response?.data?.amount;

            if (amount) {
                setDepositErrors({
                    amount: amount
                });
            }
        });
    }

    const handleWithDraw = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8090/account/withDraw", {
            "accountNumber": account.accountNumber,
            "amount": withDrawForm.amount
        })
        .then(response => {
            const data = response.data;
            if (data) {
                setAccount({
                    ...account,
                    balance: data.balance
                });

                setWithDrawForm({
                    ...depositForm,
                    amount: 0
                });

                setwithDrawOpen(false);
            }
        })
        .catch(error => {
            const data = error.response?.data;

            if (data) {
                setWithDrawErrors({
                    amount: data.amount,
                    limit: data.withDrawLimit
                });
            }
        });
    }

    const handleTransfer = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8090/transfer/store", {
            amount: transferForm.amount,
            description: transferForm.description,
            originAccount: account.accountNumber,
            destAccount: transferForm.destAccount,
        })
        .then(response => {
            const data = response.data;
            if (data) {
                setAccount({
                    ...account,
                    balance: data.originAccount.balance
                });

                setTransferErrors({
                    destAccount: null,
                    amount: null,
                    description: null,
                    transferLimit: null,
                    sameAccount: null
                });

                setTransferForm({
                    destAccount: "",
                    amount: 0,
                    description: ""
                });

                setTransferOpen(false);
            }
        })
        .catch(error => {
            const data = error.response?.data;

            if (data) {
                setTransferErrors({
                    destAccount: data.destAccount,
                    amount: data.amount,
                    description: data.description,
                    transferLimit: data.transferLimit,
                    sameAccount: data.sameAccount
                });
            }
        });
    }

    return (
        <>
            <HeadProvider title={title} />
            <Layout 
                title={title} 
                user={user} 
                setTransferOpen={(value) => setTransferOpen(value)} 
                setDepositOpen={(value) => setDepositOpen(value)}
                setwithDrawOpen={(value) => setwithDrawOpen(value)}
            >
                <div className="w-full h-auto grid grid-cols-3 grid-rows-[auto_auto] gap-4">
                    <Welcome user={user} setDepositOpen={(value) => setDepositOpen(value)} />
                    <AccountBalance account={account} setWithDrawOpen={(value) => setwithDrawOpen(value)} />
                    <RecentTransactions accountNumber={account && account.accountNumber}/>
                </div>
                <Dialog open={depositOpen} as="div" className="relative z-50 focus:outline-none" onClose={() => setDepositOpen(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 bg-gray-950 bg-opacity-10">
                            <DialogPanel
                                transition
                                as="form"
                                onSubmit={handleDeposit}
                                className="w-full max-w-md rounded-xl bg-white border border-gray-100 shadow-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-base/7 font-medium text-gray-900">
                                    Depositar Dinero
                                </DialogTitle>
                                <div>
                                    <div className="mt-2">
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            required
                                            value={depositForm.amount}
                                            onChange={(e) => setDepositForm({
                                                ...depositForm,
                                                amount: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                        />
                                        { depositErrors.amount &&
                                            <p className="flex items-start gap-1 mt-2 text-xs text-red-500">
                                                <Info className="w-4 h-4" />
                                                <span>{ depositErrors.amount }</span>
                                            </p>  
                                        }
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-md bg-orange-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-orange-500 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-orange-600"
                                    >
                                    Depositar
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
                <Dialog open={withDrawOpen} as="div" className="relative z-50 focus:outline-none" onClose={() => setwithDrawOpen(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 bg-gray-950 bg-opacity-10">
                            <DialogPanel
                                transition
                                as="form"
                                onSubmit={handleWithDraw}
                                className="w-full max-w-md rounded-xl bg-white border border-gray-100 shadow-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-base/7 font-medium text-gray-900">
                                    Retirar Dinero
                                </DialogTitle>
                                <div>
                                    <div className="mt-2">
                                        <input
                                            id="withDraw"
                                            name="withDraw"
                                            type="number"
                                            required
                                            value={withDrawForm.amount}
                                            onChange={(e) => setWithDrawForm({
                                                ...withDrawForm,
                                                amount: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                        />
                                        { (withDrawErrors.amount || withDrawErrors.limit) &&
                                            <p className="flex items-start gap-1 mt-2 text-xs text-red-500">
                                                <Info className="w-4 h-4" />
                                                <span>{ withDrawErrors.amount ? withDrawErrors.amount : withDrawErrors.limit }</span>
                                            </p>  
                                        }
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-md bg-orange-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-orange-500 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-orange-600"
                                    >
                                        Retirar
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
                <Dialog open={transferOpen} as="div" className="relative z-50 focus:outline-none" onClose={() => setTransferOpen(false)}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 bg-gray-950 bg-opacity-10">
                            <DialogPanel
                                transition
                                as="form"
                                onSubmit={handleTransfer}
                                className="w-full max-w-md rounded-xl bg-white border border-gray-100 shadow-md p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-base/7 font-medium text-gray-900">
                                    Transferir Dinero
                                </DialogTitle>
                                <div className="mt-3">
                                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Numero de Cuenta Destino
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="destAccount"
                                            name="destAccount"
                                            type="text"
                                            value={transferForm.destAccount}
                                            onChange={(e) => setTransferForm({
                                                ...transferForm,
                                                destAccount: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                        />
                                        { (transferErrors.destAccount || transferErrors.sameAccount) &&
                                            <p className="flex items-start gap-1 mt-2 text-xs text-red-500">
                                                <Info className="w-4 h-4" />
                                                <span>{ transferErrors.destAccount ? transferErrors.destAccount : transferErrors.sameAccount }</span>
                                            </p>  
                                        }
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Monto
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            value={transferForm.amount}
                                            onChange={(e) => setTransferForm({
                                                ...transferForm,
                                                amount: e.target.value
                                            })}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                        />
                                        { (transferErrors.amount || transferErrors.transferLimit) &&
                                            <p className="flex items-start gap-1 mt-2 text-xs text-red-500">
                                                <Info className="w-4 h-4" />
                                                <span>{ transferErrors.amount ? transferErrors.amount : transferErrors.transferLimit }</span>
                                            </p>  
                                        }
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                        Descripción (Opcional)
                                    </label>
                                    <Textarea
                                        className="block mt-1 w-full resize-none rounded-lg border-0 py-1.5 ring-1 ring-inset ring-gray-300 px-3 text-sm sm:leading-6
                                            data-[focus]:ring-2 data-[focus]:ring-inset data-[focus]:ring-orange-500 text-gray-900"
                                        rows={5}
                                        value={transferForm.description}
                                        onChange={(e) => setTransferForm({
                                            ...transferForm,
                                            description: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="mt-4">
                                    <Button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-md bg-orange-400 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-orange-500 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-orange-600"
                                    >
                                        Transferir
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </Layout>
        </>
    );
}

export default Dashboard