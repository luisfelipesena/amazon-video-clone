import React from "react";

const useFilmes = (filmesASeguir, setASeguir) => {
  const [filmesRecomendados, setRecomendados] = React.useState([]);

  React.useEffect(() => {
    fetch("https://imdb-api.com/en/API/MostPopularMovies/k_zdh9dhch")
      .then((res) => res.json())
      .then((dados) => {
        const filmes = dados.items;
        const tempFilmes = [];
        for (let i = 0; i < filmes.length; i++) {
          tempFilmes.push(filmes[i]);
        }
        setASeguir(tempFilmes.slice(0, 12));
        setRecomendados(tempFilmes.slice(12, -4));
      });
  }, []);

  return { filmesASeguir, filmesRecomendados };
};

export { useFilmes };
