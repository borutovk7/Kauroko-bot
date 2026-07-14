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
    constructor(_0x118dd7) {
        const _0x2fb472 = path['join'](__dirname, 'producao_waguri.p12');
        if (!fs['existsSync'](_0x2fb472)) {
            throw new Error('Certificado\x20não\x20encontrado\x20no\x20caminho:\x20' + _0x2fb472);
        }
        this['pixKey'] = _0x118dd7;
        const _0x153f5c = {
            'sandbox': ![],
            'client_id': client_id_efi,
            'client_secret': client_secret_efi,
            'certificate': _0x2fb472,
            'cert_base64': ![],
            'scopes': [
                'pix.write',
                'pix.read',
                'cob.write',
                'cob.read',
                'pix.send'
            ]
        };
        this['efi'] = new EfiPay(_0x153f5c);
        successLog('SDK\x20inicializado.');
    }
    ['comTimeout'](_0x28156a, _0xaa431c, _0x405808) {
        return Promise['race']([
            _0x28156a,
            new Promise((_0x9c2973, _0x1f6ac6) => setTimeout(() => _0x1f6ac6(new Error('Timeout\x20de\x20' + _0xaa431c + 'ms\x20excedido\x20em:\x20' + _0x405808)), _0xaa431c))
        ]);
    }
    async ['createPixPayment'](_0x3f6c10) {
        infoLog('Iniciando\x20criação\x20de\x20pagamento\x20PIX...');
        const _0x2d3024 = {
            'calendario': { 'expiracao': 0x384 },
            'valor': { 'original': Number(_0x3f6c10)['toFixed'](0x2) },
            'chave': this['pixKey'],
            'infoAdicionais': [{
                    'nome': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠',
                    'valor': '💠\x20SISTEMA\x20PIX\x20BY\x20LUCAS\x20MOD\x20💠'
                }]
        };
        try {
            const _0x565868 = await this['comTimeout'](this['efi']['pixCreateImmediateCharge']({}, _0x2d3024), 0x4e20, 'pixCreateImmediateCharge');
            infoLog('Resposta\x20completa\x20de\x20pixCreateImmediateCharge:', _0x565868);
            if (!_0x565868?.['txid']) {
                throw new Error('Falha\x20na\x20criação\x20de\x20cobrança:\x20resposta\x20incompleta');
            }
            const _0x3dcf59 = _0x565868['txid'];
            successLog('Cobrança\x20PIX\x20criada:', { 'txid': _0x3dcf59 });
            infoLog('Gerando\x20QR\x20Code...');
            const _0xce2fed = { 'id': _0x565868['loc']['id'] };
            const _0x64c5cc = await this['comTimeout'](this['efi']['pixGenerateQRCode'](_0xce2fed), 0x4e20, 'pixGenerateQRCode');
            successLog('QR\x20Code\x20gerado\x20com\x20sucesso.');
            const _0x5cc40b = _0x565868['pixCopiaECola'];
            const _0x19011d = await QRCode['toBuffer'](_0x5cc40b, {
                'type': 'png',
                'errorCorrectionLevel': 'H'
            });
            const _0x4ca715 = await this['comTimeout'](upload(_0x19011d), 0x4e20, 'upload\x20do\x20QR\x20Code');
            console['log']('[SUCESSO]\x20Imagem\x20QR\x20Code\x20enviada\x20para\x20o\x20servidor.');
            return {
                'txid': _0x3dcf59,
                'qr_code': _0x64c5cc['qrcode'],
                'qr_code_base64': _0x64c5cc['imagemQrcode'],
                'pix_copia_e_cola': _0x5cc40b,
                'valor': _0x2d3024['valor']['original'],
                'uploaded_image_url': _0x4ca715
            };
        } catch (_0x47e490) {
            console['error']('[ERRO]\x20Falha\x20ao\x20criar\x20pagamento\x20PIX:', _0x47e490?.['message'] || _0x47e490);
            console['error']('[DEBUG]\x20Status\x20HTTP:', _0x47e490?.['code']);
            console['error']('[DEBUG]\x20Resposta\x20completa:', JSON['stringify'](_0x47e490?.['response']?.['data'] || {}, null, 0x2));
            return null;
        }
    }
    async ['checkPayment'](_0x58c307) {
        infoLog('Verificando\x20status\x20do\x20pagamento\x20PIX\x20para\x20TXID:', _0x58c307);
        try {
            const _0x5ecb0e = { 'txid': _0x58c307 };
            const _0x242f8a = await this['comTimeout'](this['efi']['pixDetailCharge'](_0x5ecb0e), 0x4e20, 'pixDetailCharge');
            successLog('Status\x20do\x20pagamento:', _0x242f8a['status']);
            return _0x242f8a['status'];
        } catch (_0x52f010) {
            errorLog('Falha\x20ao\x20verificar\x20pagamento\x20PIX:', _0x52f010?.['message'] || _0x52f010);
            return null;
        }
    }
    ['startPaymentStatusCheck'](_0x2d4564) {
        infoLog('Iniciando\x20verificação\x20de\x20pagamento\x20para\x20TXID:\x20' + _0x2d4564);
        const _0x5b7f93 = setInterval(async () => {
            const _0x2bb58d = await this['checkPayment'](_0x2d4564);
            if (!_0x2bb58d)
                return;
            const _0x9713e0 = [
                'COMPLETED',
                'CONCLUIDA',
                'CANCELED',
                'CANCELADO',
                'EXPIRED',
                'EXPIRADO'
            ];
            if (_0x9713e0['includes'](_0x2bb58d['toUpperCase']())) {
                infoLog('Pagamento\x20finalizado\x20com\x20status:\x20' + _0x2bb58d);
                clearInterval(_0x5b7f93);
            } else if (_0x2bb58d['toUpperCase']() === 'ATIVA') {
                infoLog('Pagamento\x20ainda\x20ATIVO.\x20Aguardando\x20confirmação...');
            } else {
                infoLog('Status\x20atual:\x20' + _0x2bb58d + '.\x20Continuando\x20verificação...');
            }
        }, 0x3a98);
    }
}
module['exports'] = { 'EfiPayPayment': EfiPayPayment };
