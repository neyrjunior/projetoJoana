import React, { useState, useContext } from 'react';
import { Produto } from '../../../models/Produto';
import { AuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  const { adicionarProduto, removerProduto } = useContext(AuthContext);
  const { usuario } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col rounded-2xl max-w-sm bg-red-300 bg-opacity-45 shadow-xl overflow-hidden">
      <figure
        className="flex justify-center items-center rounded-2xl cursor-pointer overflow-hidden"
        onClick={openModal}
      >
        <img
          src={produto.image}
          alt="Preview Produto"
          className="relative rounded-t-2xl w-full h-48 object-cover transition-transform transform hover:scale-110"
        />
      </figure>
      <div className="flex flex-col p-4 flex-grow">
        <h3 className="text-xl font-title font-bold text-center text-zinc-900 truncate">{produto.nome}</h3>
        <p className="text-lg font-body text-right text-zinc-900 mt-5">R$ {produto.preco.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-center gap-2">
          <button
            className="bg-lime-500 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform"
            onClick={() => adicionarProduto(produto)}
          >
            Adicionar ao carrinho
          </button>
          <button
            className="bg-red-700 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-red-700 hover:text-lime-400 hover:opacity-75 active:scale-95 transition-transform transform"
            onClick={() => removerProduto(produto.id)}
          >
            Remover do carrinho
          </button>
        </div>
        {usuario.token !== "" && usuario.usuario === "root@root.com" && (
          <div className="flex justify-center gap-2">
            <Link
              to={`/editarProduto/${produto.id}`}
              className="bg-lime-500 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform"
            >
              Editar produto
            </Link>
            <Link
              to={`/deletarProduto/${produto.id}`}
              className="bg-red-700 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-red-700 hover:text-lime-400 hover:opacity-75 active:scale-95 transition-transform transform"
            >
              Deletar produto
            </Link>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="flex justify-end">
              <button className="text-red-500 font-body font-bold underline" onClick={closeModal}>
                Fechar
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={produto.image}
                alt="Produto"
                className="relative rounded-2xl max-w-full h-64 object-cover mb-4 transition-transform transform hover:scale-110 z-0"
              />
              <h2 className="text-2xl font-title font-bold text-zinc-900 text-center">{produto.nome}</h2>
              <p className="text-base font-subtitle font-bold text-zinc-700 text-center">{produto.categoria?.descricao}</p>
              <p className="text-lg font-body text-zinc-700 text-justify">{produto.descricao}</p>
              <p className="text-2xl font-body font-extrabold text-zinc-900">R$ {produto.preco.toFixed(2)}</p>
              <div className="flex justify-center gap-2 w-full">
                <button
                  className="bg-lime-500 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 transition-transform transform"
                  onClick={() => {
                    adicionarProduto(produto);
                    closeModal();
                  }}
                >
                  Adicionar ao carrinho
                </button>
                <button
                  className="bg-red-700 text-stone-100 font-body font-bold text-sm p-3 rounded-lg hover:bg-red-700 hover:text-lime-400 hover:opacity-75 active:scale-95 transition-transform transform"
                  onClick={() => {
                    removerProduto(produto.id);
                    closeModal();
                  }}
                >
                  Remover do carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardProduto;
