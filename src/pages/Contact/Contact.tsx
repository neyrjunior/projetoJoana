import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import logo from '../../assets/icons/Logo.png'; // Caminho atualizado para o logo

export default function Contact() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {loading ? (
            <div className="flex justify-center items-center min-h-screen">
                <Circles
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="circles-loading"
                    color='black'
                />
            </div>
        ) : (
            <div className="w-full flex flex-col items-center bg-stone-100">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold font-body">Entre em contato!</h1>
                </div>
                
                <div className="relative p-6 bg-[#b91c1c] rounded-lg shadow-2xl shadow-red-800">
                    <div 
                        id='principal' 
                        className="p-6 rounded-lg w-[500px] bg-cover bg-no-repeat bg-center relative"
                        style={{ 
                            backgroundImage: `url(${logo})`, // Define o logo como background
                            backgroundColor: '#b91c1c',
                            backgroundSize: 'contain', // Ajusta o tamanho do logo
                            backgroundPosition: 'center' // Centraliza o logo
                        }}
                    >
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-white mb-2">Nome:</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-[#fca5a5] bg-opacity-30 p-2 rounded-tl rounded-tr text-white placeholder-white border-b-2 border-black"
                                    placeholder="Digite seu nome"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-white mb-2">Email:</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-[#fca5a5] bg-opacity-30 p-2 rounded-tl rounded-tr text-white placeholder-white border-b-2 border-black"
                                    placeholder="Digite seu email"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="text" className="block text-white mb-2">Mensagem:</label>
                                <textarea 
                                    className="w-full p-2 rounded-tl rounded-tr bg-[#fca5a5] bg-opacity-30 h-36 text-white placeholder-white border-b-2 border-black" 
                                    placeholder="Digite sua mensagem"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-[#18181b] text-stone-100 font-bold py-2 px-4 rounded-full hover:bg-[#fca5a5cc] transition duration-300"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
