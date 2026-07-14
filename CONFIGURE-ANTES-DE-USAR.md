# Antes de usar ou enviar ao Git

Esta pasta foi criada automaticamente pelo ofuscador. Os arquivos JavaScript foram ofuscados e dados sensíveis foram removidos.

## O que foi removido

- Sessões do WhatsApp, QR Code e backups de sessão
- Cookies, certificados e bancos SQLite
- Chaves de API, tokens, credenciais de pagamento e números do proprietário
- Dados de usuários, grupos, mensagens e estatísticas

## Configuração após clonar

1. Rode `npm install` nesta pasta.
2. Copie os modelos de configuração:

   `cp configs/apikeys.example.json configs/apikeys.json`

   `cp configs/config_Efipay.example.json configs/config_Efipay.json`

3. Preencha suas chaves, número do dono e configurações locais.
4. Esses arquivos reais já estão protegidos pelo `.gitignore` e não devem ir para o Git.
5. Teste em uma conta/grupo separado antes de usar em produção.

## Antes de enviar atualizações ao Git

Revise `git status` antes de cada `git add .`. Se aparecer sessão, cookie, certificado ou chave de API, não faça o commit.

> Ofuscação dificulta a leitura do código, mas não substitui licença, controle de acesso ou segurança de credenciais.
