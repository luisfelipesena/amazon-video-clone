import React from "react";
import { useFilmes } from "./utils/filmesIndex";
import { Header } from "./components/header/index";
import "./App.css";

const imagensPost = [
  "https://m.media-amazon.com/images/G/01/digital/video/sonata/SVOD_ROW_Utopia_S1_POST/cab69376-f66d-4085-9dd5-6fce65a5ea00._UR3000,600_SX1500_FMwebp_.jpg",
  "https://m.media-amazon.com/images/G/01/digital/video/sonata/CROW_BR_Paramount_MultiTitle_Sep20/79ffc91d-654c-425d-b9cd-fd0f036a4f48._UR3000,600_SX1500_FMwebp_.jpg",
  "https://m.media-amazon.com/images/G/01/digital/video/sonata/SVOD_ROW_SH_Halloween_2020/ea216c4f-de97-4bd4-a859-fd9a13374b91._UR3000,600_SX1500_FMwebp_.jpg",
  "https://m.media-amazon.com/images/G/01/digital/video/sonata/SVOD_ROW_TheLie/104b66f6-2dec-4e82-b60a-bece0e8aa982._UR3000,600_SX1500_FMwebp_.jpg",
  "https://m.media-amazon.com/images/S/sonata-images-prod/SVOD_ROW_AGRUTA/a2da81c0-10ac-4317-b98e-ea957db39fa2._UR3000,600_SX1500_FMwebp_.jpg",
];

function App() {
  const [post, setPost] = React.useState(imagensPost[0]);
  const [filmesASeguir, setASeguir] = React.useState([]);
  const { filmesRecomendados } = useFilmes(filmesASeguir, setASeguir);
  const [clicado, setClicado] = React.useState(false);

  return (
    <div className="App">
      <Header setASeguir={setASeguir}></Header>
      <div className="main">
        <div className="poster">
          <button
            onClick={() => {
              const index = imagensPost.indexOf(post);
              if (index !== -1) {
                if (imagensPost[index + 1]) {
                  setPost(imagensPost[index + 1]);
                } else {
                  setPost(imagensPost[0]);
                }
              }
            }}
          >
            <img
              src="https://systemuicons.com/images/icons/chevron_left.svg"
              alt="seta esquerda"
            ></img>
          </button>
          <div className="divPost">
            <img className="post" src={post} alt="poster"></img>
          </div>
          <button
            onClick={() => {
              const index = imagensPost.indexOf(post);
              if (index !== -1) {
                if (imagensPost[index - 1]) {
                  setPost(imagensPost[index - 1]);
                } else {
                  setPost(imagensPost[imagensPost.length - 1]);
                }
              }
            }}
          >
            <img
              src="https://systemuicons.com/images/icons/chevron_right.svg"
              alt="seta direita"
            ></img>
          </button>
        </div>

        <div className="filmes">
          <h3>Assista a seguir</h3>

          <div className="aSeguir">
            <ul>
              {filmesASeguir.length === 0 ? (
                <li>Carregando</li>
              ) : (
                filmesASeguir.map((filme) => (
                  <li
                    key={filme.id}
                    onClick={() => {
                      setClicado(true);
                      fetch(
                        `https://imdb-api.com/en/API/Trailer/k_zdh9dhch/${filme.id}`
                      )
                        .then((res) => res.json())
                        .then((dados) => {
                          if (dados.link) {
                            window.open(dados.link);
                          } else {
                            alert("Trailer não encontrado");
                          }

                          setClicado(false);
                        });
                    }}
                  >
                    <img
                      alt={filme.title}
                      src={filme.image}
                      className={clicado ? "carregando" : ""}
                    ></img>
                    <div>
                      {filme.title.length >= 15
                        ? `${filme.title.slice(0, 15)}...`
                        : filme.title}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          <h3>
            <img
              className="logoPrime"
              alt="logo prime"
              src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png"
            ></img>
            <span>Recomendados</span>
          </h3>
          <div className="primeRecomendados">
            <ul>
              {filmesRecomendados.length === 0 ? (
                <li>Carregando</li>
              ) : (
                filmesRecomendados.map((filme) => (
                  <li
                    key={filme.id}
                    onClick={() => {
                      setClicado(true);
                      fetch(
                        `https://imdb-api.com/en/API/Trailer/k_zdh9dhch/${filme.id}`
                      )
                        .then((res) => res.json())
                        .then((dados) => {
                          if (dados.link) {
                            window.location.href = dados.link;
                          } else {
                            alert("Trailer não encontrado");
                          }

                          setClicado(false);
                        });
                    }}
                  >
                    <img
                      alt={filme.title}
                      src={filme.image}
                      className={clicado ? "carregando" : ""}
                    ></img>
                    <div>
                      {filme.title.length >= 15
                        ? `${filme.title.slice(0, 15)}...`
                        : filme.title}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
