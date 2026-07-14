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
    constructor(_0x5cfab7) {
        const _0x5943b9 = path['join'](__dirname, 'producao_waguri.p12');
        if (!fs['existsSync'](_0x5943b9)) {
            throw new Error('Certificado\x20não\x20encontrado\x20no\x20caminho:\x20' + _0x5943b9);
        }
        this['pixKey'] = _0x5cfab7;
        const _0x4823cd = {
            'sandbox': ![],
            'client_id': client_id_efi,
            'client_secret': client_secret_efi,
            'certificate': _0x5943b9,
            'cert_base64': ![],
            'scopes': [
                'pix.write',
                'pix.read',
                'cob.write',
                'cob.read',
                'pix.send'
            ]
        };
        this['efi'] = new EfiPay(_0x4823cd);
        successLog('SDK\x20inicializado.');
    }
    ['comTimeout'](_0x3ce68c, _0x3d4d0e, _0x54b366) {
        return Promise['race']([
            _0x3ce68c,
            new Promise((_0x4cc8a5, _0x2acded) => setTimeout(() => _0x2acded(new Error('Timeout\x20de\x20' + _0x3d4d0e + 'ms\x20excedido\x20em:\x20' + _0x54b366)), _0x3d4d0e))
        ]);
    }
    async ['createPixPayment'](_0x3c5c0a) {
        infoLog('Iniciando\x20criação\x20de\x20pagamento\x20PIX...');
        const _0x265b49 = {
            'calendario': { 'expiracao': 0x384 },
            'valor': { 'original': Number(_0x3c5c0a)['toFixed'](0x2) },
            'chave': this['pixKey'],
            'infoAdicionais': [{
                    'nome': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠',
                    'valor': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠'
                }]
        };
        try {
            const _0x279422 = await this['comTimeout'](this['efi']['pixCreateImmediateCharge']({}, _0x265b49), 0x4e20, 'pixCreateImmediateCharge');
            infoLog('Resposta\x20completa\x20de\x20pixCreateImmediateCharge:', _0x279422);
            if (!_0x279422?.['txid']) {
                throw new Error('Falha\x20na\x20criação\x20de\x20cobrança:\x20resposta\x20incompleta');
            }
            const _0xa9a191 = _0x279422['txid'];
            successLog('Cobrança\x20PIX\x20criada:', { 'txid': _0xa9a191 });
            infoLog('Gerando\x20QR\x20Code...');
            const _0x456afe = { 'id': _0x279422['loc']['id'] };
            const _0x5beb8b = await this['comTimeout'](this['efi']['pixGenerateQRCode'](_0x456afe), 0x4e20, 'pixGenerateQRCode');
            successLog('QR\x20Code\x20gerado\x20com\x20sucesso.');
            const _0x2d02bb = _0x279422['pixCopiaECola'];
            const _0x48a364 = await QRCode['toBuffer'](_0x2d02bb, {
                'type': 'png',
                'errorCorrectionLevel': 'H'
            });
            const _0x254bba = await this['comTimeout'](upload(_0x48a364), 0x4e20, 'upload\x20do\x20QR\x20Code');
            console['log']('[SUCESSO]\x20Imagem\x20QR\x20Code\x20enviada\x20para\x20o\x20servidor.');
            return {
                'txid': _0xa9a191,
                'qr_code': _0x5beb8b['qrcode'],
                'qr_code_base64': _0x5beb8b['imagemQrcode'],
                'pix_copia_e_cola': _0x2d02bb,
                'valor': _0x265b49['valor']['original'],
                'uploaded_image_url': _0x254bba
            };
        } catch (_0x58bd42) {
            console['error']('[ERRO]\x20Falha\x20ao\x20criar\x20pagamento\x20PIX:', _0x58bd42?.['message'] || _0x58bd42);
            console['error']('[DEBUG]\x20Status\x20HTTP:', _0x58bd42?.['code']);
            console['error']('[DEBUG]\x20Resposta\x20completa:', JSON['stringify'](_0x58bd42?.['response']?.['data'] || {}, null, 0x2));
            return null;
        }
    }
    async ['checkPayment'](_0x183edb) {
        infoLog('Verificando\x20status\x20do\x20pagamento\x20PIX\x20para\x20TXID:', _0x183edb);
        try {
            const _0x366df2 = { 'txid': _0x183edb };
            const _0x52e4c1 = await this['comTimeout'](this['efi']['pixDetailCharge'](_0x366df2), 0x4e20, 'pixDetailCharge');
            successLog('Status\x20do\x20pagamento:', _0x52e4c1['status']);
            return _0x52e4c1['status'];
        } catch (_0x5c0d04) {
            errorLog('Falha\x20ao\x20verificar\x20pagamento\x20PIX:', _0x5c0d04?.['message'] || _0x5c0d04);
            return null;
        }
    }
    ['startPaymentStatusCheck'](_0x16fc0a) {
        infoLog('Iniciando\x20verificação\x20de\x20pagamento\x20para\x20TXID:\x20' + _0x16fc0a);
        const _0x2e86f6 = setInterval(async () => {
            const _0xe3c082 = await this['checkPayment'](_0x16fc0a);
            if (!_0xe3c082)
                return;
            const _0x24b2e9 = [
                'COMPLETED',
                'CONCLUIDA',
                'CANCELED',
                'CANCELADO',
                'EXPIRED',
                'EXPIRADO'
            ];
            if (_0x24b2e9['includes'](_0xe3c082['toUpperCase']())) {
                infoLog('Pagamento\x20finalizado\x20com\x20status:\x20' + _0xe3c082);
                clearInterval(_0x2e86f6);
            } else if (_0xe3c082['toUpperCase']() === 'ATIVA') {
                infoLog('Pagamento\x20ainda\x20ATIVO.\x20Aguardando\x20confirmação...');
            } else {
                infoLog('Status\x20atual:\x20' + _0xe3c082 + '.\x20Continuando\x20verificação...');
            }
        }, 0x3a98);
    }
}
module['exports'] = { 'EfiPayPayment': EfiPayPayment };
