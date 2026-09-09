// ============================================================
// CONFIGURAÇÃO DO EVENTO - Edite estes valores livremente
// ============================================================

export const eventConfig = {
  // Nomes dos noivos
  brideName: 'Aldrey',
  groomName: 'Braz',

  // Data do evento (ano, mês [0-11], dia, hora, minuto)
  eventDate: new Date(2026, 11, 15, 16, 0),

  // Data, horário e local do evento
  eventDateLabel: '10 de Outubro, 2026',
  eventTimeLabel: '15h00',
  eventAddress: 'Vista Rio Café Matriz - Ponta Negra',
  eventAddressDetail: 'Av. Coronel Teixeira, 3080 - Ponta Negra, Manaus - AM, 69037-000',

  // Endereço alternário para entrega de presentes físicos
  deliveryAddress: 'Entrega de Presentes',
  deliveryAddressDetail: 'Condomínio Residencial Ópera de Paris, bloco 2, apto 204.',
  deliveryNote: 'Av. Cosme Ferreira, 7311 - Coroado, Manaus - AM, 69082-230',

  // Chave PIX para a Opção A
  pixKey: 'cristina-barroso@jim.com',
  pixName: 'Aldrey e Braz',

  // Listas de presentes externos (Opção B - Vales)
  externalGiftLists: [
    {
      name: 'Lista Amazon',
      url: 'https://www.amazon.com.br',
      description: 'Gere créditos e escolha presentes da lista Amazon.',
    },
    {
      name: 'Lista Bemol',
      url: 'https://www.magazineluiza.com.br',
      description: 'Vales-presente e créditos para a casa nova.',
    },
    {
      name: 'Lista Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
      description: 'Vales e produtos para a casa nova.',
    },
  ],

  // ============================================================
  // FOTOS - Cadastre aqui os caminhos das suas fotos
  // Coloque as imagens na pasta "public/fotos/" e use o caminho
  // começando com "/fotos/". Exemplo: '/fotos/foto1.jpg'
  // ============================================================

  // Fotos da tela INÍCIO (carrossel lateral, 6 fotos)
  heroPhotos: [
    '/fotos/Foto1.jpeg',
    '/fotos/Foto2.jpeg',
    '/fotos/Foto3.jpeg',
    '/fotos/Foto4.jpeg',
    '/fotos/Foto5.jpeg',
    '/fotos/Foto6.jpeg',
  ],

  // Fotos da tela HISTÓRIA (capa flutuante, 4 fotos em retrato)
  storyPhotos: [
    '/fotos/Foto2.jpeg',
    '/fotos/Foto4.jpeg',
    '/fotos/Foto5.jpeg',
    '/fotos/Foto6.jpeg',
  ],

  // Fotos da tela RECADOS (2 fotos)
  messagePhotos: [
    '/fotos/Foto4.jpeg',
    '/fotos/Foto6.jpeg',
  ],
}

// Email do administrador (quem pode acessar /admin e gerenciar presentes/mensagens)
export const ADMIN_EMAIL = 'braz.nobre97@gmail.com'
