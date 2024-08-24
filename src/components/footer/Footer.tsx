import { At, GithubLogo } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const threshold = document.body.scrollHeight - 50;

        if (scrollPosition < threshold) {
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

    return (
        <>
            <div className={`fixed justify-center bottom-0 w-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gradient-to-t from-black/80 to-transparent text-neutral-100`}>
                <div className="container flex flex-col items-center py-4 pl-44">
                    <p className="text-xl font-bold text-red-400">Joana | Copyright: Generation Brasil</p>
                    <p className="text-lg text-red-400">Nos acompanhe nas redes!</p>
                    <div className="flex gap-2 mt-2">
                        <a className="text-red-400 hover:text-red-700 transition-colors duration-300" href="https://github.com/joaninha-pi">
                            <GithubLogo size={32} />
                        </a>
                        <a className="text-red-400 hover:text-red-700 transition-colors duration-300" href="https://linktr.ee/joana_pi">
                            <At size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}