/**
 * Módulo de configuração de Chatwoot da Evolution API
 */
class Chatwoot {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Configura o Chatwoot para uma instância
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de configuração
   * @param {boolean} options.enabled - Se o Chatwoot está habilitado
   * @param {string} options.accountId - ID da conta no Chatwoot
   * @param {string} options.token - Token de acesso ao Chatwoot
   * @param {string} options.url - URL do Chatwoot
   * @param {boolean} [options.signMsg=true] - Assinar mensagens
   * @param {boolean} [options.reopenConversation=true] - Reabrir conversas
   * @param {boolean} [options.conversationPending=false] - Conversas pendentes
   * @param {string} [options.nameInbox=evolution] - Nome da caixa de entrada
   * @param {boolean} [options.mergeBrazilContacts=true] - Mesclar contatos brasileiros
   * @param {boolean} [options.importContacts=true] - Importar contatos
   * @param {boolean} [options.importMessages=true] - Importar mensagens
   * @param {number} [options.daysLimitImportMessages=2] - Limite de dias para importar mensagens
   * @param {string} [options.signDelimiter="\n"] - Delimitador de assinatura
   * @param {boolean} [options.autoCreate=true] - Criar automaticamente
   * @param {string} [options.organization=BOT] - Nome da organização
   * @param {string} [options.logo] - URL do logo
   * @param {Array<string>} [options.ignoreJids=["@g.us"]] - JIDs a ignorar
   * @returns {Promise} Promise com a resposta da API
   */
  async set(instanceName, options) {
    return await this.httpClient.post(`/chatwoot/set/${instanceName}`, options);
  }

  /**
   * Busca a configuração atual do Chatwoot
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async find(instanceName) {
    return await this.httpClient.get(`/chatwoot/find/${instanceName}`);
  }
}

module.exports = Chatwoot;