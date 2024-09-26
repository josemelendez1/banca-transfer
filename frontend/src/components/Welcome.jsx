import { LoaderCircle } from "lucide-react";

const Welcome = ({ user, setDepositOpen }) => {
    return (
        <div className="w-full rounded-xl border border-gray-200 p-7 shadow-sm lg:col-span-2">
            <p className="uppercase text-gray-400 font-medium text-sm">
                { user 
                    ? user.username
                    : <LoaderCircle className="w-5 h-5 animate-spin" />
                }
            </p>
            <h1 className="mt-5 text-4xl text-gray-900 font-medium">
                Bienvenido de Vuelta, { user 
                    ? user.username
                    : <LoaderCircle className="w-5 h-5 animate-spin" />
                } 👋
            </h1>
            <p className="mt-5 text-sm text-gray-800 font-normal">
                Todo parece estar bien y actualizado en tu cuenta desde tu última visita. 
                ¿Te gustaría depositar fondos?
            </p>
            <button onClick={() => setDepositOpen(true)} className="mt-5 inline-flex items-center gap-2 bg-orange-400 rounded-2xl py-1.5 px-4 text-sm/6 font-semibold text-white shadow-md focus:outline-none hover:bg-orange-500">
                Depositar Fondos
            </button>
        </div>
    );
}

export default Welcome;