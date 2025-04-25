/**
 * Módulo de gerenciamento de grupos da Evolution API
 */
class Group {
  /**
   * Cria uma instância do módulo
   * @param {HttpClient} httpClient - Cliente HTTP
   */
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Cria um novo grupo
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para criar o grupo
   * @param {string} options.subject - Nome/Assunto do grupo
   * @param {string} [options.description] - Descrição do grupo
   * @param {Array<string>} options.participants - Lista de números para adicionar
   * @returns {Promise} Promise com a resposta da API
   */
  async create(instanceName, options) {
    return await this.httpClient.post(`/group/create/${instanceName}`, options);
  }

  /**
   * Atualiza a foto do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para atualizar
   * @param {string} options.image - URL da imagem
   * @returns {Promise} Promise com a resposta da API
   */
  async updateGroupPicture(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/updateGroupPicture/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Atualiza o assunto/nome do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para atualizar
   * @param {string} options.subject - Novo assunto/nome
   * @returns {Promise} Promise com a resposta da API
   */
  async updateGroupSubject(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/updateGroupSubject/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Atualiza a descrição do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para atualizar
   * @param {string} options.description - Nova descrição
   * @returns {Promise} Promise com a resposta da API
   */
  async updateGroupDescription(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/updateGroupDescription/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Obtém o código de convite do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @returns {Promise} Promise com a resposta da API
   */
  async inviteCode(instanceName, groupJid) {
    return await this.httpClient.get(`/group/inviteCode/${instanceName}?groupJid=${groupJid}`);
  }

  /**
   * Revoga o código de convite do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @returns {Promise} Promise com a resposta da API
   */
  async revokeInviteCode(instanceName, groupJid) {
    return await this.httpClient.post(`/group/revokeInviteCode/${instanceName}?groupJid=${groupJid}`);
  }

  /**
   * Envia link de convite para contatos
   * @param {string} instanceName - Nome da instância
   * @param {object} options - Opções para enviar convite
   * @param {string} options.groupJid - JID do grupo
   * @param {string} options.description - Texto descritivo para o convite
   * @param {Array<string>} options.numbers - Lista de números para enviar
   * @returns {Promise} Promise com a resposta da API
   */
  async sendInvite(instanceName, options) {
    return await this.httpClient.post(`/group/sendInvite/${instanceName}`, options);
  }

  /**
   * Busca informações de um grupo pelo código de convite
   * @param {string} instanceName - Nome da instância
   * @param {string} inviteCode - Código de convite
   * @returns {Promise} Promise com a resposta da API
   */
  async inviteInfo(instanceName, inviteCode) {
    return await this.httpClient.get(`/group/inviteInfo/${instanceName}?inviteCode=${inviteCode}`);
  }

  /**
   * Busca informações de um grupo pelo JID
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @returns {Promise} Promise com a resposta da API
   */
  async findGroupInfos(instanceName, groupJid) {
    return await this.httpClient.get(`/group/findGroupInfos/${instanceName}?groupJid=${groupJid}`);
  }

  /**
   * Busca todos os grupos
   * @param {string} instanceName - Nome da instância
   * @param {boolean} [getParticipants=false] - Se deve trazer a lista de participantes
   * @returns {Promise} Promise com a resposta da API
   */
  async fetchAllGroups(instanceName, getParticipants = false) {
    return await this.httpClient.get(`/group/fetchAllGroups/${instanceName}?getParticipants=${getParticipants}`);
  }

  /**
   * Busca participantes de um grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @returns {Promise} Promise com a resposta da API
   */
  async participants(instanceName, groupJid) {
    return await this.httpClient.get(`/group/participants/${instanceName}?groupJid=${groupJid}`);
  }

  /**
   * Atualiza participantes (adicionar, remover, promover, rebaixar)
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para atualizar
   * @param {string} options.action - Ação (add, remove, promote, demote)
   * @param {Array<string>} options.participants - Lista de números para a ação
   * @returns {Promise} Promise com a resposta da API
   */
  async updateParticipant(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/updateParticipant/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Atualiza configurações do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para atualizar
   * @param {string} options.action - Ação (announcement, not_announcement, locked, unlocked)
   * @returns {Promise} Promise com a resposta da API
   */
  async updateSetting(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/updateSetting/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Ativa/desativa mensagens temporárias
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @param {object} options - Opções para configurar
   * @param {number} options.expiration - Duração (0, 86400, 604800, 7776000)
   * @returns {Promise} Promise com a resposta da API
   */
  async toggleEphemeral(instanceName, groupJid, options) {
    return await this.httpClient.post(`/group/toggleEphemeral/${instanceName}?groupJid=${groupJid}`, options);
  }

  /**
   * Sai do grupo
   * @param {string} instanceName - Nome da instância
   * @param {string} groupJid - JID do grupo
   * @returns {Promise} Promise com a resposta da API
   */
  async leaveGroup(instanceName, groupJid) {
    return await this.httpClient.delete(`/group/leaveGroup/${instanceName}?groupJid=${groupJid}`);
  }
}

module.exports = Group;