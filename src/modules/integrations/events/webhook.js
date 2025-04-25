/**
 * Módulo de configuração de Webhook da Evolution API
 */
class Webhook {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura o webhook para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {object} options.webhook - Configuração do webhook
   * @param {boolean} options.webhook.enabled - Se o webhook está habilitado
   * @param {string} options.webhook.url - URL do webhook
   * @param {object} [options.webhook.headers] - Headers da requisição
   * @param {boolean} [options.webhook.byEvents=false] - Webhook por eventos
   * @param {boolean} [options.webhook.base64=false] - Converter mídia para base64
   * @param {Array<string>} [options.webhook.events] - Lista de eventos para monitorar
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/webhook/set/${instanceName}`, options);
  }

  /**
   * Busca a configuração atual do webhook
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/webhook/find/${instanceName}`);
  }
}

module.exports = Webhook;