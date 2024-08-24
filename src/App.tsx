import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/Cadastro/Cadastro';
import "./App.css";
import ListaCategorias from "./components/categorias/listaCategorias/ListaCategorias";
import ListaProdutos from "./components/produtos/listaProdutos/ListaProdutos";
import FormularioCategoria from "./components/categorias/formularioCategoria/FormularioCategoria";
import FormularioProduto from "./components/produtos/formularioProduto/FormularioProduto";
import DeletarCategoria from "./components/categorias/deletarCategoria/DeletarCategoria";
import DeletarProduto from "./components/produtos/deletarProduto/DeletarProduto";
import Carrinho from "./pages/Cart/Carrinho";
import Perfil from "./pages/perfil/perfil"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh] pt-[150px] pb-[180px] bg-stone-100 text-gray-800">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastroProduto" element={<FormularioProduto />} />
              <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
              <Route path="/cadastroCategoria" element={<FormularioCategoria />} />
              <Route path="/editarCategoria/:id" element={<FormularioCategoria />} />
              <Route path="/editarProduto/:id" element={<FormularioProduto />} />
              <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
              <Route path='/carrinho' element={<Carrinho />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}