/**
 * Módulo de gerenciamento de configurações da Evolution API
 */
class Settings {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Define as configurações para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Configurações a serem definidas
   * @param {boolean} [options.rejectCall] - Rejeitar chamadas automaticamente
   * @param {string} [options.msgCall] - Mensagem para chamadas rejeitadas
   * @param {boolean} [options.groupsIgnore] - Ignorar mensagens de grupo
   * @param {boolean} [options.alwaysOnline] - Manter status online
   * @param {boolean} [options.readMessages] - Marcar mensagens como lidas
   * @param {boolean} [options.syncFullHistory] - Sincronizar histórico completo
   * @param {boolean} [options.readStatus] - Marcar status como lidos
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/settings/set/${instanceName}`, options);
  }

  /**
   * Obtém as configurações de uma instância
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/settings/find/${instanceName}`);
  }
}

module.exports = Settings;