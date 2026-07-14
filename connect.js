const {makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeInMemoryStore} = require('@boruto_vk7/baileys');
const STORE_PATH = './util/temp/store.json';
const {fs, Boom, axios, util, P, moment, time, hora, getBuffer, upload, banner2, banner3, colors, infoLog, successLog, errorLog, warningLog} = require('./definicoes.js');
const {mess, nescessario, setting, getRandom, NodeCache} = require('./definicoes.js');
var {NomeDoBot, ownerName, prefix} = require('./configs/configs.json');
var {fundo1, fundo2} = require('./configs/links_img.json');
const apikeys = require('./configs/apikeys.json');
const {apis = {}, sites = {}, groups = {}} = apikeys;
const botPackage = JSON['parse'](fs['readFileSync']('./package.json', 'utf8'));
const {API_KEY_WAGURI, API_KEY_OKARUN} = apis;
const {okarunsite, wagurisite, zerosite} = sites;
const {convertWhatsAppUser, AddWhatsAppuser} = require('./database/users/senderlid.js');
const {QRCODEPATH, restartQRfunc} = require('./arquivos/funcoes/restart.js');
const QRCode = require('qrcode');
const qrTerminal = require('qrcode-terminal');
const path = require('path');
const FormData = require('form-data');
const {useSQLiteAuthState} = require('./util/sqlite-auth-state.js');
const {getGroupData} = require('./database/group-config-store.js');
process['on']('unhandledRejection', _0x6754cc => {
    errorLog('[unhandledRejection]\x20' + (_0x6754cc?.['message'] || _0x6754cc));
});
process['on']('uncaughtException', _0x4ff3da => {
    errorLog('[uncaughtException]\x20' + _0x4ff3da['message']);
});
const GRUPOS_FILE = path['resolve']('./util/temp/grupos.json');
const GRUPOS_DIR = path['dirname'](GRUPOS_FILE);
function carregarGrupos() {
    try {
        if (fs['existsSync'](GRUPOS_FILE))
            return JSON['parse'](fs['readFileSync'](GRUPOS_FILE, 'utf8'));
    } catch {
    }
    return [];
}
let _salvarGruposTimer = null;
function salvarGrupos(_0x2faaea) {
    if (_salvarGruposTimer)
        clearTimeout(_salvarGruposTimer);
    _salvarGruposTimer = setTimeout(() => {
        try {
            if (!fs['existsSync'](GRUPOS_DIR))
                fs['mkdirSync'](GRUPOS_DIR, { 'recursive': !![] });
            fs['writeFileSync'](GRUPOS_FILE, JSON['stringify'](_0x2faaea, null, 0x2));
        } catch (_0x2244b1) {
            errorLog('[grupos.json]\x20' + _0x2244b1['message']);
        }
    }, 0x5dc);
}
function atualizarGrupoCache(_0x587d81) {
    if (!_0x587d81?.['id'])
        return;
    const _0x117e97 = carregarGrupos();
    const _0x9cefa7 = _0x117e97['findIndex'](_0x456cea => _0x456cea['id'] === _0x587d81['id']);
    const _0x5065d0 = (_0x587d81['participants'] || [])['map'](_0x4ccc9e => ({
        'jid': _0x4ccc9e['jid'] || _0x4ccc9e['phoneNumber'] || _0x4ccc9e['id'],
        'lid': _0x4ccc9e['id'] || _0x4ccc9e['lid'] || _0x4ccc9e['jid'],
        'admin': _0x4ccc9e['admin'] || null
    }));
    const _0x25d831 = {
        'id': _0x587d81['id'],
        'subject': _0x587d81['subject'] || '',
        'participants': _0x5065d0
    };
    if (_0x9cefa7 >= 0x0)
        _0x117e97[_0x9cefa7] = _0x25d831;
    else
        _0x117e97['push'](_0x25d831);
    salvarGrupos(_0x117e97);
}
function resolverParticipante(_0x591a4a) {
    if (!_0x591a4a)
        return '';
    if (typeof _0x591a4a === 'string') {
        if (_0x591a4a['endsWith']('@lid'))
            return convertWhatsAppUser(_0x591a4a, 'jid') || _0x591a4a;
        return _0x591a4a;
    }
    if (_0x591a4a['jid'] && typeof _0x591a4a['jid'] === 'string')
        return _0x591a4a['jid'];
    if (_0x591a4a['id'] && typeof _0x591a4a['id'] === 'string') {
        if (_0x591a4a['id']['endsWith']('@lid'))
            return convertWhatsAppUser(_0x591a4a['id'], 'jid') || _0x591a4a['id'];
        return _0x591a4a['id'];
    }
    return '';
}
async function uploadMidia(_0x37502d, _0x235a0f = 'media.jpg') {
    try {
        const _0x1a0ea7 = Buffer['isBuffer'](_0x37502d) ? _0x37502d : await getBuffer(_0x37502d);
        const _0x238f8e = new FormData();
        _0x238f8e['append']('apikey', API_KEY_WAGURI);
        _0x238f8e['append']('media', _0x1a0ea7, {
            'filename': _0x235a0f,
            'contentType': 'image/jpeg'
        });
        const _0x522542 = await axios['post'](okarunsite + '/api/upload', _0x238f8e, {
            'headers': _0x238f8e['getHeaders'](),
            'maxBodyLength': Infinity
        });
        if (_0x522542['data']?.['status'] && _0x522542['data']?.['resultado'])
            return _0x522542['data']['resultado'];
        throw new Error('Upload\x20falhou:\x20' + JSON['stringify'](_0x522542['data']));
    } catch (_0x3580ff) {
        errorLog('[uploadMidia]\x20' + _0x3580ff['message']);
        return null;
    }
}
function DLT_FL(_0x535d6c) {
    try {
        fs['unlinkSync'](_0x535d6c);
    } catch {
    }
}
const msgRetryCounterCache = new NodeCache();
const readline = require('readline');
const pairingCode = process['argv']['includes']('sim');
const question = _0x56f926 => {
    const _0x9574e5 = readline['createInterface']({
        'input': process['stdin'],
        'output': process['stdout']
    });
    return new Promise(_0x24fd2f => _0x9574e5['question'](_0x56f926, _0x159272 => {
        _0x9574e5['close']();
        _0x24fd2f(_0x159272);
    }));
};
function collectNumbers(_0x30b052) {
    return _0x30b052['replace'](/[^0-9]/g, '');
}
const TEMP_DIR = path['resolve']('./util/temp');
const SYSTEM_TEMP_DIR = path['join'](TEMP_DIR, 'sys');
const ROOT_DIR = path['resolve']('./');
const MAX_STORE_SIZE_MB = 0xa;
const TEMP_MAX_AGE_MS = 0x3c * 0x3c * 0x3e8;
fs['mkdirSync'](SYSTEM_TEMP_DIR, { 'recursive': !![] });
for (const envName of [
        'TMPDIR',
        'TEMP',
        'TMP'
    ])
    process['env'][envName] = SYSTEM_TEMP_DIR;
function limparArquivosAntigos(_0x2175c7, _0x5aef5e, _0x167476 = () => !![], _0x6c3a43 = _0x2175c7, _0x1a01e0 = !![]) {
    let _0x3e92d8 = 0x0;
    if (!fs['existsSync'](_0x2175c7))
        return _0x3e92d8;
    for (const _0x4236d9 of fs['readdirSync'](_0x2175c7, { 'withFileTypes': !![] })) {
        const _0x3410d9 = path['join'](_0x2175c7, _0x4236d9['name']);
        try {
            if (_0x4236d9['isDirectory']()) {
                if (!_0x1a01e0)
                    continue;
                _0x3e92d8 += limparArquivosAntigos(_0x3410d9, _0x5aef5e, _0x167476, _0x6c3a43, !![]);
                if (_0x3410d9 !== _0x6c3a43 && fs['readdirSync'](_0x3410d9)['length'] === 0x0)
                    fs['rmdirSync'](_0x3410d9);
                continue;
            }
            if (!_0x4236d9['isFile']() || !_0x167476(_0x4236d9['name'], _0x3410d9))
                continue;
            const _0x185992 = Date['now']() - fs['statSync'](_0x3410d9)['mtimeMs'];
            if (_0x185992 >= _0x5aef5e) {
                fs['unlinkSync'](_0x3410d9);
                _0x3e92d8++;
            }
        } catch {
        }
    }
    return _0x3e92d8;
}
function limparTemp() {
    try {
        if (fs['existsSync'](STORE_PATH)) {
            const {size: _0x285c78} = fs['statSync'](STORE_PATH);
            if (_0x285c78 > MAX_STORE_SIZE_MB * 0x400 * 0x400) {
                fs['writeFileSync'](STORE_PATH, '{}');
                infoLog('[limpeza]\x20store.json\x20resetado\x20(estava\x20' + (_0x285c78 / 0x400 / 0x400)['toFixed'](0x1) + 'MB)');
            }
        }
        let _0x1588da = 0x0;
        _0x1588da += limparArquivosAntigos(SYSTEM_TEMP_DIR, TEMP_MAX_AGE_MS);
        _0x1588da += limparArquivosAntigos(TEMP_DIR, TEMP_MAX_AGE_MS, _0x1a2d07 => /\.(mp3|mp4|jpg|jpeg|png|webp|tmp|opus|ogg|gif)$/i['test'](_0x1a2d07), TEMP_DIR, ![]);
        _0x1588da += limparArquivosAntigos(ROOT_DIR, TEMP_MAX_AGE_MS, _0x26b5ec => /\.(mp3|mp4|opus|ogg|tmp)$/i['test'](_0x26b5ec), ROOT_DIR, ![]);
        if (_0x1588da > 0x0)
            infoLog('[limpeza]\x20' + _0x1588da + '\x20arquivo(s)\x20temporário(s)\x20antigo(s)\x20removido(s).');
    } catch (_0x240e55) {
        errorLog('[limpeza]\x20' + _0x240e55['message']);
    }
}
function iniciarMonitorRestartQR(_0xf87909) {
    global['__kaorukoSocketAtual'] = _0xf87909;
    if (global['__restartQRWatcher'])
        return;
    const _0x43fb4a = () => {
        const _0x32d577 = global['__kaorukoSocketAtual'];
        if (!_0x32d577)
            return;
        Promise['resolve'](restartQRfunc(_0x32d577))['catch'](_0x5b3b95 => {
            errorLog('[restart-qr]\x20' + (_0x5b3b95?.['message'] || _0x5b3b95));
        });
    };
    global['__restartQRWatcher'] = setInterval(_0x43fb4a, 0x3c * 0x3e8);
    global['__restartQRWatcher']['unref']?.();
    setTimeout(_0x43fb4a, 0x1388)['unref']?.();
    infoLog('[restart-qr]\x20Verificador\x20automático\x20iniciado\x20(intervalo:\x201\x20minuto).');
}
limparTemp();
const _tempCleanupTimer = setInterval(limparTemp, 0x1e * 0x3c * 0x3e8);
_tempCleanupTimer['unref']?.();
async function iniciarwaguri() {
    const _0x762dc6 = QRCODEPATH;
    const {
        state: _0x363b7f,
        saveCreds: _0x144f04
    } = await useSQLiteAuthState(_0x762dc6);
    const {
        version: _0x56c8fc,
        isLatest: _0x2b1563
    } = await fetchLatestBaileysVersion();
    const _0x1b5bc8 = console['info'];
    console['info'] = function () {
        const _0x21a0a4 = util['format'](...arguments);
        const _0x3c3dba = [
            'Closing\x20session:\x20SessionEntry',
            'Removing\x20old\x20closed\x20session:\x20SessionEntry\x20{',
            'Another\x20forbidden\x20string',
            'Closing\x20stale\x20open\x20session\x20for\x20new\x20outgoing\x20prekey\x20bundle',
            'Failed\x20to\x20decrypt\x20message\x20with\x20any\x20known\x20session',
            'Session\x20error:Error:\x20Bad\x20MAC'
        ];
        if (_0x3c3dba['some'](_0x712d35 => _0x21a0a4['includes'](_0x712d35)))
            return;
        _0x1b5bc8['apply'](console, arguments);
    };
    const _0x4e9da3 = makeWASocket({
        'version': [
            0x2,
            0xbb8,
            0x3e2c370c
        ],
        'auth': {
            'creds': _0x363b7f['creds'],
            'keys': makeCacheableSignalKeyStore(_0x363b7f['keys'], P({ 'level': 'silent' }))
        },
        'printQRInTerminal': !pairingCode,
        'qrTimeout': 0x2bf20,
        'logger': P({ 'level': 'silent' }),
        'browser': [
            'Mac\x20OS',
            'Safari',
            '17.4.1'
        ],
        'msgRetryCounterCache': msgRetryCounterCache,
        'connectTimeoutMs': 0xea60,
        'defaultQueryTimeoutMs': 0x0,
        'keepAliveIntervalMs': 0x61a8,
        'retryRequestDelayMs': 0xfa,
        'emitOwnEvents': !![],
        'fireInitQueries': !![],
        'generateHighQualityLinkPreview': !![],
        'syncFullHistory': ![],
        'markOnlineOnConnect': !![],
        'patchMessageBeforeSending': _0x2d912c => {
            const _0x2b6bca = !!(_0x2d912c['buttonsMessage'] || _0x2d912c['listMessage']);
            if (_0x2b6bca) {
                _0x2d912c = {
                    'viewOnceMessage': {
                        'message': {
                            'messageContextInfo': {
                                'deviceListMetadataVersion': 0x2,
                                'deviceListMetadata': {}
                            },
                            ..._0x2d912c
                        }
                    }
                };
            }
            return _0x2d912c;
        }
    });
    let _0x385668 = null;
    if (makeInMemoryStore) {
        _0x385668 = makeInMemoryStore({ 'logger': P({ 'level': 'silent' }) });
        _0x385668['bind'](_0x4e9da3['ev']);
        try {
            if (!fs['existsSync']('./util/temp'))
                fs['mkdirSync']('./util/temp', { 'recursive': !![] });
            if (fs['existsSync'](STORE_PATH))
                _0x385668['readFromFile'](STORE_PATH);
        } catch {
        }
        setInterval(() => {
            try {
                _0x385668['writeToFile'](STORE_PATH);
            } catch {
            }
        }, 0x3 * 0x3c * 0x3e8);
    }
    if (pairingCode && !_0x4e9da3['authState']['creds']['registered']) {
        infoLog(colors['white']('-\x20Exemplo\x20do\x20número\x20para\x20realizar\x20a\x20conexão\x20do\x20bot:\x20+55\x2097\x209999-9999.\x20Coloque\x20do\x20jeito\x20que\x20está\x20no\x20WhatsApp!') + '\x0a–\x0a' + colors['cyan']('•\x20Insira\x20no\x20parâmetro\x20abaixo\x20o\x20número\x20de\x20telefone\x20que\x20você\x20deseja\x20conectar\x20a\x20bot\x20no\x20WhatsApp\x20Web:\x0a'));
        const _0x221ed1 = await question('');
        const _0x33ca06 = collectNumbers(_0x221ed1);
        try {
            const _0x14c4f1 = await _0x4e9da3['requestPairingCode'](_0x33ca06);
            successLog(colors['cyan']('•\x20Código\x20para\x20conectar\x20o\x20bot\x20e\x20desfrutar\x20de\x20suas\x20imensas\x20funcionalidades:') + '\x20' + colors['white'](_0x14c4f1) + '\x0a–\x0a' + colors['yellow']('•\x20Tutorial:\x20Entre\x20no\x20WhatsApp\x20que\x20será\x20o\x20bot\x20e\x20vá\x20em\x20aparelhos\x20conectado,\x20e\x20clique\x20em\x20\x22Conectar\x20um\x20aparelho\x22,\x20e\x20lá\x20na\x20parte\x20inferior,\x20clique\x20em\x20\x22Conectar\x20com\x20número\x20de\x20telefone\x22\x20e\x20digite\x20o\x20código\x20gerado\x20acima...'));
        } catch (_0x5f46e1) {
            errorLog(colors['red']('Erro\x20ao\x20gerar\x20código\x20de\x20pareamento:\x20' + _0x5f46e1['message']));
            errorLog(colors['yellow']('Tente\x20deletar\x20a\x20pasta\x20de\x20sessão\x20e\x20reiniciar.'));
        }
    }
    _0x4e9da3['ev']['process'](async _0x51e3c9 => {
        if (_0x51e3c9['group-participants.update']) {
            try {
                var _0x479677 = _0x51e3c9['group-participants.update'];
                var _0x6cceac = getGroupData(_0x479677['id']);
                if (!_0x6cceac)
                    return;
                const _0x4e6ecf = resolverParticipante(_0x479677['participants'][0x0]);
                if (!_0x4e6ecf)
                    return;
                _0x479677['participants'][0x0] = _0x4e6ecf;
                const _0x50ec77 = (_0x4e9da3['user']['id'] || _0x4e9da3['user']['jid'] || '')['split'](':')[0x0]['replace'](/@.*/, '');
                if (_0x4e6ecf['replace'](/@.*/, '') === _0x50ec77)
                    return;
                const {nukeSystemFunc: _0x5074c3} = require('./database/antinuke/nukesystem.js');
                _0x5074c3(_0x4e9da3, _0x479677);
                try {
                    var _0x119f43 = await _0x4e9da3['groupMetadata'](_0x479677['id']);
                } catch {
                    return;
                }
                const _0x54c6f6 = _0x119f43['id']['endsWith']('@g.us');
                const _0x32cb0b = _0x54c6f6 ? _0x119f43 : null;
                if (!_0x32cb0b)
                    return;
                atualizarGrupoCache(_0x119f43);
                if (_0x479677['action'] == 'add') {
                    const _0x211cf8 = _0x479677['participants'][0x0];
                    if (nescessario['listanegraG']['includes'](_0x211cf8)) {
                        await _0x4e9da3['sendMessage'](_0x32cb0b['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban...' });
                        _0x4e9da3['groupParticipantsUpdate'](_0x32cb0b['id'], [_0x479677['participants'][0x0]], 'remove');
                        return;
                    }
                }
                if (_0x479677['action'] == 'add' && _0x6cceac[0x0]['listanegra']['includes'](_0x479677['participants'][0x0])) {
                    await _0x4e9da3['sendMessage'](_0x32cb0b['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban\x20cabaço...' });
                    _0x4e9da3['groupParticipantsUpdate'](_0x32cb0b['id'], [_0x479677['participants'][0x0]], 'remove');
                }
                if (!_0x6cceac[0x0]['wellcome'][0x1]['bemvindo2'] && !_0x6cceac[0x0]['wellcome'][0x0]['bemvindo1'])
                    return;
                var _0x25a169 = _0x54c6f6 ? _0x119f43 : '';
                if (!_0x25a169)
                    return;
                const _0x2bd37e = _0x479677['id'];
                const _0x2213b4 = _0x6cceac[0x0]['wellcome'][0x0]['legendabv'] != null ? !![] : ![];
                const _0x316b3e = _0x6cceac[0x0]['wellcome'][0x0]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x253aab = _0x6cceac[0x0]['wellcome'][0x1]['legendabv'] != null ? !![] : ![];
                const _0x3ba843 = _0x6cceac[0x0]['wellcome'][0x1]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x4e4de4 = _0x25a169['desc'];
                if (_0x6cceac[0x0]['antifake'] == !![] && !_0x479677['participants'][0x0]['startsWith']('55'))
                    return;
                let _0x278322 = { 'data': 'https://telegra.ph/file/24fa902ead26340f3df2c.png' };
                if (_0x6cceac[0x0]['wellcome'][0x0]['bemvindo1'] == !![]) {
                    try {
                        ppimg = await _0x4e9da3['profilePictureUrl'](_0x479677['participants'][0x0]);
                    } catch {
                        ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                    }
                    _0x278322 = { 'data': await uploadMidia(ppimg, 'perfil.jpg') || ppimg };
                    try {
                        var _0xbed724 = await _0x4e9da3['profilePictureUrl'](_0x2bd37e, 'image');
                    } catch {
                        var _0xbed724 = 'https://telegra.ph/file/6ca032835ed7a16748b6f.jpg';
                    }
                    ppgrupo = { 'data': await uploadMidia(_0xbed724, 'grupo2.jpg') || _0xbed724 };
                    if (_0x479677['action'] === 'add') {
                        if (_0x2213b4) {
                            teks = _0x6cceac[0x0]['wellcome'][0x0]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x25a169['subject'])['replace']('#numerodele#', '@' + _0x479677['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x4e9da3['user']['id'])['replace']('#prefixo#', _0x6cceac[0x0]['multiprefix'] == !![] ? _0x6cceac[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x4e4de4);
                        } else {
                            teks = welcome(_0x479677['participants'][0x0]['split']('@')[0x0], _0x25a169['subject']);
                        }
                        let _0x2f5cb1 = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x2f5cb1);
                        _0x4e9da3['sendMessage'](_0x25a169['id'], {
                            'image': { 'url': okarunsite + ('/api/welcome?avatar=' + _0x278322['data'] + '&numero=' + _0x479677['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=Seja\x20Bem-vindo\x20ao\x20grupo\x20' + encodeURI(_0x25a169['subject']) + '&mensagem=Bem\x20Vindo\x20(a)!&background=' + fundo2 + '&tema=rosa') },
                            'mentions': _0x479677['participants'],
                            'caption': teks
                        });
                        DLT_FL(ran);
                    } else if (_0x479677['action'] === 'remove') {
                        _0x5590c0 = _0x479677['participants'][0x0];
                        try {
                            ppimg = await _0x4e9da3['profilePictureUrl'](_0x5590c0['split']('@')[0x0] + '@c.us');
                        } catch {
                            ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                        }
                        if (_0x316b3e) {
                            teks = _0x6cceac[0x0]['wellcome'][0x0]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x25a169['subject'])['replace']('#numerodele#', '@' + _0x479677['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x4e9da3['user']['id'])['replace']('#prefixo#', _0x6cceac[0x0]['multiprefix'] == !![] ? _0x6cceac[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x4e4de4);
                        }
                        let _0x1477d0 = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x1477d0);
                        _0x4e9da3['sendMessage'](_0x25a169['id'], {
                            'image': { 'url': okarunsite + ('/api/goodbye?avatar=' + _0x278322['data'] + '&numero=' + _0x479677['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=SAIU\x20DE\x20' + encodeURI(_0x25a169['subject']) + '&mensagem=Até%20logo!&background=' + fundo2 + '&tema=rosa') },
                            'caption': teks,
                            'mentions': _0x479677['participants']
                        });
                        DLT_FL(ran);
                    }
                }
                if (_0x6cceac[0x0]['wellcome'][0x1]['bemvindo2'] == !![]) {
                    if (_0x479677['action'] === 'add') {
                        if (_0x253aab) {
                            teks = _0x6cceac[0x0]['wellcome'][0x1]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x25a169['subject'])['replace']('#numerodele#', '@' + _0x479677['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x4e9da3['user']['id'])['replace']('#prefixo#', _0x6cceac[0x0]['multiprefix'] == !![] ? _0x6cceac[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x4e4de4);
                        } else {
                            teks = welcome2(_0x479677['participants'][0x0]['split']('@')[0x0], _0x25a169['subject']);
                        }
                        _0x4e9da3['sendMessage'](_0x25a169['id'], {
                            'text': teks,
                            'mentions': _0x479677['participants']
                        });
                    } else if (_0x479677['action'] === 'remove') {
                        var _0x5590c0 = _0x479677['participants'][0x0];
                        if (_0x3ba843) {
                            teks = _0x6cceac[0x0]['wellcome'][0x1]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x25a169['subject'])['replace']('#numerodele#', '@' + _0x479677['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x4e9da3['user']['id'])['replace']('#prefixo#', _0x6cceac[0x0]['multiprefix'] == !![] ? _0x6cceac[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x4e4de4);
                        } else {
                            teks = bye2(_0x5590c0['split']('@')[0x0]);
                        }
                        _0x4e9da3['sendMessage'](_0x25a169['id'], {
                            'text': teks,
                            'mentions': _0x479677['participants']
                        });
                    }
                }
            } catch (_0x24d1a1) {
                console['log'](_0x24d1a1);
            }
        }
        if (_0x51e3c9['groups.update']) {
            try {
                const _0x5b4f21 = _0x51e3c9['groups.update'];
                for (const _0x20cb79 of Array['isArray'](_0x5b4f21) ? _0x5b4f21 : [_0x5b4f21]) {
                    if (!_0x20cb79?.['id'])
                        continue;
                    try {
                        const _0x403678 = await _0x4e9da3['groupMetadata'](_0x20cb79['id']);
                        atualizarGrupoCache(_0x403678);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x20cb79['id']);
                    } catch {
                        atualizarGrupoCache(_0x20cb79);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x20cb79['id']);
                    }
                }
            } catch (_0x18769e) {
                errorLog('[groups.update]\x20' + _0x18769e['message']);
            }
        }
        if (_0x51e3c9['messages.upsert']) {
            var _0x52efd5 = _0x51e3c9['messages.upsert'];
            try {
                const _0x5eee38 = _0x52efd5['messages'] || [_0x52efd5];
                for (const _0x9cec99 of _0x5eee38) {
                    if (!_0x9cec99?.['key']?.['remoteJid'] || _0x9cec99['key']['remoteJid']['endsWith']('@broadcast'))
                        continue;
                    AddWhatsAppuser(_0x4e9da3, _0x9cec99)['catch'](() => {
                    });
                }
            } catch {
            }
            try {
                const {processEununca: _0x5123c3} = require('./util/eununca-handler.js');
                const _0x21cd94 = _0x52efd5['messages'] || [_0x52efd5];
                for (const _0x5324c8 of _0x21cd94) {
                    if (_0x5324c8?.['message']?.['pollUpdateMessage']) {
                        await _0x5123c3(_0x4e9da3, _0x5324c8)['catch'](_0x16c211 => errorLog('[eununca]\x20' + _0x16c211['message']));
                    }
                }
            } catch {
            }
            Promise['resolve'](require('./index.js')(_0x52efd5, _0x4e9da3, _0x762dc6, _0x385668))['catch'](_0x4c75d1 => {
                errorLog('[index.js]\x20Erro\x20não\x20tratado:\x20' + (_0x4c75d1?.['message'] || _0x4c75d1));
            });
        }
        if (_0x51e3c9['connection.update']) {
            const _0x37bd70 = _0x51e3c9['connection.update'];
            var {
                connection: _0x5b2699,
                lastDisconnect: _0x932c34,
                qr: _0x51dc01,
                isNewLogin: _0x42ddc9,
                receivedPendingNotifications: _0x55bb30
            } = _0x37bd70;
            if (_0x51dc01) {
                console['log'](colors['cyan']('📱\x20Escaneie\x20o\x20QR\x20Code\x20abaixo\x20com\x20o\x20WhatsApp:'));
                qrTerminal['generate'](_0x51dc01, { 'small': !![] });
                QRCode['toFile']('./qrcode.png', _0x51dc01, {
                    'width': 0x200,
                    'margin': 0x2
                }, _0x3c7445 => {
                    if (_0x3c7445) {
                        warningLog(colors['yellow']('⚠\x20Não\x20foi\x20possível\x20salvar\x20qrcode.png:\x20' + _0x3c7445['message']));
                    } else {
                        successLog(colors['green']('✅\x20QR\x20Code\x20também\x20salvo\x20como\x20imagem\x20em:\x20qrcode.png'));
                    }
                });
                console['log'](colors['yellow']('\x0a⏳\x20O\x20QR\x20Code\x20expira\x20em\x203\x20minutos.\x20Escaneie\x20rápido!\x0a'));
            }
            const _0x125727 = new Boom(_0x932c34?.['error'])?.['output']?.['statusCode'];
            switch (_0x5b2699) {
            case 'close':
                if (_0x125727) {
                    if (_0x125727 == 0x191) {
                        console['log'](colors['red'](mess['ErrorBaileys401']()));
                    } else if (_0x125727 == 0x198) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_408']()));
                    } else if (_0x125727 == 0x19b) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_411']()));
                    } else if (_0x125727 == 0x1ac) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_428']()));
                    } else if (_0x125727 == 0x1b8) {
                        console['log'](colors['gray'](mess['ErrorBaileys_440']()));
                    } else if (_0x125727 == 0x1f4) {
                        console['log'](colors['gray'](mess['ErrorBaileys_500']()));
                    } else if (_0x125727 == 0x1f7) {
                        console['log'](colors['gray']('Ocorreu\x20um\x20erro\x20desconhecido!\x20Error:\x20503.'));
                    } else if (_0x125727 == 0x203) {
                        console['log'](colors['gray'](mess['ErrorBaileys_515']()));
                    } else {
                        console['log']('Conexão\x20fechada\x20por\x20motivo\x20do\x20erro:\x20' + _0x932c34?.['error']);
                    }
                    await iniciarwaguri();
                }
                break;
            case 'connecting':
                warningLog('' + colors['yellow'](mess['connecting']()));
                infoLog('WhatsApp-Web:\x20' + _0x56c8fc);
                break;
            case 'open':
                iniciarwaguri['_loggedOutCount'] = 0x0;
                iniciarMonitorRestartQR(_0x4e9da3);
                console['log'](banner3['string']);
                console['log'](banner2['string']);
                successLog('' + colors['green'](mess['open']()));
                infoLog('💻\x20Instagram:\x20@paulo_mod_domina');
                infoLog('🤖\x20Versão:\x20' + botPackage['version'] + '\x20(' + botPackage['update_date'] + ')');
                infoLog('💾\x20Servidor:\x20Privado!');
                infoLog('©\x20Todos\x20os\x20Direitos\x20Resevardos\x20a\x20Eduh\x20Dev\x20</>\x20');
                await _0x4e9da3['sendPresenceUpdate']('available');
                try {
                    const _0x2e8f7f = String(setting['ownerNumber'] || '')['replace'](/[^0-9]/g, '') + '@s.whatsapp.net';
                    const _0x9a1f54 = Date['now']();
                    if (_0x2e8f7f['length'] > 0x12 && (!global['__mainBotOpenNotifiedAt'] || _0x9a1f54 - global['__mainBotOpenNotifiedAt'] > 0x5 * 0x3c * 0x3e8)) {
                        global['__mainBotOpenNotifiedAt'] = _0x9a1f54;
                        await _0x4e9da3['sendMessage'](_0x2e8f7f, { 'text': '🟢\x20*' + NomeDoBot + '\x20conectado!*\x0a\x0a📡\x20Sistema\x20principal\x20online.\x0a🕒\x20' + moment['tz']('America/Sao_Paulo')['format']('DD/MM/YYYY\x20HH:mm:ss') + '\x0a💾\x20Sessão:\x20SQLite' })['catch'](() => {
                        });
                    }
                } catch {
                }
                if (!global['_subbotSystemStarted']) {
                    global['_subbotSystemStarted'] = !![];
                    try {
                        const _0x5dc7bb = require('./subbot/subbotManager.js');
                        _0x5dc7bb['restoreActiveSubbots'](_0x4e9da3);
                        _0x5dc7bb['startExpirationWatcher'](_0x4e9da3);
                        successLog('🤖\x20Sistema\x20de\x20subbots\x20restaurado\x20e\x20monitorando\x20expirações.');
                    } catch (_0x68efd0) {
                        errorLog('[subbot]\x20Falha\x20ao\x20iniciar\x20sistema\x20de\x20subbots:\x20' + _0x68efd0['message']);
                    }
                }
                try {
                    if (fs['existsSync']('./qrcode.png')) {
                        fs['unlinkSync']('./qrcode.png');
                        infoLog(colors['gray']('🗑\x20qrcode.png\x20removido\x20após\x20conexão\x20bem-sucedida.'));
                    }
                } catch {
                }
                break;
            default:
                break;
            }
        }
        if (_0x51e3c9['creds.update']) {
            await _0x144f04();
        }
    });
}
iniciarwaguri()['catch'](_0x1d88fa => errorLog('[iniciarwaguri]\x20' + _0x1d88fa['message']));
let file = require['resolve'](__filename);
fs['watchFile'](file, () => {
    fs['unwatchFile'](file);
    infoLog(colors['red']('Oba,\x20Recebi\x20Atualizacao\x20no\x20Arquivo:\x20\x27' + __filename + '\x27'));
    delete require['cache'][file];
    require(file);
});
