/**
 * Módulo de gerenciamento de proxy da Evolution API
 */
class Proxy {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura um proxy para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Configurações do proxy
   * @param {boolean} options.enabled - Se o proxy está habilitado
   * @param {string} options.host - Host do proxy
   * @param {string} options.port - Porta do proxy
   * @param {string} options.protocol - Protocolo do proxy (http, https, socks)
   * @param {string} [options.username] - Nome de usuário para autenticação
   * @param {string} [options.password] - Senha para autenticação
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/proxy/set/${instanceName}`, options);
  }

  /**
   * Obtém as configurações de proxy de uma instância
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/proxy/find/${instanceName}`);
  }
}

module.exports = Proxy;