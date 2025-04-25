/**
 * Módulo de configuração de RabbitMQ da Evolution API
 */
class RabbitMQ {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura o RabbitMQ para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {object} options.rabbitmq - Configuração do RabbitMQ
   * @param {boolean} options.rabbitmq.enabled - Se o RabbitMQ está habilitado
   * @param {Array<string>} [options.rabbitmq.events] - Lista de eventos para monitorar
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/rabbitmq/set/${instanceName}`, options);
  }

  /**
   * Busca a configuração atual do RabbitMQ
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/rabbitmq/find/${instanceName}`);
  }
}

module.exports = RabbitMQ;