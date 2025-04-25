const EvolutionConfig = require('./src/config');
const HttpClient = require('./src/httpClient');

// Módulos
const Instance = require('./src/modules/instance');
const Proxy = require('./src/modules/proxy');
const Settings = require('./src/modules/settings');
const Message = require('./src/modules/message');
const Call = require('./src/modules/call');
const Chat = require('./src/modules/chat');
const Label = require('./src/modules/label');
const Group = require('./src/modules/group');
const Integrations = require('./src/modules/integrations');

/**
 * SDK para a Evolution API
 */
class EvolutionSDK {
  /**
   * Cria uma instância do SDK
   * @param {string} baseUrl - URL base da API
   * @param {string} apiKey - Chave de API
   */
  constructor(baseUrl, apiKey) {
    this.config = new EvolutionConfig(baseUrl, apiKey);
    this.httpClient = new HttpClient(this.config);
    
    // Inicializa os módulos
    this.instance = new Instance(this.httpClient);
    this.proxy = new Proxy(this.httpClient);
    this.settings = new Settings(this.httpClient);
    this.message = new Message(this.httpClient);
    this.call = new Call(this.httpClient);
    this.chat = new Chat(this.httpClient);
    this.label = new Label(this.httpClient);
    this.group = new Group(this.httpClient);
    this.integrations = new Integrations(this.httpClient);
  }

  /**
   * Configura o URL base da API
   * @param {string} baseUrl - URL base da API
   */
  setBaseUrl(baseUrl) {
    this.config.setBaseUrl(baseUrl);
    return this;
  }

  /**
   * Configura a chave de API
   * @param {string} apiKey - Chave de API
   */
  setApiKey(apiKey) {
    this.config.setApiKey(apiKey);
    return this;
  }

  /**
   * Obtém a configuração atual
   * @returns {EvolutionConfig} Configuração atual
   */
  getConfig() {
    return this.config;
  }

  /**
   * Obtém informações gerais sobre a API
   * @returns {Promise} Promise com a resposta da API
   */
  async getInfo() {
    return await this.httpClient.get('/');
  }
}

module.exports = EvolutionSDK;