/**
 * Módulo de gerenciamento de instâncias da Evolution API
 */
class Instance {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Cria uma nova instância de WhatsApp
   * @param {object} options - Opções para criar a instância
   * @param {string} options.instanceName - Nome da instância
   * @param {string} [options.token] - Token opcional para a instância
   * @param {string} [options.number] - Número do WhatsApp (opcional)
   * @param {boolean} [options.qrcode=true] - Exibir QR Code
   * @param {string} [options.integration=WHATSAPP-BAILEYS] - Tipo de integração
   * @param {object} [options.webhook] - Configurações do webhook
   * @param {object} [options.rabbitmq] - Configurações do RabbitMQ
   * @param {object} [options.sqs] - Configurações do SQS
   * @param {object} [options.chatwoot] - Configurações do Chatwoot
   * @returns {Promise} Promise com a resposta da API
   */
  async create(options) {
    return await this.httpClient.post('/instance/create', options);
  }

  /**
   * Obtém a lista de instâncias
   * @param {object} [options] - Opções de filtragem
   * @param {string} [options.instanceName] - Nome da instância para filtrar
   * @param {string} [options.instanceId] - ID da instância para filtrar
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchInstances(options = {}) {
    return await this.httpClient.get('/instance/fetchInstances', options);
  }

  /**
   * Conecta a uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} [options] - Opções adicionais
   * @param {string} [options.number] - Número do WhatsApp
   * @returns {Promise} Promise com a resposta da API
   */
  async connect(instanceName, options = {}) {
    return await this.httpClient.get(`/instance/connect/${instanceName}`, options);
  }

  /**
   * Reinicia uma instância
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async restart(instanceName) {
    return await this.httpClient.post(`/instance/restart/${instanceName}`);
  }

  /**
   * Define a presença da instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de presença
   * @param {string} options.presence - Estado de presença (available, unavailable)
   * @returns {Promise} Promise com a resposta da API
   */
  async setPresence(instanceName, options) {
    return await this.httpClient.post(`/instance/setPresence/${instanceName}`, options);
  }

  /**
   * Obtém o estado de conexão da instância
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async connectionState(instanceName) {
    return await this.httpClient.get(`/instance/connectionState/${instanceName}`);
  }

  /**
   * Desconecta a instância (logout)
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async logout(instanceName) {
    return await this.httpClient.delete(`/instance/logout/${instanceName}`);
  }

  /**
   * Exclui uma instância
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async delete(instanceName) {
    return await this.httpClient.delete(`/instance/delete/${instanceName}`);
  }
}

module.exports = Instance;