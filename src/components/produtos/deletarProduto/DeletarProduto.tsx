import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { Produto } from '../../../models/Produto';
import { buscar, deletar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';  // Importando o spinner
import { toastAlerta } from '../../../utils/toastAlerta';

function DeletarProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [loading, setLoading] = useState<boolean>(false);  // Estado de carregamento

  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
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
    navigate('/produtos');
  }

  async function deletarProduto() {
    setLoading(true);  // Inicia o carregamento
    try {
      await deletar(`/produtos/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      toastAlerta('Produto apagado com sucesso', 'sucesso');
    } catch (error) {
      toastAlerta('Erro ao apagar o Produto', 'erro');
    } finally {
      setLoading(false);  // Finaliza o carregamento
      retornar();
    }
  }

  return (
    <div className='fundoLogao'>
      <div className='pt-24'></div>
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">Deletar Produto</h1>

        <p className="text-center font-semibold mb-4">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>

        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
          <header className="py-2 px-6 bg-red-300 text-white font-bold text-2xl">
            {produto.nome}
          </header>
          <div className="p-8 bg-slate-200 flex flex-col items-center">
            <p className="text-xl mb-4">{produto.descricao}</p>
            {produto.image && (
              <img
                src={produto.image}
                alt="Imagem do Produto"
                className="w-48 h-48 object-cover rounded"
              />
            )}
          </div>
          <div className="flex gap-4 p-4">
            <button
              onClick={retornar}
              className="bg-red-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-red-400 hover:text-stone-700 hover:opacity-75 active:scale-95 transition-transform transform flex-1"
            >
              Não
            </button>
            <button
              onClick={deletarProduto}
              disabled={loading}  // Desativa o botão durante o carregamento
              className="bg-lime-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform flex-1"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RotatingLines
                    strokeColor="#fff"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                </div>
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

export default DeletarProduto;
