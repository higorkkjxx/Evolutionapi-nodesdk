const Webhook = require('./webhook');
const Websocket = require('./websocket');
const RabbitMQ = require('./rabbitmq');
const SQS = require('./sqs');

/**
 * Módulo de configuração de eventos da Evolution API
 */
class Events {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.webhook = new Webhook(httpClient);
    this.websocket = new Websocket(httpClient);
    this.rabbitmq = new RabbitMQ(httpClient);
    this.sqs = new SQS(httpClient);
  }
}

module.exports = Events;