const AccountBalance = ({ account, setWithDrawOpen }) => {
    return (
        <div className="flex items-center justify-center flex-col gap-7 rounded-xl border border-gray-200 p-7 shadow-sm">
            <p className="uppercase text-gray-400 font-medium text-sm text-center">
                Saldo de la Cuenta {" "}
                <span className="text-gray-800 font-semibold">
                    { account && account.accountNumber }
                </span>
            </p>
            <h1 className="text-4xl text-gray-900 font-medium text-center">
                $ { account && account.balance }
            </h1>
            <button 
                onClick={() => setWithDrawOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-400 rounded-2xl py-1.5 px-4 text-sm/6 font-semibold text-white shadow-md focus:outline-none hover:bg-orange-500"
            >
                Retirar Fondos
            </button>
        </div>
    );
}

export default AccountBalance;