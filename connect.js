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
process['on']('unhandledRejection', _0x319b => {
    errorLog('[unhandledRejection]\x20' + (_0x319b?.['message'] || _0x319b));
});
process['on']('uncaughtException', _0x3bbf89 => {
    errorLog('[uncaughtException]\x20' + _0x3bbf89['message']);
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
function salvarGrupos(_0x426246) {
    if (_salvarGruposTimer)
        clearTimeout(_salvarGruposTimer);
    _salvarGruposTimer = setTimeout(() => {
        try {
            if (!fs['existsSync'](GRUPOS_DIR))
                fs['mkdirSync'](GRUPOS_DIR, { 'recursive': !![] });
            fs['writeFileSync'](GRUPOS_FILE, JSON['stringify'](_0x426246, null, 0x2));
        } catch (_0x23ccb7) {
            errorLog('[grupos.json]\x20' + _0x23ccb7['message']);
        }
    }, 0x5dc);
}
function atualizarGrupoCache(_0x1a54d2) {
    if (!_0x1a54d2?.['id'])
        return;
    const _0x3ce9a9 = carregarGrupos();
    const _0xd9ffe5 = _0x3ce9a9['findIndex'](_0x3f4b36 => _0x3f4b36['id'] === _0x1a54d2['id']);
    const _0x32c203 = (_0x1a54d2['participants'] || [])['map'](_0x34ddd7 => ({
        'jid': _0x34ddd7['jid'] || _0x34ddd7['phoneNumber'] || _0x34ddd7['id'],
        'lid': _0x34ddd7['id'] || _0x34ddd7['lid'] || _0x34ddd7['jid'],
        'admin': _0x34ddd7['admin'] || null
    }));
    const _0x46c954 = {
        'id': _0x1a54d2['id'],
        'subject': _0x1a54d2['subject'] || '',
        'participants': _0x32c203
    };
    if (_0xd9ffe5 >= 0x0)
        _0x3ce9a9[_0xd9ffe5] = _0x46c954;
    else
        _0x3ce9a9['push'](_0x46c954);
    salvarGrupos(_0x3ce9a9);
}
function resolverParticipante(_0x4b472d) {
    if (!_0x4b472d)
        return '';
    if (typeof _0x4b472d === 'string') {
        if (_0x4b472d['endsWith']('@lid'))
            return convertWhatsAppUser(_0x4b472d, 'jid') || _0x4b472d;
        return _0x4b472d;
    }
    if (_0x4b472d['jid'] && typeof _0x4b472d['jid'] === 'string')
        return _0x4b472d['jid'];
    if (_0x4b472d['id'] && typeof _0x4b472d['id'] === 'string') {
        if (_0x4b472d['id']['endsWith']('@lid'))
            return convertWhatsAppUser(_0x4b472d['id'], 'jid') || _0x4b472d['id'];
        return _0x4b472d['id'];
    }
    return '';
}
async function uploadMidia(_0x165ff8, _0xb85c39 = 'media.jpg') {
    try {
        const _0x4a6595 = Buffer['isBuffer'](_0x165ff8) ? _0x165ff8 : await getBuffer(_0x165ff8);
        const _0x2e5f4a = new FormData();
        _0x2e5f4a['append']('apikey', API_KEY_WAGURI);
        _0x2e5f4a['append']('media', _0x4a6595, {
            'filename': _0xb85c39,
            'contentType': 'image/jpeg'
        });
        const _0x4c5893 = await axios['post'](okarunsite + '/api/upload', _0x2e5f4a, {
            'headers': _0x2e5f4a['getHeaders'](),
            'maxBodyLength': Infinity
        });
        if (_0x4c5893['data']?.['status'] && _0x4c5893['data']?.['resultado'])
            return _0x4c5893['data']['resultado'];
        throw new Error('Upload\x20falhou:\x20' + JSON['stringify'](_0x4c5893['data']));
    } catch (_0x1735c8) {
        errorLog('[uploadMidia]\x20' + _0x1735c8['message']);
        return null;
    }
}
function DLT_FL(_0x2b1cf4) {
    try {
        fs['unlinkSync'](_0x2b1cf4);
    } catch {
    }
}
const msgRetryCounterCache = new NodeCache();
const readline = require('readline');
const pairingCode = process['argv']['includes']('sim');
const question = _0x56175e => {
    const _0x11d3e7 = readline['createInterface']({
        'input': process['stdin'],
        'output': process['stdout']
    });
    return new Promise(_0x25acce => _0x11d3e7['question'](_0x56175e, _0x1c7405 => {
        _0x11d3e7['close']();
        _0x25acce(_0x1c7405);
    }));
};
function collectNumbers(_0x59abaa) {
    return _0x59abaa['replace'](/[^0-9]/g, '');
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
function limparArquivosAntigos(_0x568a52, _0x53faef, _0x512114 = () => !![], _0x1df636 = _0x568a52, _0x1c7734 = !![]) {
    let _0x5d4e22 = 0x0;
    if (!fs['existsSync'](_0x568a52))
        return _0x5d4e22;
    for (const _0x14b66c of fs['readdirSync'](_0x568a52, { 'withFileTypes': !![] })) {
        const _0x55c0e8 = path['join'](_0x568a52, _0x14b66c['name']);
        try {
            if (_0x14b66c['isDirectory']()) {
                if (!_0x1c7734)
                    continue;
                _0x5d4e22 += limparArquivosAntigos(_0x55c0e8, _0x53faef, _0x512114, _0x1df636, !![]);
                if (_0x55c0e8 !== _0x1df636 && fs['readdirSync'](_0x55c0e8)['length'] === 0x0)
                    fs['rmdirSync'](_0x55c0e8);
                continue;
            }
            if (!_0x14b66c['isFile']() || !_0x512114(_0x14b66c['name'], _0x55c0e8))
                continue;
            const _0x264097 = Date['now']() - fs['statSync'](_0x55c0e8)['mtimeMs'];
            if (_0x264097 >= _0x53faef) {
                fs['unlinkSync'](_0x55c0e8);
                _0x5d4e22++;
            }
        } catch {
        }
    }
    return _0x5d4e22;
}
function limparTemp() {
    try {
        if (fs['existsSync'](STORE_PATH)) {
            const {size: _0x4ae0cd} = fs['statSync'](STORE_PATH);
            if (_0x4ae0cd > MAX_STORE_SIZE_MB * 0x400 * 0x400) {
                fs['writeFileSync'](STORE_PATH, '{}');
                infoLog('[limpeza]\x20store.json\x20resetado\x20(estava\x20' + (_0x4ae0cd / 0x400 / 0x400)['toFixed'](0x1) + 'MB)');
            }
        }
        let _0x8328db = 0x0;
        _0x8328db += limparArquivosAntigos(SYSTEM_TEMP_DIR, TEMP_MAX_AGE_MS);
        _0x8328db += limparArquivosAntigos(TEMP_DIR, TEMP_MAX_AGE_MS, _0x15add8 => /\.(mp3|mp4|jpg|jpeg|png|webp|tmp|opus|ogg|gif)$/i['test'](_0x15add8), TEMP_DIR, ![]);
        _0x8328db += limparArquivosAntigos(ROOT_DIR, TEMP_MAX_AGE_MS, _0xd89b52 => /\.(mp3|mp4|opus|ogg|tmp)$/i['test'](_0xd89b52), ROOT_DIR, ![]);
        if (_0x8328db > 0x0)
            infoLog('[limpeza]\x20' + _0x8328db + '\x20arquivo(s)\x20temporário(s)\x20antigo(s)\x20removido(s).');
    } catch (_0x54df36) {
        errorLog('[limpeza]\x20' + _0x54df36['message']);
    }
}
function iniciarMonitorRestartQR(_0x4c9c7b) {
    global['__kaorukoSocketAtual'] = _0x4c9c7b;
    if (global['__restartQRWatcher'])
        return;
    const _0x40ec72 = () => {
        const _0x156c42 = global['__kaorukoSocketAtual'];
        if (!_0x156c42)
            return;
        Promise['resolve'](restartQRfunc(_0x156c42))['catch'](_0xc31563 => {
            errorLog('[restart-qr]\x20' + (_0xc31563?.['message'] || _0xc31563));
        });
    };
    global['__restartQRWatcher'] = setInterval(_0x40ec72, 0x3c * 0x3e8);
    global['__restartQRWatcher']['unref']?.();
    setTimeout(_0x40ec72, 0x1388)['unref']?.();
    infoLog('[restart-qr]\x20Verificador\x20automático\x20iniciado\x20(intervalo:\x201\x20minuto).');
}
limparTemp();
const _tempCleanupTimer = setInterval(limparTemp, 0x1e * 0x3c * 0x3e8);
_tempCleanupTimer['unref']?.();
async function iniciarwaguri() {
    const _0x3c9c0f = QRCODEPATH;
    const {
        state: _0x1f79bc,
        saveCreds: _0x579bb2
    } = await useSQLiteAuthState(_0x3c9c0f);
    const {
        version: _0x3f22ad,
        isLatest: _0x269a93
    } = await fetchLatestBaileysVersion();
    const _0x208994 = console['info'];
    console['info'] = function () {
        const _0xe18e7 = util['format'](...arguments);
        const _0x1b6cc5 = [
            'Closing\x20session:\x20SessionEntry',
            'Removing\x20old\x20closed\x20session:\x20SessionEntry\x20{',
            'Another\x20forbidden\x20string',
            'Closing\x20stale\x20open\x20session\x20for\x20new\x20outgoing\x20prekey\x20bundle',
            'Failed\x20to\x20decrypt\x20message\x20with\x20any\x20known\x20session',
            'Session\x20error:Error:\x20Bad\x20MAC'
        ];
        if (_0x1b6cc5['some'](_0x42af0f => _0xe18e7['includes'](_0x42af0f)))
            return;
        _0x208994['apply'](console, arguments);
    };
    const _0x2a61cc = makeWASocket({
        'version': [
            0x2,
            0xbb8,
            0x3e2c370c
        ],
        'auth': {
            'creds': _0x1f79bc['creds'],
            'keys': makeCacheableSignalKeyStore(_0x1f79bc['keys'], P({ 'level': 'silent' }))
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
        'patchMessageBeforeSending': _0x407189 => {
            const _0x505b5b = !!(_0x407189['buttonsMessage'] || _0x407189['listMessage']);
            if (_0x505b5b) {
                _0x407189 = {
                    'viewOnceMessage': {
                        'message': {
                            'messageContextInfo': {
                                'deviceListMetadataVersion': 0x2,
                                'deviceListMetadata': {}
                            },
                            ..._0x407189
                        }
                    }
                };
            }
            return _0x407189;
        }
    });
    let _0x43d06b = null;
    if (makeInMemoryStore) {
        _0x43d06b = makeInMemoryStore({ 'logger': P({ 'level': 'silent' }) });
        _0x43d06b['bind'](_0x2a61cc['ev']);
        try {
            if (!fs['existsSync']('./util/temp'))
                fs['mkdirSync']('./util/temp', { 'recursive': !![] });
            if (fs['existsSync'](STORE_PATH))
                _0x43d06b['readFromFile'](STORE_PATH);
        } catch {
        }
        setInterval(() => {
            try {
                _0x43d06b['writeToFile'](STORE_PATH);
            } catch {
            }
        }, 0x3 * 0x3c * 0x3e8);
    }
    if (pairingCode && !_0x2a61cc['authState']['creds']['registered']) {
        infoLog(colors['white']('-\x20Exemplo\x20do\x20número\x20para\x20realizar\x20a\x20conexão\x20do\x20bot:\x20+55\x2097\x209999-9999.\x20Coloque\x20do\x20jeito\x20que\x20está\x20no\x20WhatsApp!') + '\x0a–\x0a' + colors['cyan']('•\x20Insira\x20no\x20parâmetro\x20abaixo\x20o\x20número\x20de\x20telefone\x20que\x20você\x20deseja\x20conectar\x20a\x20bot\x20no\x20WhatsApp\x20Web:\x0a'));
        const _0x503b6d = await question('');
        const _0x44567d = collectNumbers(_0x503b6d);
        try {
            const _0x20fb28 = await _0x2a61cc['requestPairingCode'](_0x44567d);
            successLog(colors['cyan']('•\x20Código\x20para\x20conectar\x20o\x20bot\x20e\x20desfrutar\x20de\x20suas\x20imensas\x20funcionalidades:') + '\x20' + colors['white'](_0x20fb28) + '\x0a–\x0a' + colors['yellow']('•\x20Tutorial:\x20Entre\x20no\x20WhatsApp\x20que\x20será\x20o\x20bot\x20e\x20vá\x20em\x20aparelhos\x20conectado,\x20e\x20clique\x20em\x20\x22Conectar\x20um\x20aparelho\x22,\x20e\x20lá\x20na\x20parte\x20inferior,\x20clique\x20em\x20\x22Conectar\x20com\x20número\x20de\x20telefone\x22\x20e\x20digite\x20o\x20código\x20gerado\x20acima...'));
        } catch (_0xfc444b) {
            errorLog(colors['red']('Erro\x20ao\x20gerar\x20código\x20de\x20pareamento:\x20' + _0xfc444b['message']));
            errorLog(colors['yellow']('Tente\x20deletar\x20a\x20pasta\x20de\x20sessão\x20e\x20reiniciar.'));
        }
    }
    _0x2a61cc['ev']['process'](async _0x16e343 => {
        if (_0x16e343['group-participants.update']) {
            try {
                var _0x2b669e = _0x16e343['group-participants.update'];
                var _0x3e1f07 = getGroupData(_0x2b669e['id']);
                if (!_0x3e1f07)
                    return;
                const _0x1883ce = resolverParticipante(_0x2b669e['participants'][0x0]);
                if (!_0x1883ce)
                    return;
                _0x2b669e['participants'][0x0] = _0x1883ce;
                const _0xf8f202 = (_0x2a61cc['user']['id'] || _0x2a61cc['user']['jid'] || '')['split'](':')[0x0]['replace'](/@.*/, '');
                if (_0x1883ce['replace'](/@.*/, '') === _0xf8f202)
                    return;
                const {nukeSystemFunc: _0x1f986a} = require('./database/antinuke/nukesystem.js');
                _0x1f986a(_0x2a61cc, _0x2b669e);
                try {
                    var _0x283baa = await _0x2a61cc['groupMetadata'](_0x2b669e['id']);
                } catch {
                    return;
                }
                const _0x313382 = _0x283baa['id']['endsWith']('@g.us');
                const _0x5ab272 = _0x313382 ? _0x283baa : null;
                if (!_0x5ab272)
                    return;
                atualizarGrupoCache(_0x283baa);
                if (_0x2b669e['action'] == 'add') {
                    const _0x17481a = _0x2b669e['participants'][0x0];
                    if (nescessario['listanegraG']['includes'](_0x17481a)) {
                        await _0x2a61cc['sendMessage'](_0x5ab272['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban...' });
                        _0x2a61cc['groupParticipantsUpdate'](_0x5ab272['id'], [_0x2b669e['participants'][0x0]], 'remove');
                        return;
                    }
                }
                if (_0x2b669e['action'] == 'add' && _0x3e1f07[0x0]['listanegra']['includes'](_0x2b669e['participants'][0x0])) {
                    await _0x2a61cc['sendMessage'](_0x5ab272['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban\x20cabaço...' });
                    _0x2a61cc['groupParticipantsUpdate'](_0x5ab272['id'], [_0x2b669e['participants'][0x0]], 'remove');
                }
                if (!_0x3e1f07[0x0]['wellcome'][0x1]['bemvindo2'] && !_0x3e1f07[0x0]['wellcome'][0x0]['bemvindo1'])
                    return;
                var _0x26985a = _0x313382 ? _0x283baa : '';
                if (!_0x26985a)
                    return;
                const _0x362aef = _0x2b669e['id'];
                const _0x28aa66 = _0x3e1f07[0x0]['wellcome'][0x0]['legendabv'] != null ? !![] : ![];
                const _0x3a7ef9 = _0x3e1f07[0x0]['wellcome'][0x0]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0xd6493b = _0x3e1f07[0x0]['wellcome'][0x1]['legendabv'] != null ? !![] : ![];
                const _0x5c37c0 = _0x3e1f07[0x0]['wellcome'][0x1]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x2ed943 = _0x26985a['desc'];
                if (_0x3e1f07[0x0]['antifake'] == !![] && !_0x2b669e['participants'][0x0]['startsWith']('55'))
                    return;
                let _0x363a25 = { 'data': 'https://telegra.ph/file/24fa902ead26340f3df2c.png' };
                if (_0x3e1f07[0x0]['wellcome'][0x0]['bemvindo1'] == !![]) {
                    try {
                        ppimg = await _0x2a61cc['profilePictureUrl'](_0x2b669e['participants'][0x0]);
                    } catch {
                        ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                    }
                    _0x363a25 = { 'data': await uploadMidia(ppimg, 'perfil.jpg') || ppimg };
                    try {
                        var _0x3ed394 = await _0x2a61cc['profilePictureUrl'](_0x362aef, 'image');
                    } catch {
                        var _0x3ed394 = 'https://telegra.ph/file/6ca032835ed7a16748b6f.jpg';
                    }
                    ppgrupo = { 'data': await uploadMidia(_0x3ed394, 'grupo2.jpg') || _0x3ed394 };
                    if (_0x2b669e['action'] === 'add') {
                        if (_0x28aa66) {
                            teks = _0x3e1f07[0x0]['wellcome'][0x0]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x26985a['subject'])['replace']('#numerodele#', '@' + _0x2b669e['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x2a61cc['user']['id'])['replace']('#prefixo#', _0x3e1f07[0x0]['multiprefix'] == !![] ? _0x3e1f07[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x2ed943);
                        } else {
                            teks = welcome(_0x2b669e['participants'][0x0]['split']('@')[0x0], _0x26985a['subject']);
                        }
                        let _0xc6da9c = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0xc6da9c);
                        _0x2a61cc['sendMessage'](_0x26985a['id'], {
                            'image': { 'url': okarunsite + ('/api/welcome?avatar=' + _0x363a25['data'] + '&numero=' + _0x2b669e['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=Seja\x20Bem-vindo\x20ao\x20grupo\x20' + encodeURI(_0x26985a['subject']) + '&mensagem=Bem\x20Vindo\x20(a)!&background=' + fundo2 + '&tema=rosa') },
                            'mentions': _0x2b669e['participants'],
                            'caption': teks
                        });
                        DLT_FL(ran);
                    } else if (_0x2b669e['action'] === 'remove') {
                        _0x49001c = _0x2b669e['participants'][0x0];
                        try {
                            ppimg = await _0x2a61cc['profilePictureUrl'](_0x49001c['split']('@')[0x0] + '@c.us');
                        } catch {
                            ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                        }
                        if (_0x3a7ef9) {
                            teks = _0x3e1f07[0x0]['wellcome'][0x0]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x26985a['subject'])['replace']('#numerodele#', '@' + _0x2b669e['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x2a61cc['user']['id'])['replace']('#prefixo#', _0x3e1f07[0x0]['multiprefix'] == !![] ? _0x3e1f07[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x2ed943);
                        }
                        let _0x107b0b = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x107b0b);
                        _0x2a61cc['sendMessage'](_0x26985a['id'], {
                            'image': { 'url': okarunsite + ('/api/goodbye?avatar=' + _0x363a25['data'] + '&numero=' + _0x2b669e['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=SAIU\x20DE\x20' + encodeURI(_0x26985a['subject']) + '&mensagem=Até%20logo!&background=' + fundo2 + '&tema=rosa') },
                            'caption': teks,
                            'mentions': _0x2b669e['participants']
                        });
                        DLT_FL(ran);
                    }
                }
                if (_0x3e1f07[0x0]['wellcome'][0x1]['bemvindo2'] == !![]) {
                    if (_0x2b669e['action'] === 'add') {
                        if (_0xd6493b) {
                            teks = _0x3e1f07[0x0]['wellcome'][0x1]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x26985a['subject'])['replace']('#numerodele#', '@' + _0x2b669e['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x2a61cc['user']['id'])['replace']('#prefixo#', _0x3e1f07[0x0]['multiprefix'] == !![] ? _0x3e1f07[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x2ed943);
                        } else {
                            teks = welcome2(_0x2b669e['participants'][0x0]['split']('@')[0x0], _0x26985a['subject']);
                        }
                        _0x2a61cc['sendMessage'](_0x26985a['id'], {
                            'text': teks,
                            'mentions': _0x2b669e['participants']
                        });
                    } else if (_0x2b669e['action'] === 'remove') {
                        var _0x49001c = _0x2b669e['participants'][0x0];
                        if (_0x5c37c0) {
                            teks = _0x3e1f07[0x0]['wellcome'][0x1]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x26985a['subject'])['replace']('#numerodele#', '@' + _0x2b669e['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x2a61cc['user']['id'])['replace']('#prefixo#', _0x3e1f07[0x0]['multiprefix'] == !![] ? _0x3e1f07[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x2ed943);
                        } else {
                            teks = bye2(_0x49001c['split']('@')[0x0]);
                        }
                        _0x2a61cc['sendMessage'](_0x26985a['id'], {
                            'text': teks,
                            'mentions': _0x2b669e['participants']
                        });
                    }
                }
            } catch (_0x52a40b) {
                console['log'](_0x52a40b);
            }
        }
        if (_0x16e343['groups.update']) {
            try {
                const _0x2e53f1 = _0x16e343['groups.update'];
                for (const _0x35088e of Array['isArray'](_0x2e53f1) ? _0x2e53f1 : [_0x2e53f1]) {
                    if (!_0x35088e?.['id'])
                        continue;
                    try {
                        const _0x3b0535 = await _0x2a61cc['groupMetadata'](_0x35088e['id']);
                        atualizarGrupoCache(_0x3b0535);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x35088e['id']);
                    } catch {
                        atualizarGrupoCache(_0x35088e);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x35088e['id']);
                    }
                }
            } catch (_0x2975b8) {
                errorLog('[groups.update]\x20' + _0x2975b8['message']);
            }
        }
        if (_0x16e343['messages.upsert']) {
            var _0x223310 = _0x16e343['messages.upsert'];
            try {
                const _0x20427c = _0x223310['messages'] || [_0x223310];
                for (const _0x32fd5c of _0x20427c) {
                    if (!_0x32fd5c?.['key']?.['remoteJid'] || _0x32fd5c['key']['remoteJid']['endsWith']('@broadcast'))
                        continue;
                    AddWhatsAppuser(_0x2a61cc, _0x32fd5c)['catch'](() => {
                    });
                }
            } catch {
            }
            try {
                const {processEununca: _0x35e4ff} = require('./util/eununca-handler.js');
                const _0x3b8859 = _0x223310['messages'] || [_0x223310];
                for (const _0x288e50 of _0x3b8859) {
                    if (_0x288e50?.['message']?.['pollUpdateMessage']) {
                        await _0x35e4ff(_0x2a61cc, _0x288e50)['catch'](_0x14a85d => errorLog('[eununca]\x20' + _0x14a85d['message']));
                    }
                }
            } catch {
            }
            Promise['resolve'](require('./index.js')(_0x223310, _0x2a61cc, _0x3c9c0f, _0x43d06b))['catch'](_0x2eb295 => {
                errorLog('[index.js]\x20Erro\x20não\x20tratado:\x20' + (_0x2eb295?.['message'] || _0x2eb295));
            });
        }
        if (_0x16e343['connection.update']) {
            const _0x48c715 = _0x16e343['connection.update'];
            var {
                connection: _0x25bfb7,
                lastDisconnect: _0x20c94c,
                qr: _0x7c2fc0,
                isNewLogin: _0x25e5e9,
                receivedPendingNotifications: _0x3d4f85
            } = _0x48c715;
            if (_0x7c2fc0) {
                console['log'](colors['cyan']('📱\x20Escaneie\x20o\x20QR\x20Code\x20abaixo\x20com\x20o\x20WhatsApp:'));
                qrTerminal['generate'](_0x7c2fc0, { 'small': !![] });
                QRCode['toFile']('./qrcode.png', _0x7c2fc0, {
                    'width': 0x200,
                    'margin': 0x2
                }, _0x406019 => {
                    if (_0x406019) {
                        warningLog(colors['yellow']('⚠\x20Não\x20foi\x20possível\x20salvar\x20qrcode.png:\x20' + _0x406019['message']));
                    } else {
                        successLog(colors['green']('✅\x20QR\x20Code\x20também\x20salvo\x20como\x20imagem\x20em:\x20qrcode.png'));
                    }
                });
                console['log'](colors['yellow']('\x0a⏳\x20O\x20QR\x20Code\x20expira\x20em\x203\x20minutos.\x20Escaneie\x20rápido!\x0a'));
            }
            const _0x4bc584 = new Boom(_0x20c94c?.['error'])?.['output']?.['statusCode'];
            switch (_0x25bfb7) {
            case 'close':
                if (_0x4bc584) {
                    if (_0x4bc584 == 0x191) {
                        console['log'](colors['red'](mess['ErrorBaileys401']()));
                    } else if (_0x4bc584 == 0x198) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_408']()));
                    } else if (_0x4bc584 == 0x19b) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_411']()));
                    } else if (_0x4bc584 == 0x1ac) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_428']()));
                    } else if (_0x4bc584 == 0x1b8) {
                        console['log'](colors['gray'](mess['ErrorBaileys_440']()));
                    } else if (_0x4bc584 == 0x1f4) {
                        console['log'](colors['gray'](mess['ErrorBaileys_500']()));
                    } else if (_0x4bc584 == 0x1f7) {
                        console['log'](colors['gray']('Ocorreu\x20um\x20erro\x20desconhecido!\x20Error:\x20503.'));
                    } else if (_0x4bc584 == 0x203) {
                        console['log'](colors['gray'](mess['ErrorBaileys_515']()));
                    } else {
                        console['log']('Conexão\x20fechada\x20por\x20motivo\x20do\x20erro:\x20' + _0x20c94c?.['error']);
                    }
                    await iniciarwaguri();
                }
                break;
            case 'connecting':
                warningLog('' + colors['yellow'](mess['connecting']()));
                infoLog('WhatsApp-Web:\x20' + _0x3f22ad);
                break;
            case 'open':
                iniciarwaguri['_loggedOutCount'] = 0x0;
                iniciarMonitorRestartQR(_0x2a61cc);
                console['log'](banner3['string']);
                console['log'](banner2['string']);
                successLog('' + colors['green'](mess['open']()));
                infoLog('💻\x20Instagram:\x20@paulo_mod_domina');
                infoLog('🤖\x20Versão:\x20' + botPackage['version'] + '\x20(' + botPackage['update_date'] + ')');
                infoLog('💾\x20Servidor:\x20Privado!');
                infoLog('©\x20Todos\x20os\x20Direitos\x20Resevardos\x20a\x20Eduh\x20Dev\x20</>\x20');
                await _0x2a61cc['sendPresenceUpdate']('available');
                try {
                    const _0x32f637 = String(setting['ownerNumber'] || '')['replace'](/[^0-9]/g, '') + '@s.whatsapp.net';
                    const _0x364e45 = Date['now']();
                    if (_0x32f637['length'] > 0x12 && (!global['__mainBotOpenNotifiedAt'] || _0x364e45 - global['__mainBotOpenNotifiedAt'] > 0x5 * 0x3c * 0x3e8)) {
                        global['__mainBotOpenNotifiedAt'] = _0x364e45;
                        await _0x2a61cc['sendMessage'](_0x32f637, { 'text': '🟢\x20*' + NomeDoBot + '\x20conectado!*\x0a\x0a📡\x20Sistema\x20principal\x20online.\x0a🕒\x20' + moment['tz']('America/Sao_Paulo')['format']('DD/MM/YYYY\x20HH:mm:ss') + '\x0a💾\x20Sessão:\x20SQLite' })['catch'](() => {
                        });
                    }
                } catch {
                }
                if (!global['_subbotSystemStarted']) {
                    global['_subbotSystemStarted'] = !![];
                    try {
                        const _0x3f5361 = require('./subbot/subbotManager.js');
                        _0x3f5361['restoreActiveSubbots'](_0x2a61cc);
                        _0x3f5361['startExpirationWatcher'](_0x2a61cc);
                        successLog('🤖\x20Sistema\x20de\x20subbots\x20restaurado\x20e\x20monitorando\x20expirações.');
                    } catch (_0x254217) {
                        errorLog('[subbot]\x20Falha\x20ao\x20iniciar\x20sistema\x20de\x20subbots:\x20' + _0x254217['message']);
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
        if (_0x16e343['creds.update']) {
            await _0x579bb2();
        }
    });
}
iniciarwaguri()['catch'](_0x133cf8 => errorLog('[iniciarwaguri]\x20' + _0x133cf8['message']));
let file = require['resolve'](__filename);
fs['watchFile'](file, () => {
    fs['unwatchFile'](file);
    infoLog(colors['red']('Oba,\x20Recebi\x20Atualizacao\x20no\x20Arquivo:\x20\x27' + __filename + '\x27'));
    delete require['cache'][file];
    require(file);
});
