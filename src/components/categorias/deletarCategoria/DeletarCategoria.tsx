import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';
import Categoria from '../../../models/Categoria';
import { buscar, deletar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';  // Importando o spinner
import { toastAlerta } from '../../../utils/toastAlerta';

function DeletarCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [loading, setLoading] = useState<boolean>(false);  // Estado de carregamento

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function retornar() {
        navigate("/categorias");
    }

    async function deletarCategoria() {
        setLoading(true);  // Inicia o carregamento
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            toastAlerta('Categoria apagada com sucesso', 'sucesso');
        } catch (error) {
            toastAlerta('Erro ao apagar a Categoria', 'erro');
        } finally {
            setLoading(false);  // Finaliza o carregamento
            retornar();
        }
    }

    return (
        <div className='fundoLogao'>
            <div className='pt-24'></div>
            <div className="container flex flex-col items-center justify-center mx-auto w-1/2">
                <h1 className="text-4xl text-center my-8">
                    Deletar Categoria
                </h1>
                <p className="text-center font-semibold mb-4">
                    Você tem certeza de que deseja apagar a Categoria a seguir?
                </p>
                <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                    <header className="py-2 px-6 bg-red-300 text-white font-body font-bold text-2xl">
                        {categoria.nome}
                    </header>
                    <p className="p-8 text-lg font-body text-zinc-700 bg-slate-200">
                        {categoria.descricao}
                    </p>
                    <div className="flex">
                        <button
                            className="bg-gray-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-gray-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform w-full py-2"
                            onClick={retornar}
                        >
                            Não
                        </button>
                        <button
                            className="bg-lime-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-indigo-400 hover:text-lime-400 hover:opacity-75 active:scale-95 transition-transform transform w-full py-2 flex items-center justify-center"
                            onClick={deletarCategoria}
                            disabled={loading}  // Desativa o botão durante o carregamento
                        >
                            {loading ? (
                                <RotatingLines
                                    strokeColor="#fff"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                />
                            ) : (
                                'Sim'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletarCategoria;
