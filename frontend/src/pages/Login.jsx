import { useState } from "react"
import axios from "axios"
import { Info, LoaderCircle } from "lucide-react"
import { HeadProvider } from "../provider/HeadProvider"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../provider/AuthProvider"

const Login = () => {
    
    const { handleToken } = useAuth();
    
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: null,
        password: null,
        token: null
    });

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        
        axios.post("http://localhost:8090/user/login", form)
        .then(response => {
            const token = response.data?.token;

            if (response.status === 200 && token) {
                setErrors({
                    username: null,
                    password: null,
                    token: null
                });

                handleToken(token);
                navigate("/inicio", {replace: true});
            }
        })
        .catch(error => {
            const data = error.response?.data;
            if (error.status === 400 && data) {
                setErrors({
                    username: data.username,
                    password: data.password,
                    token: data.token
                });

                if (data.token) {
                    setForm({
                        ...form,
                        password: ""
                    });
                }
            }
        })
        .finally(() => {
            setLoading(false);
        });
    } 
 
    return (
        <>
            <HeadProvider title="Acceso" />
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="banca transfer"
                        src="/logo-transparent.png"
                        className="mx-auto h-20 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Inicia sesión en tu cuenta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de Usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={form.username}
                                    onChange={(e) => setForm({
                                        ...form,
                                        username: e.target.value
                                    })}
                                    autoComplete="name"
                                    disabled={loading}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                />
                                { errors.username &&
                                    <p className="flex items-start gap-1 mt-2 text-xs text-red-500">
                                        <Info className="w-4 h-4" />
                                        <span>{ errors.username }</span>
                                    </p>  
                                }
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    required
                                    onChange={(e) => setForm({
                                        ...form,
                                        password: e.target.value
                                    })}
                                    disabled={loading}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                />
                                { (errors.token || errors.password) &&
                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-500">
                                        <Info className="w-4 h-4" />
                                        <span>{ errors.token ? errors.token : errors.password }</span>
                                    </p>  
                                }
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center items-center gap-2 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                <span>Iniciar Sesión</span>
                                { loading &&
                                    <LoaderCircle className="w-5 h-5 animate-spin" />
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        ¿No tienes cuenta?{' '}
                        <a href="/registro" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Crea una nueva aquí
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Login