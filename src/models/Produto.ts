import Categoria from "./Categoria";
import Usuario from "./Usuario.ts";

export interface Produto {
    id: number;
    nome: string;
    quantidade: number;
    descricao: string;
    preco: number;
    categoria: Categoria | null;
    image: string;
    usuario: Usuario | null;
}