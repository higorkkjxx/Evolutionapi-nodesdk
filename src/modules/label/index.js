/**
 * Módulo de gerenciamento de etiquetas da Evolution API
 */
class Label {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Busca etiquetas disponíveis
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async findLabels(instanceName) {
    return await this.httpClient.get(`/label/findLabels/${instanceName}`);
  }

  /**
   * Gerencia etiquetas (adicionar ou remover)
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para gerenciar etiquetas
   * @param {string} options.number - Número do contato
   * @param {string} options.labelId - ID da etiqueta
   * @param {string} options.action - Ação (add, remove)
   * @returns {Promise} Promise com a resposta da API
   */
  async handleLabel(instanceName, options) {
    return await this.httpClient.post(`/label/handleLabel/${instanceName}`, options);
  }
}

module.exports = Label;