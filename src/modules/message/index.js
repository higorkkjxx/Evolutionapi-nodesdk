/**
 * Módulo de envio de mensagens da Evolution API
 */
class Message {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Envia uma mensagem de texto
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.text - Texto da mensagem
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.linkPreview] - Ativar pré-visualização de links
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendText(instanceName, options) {
    return await this.httpClient.post(`/message/sendText/${instanceName}`, options);
  }

  /**
   * Envia uma mídia (imagem, vídeo ou documento)
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.mediatype - Tipo de mídia (image, video, document)
   * @param {string} options.mimetype - MIME type do arquivo
   * @param {string} options.caption - Legenda da mídia
   * @param {string} options.media - URL ou base64 da mídia
   * @param {string} options.fileName - Nome do arquivo
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendMedia(instanceName, options) {
    return await this.httpClient.post(`/message/sendMedia/${instanceName}`, options);
  }

  /**
   * Envia uma mídia (arquivo)
   * @param {string} instanceName - Nome da instância
   * @param {object} formData - Dados do formulário
   * @returns {Promise} Promise com a resposta da API
   */
  async sendMediaFile(instanceName, formData) {
    return await this.httpClient.uploadFile(`/message/sendMedia/${instanceName}`, formData);
  }

  /**
   * Envia um vídeo PTV (Play Through Video)
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.video - URL ou base64 do vídeo
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendPtv(instanceName, options) {
    return await this.httpClient.post(`/message/sendPtv/${instanceName}`, options);
  }

  /**
   * Envia um vídeo PTV (arquivo)
   * @param {string} instanceName - Nome da instância
   * @param {object} formData - Dados do formulário
   * @returns {Promise} Promise com a resposta da API
   */
  async sendPtvFile(instanceName, formData) {
    return await this.httpClient.uploadFile(`/message/sendPtv/${instanceName}`, formData);
  }

  /**
   * Envia um áudio narrado
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.audio - URL ou base64 do áudio
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @param {boolean} [options.encoding] - Se deve codificar em Base64
   * @returns {Promise} Promise com a resposta da API
   */
  async sendWhatsAppAudio(instanceName, options) {
    return await this.httpClient.post(`/message/sendWhatsAppAudio/${instanceName}`, options);
  }

  /**
   * Envia um status/stories
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.type - Tipo de status (text, image, video, audio)
   * @param {string} options.content - Conteúdo do status (texto ou URL)
   * @param {string} [options.caption] - Legenda (para imagem ou vídeo)
   * @param {string} [options.backgroundColor] - Cor de fundo (para texto)
   * @param {number} [options.font] - Fonte do texto (1-5)
   * @param {boolean} options.allContacts - Enviar para todos os contatos
   * @param {Array<string>} options.statusJidList - Lista de JIDs para enviar
   * @returns {Promise} Promise com a resposta da API
   */
  async sendStatus(instanceName, options) {
    return await this.httpClient.post(`/message/sendStatus/${instanceName}`, options);
  }

  /**
   * Envia um sticker
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.sticker - URL ou base64 do sticker
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendSticker(instanceName, options) {
    return await this.httpClient.post(`/message/sendSticker/${instanceName}`, options);
  }

  /**
   * Envia uma localização
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {string} options.name - Nome da localização
   * @param {string} options.address - Endereço da localização
   * @param {number} options.latitude - Latitude
   * @param {number} options.longitude - Longitude
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendLocation(instanceName, options) {
    return await this.httpClient.post(`/message/sendLocation/${instanceName}`, options);
  }

  /**
   * Envia contatos
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da mensagem
   * @param {string} options.number - Número do destinatário
   * @param {Array<object>} options.contact - Lista de contatos a enviar
   * @returns {Promise} Promise com a resposta da API
   */
  async sendContact(instanceName, options) {
    return await this.httpClient.post(`/message/sendContact/${instanceName}`, options);
  }

  /**
   * Envia uma reação a uma mensagem
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da reação
   * @param {object} options.key - Chave da mensagem
   * @param {string} options.reaction - Emoji da reação
   * @returns {Promise} Promise com a resposta da API
   */
  async sendReaction(instanceName, options) {
    return await this.httpClient.post(`/message/sendReaction/${instanceName}`, options);
  }

  /**
   * Envia uma enquete
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da enquete
   * @param {string} options.number - Número do destinatário
   * @param {string} options.name - Texto principal da enquete
   * @param {number} options.selectableCount - Quantidade de opções selecionáveis
   * @param {Array<string>} options.values - Lista de opções da enquete
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendPoll(instanceName, options) {
    return await this.httpClient.post(`/message/sendPoll/${instanceName}`, options);
  }

  /**
   * Envia uma lista interativa
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções da lista
   * @param {string} options.number - Número do destinatário
   * @param {string} options.title - Título da lista
   * @param {string} options.description - Descrição da lista
   * @param {string} options.buttonText - Texto do botão
   * @param {string} options.footerText - Texto do rodapé
   * @param {Array<object>} options.sections - Seções da lista
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendList(instanceName, options) {
    return await this.httpClient.post(`/message/sendList/${instanceName}`, options);
  }

  /**
   * Envia botões interativos
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções dos botões
   * @param {string} options.number - Número do destinatário
   * @param {string} options.title - Título dos botões
   * @param {string} options.description - Descrição dos botões
   * @param {string} options.footer - Rodapé dos botões
   * @param {Array<object>} options.buttons - Lista de botões
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {object} [options.quoted] - Mensagem citada
   * @param {boolean} [options.mentionsEveryOne] - Mencionar todos
   * @param {Array<string>} [options.mentioned] - Lista de números mencionados
   * @returns {Promise} Promise com a resposta da API
   */
  async sendButtons(instanceName, options) {
    return await this.httpClient.post(`/message/sendButtons/${instanceName}`, options);
  }

  /**
   * Envia um template (Cloud API)
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções do template
   * @param {string} options.number - Número do destinatário
   * @param {string} options.name - Nome do template
   * @param {string} options.language - Código do idioma
   * @param {string} [options.webhookUrl] - URL do webhook (opcional)
   * @param {Array<object>} options.components - Componentes do template
   * @returns {Promise} Promise com a resposta da API
   */
  async sendTemplate(instanceName, options) {
    return await this.httpClient.post(`/message/sendTemplate/${instanceName}`, options);
  }

  /**
   * Atualiza o status de bloqueio de um número
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar o status
   * @param {string} options.number - Número a ser bloqueado/desbloqueado
   * @param {string} options.status - Status (block, unblock)
   * @returns {Promise} Promise com a resposta da API
   */
  async updateBlockStatus(instanceName, options) {
    return await this.httpClient.post(`/message/updateBlockStatus/${instanceName}`, options);
  }
}

module.exports = Message;