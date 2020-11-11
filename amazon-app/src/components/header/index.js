import React from "react";
import { useForm } from "react-hook-form";

export const Header = (props) => {
  const { setASeguir } = props;
  const { register, handleSubmit } = useForm();

  return (
    <div className="header">
      <div className="esquerda">
        <a href="app.js">
          <img
            src="https://img01.products.bt.co.uk/content/dam/bt/portal/images/logos/tv/Amazon-Prime-logo-FULL-white.png"
            alt="Logo Amazon"
          ></img>
        </a>
        <ul>
          <li>Início</li>
          <li>Séries</li>
          <li>Filmes</li>
          <li>Infantil</li>
          <li>Canais</li>
        </ul>
      </div>

      <div className="direita">
        <div className="input">
          <form
            onSubmit={handleSubmit((data) => {
              if (data.nomeFilme && data.nomeFilme !== "") {
                setASeguir([]);
                fetch(
                  `https://imdb-api.com/en/API/Search/k_zdh9dhch/${data.nomeFilme}`
                )
                  .then((res) => res.json())
                  .then((dados) => {
                    const tempFilmes = dados.results;
                    const tempPesquisa = [];
                    tempFilmes.forEach((filme) => {
                      tempPesquisa.push(filme);
                    });
                    setASeguir(tempPesquisa);
                  });
              } else {
                fetch(
                  "https://imdb-api.com/en/API/MostPopularMovies/k_zdh9dhch"
                )
                  .then((res) => res.json())
                  .then((dados) => {
                    const filmes = dados.items;
                    const tempFilmes = [];
                    for (let i = 0; i < filmes.length; i++) {
                      tempFilmes.push(filmes[i]);
                    }
                    setASeguir(tempFilmes.slice(0, 12));
                  });
              }
            })}
          >
            <input name={"nomeFilme"} ref={register} placeholder="Busca" />
          </form>
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_174312.png"
            alt="Lupa"
          ></img>
        </div>
        <img
          src="https://www.elsevier.com/__data/assets/image/0016/102247/pure-icon-profile.png"
          alt="Usuário"
        ></img>
        <span>Luis Felipe</span>
      </div>
    </div>
  );
};
