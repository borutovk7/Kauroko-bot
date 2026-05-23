# 🪷 Kaoruko Waguri System 🪷

Bem-vindo ao repositório oficial do **Kaoruko Waguri System**. Este é um bot de alto desempenho, desenvolvido e otimizado para oferecer a melhor experiência em automação e funcionalidades.

## 🚀 Instalação

Siga os passos abaixo para configurar o sistema em seu ambiente:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **⚠️ Configuração para Termux:**
   Se você utiliza o **Termux**, execute obrigatoriamente o comando abaixo após o `npm install`. Isso garante a build correta do módulo Canvas para o ambiente Android:
   ```bash
   node ./node_modules/@irithell-js/canvas-termux/dist/install.cjs
   ```

3. **Configuração de Chaves:**
   Acesse a pasta `configs/` e preencha os arquivos JSON com suas credenciais e chaves de API.

4. **Iniciar o Sistema:**
   ```bash
   sh start.sh
   ```

## 🛠️ Características do Sistema
- **Proteção Avançada**: Código totalmente ofuscado para garantir a segurança da lógica.
- **Estabilidade**: Injeção de contexto customizada para garantir o funcionamento do Eval mesmo sob ofuscação.
- **Performance**: Baseado em uma versão otimizada da biblioteca Baileys (@boruto_vk7/baileys).
- **Monitoramento**: Logs detalhados de conexão e eventos integrados.

## 👤 Desenvolvedor & Créditos
Este sistema foi desenvolvido, modificado e é mantido exclusivamente por **Boruto**. Todos os direitos sobre as otimizações e a estrutura atual pertencem ao desenvolvedor.

---
© 2026 Kaoruko Waguri System | Desenvolvido por Boruto </>
