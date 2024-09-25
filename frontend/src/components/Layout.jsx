import { Link } from "react-router-dom";
import { House, ArrowLeftRight, ChevronDown, MoveLeft, MoveRight, LogOut, LoaderCircle, Users } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Layout = ({ title, children, user, setTransferOpen, setDepositOpen, setwithDrawOpen, setSearch, search }) => {

    const isActive = (text) => {
        return text.toLowerCase() === title.toLowerCase();
    }

    const asideItems = [
        {
            text: "Inicio",
            icon: <House className='w-4 h-4'/>,
            href: "/inicio",
            validate: true
        },
        {
            text: "Transacciones",
            icon: <ArrowLeftRight className='w-4 h-4' />,
            href: "/transacciones",
            validate: !user?.roles.includes("ROLE_ADMIN"),
        },
        {
            text: "Cuentas",
            icon: <Users className="w-4 h-4" />,
            href: "/cuentas",
            validate: user?.roles.includes("ROLE_ADMIN"),
        }
    ]

    return (
        <main className="w-full relative min-h-screen bg-white grid grid-cols-[auto_1fr] grid-rows-auto">
            <aside className="bg-[rgb(241_245_249/var(--tw-bg-opacity))] z-50 hidden sm:block sm:relative min-h-screen max-w-min">
                <ul className="max-w-min h-full relative gap-2 px-5 pt-5 flex flex-col">
                    <li className="flex gap-3 items-center">
                        <img 
                            src="/logo-transparent.png" 
                            className={`w-10 h-10 max-h-10 max-w-10`} 
                            alt="Banca Transfer" 
                        />
                        <h5 className="font-semibold text-gray-900 whitespace-nowrap text-base">
                            Banca Transfer
                        </h5>
                    </li>
                    { asideItems.map((item, index) => (
                        item.validate &&
                        <AsideItem key={index} text={item.text} icon={item.icon} href={item.href} active={isActive(item.text)} />
                    ))}
                </ul>
            </aside>
            <section className="bg-white">
                <header className="w-full px-5 py-3">
                    <nav className={`w-full flex items-center ${setSearch ? 'justify-between' : 'justify-end'}`}>
                        { setSearch && 
                            <div className="flex w-full items-center max-w-[50%]">
                                <label htmlFor="simple-search" className="sr-only">Buscar</label>
                                <div className="relative w-full">
                                    <input 
                                        type="text" 
                                        id="search" 
                                        className="bg-[rgb(241_245_249/var(--tw-bg-opacity))] border border-transparent focus:bg-white focus:border-orange-200 text-gray-900 text-sm rounded-lg focus:ring-orange-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        value={search}
                                        onChange={(e) => setSearch(e)}
                                        placeholder="Buscar..." 
                                        required
                                    />
                                </div>
                                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-orange-400 rounded-lg shadow-md hover:bg-orange-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">Buscar</span>
                                </button>
                            </div>
                        }
                        <div className="w-full max-w-min flex items-center justify-center gap-3">
                            {(setTransferOpen && setDepositOpen && setwithDrawOpen) && 
                            <Menu as="div" className="h-full">
                                <MenuButton className="inline-flex whitespace-nowrap items-center gap-2 bg-orange-400 rounded-2xl py-1.5 px-4 text-sm/6 font-semibold text-white shadow-md focus:outline-none data-[hover]:bg-orange-500 data-[open]:bg-orange-500 data-[focus]:outline-1 data-[focus]:outline-white">
                                    Mover Dinero
                                    <ChevronDown className="size-4" />
                                </MenuButton>
                                <MenuItems
                                    as="div"
                                    transition
                                    anchor="bottom end"
                                    className="w-52 z-10 origin-top-right shadow-xl rounded-xl m-2 border-white/5 bg-white/5 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <div className="bg-white w-full h-full p-1 border border-gray-100 rounded-xl">
                                        <MenuItem>
                                            <button onClick={() => setDepositOpen(true)} className="text-sm hover:bg-orange-100 text-gray-800 group flex w-full items-center gap-2 rounded-lg py-2 px-3">
                                                <MoveLeft className="size-4 text-gray-400" />
                                                Depositar
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button onClick={() => setwithDrawOpen(true)} className="text-sm hover:bg-orange-100 text-gray-800 group flex w-full items-center gap-2 rounded-lg py-2 px-3">
                                                <MoveRight className="size-4 text-gray-400" />
                                                Retirar
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button onClick={() => setTransferOpen(true)} className="text-sm hover:bg-orange-100 text-gray-800 group flex w-full items-center gap-2 rounded-lg py-2 px-3">
                                                <ArrowLeftRight className='w-4 h-4 text-gray-400' />
                                                Transferir
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                            }
                            <Menu as="div" className="h-full flex items-center">
                                <MenuButton as="button" className="w-full inline-flex items-center justify-between gap-2">
                                    <div className="inline-flex items-center gap-2 h-full">
                                        { user
                                            ? <>
                                                <img 
                                                    className="inline-block h-9 w-9 rounded-full shadow-md" 
                                                    src={`https://ui-avatars.com/api/?background=fb923c&color=fff&name=${user.username}`} 
                                                    alt="" 
                                                />
                                                <p className="text-gray-900 text-sm font-medium truncate max-w-32">
                                                    {user.username} 
                                                </p>
                                            </>
                                            : <LoaderCircle className="w-5 h-5 animate-spin" />
                                        }
                                        
                                    </div>
                                    <ChevronDown className="size-4 text-gray-400" />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 z-10 origin-top-right shadow-xl rounded-xl m-2 border-white/5 bg-white/5 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <div className="bg-white w-full h-full p-1 border border-gray-100 rounded-xl">
                                        <MenuItem>
                                            <Link to="/salir" className="text-sm hover:bg-orange-100 text-gray-800 group flex w-full items-center gap-2 rounded-lg py-2 px-3">
                                                <LogOut className="size-4" />
                                                Cerrar Sesión
                                            </Link>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </nav>
                </header>
                <article className="px-5 py-3">
                    { children }
                </article>
            </section>
        </main>
    );
}

const AsideItem = ({ icon, text, href, active }) => {
    return (
        <Link to={href}>
            <li className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                    active
                    ? 'bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-600'
                    : 'hover:bg-gray-200 text-gray-500'
                }
                `}
            >
                {icon}
                <span className="sm:w-40 sm:ml-4 overflow-hidden transition-all text-nowrap text-sm font-normal truncate">
                    {text}
                </span>
            </li>
        </Link>
    );
}

export default Layout;