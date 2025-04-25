const axios = require('axios');
const FormData = require('form-data');

/**
 * Cliente HTTP para requisições à Evolution API
 */
class HttpClient {
  /**
   * Cria uma instância do cliente HTTP
   * @param {object} config - Configuração da API
   */
  constructor(config) {
    this.config = config;
    this.instance = axios.create({
      baseURL: config.getBaseUrl(),
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.getApiKey()
      }
    });
  }

  /**
   * Realiza uma requisição GET
   * @param {string} url - URL do endpoint
   * @param {object} params - Parâmetros da requisição
   * @returns {Promise} Promise com a resposta da API
   */
  async get(url, params = {}) {
    try {
      const response = await this.instance.get(url, { params });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição POST
   * @param {string} url - URL do endpoint
   * @param {object} data - Dados para enviar no corpo da requisição
   * @returns {Promise} Promise com a resposta da API
   */
  async post(url, data = {}) {
    try {
      const response = await this.instance.post(url, data);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição PUT
   * @param {string} url - URL do endpoint
   * @param {object} data - Dados para enviar no corpo da requisição
   * @returns {Promise} Promise com a resposta da API
   */
  async put(url, data = {}) {
    try {
      const response = await this.instance.put(url, data);
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Realiza uma requisição DELETE
   * @param {string} url - URL do endpoint
   * @param {object} data - Dados para enviar no corpo da requisição
   * @returns {Promise} Promise com a resposta da API
   */
  async delete(url, data = {}) {
    try {
      const response = await this.instance.delete(url, { data });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Envia um arquivo para a API
   * @param {string} url - URL do endpoint
   * @param {object} formData - Dados do formulário incluindo o arquivo
   * @returns {Promise} Promise com a resposta da API
   */
  async uploadFile(url, formData) {
    try {
      const form = new FormData();
      
      // Adiciona os campos ao FormData
      Object.keys(formData).forEach(key => {
        if (key === 'file') {
          form.append(key, formData[key].data, formData[key].filename);
        } else {
          form.append(key, formData[key]);
        }
      });

      const response = await this.instance.post(url, form, {
        headers: {
          ...form.getHeaders(),
          'apikey': this.config.getApiKey()
        }
      });
      
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  /**
   * Trata os erros das requisições
   * @param {Error} error - Erro da requisição
   */
  _handleError(error) {
    if (error.response) {
      // A requisição foi feita e o servidor respondeu com um código de status
      // que está fora do intervalo 2xx
      const errorMessage = error.response.data.error || error.response.data.message || 'Erro desconhecido';
      throw new Error(`[${error.response.status}] ${errorMessage}`);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      throw new Error('Não houve resposta do servidor. Verifique sua conexão.');
    } else {
      // Algo aconteceu ao configurar a requisição que acionou um erro
      throw new Error(`Erro ao configurar requisição: ${error.message}`);
    }
  }
}

module.exports = HttpClient;