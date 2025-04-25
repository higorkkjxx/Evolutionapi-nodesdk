const Chatwoot = require('./chatwoot');
const Typebot = require('./typebot');

/**
 * Módulo de configuração de chatbots da Evolution API
 */
class Chatbot {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.chatwoot = new Chatwoot(httpClient);
    this.typebot = new Typebot(httpClient);
  }
}

module.exports = Chatbot;