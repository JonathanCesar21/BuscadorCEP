import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [data, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP!");
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("ops");
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <main className="main">
          <h2>CEP: {data.cep}</h2>
          <span>Logradouro: {data.logradouro}</span>
          <span>Complemento: {data.complemento}</span>
          <span>Bairro: {data.bairro}</span>
          <span>DDD: {data.ddd}</span>
          <span>
            Cidade: {data.localidade} {data.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
