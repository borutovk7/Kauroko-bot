# 🪷 Kaoruko Waguri

> ### Sistema de automação para WhatsApp
>
> **Moderação · Utilidades · Mídia · Jogos · Economia · Comunidade**

`Versão 3.0.4-rch` · `Node.js 20+` · `WhatsApp` · `Em desenvolvimento`

**Navegação:** [Instalação](#-instalação) · [SQLite](#-sqlite-e-bancos-de-dados) · [Recursos](#-recursos) · [Configuração](#%EF%B8%8F-configuração-inicial) · [Conexão](#-início-e-conexão) · [Segurança](#-segurança)

---

## ✨ Sobre o projeto

O **Kaoruko Waguri** é uma bot para WhatsApp voltada à administração de grupos e interação com a comunidade. O sistema reúne ferramentas de moderação, automações, downloads, jogos, figurinhas, recursos de economia e integrações que podem ser habilitadas conforme a configuração do administrador.

> Use o bot com responsabilidade, respeitando os Termos de Serviço do WhatsApp, a legislação aplicável e a privacidade das pessoas no grupo.

## 🧩 Recursos

| Área | O que a bot oferece |
| :-- | :-- |
| 🛡️ **Administração** | Anti-link, anti-flood, anti-nuke, filtros de mídia, advertências, boas-vindas e controle de grupos. |
| 🪄 **Utilitários** | Figurinhas, conversão de mídia, ferramentas de texto, efeitos e comandos para o dia a dia. |
| 📥 **Downloads** | Download e auto-download configurável para plataformas compatíveis. |
| 🎮 **Jogos** | UNO, forca, jogo da velha, anagramas, quizzes, verdade ou desafio e mais. |
| 🪙 **Economia** | N-Coins, níveis, XP, rankings, sistemas VIP e opções de aluguel/subbots. |
| 🤖 **Interações** | Respostas automáticas e recursos de IA quando as integrações necessárias estiverem configuradas. |
| 📅 **Automação** | Mensagens programadas, horários e abertura/fechamento automático de grupos. |

## ✅ Pré-requisitos

Antes de começar, tenha instalado:

- **Node.js 20 ou superior**
- **npm**
- **Git**
- **FFmpeg** — necessário para várias operações de áudio, vídeo e figurinhas

> **Termux:** mantenha o Termux e os pacotes atualizados. Em alguns aparelhos, dependências nativas podem pedir ferramentas de compilação adicionais.

---

## 🚀 Instalação

### Termux (Android)

```bash
pkg update -y && pkg upgrade -y
pkg install -y nodejs-lts git ffmpeg

git clone https://github.com/borutovk7/Kauroko-bot.git
cd Kauroko-bot
npm install
npm start
```

Ao iniciar, o menu permite selecionar a conexão por **QR Code** ou por **código de pareamento**.

> Para instalar especificamente a cópia ofuscada enviada ao Git, use `git clone --branch obfuscated-release --single-branch https://github.com/borutovk7/Kauroko-bot.git`.

### Linux / VPS

```bash
git clone https://github.com/borutovk7/Kauroko-bot.git
cd Kauroko-bot

# Instale Node.js 20+, npm, Git e FFmpeg pelo gerenciador da sua distribuição.
npm install
npm start
```

> A primeira instalação pode levar alguns minutos por causa das dependências do projeto.

---

## 🗃️ SQLite e bancos de dados

A bot usa SQLite para as configurações dos grupos, memória da IA, subbots e sessão do WhatsApp. Os bancos são criados e atualizados automaticamente durante o uso; **não é necessário criar arquivos `.sqlite` manualmente**.

### Build do SQLite no Termux

Se, depois do `npm install`, aparecer um erro como **“SQLite não carregou”** ou falhar ao iniciar a sessão, instale as ferramentas de compilação e rode:

```bash
pkg install -y python make clang
npm install-scripts approve @irithell-js/better-sqlite3-termux
npm run build:sqlite
```

O comando `npm run build:sqlite` executa:

```bash
npm rebuild @irithell-js/better-sqlite3-termux
```

> Execute o build dentro da pasta da bot. Não envie para o Git arquivos `.sqlite`, `*-wal`, `*-shm` ou a pasta de sessão — eles podem conter dados e credenciais locais.

### Bancos usados pelo sistema

| Arquivo | Finalidade |
| :-- | :-- |
| `database/grupos/configuracoes.sqlite` | Configurações e atividades dos grupos. |
| `database/kaoruko_ai.sqlite` | Memória, histórico e cache da IA. |
| `database/subbots.sqlite` | Cadastro, status e logs dos subbots. |
| `database/KAUROKO-QR/auth_state.sqlite` | Sessão principal após pareamento. |

---

## 📱 Início e conexão

O comando recomendado é:

```bash
npm start
```

O script abre um menu interativo:

| Opção | Função |
| :-- | :-- |
| `1` | Conectar por **QR Code** |
| `2` | Conectar por **código de pareamento** |
| `3` | Limpar sessão e cache |
| `4` | Exibir canal de suporte |
| `0` | Encerrar o processo |

### Conectar diretamente

Caso queira iniciar sem o menu:

```bash
# QR Code no terminal
node connect.js

# Código de pareamento pelo número de telefone
node connect.js sim
```

### Refazer a sessão

Se a conta for desconectada ou a sessão apresentar erro, pare a bot e remova apenas a sessão local:

```bash
rm -rf database/KAUROKO-QR
npm start
```

Depois, conecte novamente pelo QR Code ou pelo código de pareamento.

---

## ⚙️ Configuração inicial

Antes de colocar a bot em uso, confira estes arquivos:

| Arquivo | Para que serve |
| :-- | :-- |
| `configs/configs.json` | Nome da bot, prefixo, nome e número do proprietário. |
| `configs/apikeys.json` | Chaves e endereços das integrações/API. |
| `configs/nescessario.json` | Recursos globais, permissões e comportamentos da bot. |
| `configs/config_Efipay.json` | Configurações relacionadas ao EfiPay/Pix, se esse módulo for utilizado. |
| `configs/links_img.json` | Links de imagens usados nos menus e mensagens. |

Exemplo de ajustes básicos em `configs/configs.json`:

```json
{
  "prefix": "!",
  "NomeDoBot": "Minha Bot",
  "ownerName": "Seu nome",
  "ownerNumber": "55DDDNUMERO"
}
```

> O prefixo atual da sua cópia pode ser diferente. Depois de iniciar, envie `prefixo` para a bot ou use o comando de menu para conferir o prefixo ativo.

---

## 🗂️ Estrutura do projeto

```text
.
├── connect.js       # Conexão com o WhatsApp e gerenciamento de sessão
├── index.js         # Tratamento de mensagens e comandos
├── start.sh         # Menu e inicialização do sistema
├── definicoes.js    # Dependências e funções compartilhadas
├── configs/         # Configurações, chaves e aparência
├── arquivos/        # Módulos: jogos, downloads, figurinhas e funções
├── database/        # Dados persistentes, sessões e configurações de grupos
└── util/            # Utilitários internos e arquivos temporários
```

## 🧭 Comandos úteis

Os comandos disponíveis variam conforme permissões, configurações do grupo, plano/VIP e módulos ativados. Comece pelos menus internos:

| Comando | Descrição |
| :-- | :-- |
| `<prefixo>menu` | Menu principal da bot. |
| `<prefixo>ajuda` | Manual rápido de uso. |
| `<prefixo>menuadm` | Opções para administradores. |
| `<prefixo>menudow` | Ferramentas de download. |
| `<prefixo>menujogos` | Jogos disponíveis. |
| `<prefixo>ajudauno` | Ajuda específica do UNO. |
| `<prefixo>infobot` | Informações da bot. |

Substitua `<prefixo>` pelo símbolo configurado. Por exemplo, se o prefixo for `!`, use `!menu`.

---

## 🔐 Segurança

Este projeto trabalha com arquivos locais que podem guardar informações sensíveis. **Não envie esses dados para repositórios públicos, grupos ou terceiros.**

- Não publique `configs/apikeys.json`, arquivos de pagamento, cookies ou certificados.
- Não publique `database/KAUROKO-QR/`, bancos SQLite, arquivos `*-wal` ou `*-shm`.
- Revogue e substitua uma chave de API imediatamente se ela for exposta.
- Faça backup das configurações e bancos de dados antes de atualizações importantes.
- Adicione arquivos sensíveis ao `.gitignore` antes de fazer `git add .`.

Sugestão mínima para o `.gitignore`:

```gitignore
# Credenciais e sessão
configs/apikeys.json
configs/config_Efipay.json
cookies/
database/KAUROKO-QR/
database/*-wal
database/*-shm
*.p12

# Temporários e release local
util/temp/
qrcode.png
npm-release/
```

---

## 🛠️ Solução de problemas

### O comando `npm start` não funciona

Confira a versão do Node.js e instale as dependências novamente:

```bash
node -v
npm install
npm start
```

Use Node.js 20 ou superior.

### Erro ao converter áudio, vídeo ou figurinha

Verifique se o FFmpeg está instalado e disponível no terminal:

```bash
ffmpeg -version
```

### A conexão caiu ou o QR Code não é aceito

Feche o processo, remova a pasta de sessão (`database/KAUROKO-QR`) e faça uma conexão nova. Não compartilhe essa pasta com ninguém.

### Um recurso de API não responde

Revise a chave, a URL e as permissões da integração em `configs/apikeys.json`. Também confira se o serviço externo está disponível.

---

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas. Antes de enviar alterações:

1. Faça backup da sua configuração e dos bancos de dados.
2. Teste a mudança em uma cópia separada do projeto.
3. Nunca inclua credenciais, sessões, números pessoais ou dados de usuários no envio.
4. Descreva com clareza o que foi alterado e como testar.

## 📄 Licença e créditos

Consulte o arquivo [`LICENSE.docx`](./LICENSE.docx) para os termos de uso e créditos do projeto.

---

Feito com 💜 por **Eduh Dev**  
**Suporte:** [WhatsApp](https://wa.me/559774004582) · [GitHub](https://github.com/borutovk7)
