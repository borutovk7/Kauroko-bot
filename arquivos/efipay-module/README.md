# EfiPayPayment

O **EfiPayPayment** é um módulo desenvolvido para facilitar a integração com a API da **Efí Pay**, permitindo a criação e gerenciamento de pagamentos via **PIX** de forma simples e eficiente.

---

## 📋 Funcionalidades

- **Criação de pagamentos via PIX**  
- **Geração de QR Code PIX**  
- **Consulta do status de pagamentos PIX**  
- **Envio automático do QR Code para um servidor externo**  

---

## 🚀 Instalação

1. **Clone o repositório:**  
   ```bash
   git clone https://github.com/Otakump4/efipay-module.git
   ```

2. **Acesse o diretório do projeto:**  
   ```bash
   cd efipay-module
   ```

3. **Instale as dependências necessárias:**  
   ```bash
   npm install
   ```

---

## ⚙️ Configuração

Para utilizar o módulo, você precisa configurar as credenciais da API da **Efí Pay**.  

Edite o código ou passe as credenciais diretamente no construtor:

```javascript
const { EfiPayPayment } = require('./EfiPayPayment')

// Configurando a API com sua chave PIX
const efipay = new EfiPayPayment('sua-chave-pix-aqui')
```

> 💡 **Dica**: Certifique-se de que o certificado `producao_zerotwo.p12` está presente no diretório do projeto.

---

## 📖 Exemplos de Uso

### Criar um Pagamento via Pix

```javascript
(async () => {
  const payment = await efipay.createPixPayment(10000) // Valor em centavos (ex: 10000 = R$ 100,00)
  if (payment) {
    console.log('QR Code:', payment.qr_code)
    console.log('QR Code (Base64):', payment.qr_code_base64)
    console.log('Pix Copia e Cola:', payment.pix_copia_e_cola)
    console.log('Imagem do QR Code:', payment.uploaded_image_url)
  } else {
    console.log('Erro ao criar o pagamento.')
  }
})()
```

### Consultar Status de Pagamento

```javascript
(async () => {
  const status = await efipay.checkPayment('id_do_pagamento') // Substitua pelo TXID do pagamento
  console.log('Status do pagamento:', status)
})()
```

### Monitorar Status de Pagamento

```javascript
efipay.startPaymentStatusCheck('id_do_pagamento')
```

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Efí Pay API**
- **Módulos auxiliares: `sdk-node-apis-efi`, `qrcode`, `fs`**

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 📞 Suporte

Caso tenha dúvidas ou precise de ajuda, entre em contato com o desenvolvedor:  
**Email:** lucasmoddomina@gmail.com  
**GitHub:** [Otakump4](https://github.com/Otakump4)

---

## 🌟 Contribua

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou reportar problemas na aba de issues.

---

Com este módulo, fica simples e eficiente integrar pagamentos via Efí Pay em suas aplicações! 🚀
