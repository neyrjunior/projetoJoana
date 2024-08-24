import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';
import logo_b from '../../assets/icons/logo_b.png';
import logo_s from '../../assets/icons/logo_s.png';
import logo_r from '../../assets/icons/logo_r.png';
import menuIcon from '../../assets/icons/menu.png';
import cartIcon from '../../assets/icons/cart.png';
import { toastAlerta } from '../../utils/toastAlerta';
import { Circles } from 'react-loader-spinner';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { usuario, handleLogout, quantidadeItems } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function logout() {
    handleLogout();
    toastAlerta('Usuário deslogado com sucesso', 'sucesso');
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleLoginClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 300);
  }

  let navbarCadCat = null;
  let navbarCadProd = null;
  let navbarSair = null;
  let navbarCat = null;
  let navbarPerfil = null;

  if (usuario.token !== '' && usuario.usuario === 'root@root.com') {
    navbarCadCat = (
      <Link
        to="/cadastroCategoria"
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Cadastrar Categoria
      </Link>
    );
    navbarCadProd = (
      <Link
        to="/cadastroProduto"
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Cadastrar Produtos
      </Link>
    );

    navbarPerfil = (
      <Link
        to="/perfil"
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Perfil
      </Link>
    );

    navbarSair = (
      <Link
        to="/login"
        onClick={logout}
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Sair
      </Link>
    );
    navbarCat = (
      <Link
        to="/categorias"
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Categorias
      </Link>
    );
  } else if (usuario.token !== '') {
    navbarSair = (
      <Link
        to="/login"
        onClick={logout}
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Sair
      </Link>
    );

    navbarPerfil = (
      <Link
        to="/perfil"
        className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
      >
        Perfil
      </Link>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Circles
            visible={true}
            height="200"
            width="200"
            ariaLabel="circles-loading"
            color="black"
          />
        </div>
      ) : (
        <nav
          className={`fixed w-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
            } bg-[linear-gradient(to_bottom,_rgba(0,_0,_0,_0.8)_0%,_rgba(0,_0,_0,_0)_100%)]`}
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex flex-grow items-center justify-start space-x-4 rtl:space-x-reverse">
              <button
                onClick={handleLoginClick}
                className="font-title py-2 px-4 text-stone-100 hover:text-zinc-900 rounded transition-colors duration-600"
              >
                Login
              </button>
              <Link
                to="/produtos"
                className="font-title py-2 px-4 text-stone-100 hover:text-zinc-900 rounded transition-colors duration-600"
              >
                Produtos
              </Link>
            </div>
            <div className="flex items-center justify-center w-auto pl-20">
              <a href="/home" className="flex items-center">
                <div className="logoContainer">
                  <img src={logo_b} className="logoImage" alt="Logo Blue" />
                  <img src={logo_r} className="logoImage" alt="Logo Red" />
                  <img src={logo_s} className="logoImage" alt="Logo Silver" />
                </div>
              </a>
            </div>
            <div className="flex flex-grow items-center justify-end space-x-4 rtl:space-x-reverse">
              <Link
                to="/about"
                className="font-title py-2 px-4 text-stone-100 hover:text-zinc-900 rounded transition-colors duration-600"
              >
                Sobre nós
              </Link>
              <Link
                to="/contact"
                className="font-title py-2 px-4 text-stone-100 hover:text-zinc-900 rounded transition-colors duration-600"
              >
                Contato
              </Link>
              <Link
                to="/carrinho"
                className="relative block text-stone-100 transition-colors duration-600"
              >
                <div className="relative inline-block group">
                  <div className="bg-stone-100 rounded-full p-2 transition-opacity duration-600 group-hover:opacity-60">
                    <img
                      src={cartIcon}
                      alt="Carrinho"
                      className="w-6 h-6 transition-opacity duration-600 group-hover:opacity-60"
                    />
                  </div>
                  {quantidadeItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 font-body text-stone-100 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {quantidadeItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </nav>
      )}

      {!isVisible && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center justify-center"
            aria-controls="navbar-hamburger"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <img
              src={menuIcon}
              alt="Ícone Menu"
              className="w-12 h-12 shadow- rounded-full border-2 border-zinc-900 border-opacity-100 hover:w-14 hover:h-14"
            />
          </button>
          <div
            className={`${isOpen ? 'block' : 'hidden'
              } absolute top-full right-0 mt-2 w-64 bg-zinc-900 rounded-lg shadow-lg z-20`}
          >
            <div className="flex flex-col font-medium rounded-lg font-body">
              <Link
                to="/home"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Login
              </Link>
              <Link
                to="/produtos"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Produtos
              </Link>
              <Link
                to="/carrinho"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Carrinho
              </Link>
              <Link
                to="/about"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Sobre nós
              </Link>
              <Link
                to="/contact"
                className="font-title block py-2 px-4 text-red-600 hover:text-stone-100 hover:bg-zinc-700 rounded transition-colors duration-600"
              >
                Contato
              </Link>
              {navbarCat}
              {navbarCadCat}
              {navbarCadProd}
              {navbarPerfil}
              {navbarSair}
            </div>
          </div>
        </div>
      )}
    </>
  );
}