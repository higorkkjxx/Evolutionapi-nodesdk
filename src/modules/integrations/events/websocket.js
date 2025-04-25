/**
 * Módulo de configuração de Websocket da Evolution API
 */
class Websocket {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura o websocket para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {object} options.websocket - Configuração do websocket
   * @param {boolean} options.websocket.enabled - Se o websocket está habilitado
   * @param {Array<string>} [options.websocket.events] - Lista de eventos para monitorar
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/websocket/set/${instanceName}`, options);
  }

  /**
   * Busca a configuração atual do websocket
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/websocket/find/${instanceName}`);
  }
}

module.exports = Websocket;