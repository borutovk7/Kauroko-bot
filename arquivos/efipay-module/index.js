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
    constructor(_0x12b94d) {
        const _0x5963ae = path['join'](__dirname, 'producao_waguri.p12');
        if (!fs['existsSync'](_0x5963ae)) {
            throw new Error('Certificado\x20não\x20encontrado\x20no\x20caminho:\x20' + _0x5963ae);
        }
        this['pixKey'] = _0x12b94d;
        const _0x27f567 = {
            'sandbox': ![],
            'client_id': client_id_efi,
            'client_secret': client_secret_efi,
            'certificate': _0x5963ae,
            'cert_base64': ![],
            'scopes': [
                'pix.write',
                'pix.read',
                'cob.write',
                'cob.read',
                'pix.send'
            ]
        };
        this['efi'] = new EfiPay(_0x27f567);
        successLog('SDK\x20inicializado.');
    }
    ['comTimeout'](_0x34d5a5, _0x34d876, _0x512bd6) {
        return Promise['race']([
            _0x34d5a5,
            new Promise((_0x1fc681, _0xd62f05) => setTimeout(() => _0xd62f05(new Error('Timeout\x20de\x20' + _0x34d876 + 'ms\x20excedido\x20em:\x20' + _0x512bd6)), _0x34d876))
        ]);
    }
    async ['createPixPayment'](_0x39922c) {
        infoLog('Iniciando\x20criação\x20de\x20pagamento\x20PIX...');
        const _0x44b691 = {
            'calendario': { 'expiracao': 0x384 },
            'valor': { 'original': Number(_0x39922c)['toFixed'](0x2) },
            'chave': this['pixKey'],
            'infoAdicionais': [{
                    'nome': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠',
                    'valor': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠'
                }]
        };
        try {
            const _0x198a1e = await this['comTimeout'](this['efi']['pixCreateImmediateCharge']({}, _0x44b691), 0x4e20, 'pixCreateImmediateCharge');
            infoLog('Resposta\x20completa\x20de\x20pixCreateImmediateCharge:', _0x198a1e);
            if (!_0x198a1e?.['txid']) {
                throw new Error('Falha\x20na\x20criação\x20de\x20cobrança:\x20resposta\x20incompleta');
            }
            const _0x2bdf6d = _0x198a1e['txid'];
            successLog('Cobrança\x20PIX\x20criada:', { 'txid': _0x2bdf6d });
            infoLog('Gerando\x20QR\x20Code...');
            const _0x4b1b9f = { 'id': _0x198a1e['loc']['id'] };
            const _0x3bb233 = await this['comTimeout'](this['efi']['pixGenerateQRCode'](_0x4b1b9f), 0x4e20, 'pixGenerateQRCode');
            successLog('QR\x20Code\x20gerado\x20com\x20sucesso.');
            const _0x477fd2 = _0x198a1e['pixCopiaECola'];
            const _0x40d91e = await QRCode['toBuffer'](_0x477fd2, {
                'type': 'png',
                'errorCorrectionLevel': 'H'
            });
            const _0xcc7da9 = await this['comTimeout'](upload(_0x40d91e), 0x4e20, 'upload\x20do\x20QR\x20Code');
            console['log']('[SUCESSO]\x20Imagem\x20QR\x20Code\x20enviada\x20para\x20o\x20servidor.');
            return {
                'txid': _0x2bdf6d,
                'qr_code': _0x3bb233['qrcode'],
                'qr_code_base64': _0x3bb233['imagemQrcode'],
                'pix_copia_e_cola': _0x477fd2,
                'valor': _0x44b691['valor']['original'],
                'uploaded_image_url': _0xcc7da9
            };
        } catch (_0x492ae9) {
            console['error']('[ERRO]\x20Falha\x20ao\x20criar\x20pagamento\x20PIX:', _0x492ae9?.['message'] || _0x492ae9);
            console['error']('[DEBUG]\x20Status\x20HTTP:', _0x492ae9?.['code']);
            console['error']('[DEBUG]\x20Resposta\x20completa:', JSON['stringify'](_0x492ae9?.['response']?.['data'] || {}, null, 0x2));
            return null;
        }
    }
    async ['checkPayment'](_0x173cbc) {
        infoLog('Verificando\x20status\x20do\x20pagamento\x20PIX\x20para\x20TXID:', _0x173cbc);
        try {
            const _0x7be4b1 = { 'txid': _0x173cbc };
            const _0x5207ce = await this['comTimeout'](this['efi']['pixDetailCharge'](_0x7be4b1), 0x4e20, 'pixDetailCharge');
            successLog('Status\x20do\x20pagamento:', _0x5207ce['status']);
            return _0x5207ce['status'];
        } catch (_0x1b75be) {
            errorLog('Falha\x20ao\x20verificar\x20pagamento\x20PIX:', _0x1b75be?.['message'] || _0x1b75be);
            return null;
        }
    }
    ['startPaymentStatusCheck'](_0x414de0) {
        infoLog('Iniciando\x20verificação\x20de\x20pagamento\x20para\x20TXID:\x20' + _0x414de0);
        const _0x3e4aae = setInterval(async () => {
            const _0xa0a333 = await this['checkPayment'](_0x414de0);
            if (!_0xa0a333)
                return;
            const _0x432b77 = [
                'COMPLETED',
                'CONCLUIDA',
                'CANCELED',
                'CANCELADO',
                'EXPIRED',
                'EXPIRADO'
            ];
            if (_0x432b77['includes'](_0xa0a333['toUpperCase']())) {
                infoLog('Pagamento\x20finalizado\x20com\x20status:\x20' + _0xa0a333);
                clearInterval(_0x3e4aae);
            } else if (_0xa0a333['toUpperCase']() === 'ATIVA') {
                infoLog('Pagamento\x20ainda\x20ATIVO.\x20Aguardando\x20confirmação...');
            } else {
                infoLog('Status\x20atual:\x20' + _0xa0a333 + '.\x20Continuando\x20verificação...');
            }
        }, 0x3a98);
    }
}
module['exports'] = { 'EfiPayPayment': EfiPayPayment };
