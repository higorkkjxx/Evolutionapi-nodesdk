/**
 * Exemplo básico de uso do Evolution SDK
 */

// Importar o SDK
const EvolutionSDK = require('../index');

// Configurar o SDK com URL base e API Key
const sdk = new EvolutionSDK('https://sua-api.exemplo.com', 'sua-api-key');

// Função principal assíncrona
async function main() {
  try {
    // Verificar informações gerais da API
    const info = await sdk.getInfo();
    console.log('Informações da API:', info);

    // Criar uma nova instância
    console.log('Criando instância...');
    const instance = await sdk.instance.create({
      instanceName: 'exemplo',
      qrcode: true,
      integration: 'WHATSAPP-BAILEYS'
    });

    // Se obtivemos um QR Code, exibir na console
    if (instance.qrcode && instance.qrcode.base64) {
      console.log('Escaneie o QR Code:');
      console.log(instance.qrcode.base64);
    }

    // Verificar o status de conexão após alguns segundos
    setTimeout(async () => {
      const status = await sdk.instance.connectionState('exemplo');
      console.log('Status de conexão:', status);

      // Se estiver conectado, enviar uma mensagem de teste
      if (status.state === 'open') {
        console.log('Conectado! Enviando mensagem de teste...');
        await sdk.message.sendText('exemplo', {
          number: '5511999999999', // Substitua pelo número real
          text: 'Olá! Esta é uma mensagem de teste enviada pelo Evolution SDK.'
        });
        console.log('Mensagem enviada com sucesso!');
      }
    }, 10000); // Esperar 10 segundos

  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Executar a função principal
main();