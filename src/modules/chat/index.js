/**
 * Módulo de gerenciamento de chats da Evolution API
 */
class Chat {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Verifica se um número é do WhatsApp
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para verificação
   * @param {Array<string>} options.numbers - Lista de números a verificar
   * @returns {Promise} Promise com a resposta da API
   */
  async whatsappNumbers(instanceName, options) {
    return await this.httpClient.post(`/chat/whatsappNumbers/${instanceName}`, options);
  }

  /**
   * Marca mensagens como lidas
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para marcar mensagens
   * @param {Array<object>} options.readMessages - Lista de mensagens para marcar
   * @returns {Promise} Promise com a resposta da API
   */
  async markMessageAsRead(instanceName, options) {
    return await this.httpClient.post(`/chat/markMessageAsRead/${instanceName}`, options);
  }

  /**
   * Arquiva ou desarquiva um chat
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para arquivar
   * @param {object} options.lastMessage - Última mensagem do chat
   * @param {string} options.chat - JID do chat
   * @param {boolean} options.archive - true para arquivar, false para desarquivar
   * @returns {Promise} Promise com a resposta da API
   */
  async archiveChat(instanceName, options) {
    return await this.httpClient.post(`/chat/archiveChat/${instanceName}`, options);
  }

  /**
   * Marca um chat como não lido
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para marcar como não lido
   * @param {object} options.lastMessage - Última mensagem do chat
   * @param {string} options.chat - JID do chat
   * @returns {Promise} Promise com a resposta da API
   */
  async markChatUnread(instanceName, options) {
    return await this.httpClient.post(`/chat/markChatUnread/${instanceName}`, options);
  }

  /**
   * Exclui uma mensagem para todos
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para excluir
   * @param {string} options.id - ID da mensagem
   * @param {string} options.remoteJid - JID do chat
   * @param {boolean} options.fromMe - Se a mensagem foi enviada por você
   * @param {string} [options.participant] - Participante (opcional)
   * @returns {Promise} Promise com a resposta da API
   */
  async deleteMessageForEveryone(instanceName, options) {
    return await this.httpClient.delete(`/chat/deleteMessageForEveryone/${instanceName}`, options);
  }

  /**
   * Busca a URL da foto de perfil
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para buscar
   * @param {string} options.number - Número do contato
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchProfilePictureUrl(instanceName, options) {
    return await this.httpClient.post(`/chat/fetchProfilePictureUrl/${instanceName}`, options);
  }

  /**
   * Obtém o conteúdo em Base64 de uma mensagem de mídia
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para obter mídia
   * @param {object} options.message - Mensagem contendo mídia
   * @param {boolean} [options.convertToMp4=false] - Converter áudio para MP4
   * @returns {Promise} Promise com a resposta da API
   */
  async getBase64FromMediaMessage(instanceName, options) {
    return await this.httpClient.post(`/chat/getBase64FromMediaMessage/${instanceName}`, options);
  }

  /**
   * Atualiza uma mensagem
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar
   * @param {string} options.number - Número do destinatário
   * @param {object} options.key - Chave da mensagem a ser atualizada
   * @param {string} options.text - Novo texto para a mensagem
   * @returns {Promise} Promise com a resposta da API
   */
  async updateMessage(instanceName, options) {
    return await this.httpClient.post(`/chat/updateMessage/${instanceName}`, options);
  }

  /**
   * Envia indicação de presença (digitando, gravando, etc)
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções de presença
   * @param {string} options.number - Número do destinatário
   * @param {number} [options.delay] - Atraso em milissegundos
   * @param {string} options.presence - Tipo de presença
   * @returns {Promise} Promise com a resposta da API
   */
  async sendPresence(instanceName, options) {
    return await this.httpClient.post(`/chat/sendPresence/${instanceName}`, options);
  }

  /**
   * Busca contatos
   * @param {string} instanceName - Nome da instância
   * @param {object} [options] - Opções para filtrar
   * @param {object} [options.where] - Filtros para busca
   * @returns {Promise} Promise com a resposta da API
   */
  async findContacts(instanceName, options = {}) {
    return await this.httpClient.post(`/chat/findContacts/${instanceName}`, options);
  }

  /**
   * Busca mensagens
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para filtrar
   * @param {object} options.where - Filtros para busca
   * @param {number} [options.page] - Página para paginação
   * @param {number} [options.offset] - Quantidade de registros por página
   * @returns {Promise} Promise com a resposta da API
   */
  async findMessages(instanceName, options) {
    return await this.httpClient.post(`/chat/findMessages/${instanceName}`, options);
  }

  /**
   * Busca mensagens de status
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para filtrar
   * @param {object} options.where - Filtros para busca
   * @param {number} [options.page] - Página para paginação
   * @param {number} [options.offset] - Quantidade de registros por página
   * @returns {Promise} Promise com a resposta da API
   */
  async findStatusMessage(instanceName, options) {
    return await this.httpClient.post(`/chat/findStatusMessage/${instanceName}`, options);
  }

  /**
   * Busca chats
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async findChats(instanceName) {
    return await this.httpClient.post(`/chat/findChats/${instanceName}`);
  }

  /**
   * Busca perfil de negócio
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para buscar
   * @param {string} options.number - Número do contato
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchBusinessProfile(instanceName, options) {
    return await this.httpClient.post(`/chat/fetchBusinessProfile/${instanceName}`, options);
  }

  /**
   * Busca perfil 
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para buscar
   * @param {string} options.number - Número do contato
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchProfile(instanceName, options) {
    return await this.httpClient.post(`/chat/fetchProfile/${instanceName}`, options);
  }

  /**
   * Atualiza o nome do perfil
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar
   * @param {string} options.name - Novo nome do perfil
   * @returns {Promise} Promise com a resposta da API
   */
  async updateProfileName(instanceName, options) {
    return await this.httpClient.post(`/chat/updateProfileName/${instanceName}`, options);
  }

  /**
   * Atualiza o status do perfil
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar
   * @param {string} options.status - Novo status
   * @returns {Promise} Promise com a resposta da API
   */
  async updateProfileStatus(instanceName, options) {
    return await this.httpClient.post(`/chat/updateProfileStatus/${instanceName}`, options);
  }

  /**
   * Atualiza a foto do perfil
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar
   * @param {string} options.picture - URL da nova foto
   * @returns {Promise} Promise com a resposta da API
   */
  async updateProfilePicture(instanceName, options) {
    return await this.httpClient.post(`/chat/updateProfilePicture/${instanceName}`, options);
  }

  /**
   * Remove a foto do perfil
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async removeProfilePicture(instanceName) {
    return await this.httpClient.delete(`/chat/removeProfilePicture/${instanceName}`);
  }

  /**
   * Busca configurações de privacidade
   * @param {string} instanceName - Nome da instância
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchPrivacySettings(instanceName) {
    return await this.httpClient.get(`/chat/fetchPrivacySettings/${instanceName}`);
  }

  /**
   * Atualiza configurações de privacidade
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para atualizar
   * @param {string} options.readreceipts - Confirmação de leitura (all, none)
   * @param {string} options.profile - Visibilidade do perfil (all, contacts, contact_blacklist, none)
   * @param {string} options.status - Visibilidade do status (all, contacts, contact_blacklist, none)
   * @param {string} options.online - Visibilidade online (all, match_last_seen)
   * @param {string} options.last - Visto por último (all, contacts, contact_blacklist, none)
   * @param {string} options.groupadd - Quem pode adicionar em grupos (all, contacts, contact_blacklist)
   * @returns {Promise} Promise com a resposta da API
   */
  async updatePrivacySettings(instanceName, options) {
    return await this.httpClient.post(`/chat/updatePrivacySettings/${instanceName}`, options);
  }
}

module.exports = Chat;