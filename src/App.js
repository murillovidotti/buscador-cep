import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

import api from "./services/api";

function App() {
  const [input, SetInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 01310930/json/llll

    if (input === "") {
      alert("Insira algum CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      SetInput("");
    } catch {
      alert("Ops erro ao buscar!");
      SetInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="tittle">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite algum CEP"
          value={input}
          onChange={(e) => SetInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
