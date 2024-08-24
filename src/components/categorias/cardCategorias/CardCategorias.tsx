import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {

    const { usuario } = useContext(AuthContext)
    let admPermCat = null

    if (usuario.token != "" && usuario.usuario == "root@root.com") {
        admPermCat = (

            <div className="flex justify-end pt-6">
                <Link to={`/editarCategoria/${categoria.id}`} className='bg-lime-500 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-lime-400 hover:text-red-700 hover:opacity-75 active:scale-95 '>
                    <button>Editar Categoria</button>
                </Link>
                <Link to={`/deletarCategoria/${categoria.id}`} className='bg-red-700 text-stone-100 font-body font-bold text-sm m-2 p-3 rounded-lg hover:bg-red-700 hover:text-lime-400 hover:opacity-75 active:scale-95 '>
                    <button>Deletar Categoria</button>
                </Link>
            </div>

        )
    }

    return (
        <div className="flex flex-col rounded-2xl w-80 bg-red-300 shadow-xl">
            <div className="flex flex-col p-8">
                <h3 className="text-3xl font-title font-bold text-center text-zinc-900 pb-6">Categoria</h3>
                <h4 className="text-2xl font-subtitle font-bold text-center text-zinc-900 pb-6">{categoria.nome}</h4>
                <div className=" text-lg font-body text-center text-zinc-900">{categoria.descricao}</div>
                {admPermCat}
            </div>
        </div>
    )
}

export default CardCategorias