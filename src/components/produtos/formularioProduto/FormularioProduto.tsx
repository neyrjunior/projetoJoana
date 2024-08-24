import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { Produto } from '../../../models/Produto';
import Categoria from '../../../models/Categoria';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { toastAlerta } from '../../../utils/toastAlerta';

function FormularioProduto() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: '',
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: '',
    quantidade: 0,
    descricao: '',
    preco: 0,
    categoria: null,
    image: '',
    usuario: null,
  });

  const [loading, setLoading] = useState(false);

  async function buscarProdutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategorias() {
    await buscar('/categorias', setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/produtos');
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta('Produto atualizado com sucesso', 'sucesso');
      } else {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta('Produto cadastrado com sucesso', 'sucesso');
      }
      retornar();
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info');
        handleLogout();
      } else {
        toastAlerta('Erro ao processar o Produto', 'erro');
      }
    } finally {
      setLoading(false);
    }
  }

  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className='fundoLogao'>
      <div className='pt-24'></div>
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">
          {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-lg">
          <form onSubmit={gerarNovoProduto} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="nome">Nome do produto</label>
              <input
                value={produto.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                type="text"
                placeholder="Nome"
                name="nome"
                required
                className="border-2 border-slate-700 rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="descricao">Descrição do produto</label>
              <input
                value={produto.descricao}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                type="text"
                placeholder="Descrição"
                name="descricao"
                required
                className="border-2 border-slate-700 rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="preco">Preço do produto</label>
              <input
                value={produto.preco}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                type="number"
                placeholder="Preço"
                name="preco"
                required
                className="border-2 border-slate-700 rounded p-2"
                step="0.01"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image">URL da imagem do produto</label>
              <input
                value={produto.image}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                type="text"
                placeholder="URL da imagem"
                name="image"
                required
                className="border-2 border-slate-700 rounded p-2"
              />
              {produto.image && (
                <img
                  src={produto.image}
                  alt="Imagem do Produto"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>Categoria do produto</p>
              <select
                name="categoria"
                id="categoria"
                className="border p-2 border-slate-800 rounded"
                onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
              >
                <option value="" selected disabled>
                  Selecione uma categoria
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                disabled={carregandoCategoria || loading}
                type="submit"
                className='bg-lime-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform flex-1'
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <RotatingLines
                      strokeColor="#18181b"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  </div>
                ) : id !== undefined ? 'Editar' : 'Cadastrar'}
              </button>
              <button
                onClick={retornar}
                className='bg-red-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-red-400 hover:text-stone-700 hover:opacity-75 active:scale-95 transition-transform transform flex-1'
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioProduto;