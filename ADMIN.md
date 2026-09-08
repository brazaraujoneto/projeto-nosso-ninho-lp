# Painel Administrativo — Instruções

## Como acessar

1. Abra o site no navegador
2. Adicione `/admin` ao final do endereço:
   - Local: `http://localhost:5173/admin`
   - Produção: `https://www.seusite.com/admin`
3. Digite o email e a senha cadastrados no Supabase

**Email autorizado:** `braz.nobre97@gmail.com`

---

## Como criar sua conta de admin (primeira vez)

Antes de acessar o painel, você precisa criar a conta no Supabase:

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione o projeto do Chá de Casa Nova
3. Vá em **Authentication > Users**
4. Clique em **Add user > Create new user**
5. Digite o email: `braz.nobre97@gmail.com`
6. Digite uma senha (anote para não esquecer)
7. Deixe a opção **Auto Confirm User** ativada (para não precisar confirmar por email)
8. Clique em **Create user**

Pronto! Agora você consegue acessar o `/admin` com esse email e senha.

---

## O que você pode fazer no painel

### 1. Gerenciar Presentes Físicos (Opção C)

**Adicionar um presente:**
1. Clique no botão **"+ Adicionar"**
2. Preencha:
   - **Título** — nome do presente (ex: "Jogo de Panelas Antiaderente")
   - **Preço** — valor (ex: "R$ 189,90")
   - **URL da Imagem** — caminho da foto:
     - Para foto local: `/fotos/presente1.jpg` (coloque a foto na pasta `public/fotos/`)
     - Para URL externa: cole o link completo (ex: `https://images.pexels.com/...`)
   - **Marcar como reservado** — marque se alguém já presenteou
   - **Reservado por** — nome de quem reservou (ex: "Maria")
3. Clique em **Salvar**

**Editar um presente:**
1. Clique no ícone de lápis (✏️) ao lado do presente
2. Altere os campos necessários
3. Clique em **Salvar**

**Excluir um presente:**
1. Clique no ícone de lixeira (🗑️) ao lado do presente
2. Confirme a exclusão

### 2. Gerenciar Mensagens (Recados)

**Excluir uma mensagem:**
1. Na seção "Mensagens", localize o recado
2. Clique no ícone de lixeira (🗑️)
3. Confirme a exclusão

---

## Onde colocar as fotos dos presentes

As fotos dos presentes podem ser:

### Opção 1: Foto local (recomendado para suas fotos)
1. Coloque a foto na pasta `public/fotos/` do projeto
2. No painel admin, no campo "URL da Imagem", digite: `/fotos/nome-da-foto.jpg`

### Opção 2: URL externa (para fotos da internet)
1. Cole o link completo da imagem no campo "URL da Imagem"
2. Exemplo: `https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=400`

---

## Dicas importantes

- **Tamanho das fotos:** use imagens quadradas (ex: 400x400 pixels) para ficar melhor no grid
- **Formato:** `.jpg` ou `.png`
- **Peso:** mantenha as fotos abaixo de 500KB para carregar rápido
- **Segurança:** apenas o email `braz.nobre97@gmail.com` tem permissão para gerenciar presentes e excluir mensagens. Ninguém mais consegue acessar o painel.
- **Sair:** sempre clique em "Sair" quando terminar de usar o painel em um dispositivo compartilhado
