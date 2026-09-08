# Chá de Casa Nova & Noivado — Guia Completo

## O que é este projeto

Uma página de Chá de Casa Nova e Noivado no formato mobile-first, com navegação por abas (não por scroll infinito). Cada botão na barra inferior troca de tela: Início, Evento, História, Presentes e Recados.

---

## Como rodar o projeto localmente (VS Code)

### Pré-requisitos
- **Node.js** instalado (versão 18 ou superior). Baixe em https://nodejs.org
- **VS Code** instalado. Baixe em https://code.visualstudio.com
- **Git** instalado. Baixe em https://git-scm.com

### Passo a passo

1. **Abrir o projeto no VS Code**
   - Abra o VS Code
   - Vá em Arquivo > Abrir Pasta e selecione a pasta do projeto

2. **Instalar as dependências**
   - Abra o terminal do VS Code (Terminal > Novo Terminal)
   - Digite: `npm install`
   - Aguarde terminar

3. **Rodar o projeto**
   - No terminal, digite: `npm run dev`
   - Vai aparecer um endereço tipo `http://localhost:5173`
   - Abra no navegador (ou no celular, para ver como fica no mobile)

4. **Parar o projeto**
   - No terminal, pressione `Ctrl + C`

---

## Usando Git (controle de versão)

### Configurar o Git pela primeira vez
No terminal do VS Code, digite uma vez:
```
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Iniciar o repositório Git
```
git init
git add .
git commit -m "Primeira versão do site"
```

### Enviar alterações para o GitHub/GitLab
1. Crie um repositório no GitHub (ou GitLab)
2. Copie a URL do repositório
3. No terminal:
```
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git branch -M main
git push -u origin main
```

### Salvar novas alterações
Sempre que fizer mudanças no site:
```
git add .
git commit -m "Descrição do que mudou"
git push
```

---

## Hospedando na Vercel

1. Acesse https://vercel.com e crie uma conta (ou entre com GitHub)
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. A Vercel detecta o Vite automaticamente — basta clicar em "Deploy"
5. Pronto! Seu site estará no ar

### Variáveis de ambiente na Vercel
Na Vercel, vá em Settings > Environment Variables e adicione:
- `VITE_SUPABASE_URL` — o valor que está no arquivo `.env`
- `VITE_SUPABASE_ANON_KEY` — o valor que está no arquivo `.env`

---

## Onde editar cada parte do site

### 1. Nomes, datas, endereços, PIX e lojas externas
**Arquivo:** `src/config/event.ts`

Neste arquivo você edita:
- `brideName` e `groomName` — nomes dos noivos
- `eventDate` — data do evento (formato: ano, mês [0=jan, 11=dez], dia, hora, minuto)
- `eventDateLabel`, `eventTimeLabel` — texto exibido da data e horário
- `eventAddress`, `eventAddressDetail` — endereço do evento
- `deliveryAddress`, `deliveryAddressDetail`, `deliveryNote` — endereço de entrega
- `pixKey`, `pixName` — chave PIX e nome do recebedor
- `externalGiftLists` — lista de lojas externas (Opção B: Vales)
- `heroPhotos` — 6 fotos da tela Início (carrossel)
- `storyPhotos` — 4 fotos da tela História (capa flutuante)
- `messagePhotos` — 2 fotos da tela Recados

### 2. Fotos do casal
**Pasta:** `public/fotos/`

Coloque suas fotos nesta pasta e referencie-as no `src/config/event.ts`:
- Fotos do Início: `/fotos/inicio1.jpg`, `/fotos/inicio2.jpg`, etc.
- Fotos da História: `/fotos/historia1.jpg`, etc.
- Fotos dos Recados: `/fotos/recado1.jpg`, etc.

Formatos aceitos: `.jpg`, `.png`, `.webp`. Recomendado: `.jpg` para carregar mais rápido.

### 3. Fotos dos presentes físicos
As fotos dos presentes são cadastradas pelo painel admin (veja `ADMIN.md`). Você pode usar:
- Um caminho local (ex: `/fotos/presente1.jpg`) — coloque a foto em `public/fotos/`
- Uma URL externa (ex: `https://images.pexels.com/...`)

### 4. Cores e fontes
**Arquivo:** `src/style.css`

As cores estão definidas no bloco `@theme`:
- `--color-cream` — fundo principal (off-white)
- `--color-sage` — verde sálvia (botões e detalhes)
- `--color-rose` — rosé gold (acentos)
- `--font-serif` — fonte dos títulos (Playfair Display)
- `--font-sans` — fonte dos textos (Lato)

### 5. Textos da História (timeline)
**Arquivo:** `src/components/StorySection.vue`

O array `milestones` contém a data, título e texto de cada marco da história de vocês.

### 6. Informações do Evento (mapa, endereços)
**Arquivo:** `src/components/EventSection.vue` (layout) + `src/config/event.ts` (conteúdo)

---

## Painel Administrativo

Acesse digitando `/admin` após o endereço do site (ex: `http://localhost:5173/admin` ou `www.seusite.com/admin`).

**Email de acesso:** `braz.nobre97@gmail.com`

Veja o arquivo `ADMIN.md` para instruções detalhadas.

---

## Estrutura de arquivos

```
projeto/
├── public/
│   └── fotos/              ← SUAS FOTOS vão aqui
├── src/
│   ├── components/
│   │   ├── HeroSection.vue       ← Tela Início (carrossel + cronômetro)
│   │   ├── EventSection.vue      ← Tela Evento (data, mapa, endereços)
│   │   ├── StorySection.vue      ← Tela História (fotos flutuantes + timeline)
│   │   ├── GiftListSection.vue    ← Tela Presentes (PIX, Vales, Físicos)
│   │   ├── MessageBoardSection.vue← Tela Recados (fotos + mural)
│   │   └── AdminPanel.vue        ← Painel Admin (/admin)
│   ├── config/
│   │   └── event.ts              ← CONFIGURAÇÃO PRINCIPAL
│   ├── lib/
│   │   └── supabase.ts           ← Conexão com o banco de dados
│   ├── App.vue                   ← Estrutura principal + navegação
│   ├── main.ts                   ← Ponto de entrada
│   └── style.css                 ← Cores e fontes
├── package.json
└── vite.config.ts
```
