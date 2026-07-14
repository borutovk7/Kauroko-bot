const fs = require('fs');
const path = require('path');
const EfiPay = require('sdk-node-apis-efi');
const QRCode = require('qrcode');
const {upload} = require('../../arquivos/funcoes/functions.js');
const {sayLog, inputLog, infoLog, successLog, errorLog, warningLog, eventLog} = require('../../arquivos/funcoes/logger.js');
const {client_id_efi, client_secret_efi} = require('../../configs/config_Efipay.json');
infoLog('Inicializando\x20SDK\x20da\x20Efí\x20Pay...');
successLog('SDK\x20inicializado\x20com\x20configurações\x20completa\x20do\x20usuario!');
class EfiPayPayment {
    constructor(_0x420981) {
        const _0x4c94bb = path['join'](__dirname, 'producao_waguri.p12');
        if (!fs['existsSync'](_0x4c94bb)) {
            throw new Error('Certificado\x20não\x20encontrado\x20no\x20caminho:\x20' + _0x4c94bb);
        }
        this['pixKey'] = _0x420981;
        const _0x216ce3 = {
            'sandbox': ![],
            'client_id': client_id_efi,
            'client_secret': client_secret_efi,
            'certificate': _0x4c94bb,
            'cert_base64': ![],
            'scopes': [
                'pix.write',
                'pix.read',
                'cob.write',
                'cob.read',
                'pix.send'
            ]
        };
        this['efi'] = new EfiPay(_0x216ce3);
        successLog('SDK\x20inicializado.');
    }
    ['comTimeout'](_0x179e20, _0x4c4c25, _0x4048df) {
        return Promise['race']([
            _0x179e20,
            new Promise((_0x5dc0c1, _0x47611e) => setTimeout(() => _0x47611e(new Error('Timeout\x20de\x20' + _0x4c4c25 + 'ms\x20excedido\x20em:\x20' + _0x4048df)), _0x4c4c25))
        ]);
    }
    async ['createPixPayment'](_0x4228b3) {
        infoLog('Iniciando\x20criação\x20de\x20pagamento\x20PIX...');
        const _0x13d9d5 = {
            'calendario': { 'expiracao': 0x384 },
            'valor': { 'original': Number(_0x4228b3)['toFixed'](0x2) },
            'chave': this['pixKey'],
            'infoAdicionais': [{
                    'nome': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠',
                    'valor': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠'
                }]
        };
        try {
            const _0x356e30 = await this['comTimeout'](this['efi']['pixCreateImmediateCharge']({}, _0x13d9d5), 0x4e20, 'pixCreateImmediateCharge');
            infoLog('Resposta\x20completa\x20de\x20pixCreateImmediateCharge:', _0x356e30);
            if (!_0x356e30?.['txid']) {
                throw new Error('Falha\x20na\x20criação\x20de\x20cobrança:\x20resposta\x20incompleta');
            }
            const _0xc2f18c = _0x356e30['txid'];
            successLog('Cobrança\x20PIX\x20criada:', { 'txid': _0xc2f18c });
            infoLog('Gerando\x20QR\x20Code...');
            const _0x31126c = { 'id': _0x356e30['loc']['id'] };
            const _0x622ea1 = await this['comTimeout'](this['efi']['pixGenerateQRCode'](_0x31126c), 0x4e20, 'pixGenerateQRCode');
            successLog('QR\x20Code\x20gerado\x20com\x20sucesso.');
            const _0x10a1a2 = _0x356e30['pixCopiaECola'];
            const _0x682eb8 = await QRCode['toBuffer'](_0x10a1a2, {
                'type': 'png',
                'errorCorrectionLevel': 'H'
            });
            const _0x46a703 = await this['comTimeout'](upload(_0x682eb8), 0x4e20, 'upload\x20do\x20QR\x20Code');
            console['log']('[SUCESSO]\x20Imagem\x20QR\x20Code\x20enviada\x20para\x20o\x20servidor.');
            return {
                'txid': _0xc2f18c,
                'qr_code': _0x622ea1['qrcode'],
                'qr_code_base64': _0x622ea1['imagemQrcode'],
                'pix_copia_e_cola': _0x10a1a2,
                'valor': _0x13d9d5['valor']['original'],
                'uploaded_image_url': _0x46a703
            };
        } catch (_0x3baa75) {
            console['error']('[ERRO]\x20Falha\x20ao\x20criar\x20pagamento\x20PIX:', _0x3baa75?.['message'] || _0x3baa75);
            console['error']('[DEBUG]\x20Status\x20HTTP:', _0x3baa75?.['code']);
            console['error']('[DEBUG]\x20Resposta\x20completa:', JSON['stringify'](_0x3baa75?.['response']?.['data'] || {}, null, 0x2));
            return null;
        }
    }
    async ['checkPayment'](_0x301851) {
        infoLog('Verificando\x20status\x20do\x20pagamento\x20PIX\x20para\x20TXID:', _0x301851);
        try {
            const _0x11480d = { 'txid': _0x301851 };
            const _0x2bce6a = await this['comTimeout'](this['efi']['pixDetailCharge'](_0x11480d), 0x4e20, 'pixDetailCharge');
            successLog('Status\x20do\x20pagamento:', _0x2bce6a['status']);
            return _0x2bce6a['status'];
        } catch (_0x102ed9) {
            errorLog('Falha\x20ao\x20verificar\x20pagamento\x20PIX:', _0x102ed9?.['message'] || _0x102ed9);
            return null;
        }
    }
    ['startPaymentStatusCheck'](_0x349955) {
        infoLog('Iniciando\x20verificação\x20de\x20pagamento\x20para\x20TXID:\x20' + _0x349955);
        const _0x443a4e = setInterval(async () => {
            const _0x329bf4 = await this['checkPayment'](_0x349955);
            if (!_0x329bf4)
                return;
            const _0x2c7494 = [
                'COMPLETED',
                'CONCLUIDA',
                'CANCELED',
                'CANCELADO',
                'EXPIRED',
                'EXPIRADO'
            ];
            if (_0x2c7494['includes'](_0x329bf4['toUpperCase']())) {
                infoLog('Pagamento\x20finalizado\x20com\x20status:\x20' + _0x329bf4);
                clearInterval(_0x443a4e);
            } else if (_0x329bf4['toUpperCase']() === 'ATIVA') {
                infoLog('Pagamento\x20ainda\x20ATIVO.\x20Aguardando\x20confirmação...');
            } else {
                infoLog('Status\x20atual:\x20' + _0x329bf4 + '.\x20Continuando\x20verificação...');
            }
        }, 0x3a98);
    }
}
module['exports'] = { 'EfiPayPayment': EfiPayPayment };
