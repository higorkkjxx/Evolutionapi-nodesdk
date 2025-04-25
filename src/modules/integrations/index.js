const Events = require('./events');
const Chatbot = require('./chatbot');

/**
 * Módulo de integrações da Evolution API
 */
class Integrations {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.events = new Events(httpClient);
    this.chatbot = new Chatbot(httpClient);
  }
}

module.exports = Integrations;