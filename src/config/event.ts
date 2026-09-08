// ============================================================
// CONFIGURAÇÃO DO EVENTO - Edite estes valores livremente
// ============================================================

export const eventConfig = {
  // Nomes dos noivos
  brideName: 'Aldrey',
  groomName: 'Seu Nome',

  // Data do evento (ano, mês [0-11], dia, hora, minuto)
  eventDate: new Date(2026, 11, 15, 16, 0),

  // Data, horário e local do evento
  eventDateLabel: '15 de Dezembro, 2026',
  eventTimeLabel: '16h00',
  eventAddress: 'Salão de Festas Jardim das Flores',
  eventAddressDetail: 'Rua das Acácias, 123 — Jardim Botânico, São Paulo/SP',

  // Endereço alternário para entrega de presentes físicos
  deliveryAddress: 'Entrega de Presentes',
  deliveryAddressDetail: 'Av. Paulista, 456 — Apto 101, São Paulo/SP',
  deliveryNote: 'Entregas de segunda a sexta, das 9h às 18h',

  // Chave PIX para a Opção A
  pixKey: 'seu-email@exemplo.com',
  pixName: 'Seu Nome e Aldrey',

  // Listas de presentes externos (Opção B - Vales)
  externalGiftLists: [
    {
      name: 'Lista Amazon',
      url: 'https://www.amazon.com.br',
      description: 'Gere créditos e escolha presentes da lista Amazon.',
    },
    {
      name: 'Lista Magazine Luiza',
      url: 'https://www.magazineluiza.com.br',
      description: 'Vales-presente e créditos para a casa nova.',
    },
    {
      name: 'Lista Camicado',
      url: 'https://www.camicado.com.br',
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
    '/fotos/inicio1.jpg',
    '/fotos/inicio2.jpg',
    '/fotos/inicio3.jpg',
    '/fotos/inicio4.jpg',
    '/fotos/inicio5.jpg',
    '/fotos/inicio6.jpg',
  ],

  // Fotos da tela HISTÓRIA (capa flutuante, 4 fotos em retrato)
  storyPhotos: [
    '/fotos/historia1.jpg',
    '/fotos/historia2.jpg',
    '/fotos/historia3.jpg',
    '/fotos/historia4.jpg',
  ],

  // Fotos da tela RECADOS (2 fotos)
  messagePhotos: [
    '/fotos/recado1.jpg',
    '/fotos/recado2.jpg',
  ],
}

// Email do administrador (quem pode acessar /admin e gerenciar presentes/mensagens)
export const ADMIN_EMAIL = 'braz.nobre97@gmail.com'
