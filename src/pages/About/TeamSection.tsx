import React from "react";
import labout from "./labout.png";

const TeamSection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-red-300 bg-opacity-30 p-10 rounded shadow flex items-center">
            <img src="./src/pages/About/labout.png" alt="arado" className="w-1/3 mr-6" />
            <div>
              <h2 className="text-3xl font-body font-semibold mt-8 mb-6">
                Nossa história
              </h2>
              <p className=" text-justify font-body text-zinc-900 ml-4">
                O e-commerce Joana das iniciais joaninhas na agricultura, surgiu
                da ideia desenvolvedores que se conheceram em um bootcamp de
                java full stack, trazendo produtos alinhados a ODS 12 com o uso
                eficiente de reutilização de recursos naturais e agregando valor
                as commodites.
              </p>
            <br />
              <h2 className="text-3xl font-body font-semibold mr-4 mb-8">
                Quem somos
              </h2>
              <p className="text-1xl text-justify font-body text-zinc-900 ml-8">
                Joana é um e-commerce business-to-consumer de produtos
                oferecidos diretamente aos consumidores com foco na venda e
                reformulação industrial do agronegócio sustentável brasileiro,
                trabalhando commenores desperdícios na cadeia de produção e
                fabricação de nossos produtos contam com tecnologias de e
                agricultura regenerativa.
                </p>
                <br />
                <p className="text-1xl text-justify font-body text-zinc-900 ml-8">
                  Com o intuito de aumentar a produtividade, podendo contribuir
                  para processos mais assertivos como:
                </p>
              <br />
              <p className="text-1xl text-justify font-body text-zinc-900">
                <ul className="list-disc ml-10">
                  <li>
                    Monitoramento mais preciso das plantações, identificando
                    precocemente a presença de pragas;
                  </li>
                  <li>
                    Redução de custos em diversos insumos, como fertilizantes e
                    água;
                  </li>
                  <li>
                    Aumento da produtividade, corrigindo problemas mais
                    rapidamente e agilizando os processos;
                  </li>
                  <li>
                    Redução dos impactos ambientais, com uma agricultura mais
                    sustentável que escoa menos produtos químicos em rios;
                  </li>
                  <li>
                    Aumento da segurança, proporcionando mais segurança na
                    realização dos processos e reduzindo as falhas;
                  </li>
                  <li>
                    Melhor controle de produção e qualidade, com operações
                    automatizadas;
                  </li>
                </ul>
              </p>
              <br />
              <p className="text-1xl font-body text-justify text-zinc-900 ml-8">
                Somos fornecedores de produtos orgânicos de soja, feijão,
                ervilha, açúcar, sementes de girassol, café e mais diversos
                produtos que contenham a fixação biológica de nitrogênio como
                fonte para a nutrição das plantas, entre outros produtos
                agrícolas com baixa emissão de carbono, o tratamento de
                dejetos animais, como fertilizantes, adubos naturais e controle
                de pragas utilizando de alternativas com menor impacto, como
                joaninhas como controladora de pragas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
