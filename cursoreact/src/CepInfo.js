import React, { useState } from 'react';
import axios from 'axios';
import './CepInfo.css';

const CepInfo = () => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formattedCep, setFormattedCep] = useState(''); // Estado para o CEP formatado

  const formatCep = (value) => {
    // Remove todos os caracteres que não sejam números
    const numericValue = value.replace(/\D/g, '');
    // Adiciona o traço após o quinto dígito
    return numericValue.replace(/(\d{5})(\d)/, '$1-$2');
  };

  const handleChange = (e) => {
    const inputCep = e.target.value;
    const formatted = formatCep(inputCep);
    setCep(inputCep); // Mantém o valor sem formatação
    setFormattedCep(formatted); // Armazena o valor formatado

    // Limpa os dados e a mensagem de erro ao digitar
    setCepData(null);
    setError('');
  };

  const handleSearch = async () => {
    // Remove o traço para a requisição
    const cepWithoutDash = cep.replace('-', '');
    if (!cepWithoutDash) {
      setError('Por favor, insira um CEP válido.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepWithoutDash}`);
      setCepData(response.data);
    } catch (err) {
      setError('Erro ao buscar informações do CEP. Verifique se o CEP está correto.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Chama a função de busca ao pressionar Enter
    }
  };

  const handleClear = () => {
    // Limpa o campo de input e os dados
    setCep('');
    setFormattedCep('');
    setCepData(null);
    setError('');
  };

  return (
    <div className="cep-info-container">
      <h1 className="title">Buscar Informações do CEP</h1>
      <input
        className="cep-input"
        type="text"
        value={formattedCep} // Usar o CEP formatado no campo de entrada
        onChange={handleChange}
        onKeyPress={handleKeyPress} // Adiciona o evento onKeyPress
        placeholder="Digite o CEP"
        maxLength="10" // Limita a entrada a 10 caracteres (incluindo o traço)
      />
      <button className="search-button" onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      <button className="clear-button" onClick={handleClear}>
        Limpar
      </button>
      {error && <div className="error-message">{error}</div>}
      {cepData && (
        <div className="cep-data">
          <h2 className="data-title">Informações do CEP</h2>
          <p><strong>CEP:</strong> {formattedCep}</p>
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
