// src/CepInfo.js
import React, { useState } from 'react';
import axios from 'axios';
import './CepInfo.css'; // Importando o arquivo CSS

const CepInfo = () => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!cep) {
      setError('Por favor, insira um CEP válido.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      setCepData(response.data);
      console.log(response)
    } catch (err) {
      setError('Erro ao buscar informações do CEP. Verifique se o CEP está correto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cep-info-container">
      <h1 className="title">Buscar Informações do CEP</h1>
      <input
        className="cep-input"
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button className="search-button" onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <div className="error-message">{error}</div>}
      {cepData && (
        <div className="cep-data">
          <h2 className="data-title">Informações do CEP</h2>
          <p><strong>CEP:</strong> {cepData.cep}</p>
          <p><strong>Logradouro:</strong> {cepData.street}</p>
          <p><strong>Bairro:</strong> {cepData.neighborhood}</p>
          <p><strong>Cidade:</strong> {cepData.city}</p>
          <p><strong>Estado:</strong> {cepData.state}</p>
        </div>
      )}
    </div>
  );
};

export default CepInfo;
