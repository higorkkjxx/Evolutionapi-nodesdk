/**
 * Módulo de configuração de Typebot da Evolution API
 */
class Typebot {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Altera o status de uma sessão
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {string} options.remoteJid - JID do contato
   * @param {string} options.status - Status (opened, paused, closed)
   * @returns {Promise} Promise com a resposta da API
   */
  async changeStatus(instanceName, options) {
    return await this.httpClient.post(`/typebot/changeStatus/${instanceName}`, options);
  }

  /**
   * Busca sessões de um fluxo
   * @param {string} instanceName - Nome da instância
   * @param {string} typebotId - ID do fluxo do Typebot
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchSessions(instanceName, typebotId) {
    return await this.httpClient.get(`/typebot/fetchSessions/${typebotId}/${instanceName}`);
  }

  /**
   * Configura as configurações padrão do Typebot
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {number} [options.expire=20] - Tempo de expiração em minutos
   * @param {string} [options.keywordFinish=#SAIR] - Palavra-chave para finalizar
   * @param {number} [options.delayMessage=1000] - Atraso das mensagens em ms
   * @param {string} [options.unknownMessage] - Mensagem para comandos desconhecidos
   * @param {boolean} [options.listeningFromMe=false] - Escutar mensagens enviadas pelo bot
   * @param {boolean} [options.stopBotFromMe=false] - Parar bot para mensagens enviadas pelo bot
   * @param {boolean} [options.keepOpen=false] - Manter conversas abertas
   * @param {number} [options.debounceTime=10] - Tempo de debounce em minutos
   * @param {Array<string>} [options.ignoreJids=[]] - JIDs a ignorar
   * @param {string} [options.typebotIdFallback] - ID do fluxo de fallback
   * @returns {Promise} Promise com a resposta da API
   */
  async setSettings(instanceName, options) {
    return await this.httpClient.post(`/typebot/settings/${instanceName}`, options);
  }

  /**
   * Busca as configurações padrão do Typebot
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchSettings(instanceName) {
    return await this.httpClient.get(`/typebot/fetchSettings/${instanceName}`);
  }

  /**
   * Cria um novo fluxo
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {boolean} options.enabled - Se o fluxo está habilitado
   * @param {string} options.url - URL do Typebot
   * @param {string} options.typebot - ID/Nome do fluxo no Typebot
   * @param {string} options.triggerType - Tipo de gatilho (all, keyword)
   * @param {string} options.triggerOperator - Operador do gatilho (contains, equals, startsWith, endsWith, regex)
   * @param {string} options.triggerValue - Valor do gatilho
   * @param {number} [options.expire=20] - Tempo de expiração em minutos
   * @param {string} [options.keywordFinish=#SAIR] - Palavra-chave para finalizar
   * @param {number} [options.delayMessage=1000] - Atraso das mensagens em ms
   * @param {string} [options.unknownMessage] - Mensagem para comandos desconhecidos
   * @param {boolean} [options.listeningFromMe=false] - Escutar mensagens enviadas pelo bot
   * @param {boolean} [options.stopBotFromMe=false] - Parar bot para mensagens enviadas pelo bot
   * @param {boolean} [options.keepOpen=false] - Manter conversas abertas
   * @param {number} [options.debounceTime=10] - Tempo de debounce em minutos
   * @returns {Promise} Promise com a resposta da API
   */
  async create(instanceName, options) {
    return await this.httpClient.post(`/typebot/create/${instanceName}`, options);
  }

  /**
   * Busca todos os fluxos
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/typebot/find/${instanceName}`);
  }

  /**
   * Busca um fluxo específico
   * @param {string} instanceName - Nome da instância
   * @param {string} typebotId - ID do fluxo
   * @returns {Promise} Promise com a resposta da API
   */
  async fetch(instanceName, typebotId) {
    return await this.httpClient.get(`/typebot/fetch/${typebotId}/${instanceName}`);
  }

  /**
   * Atualiza um fluxo
   * @param {string} instanceName - Nome da instância
   * @param {string} typebotId - ID do fluxo
   * @param {object} options - Opções de configuração
   * @returns {Promise} Promise com a resposta da API
   */
  async update(instanceName, typebotId, options) {
    return await this.httpClient.put(`/typebot/update/${typebotId}/${instanceName}`, options);
  }

  /**
   * Remove um fluxo
   * @param {string} instanceName - Nome da instância
   * @param {string} typebotId - ID do fluxo
   * @returns {Promise} Promise com a resposta da API
   */
  async delete(instanceName, typebotId) {
    return await this.httpClient.delete(`/typebot/delete/${typebotId}/${instanceName}`);
  }

  /**
   * Inicia um fluxo manualmente
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {string} options.url - URL do Typebot
   * @param {string} options.typebot - ID/Nome do fluxo no Typebot
   * @param {string} options.remoteJid - JID do contato
   * @param {boolean} [options.startSession=false] - Iniciar sessão
   * @param {Array<object>} [options.variables] - Variáveis para o fluxo
   * @returns {Promise} Promise com a resposta da API
   */
  async start(instanceName, options) {
    return await this.httpClient.post(`/typebot/start/${instanceName}`, options);
  }
}

module.exports = Typebot;