import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import logo from '../../assets/icons/logo_b.png'; // Importando o logo

function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <>
      <div className="fundoLogin min-h-screen flex items-center justify-center">
        <div 
          id="card" 
          className="w-[400px] h-[500px] rounded-[10px] pb-10 pl-10 pr-10 bg-red-300 flex flex-col justify-center items-center font-bold shadow-2xl shadow-black"
        >
          <form className="flex justify-center items-center flex-col gap-4 w-full" onSubmit={login}>
            <div className="flex flex-col justify-center items-center">
              <img src={logo} alt="Logo" className="h-32" /> {/* Substituindo o h1 pelo logo */}
              <div className="text-sm text-black font-title">Faça seu login</div>
            </div>
            <div className="flex flex-col font-body text-black w-full">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="Usuário"
                className="p-1 text-lg border-b-2 border-black rounded-tl rounded-tr focus:outline focus:outline-2 focus:outline-offset-2 bg-stone-100 text-zinc-800 w-full"
                value={usuarioLogin.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="flex flex-col font-body text-black w-full">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                className="p-1 text-lg border-b-2 border-black rounded-tl rounded-tr focus:outline focus:outline-2 focus:outline-offset-2 bg-stone-100 text-zinc-800 w-full"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <button type='submit' className="rounded text-stone-100 bg-black hover:bg-lime-600 w-1/2 py-2 flex justify-center font-body">
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Enviar</span>}
            </button>
            <p className="text-sm font-body text-black">
              Ainda não tem uma conta?{' '}
              <Link to="/cadastro" className="text-red-700 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
