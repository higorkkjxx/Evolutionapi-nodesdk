/**
 * Módulo de configuração de SQS da Evolution API
 */
class SQS {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura o SQS para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {object} options.sqs - Configuração do SQS
   * @param {boolean} options.sqs.enabled - Se o SQS está habilitado
   * @param {Array<string>} [options.sqs.events] - Lista de eventos para monitorar
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/sqs/set/${instanceName}`, options);
  }

  /**
   * Busca a configuração atual do SQS
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/sqs/find/${instanceName}`);
  }
}

module.exports = SQS;