/**
 * Módulo de chamadas da Evolution API
 */
class Call {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Simula uma chamada falsa
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da chamada
   * @param {string} options.number - Número do destinatário
   * @param {boolean} options.isVideo - Se é uma chamada de vídeo
   * @param {number} options.callDuration - Duração da chamada em segundos
   * @returns {Promise} Promise com a resposta da API
   */
  async offer(instanceName, options) {
    return await this.httpClient.post(`/call/offer/${instanceName}`, options);
  }
}

module.exports = Call;