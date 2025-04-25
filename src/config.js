/**
 * Configuração do SDK da Evolution API
 */
class EvolutionConfig {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Configura o URL base da API
   * @param {string} baseUrl - URL base da API
   */
  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }

  /**
   * Configura a chave de API
   * @param {string} apiKey - Chave de API
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    return this;
  }

  /**
   * Obtém o URL base da API
   * @returns {string} URL base da API
   */
  getBaseUrl() {
    return this.baseUrl;
  }

  /**
   * Obtém a chave de API
   * @returns {string} Chave de API
   */
  getApiKey() {
    return this.apiKey;
  }
}

module.exports = EvolutionConfig;