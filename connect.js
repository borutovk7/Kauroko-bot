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
process['on']('unhandledRejection', _0x1e63ef => {
    errorLog('[unhandledRejection]\x20' + (_0x1e63ef?.['message'] || _0x1e63ef));
});
process['on']('uncaughtException', _0x3880af => {
    errorLog('[uncaughtException]\x20' + _0x3880af['message']);
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
function salvarGrupos(_0x40efc6) {
    if (_salvarGruposTimer)
        clearTimeout(_salvarGruposTimer);
    _salvarGruposTimer = setTimeout(() => {
        try {
            if (!fs['existsSync'](GRUPOS_DIR))
                fs['mkdirSync'](GRUPOS_DIR, { 'recursive': !![] });
            fs['writeFileSync'](GRUPOS_FILE, JSON['stringify'](_0x40efc6, null, 0x2));
        } catch (_0x376025) {
            errorLog('[grupos.json]\x20' + _0x376025['message']);
        }
    }, 0x5dc);
}
function atualizarGrupoCache(_0x13fdf3) {
    if (!_0x13fdf3?.['id'])
        return;
    const _0x42f8ff = carregarGrupos();
    const _0x374c97 = _0x42f8ff['findIndex'](_0x4af882 => _0x4af882['id'] === _0x13fdf3['id']);
    const _0x50d66c = (_0x13fdf3['participants'] || [])['map'](_0x501a9c => ({
        'jid': _0x501a9c['jid'] || _0x501a9c['phoneNumber'] || _0x501a9c['id'],
        'lid': _0x501a9c['id'] || _0x501a9c['lid'] || _0x501a9c['jid'],
        'admin': _0x501a9c['admin'] || null
    }));
    const _0x3b7c33 = {
        'id': _0x13fdf3['id'],
        'subject': _0x13fdf3['subject'] || '',
        'participants': _0x50d66c
    };
    if (_0x374c97 >= 0x0)
        _0x42f8ff[_0x374c97] = _0x3b7c33;
    else
        _0x42f8ff['push'](_0x3b7c33);
    salvarGrupos(_0x42f8ff);
}
function resolverParticipante(_0x5206e5) {
    if (!_0x5206e5)
        return '';
    if (typeof _0x5206e5 === 'string') {
        if (_0x5206e5['endsWith']('@lid'))
            return convertWhatsAppUser(_0x5206e5, 'jid') || _0x5206e5;
        return _0x5206e5;
    }
    if (_0x5206e5['jid'] && typeof _0x5206e5['jid'] === 'string')
        return _0x5206e5['jid'];
    if (_0x5206e5['id'] && typeof _0x5206e5['id'] === 'string') {
        if (_0x5206e5['id']['endsWith']('@lid'))
            return convertWhatsAppUser(_0x5206e5['id'], 'jid') || _0x5206e5['id'];
        return _0x5206e5['id'];
    }
    return '';
}
async function uploadMidia(_0x51b2c0, _0x4aeea8 = 'media.jpg') {
    try {
        const _0x46daa5 = Buffer['isBuffer'](_0x51b2c0) ? _0x51b2c0 : await getBuffer(_0x51b2c0);
        const _0x395b69 = new FormData();
        _0x395b69['append']('apikey', API_KEY_WAGURI);
        _0x395b69['append']('media', _0x46daa5, {
            'filename': _0x4aeea8,
            'contentType': 'image/jpeg'
        });
        const _0xa51bd2 = await axios['post'](okarunsite + '/api/upload', _0x395b69, {
            'headers': _0x395b69['getHeaders'](),
            'maxBodyLength': Infinity
        });
        if (_0xa51bd2['data']?.['status'] && _0xa51bd2['data']?.['resultado'])
            return _0xa51bd2['data']['resultado'];
        throw new Error('Upload\x20falhou:\x20' + JSON['stringify'](_0xa51bd2['data']));
    } catch (_0x59e26f) {
        errorLog('[uploadMidia]\x20' + _0x59e26f['message']);
        return null;
    }
}
function DLT_FL(_0x458752) {
    try {
        fs['unlinkSync'](_0x458752);
    } catch {
    }
}
const msgRetryCounterCache = new NodeCache();
const readline = require('readline');
const pairingCode = process['argv']['includes']('sim');
const question = _0x3a1feb => {
    const _0x56cf97 = readline['createInterface']({
        'input': process['stdin'],
        'output': process['stdout']
    });
    return new Promise(_0x1d91d4 => _0x56cf97['question'](_0x3a1feb, _0x563f4e => {
        _0x56cf97['close']();
        _0x1d91d4(_0x563f4e);
    }));
};
function collectNumbers(_0x48e912) {
    return _0x48e912['replace'](/[^0-9]/g, '');
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
function limparArquivosAntigos(_0xc02bf1, _0x178218, _0x546a41 = () => !![], _0x3c6067 = _0xc02bf1, _0x16c2e1 = !![]) {
    let _0x594648 = 0x0;
    if (!fs['existsSync'](_0xc02bf1))
        return _0x594648;
    for (const _0x565fda of fs['readdirSync'](_0xc02bf1, { 'withFileTypes': !![] })) {
        const _0x5bdb09 = path['join'](_0xc02bf1, _0x565fda['name']);
        try {
            if (_0x565fda['isDirectory']()) {
                if (!_0x16c2e1)
                    continue;
                _0x594648 += limparArquivosAntigos(_0x5bdb09, _0x178218, _0x546a41, _0x3c6067, !![]);
                if (_0x5bdb09 !== _0x3c6067 && fs['readdirSync'](_0x5bdb09)['length'] === 0x0)
                    fs['rmdirSync'](_0x5bdb09);
                continue;
            }
            if (!_0x565fda['isFile']() || !_0x546a41(_0x565fda['name'], _0x5bdb09))
                continue;
            const _0x5b425b = Date['now']() - fs['statSync'](_0x5bdb09)['mtimeMs'];
            if (_0x5b425b >= _0x178218) {
                fs['unlinkSync'](_0x5bdb09);
                _0x594648++;
            }
        } catch {
        }
    }
    return _0x594648;
}
function limparTemp() {
    try {
        if (fs['existsSync'](STORE_PATH)) {
            const {size: _0x2b9a17} = fs['statSync'](STORE_PATH);
            if (_0x2b9a17 > MAX_STORE_SIZE_MB * 0x400 * 0x400) {
                fs['writeFileSync'](STORE_PATH, '{}');
                infoLog('[limpeza]\x20store.json\x20resetado\x20(estava\x20' + (_0x2b9a17 / 0x400 / 0x400)['toFixed'](0x1) + 'MB)');
            }
        }
        let _0x4bfc6f = 0x0;
        _0x4bfc6f += limparArquivosAntigos(SYSTEM_TEMP_DIR, TEMP_MAX_AGE_MS);
        _0x4bfc6f += limparArquivosAntigos(TEMP_DIR, TEMP_MAX_AGE_MS, _0x2b3465 => /\.(mp3|mp4|jpg|jpeg|png|webp|tmp|opus|ogg|gif)$/i['test'](_0x2b3465), TEMP_DIR, ![]);
        _0x4bfc6f += limparArquivosAntigos(ROOT_DIR, TEMP_MAX_AGE_MS, _0x1a2a89 => /\.(mp3|mp4|opus|ogg|tmp)$/i['test'](_0x1a2a89), ROOT_DIR, ![]);
        if (_0x4bfc6f > 0x0)
            infoLog('[limpeza]\x20' + _0x4bfc6f + '\x20arquivo(s)\x20temporário(s)\x20antigo(s)\x20removido(s).');
    } catch (_0x52f87d) {
        errorLog('[limpeza]\x20' + _0x52f87d['message']);
    }
}
function iniciarMonitorRestartQR(_0x1fa897) {
    global['__kaorukoSocketAtual'] = _0x1fa897;
    if (global['__restartQRWatcher'])
        return;
    const _0x136d02 = () => {
        const _0x5ca4d2 = global['__kaorukoSocketAtual'];
        if (!_0x5ca4d2)
            return;
        Promise['resolve'](restartQRfunc(_0x5ca4d2))['catch'](_0x1f940f => {
            errorLog('[restart-qr]\x20' + (_0x1f940f?.['message'] || _0x1f940f));
        });
    };
    global['__restartQRWatcher'] = setInterval(_0x136d02, 0x3c * 0x3e8);
    global['__restartQRWatcher']['unref']?.();
    setTimeout(_0x136d02, 0x1388)['unref']?.();
    infoLog('[restart-qr]\x20Verificador\x20automático\x20iniciado\x20(intervalo:\x201\x20minuto).');
}
limparTemp();
const _tempCleanupTimer = setInterval(limparTemp, 0x1e * 0x3c * 0x3e8);
_tempCleanupTimer['unref']?.();
async function iniciarwaguri() {
    const _0x464ba1 = QRCODEPATH;
    const {
        state: _0x55086f,
        saveCreds: _0x3da40f
    } = await useSQLiteAuthState(_0x464ba1);
    const {
        version: _0x1e6b93,
        isLatest: _0x11b974
    } = await fetchLatestBaileysVersion();
    const _0x50d11d = console['info'];
    console['info'] = function () {
        const _0x28f1c5 = util['format'](...arguments);
        const _0x340b46 = [
            'Closing\x20session:\x20SessionEntry',
            'Removing\x20old\x20closed\x20session:\x20SessionEntry\x20{',
            'Another\x20forbidden\x20string',
            'Closing\x20stale\x20open\x20session\x20for\x20new\x20outgoing\x20prekey\x20bundle',
            'Failed\x20to\x20decrypt\x20message\x20with\x20any\x20known\x20session',
            'Session\x20error:Error:\x20Bad\x20MAC'
        ];
        if (_0x340b46['some'](_0x50f5f5 => _0x28f1c5['includes'](_0x50f5f5)))
            return;
        _0x50d11d['apply'](console, arguments);
    };
    const _0x17849f = makeWASocket({
        'version': [
            0x2,
            0xbb8,
            0x3e2c370c
        ],
        'auth': {
            'creds': _0x55086f['creds'],
            'keys': makeCacheableSignalKeyStore(_0x55086f['keys'], P({ 'level': 'silent' }))
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
        'patchMessageBeforeSending': _0x2f340f => {
            const _0x1825c3 = !!(_0x2f340f['buttonsMessage'] || _0x2f340f['listMessage']);
            if (_0x1825c3) {
                _0x2f340f = {
                    'viewOnceMessage': {
                        'message': {
                            'messageContextInfo': {
                                'deviceListMetadataVersion': 0x2,
                                'deviceListMetadata': {}
                            },
                            ..._0x2f340f
                        }
                    }
                };
            }
            return _0x2f340f;
        }
    });
    let _0x539424 = null;
    if (makeInMemoryStore) {
        _0x539424 = makeInMemoryStore({ 'logger': P({ 'level': 'silent' }) });
        _0x539424['bind'](_0x17849f['ev']);
        try {
            if (!fs['existsSync']('./util/temp'))
                fs['mkdirSync']('./util/temp', { 'recursive': !![] });
            if (fs['existsSync'](STORE_PATH))
                _0x539424['readFromFile'](STORE_PATH);
        } catch {
        }
        setInterval(() => {
            try {
                _0x539424['writeToFile'](STORE_PATH);
            } catch {
            }
        }, 0x3 * 0x3c * 0x3e8);
    }
    if (pairingCode && !_0x17849f['authState']['creds']['registered']) {
        infoLog(colors['white']('-\x20Exemplo\x20do\x20número\x20para\x20realizar\x20a\x20conexão\x20do\x20bot:\x20+55\x2097\x209999-9999.\x20Coloque\x20do\x20jeito\x20que\x20está\x20no\x20WhatsApp!') + '\x0a–\x0a' + colors['cyan']('•\x20Insira\x20no\x20parâmetro\x20abaixo\x20o\x20número\x20de\x20telefone\x20que\x20você\x20deseja\x20conectar\x20a\x20bot\x20no\x20WhatsApp\x20Web:\x0a'));
        const _0xa9028a = await question('');
        const _0x17629a = collectNumbers(_0xa9028a);
        try {
            const _0x3d8266 = await _0x17849f['requestPairingCode'](_0x17629a);
            successLog(colors['cyan']('•\x20Código\x20para\x20conectar\x20o\x20bot\x20e\x20desfrutar\x20de\x20suas\x20imensas\x20funcionalidades:') + '\x20' + colors['white'](_0x3d8266) + '\x0a–\x0a' + colors['yellow']('•\x20Tutorial:\x20Entre\x20no\x20WhatsApp\x20que\x20será\x20o\x20bot\x20e\x20vá\x20em\x20aparelhos\x20conectado,\x20e\x20clique\x20em\x20\x22Conectar\x20um\x20aparelho\x22,\x20e\x20lá\x20na\x20parte\x20inferior,\x20clique\x20em\x20\x22Conectar\x20com\x20número\x20de\x20telefone\x22\x20e\x20digite\x20o\x20código\x20gerado\x20acima...'));
        } catch (_0x2a1bf1) {
            errorLog(colors['red']('Erro\x20ao\x20gerar\x20código\x20de\x20pareamento:\x20' + _0x2a1bf1['message']));
            errorLog(colors['yellow']('Tente\x20deletar\x20a\x20pasta\x20de\x20sessão\x20e\x20reiniciar.'));
        }
    }
    _0x17849f['ev']['process'](async _0x5155aa => {
        if (_0x5155aa['group-participants.update']) {
            try {
                var _0x24522a = _0x5155aa['group-participants.update'];
                var _0x2e2a61 = getGroupData(_0x24522a['id']);
                if (!_0x2e2a61)
                    return;
                const _0x399c1c = resolverParticipante(_0x24522a['participants'][0x0]);
                if (!_0x399c1c)
                    return;
                _0x24522a['participants'][0x0] = _0x399c1c;
                const _0x3a7adc = (_0x17849f['user']['id'] || _0x17849f['user']['jid'] || '')['split'](':')[0x0]['replace'](/@.*/, '');
                if (_0x399c1c['replace'](/@.*/, '') === _0x3a7adc)
                    return;
                const {nukeSystemFunc: _0x28bfa6} = require('./database/antinuke/nukesystem.js');
                _0x28bfa6(_0x17849f, _0x24522a);
                try {
                    var _0x316711 = await _0x17849f['groupMetadata'](_0x24522a['id']);
                } catch {
                    return;
                }
                const _0xfe1b43 = _0x316711['id']['endsWith']('@g.us');
                const _0x1ec86e = _0xfe1b43 ? _0x316711 : null;
                if (!_0x1ec86e)
                    return;
                atualizarGrupoCache(_0x316711);
                if (_0x24522a['action'] == 'add') {
                    const _0x18203a = _0x24522a['participants'][0x0];
                    if (nescessario['listanegraG']['includes'](_0x18203a)) {
                        await _0x17849f['sendMessage'](_0x1ec86e['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban...' });
                        _0x17849f['groupParticipantsUpdate'](_0x1ec86e['id'], [_0x24522a['participants'][0x0]], 'remove');
                        return;
                    }
                }
                if (_0x24522a['action'] == 'add' && _0x2e2a61[0x0]['listanegra']['includes'](_0x24522a['participants'][0x0])) {
                    await _0x17849f['sendMessage'](_0x1ec86e['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban\x20cabaço...' });
                    _0x17849f['groupParticipantsUpdate'](_0x1ec86e['id'], [_0x24522a['participants'][0x0]], 'remove');
                }
                if (!_0x2e2a61[0x0]['wellcome'][0x1]['bemvindo2'] && !_0x2e2a61[0x0]['wellcome'][0x0]['bemvindo1'])
                    return;
                var _0x28ad4e = _0xfe1b43 ? _0x316711 : '';
                if (!_0x28ad4e)
                    return;
                const _0x2c1efe = _0x24522a['id'];
                const _0x56a4b5 = _0x2e2a61[0x0]['wellcome'][0x0]['legendabv'] != null ? !![] : ![];
                const _0x4aaf8b = _0x2e2a61[0x0]['wellcome'][0x0]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x5f0398 = _0x2e2a61[0x0]['wellcome'][0x1]['legendabv'] != null ? !![] : ![];
                const _0x580577 = _0x2e2a61[0x0]['wellcome'][0x1]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x133dce = _0x28ad4e['desc'];
                if (_0x2e2a61[0x0]['antifake'] == !![] && !_0x24522a['participants'][0x0]['startsWith']('55'))
                    return;
                let _0x27969c = { 'data': 'https://telegra.ph/file/24fa902ead26340f3df2c.png' };
                if (_0x2e2a61[0x0]['wellcome'][0x0]['bemvindo1'] == !![]) {
                    try {
                        ppimg = await _0x17849f['profilePictureUrl'](_0x24522a['participants'][0x0]);
                    } catch {
                        ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                    }
                    _0x27969c = { 'data': await uploadMidia(ppimg, 'perfil.jpg') || ppimg };
                    try {
                        var _0x52b5fb = await _0x17849f['profilePictureUrl'](_0x2c1efe, 'image');
                    } catch {
                        var _0x52b5fb = 'https://telegra.ph/file/6ca032835ed7a16748b6f.jpg';
                    }
                    ppgrupo = { 'data': await uploadMidia(_0x52b5fb, 'grupo2.jpg') || _0x52b5fb };
                    if (_0x24522a['action'] === 'add') {
                        if (_0x56a4b5) {
                            teks = _0x2e2a61[0x0]['wellcome'][0x0]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x28ad4e['subject'])['replace']('#numerodele#', '@' + _0x24522a['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x17849f['user']['id'])['replace']('#prefixo#', _0x2e2a61[0x0]['multiprefix'] == !![] ? _0x2e2a61[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x133dce);
                        } else {
                            teks = welcome(_0x24522a['participants'][0x0]['split']('@')[0x0], _0x28ad4e['subject']);
                        }
                        let _0x21412c = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x21412c);
                        _0x17849f['sendMessage'](_0x28ad4e['id'], {
                            'image': { 'url': okarunsite + ('/api/welcome?avatar=' + _0x27969c['data'] + '&numero=' + _0x24522a['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=Seja\x20Bem-vindo\x20ao\x20grupo\x20' + encodeURI(_0x28ad4e['subject']) + '&mensagem=Bem\x20Vindo\x20(a)!&background=' + fundo2 + '&tema=rosa') },
                            'mentions': _0x24522a['participants'],
                            'caption': teks
                        });
                        DLT_FL(ran);
                    } else if (_0x24522a['action'] === 'remove') {
                        _0x4b6a25 = _0x24522a['participants'][0x0];
                        try {
                            ppimg = await _0x17849f['profilePictureUrl'](_0x4b6a25['split']('@')[0x0] + '@c.us');
                        } catch {
                            ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                        }
                        if (_0x4aaf8b) {
                            teks = _0x2e2a61[0x0]['wellcome'][0x0]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x28ad4e['subject'])['replace']('#numerodele#', '@' + _0x24522a['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x17849f['user']['id'])['replace']('#prefixo#', _0x2e2a61[0x0]['multiprefix'] == !![] ? _0x2e2a61[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x133dce);
                        }
                        let _0x2f5416 = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x2f5416);
                        _0x17849f['sendMessage'](_0x28ad4e['id'], {
                            'image': { 'url': okarunsite + ('/api/goodbye?avatar=' + _0x27969c['data'] + '&numero=' + _0x24522a['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=SAIU\x20DE\x20' + encodeURI(_0x28ad4e['subject']) + '&mensagem=Até%20logo!&background=' + fundo2 + '&tema=rosa') },
                            'caption': teks,
                            'mentions': _0x24522a['participants']
                        });
                        DLT_FL(ran);
                    }
                }
                if (_0x2e2a61[0x0]['wellcome'][0x1]['bemvindo2'] == !![]) {
                    if (_0x24522a['action'] === 'add') {
                        if (_0x5f0398) {
                            teks = _0x2e2a61[0x0]['wellcome'][0x1]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x28ad4e['subject'])['replace']('#numerodele#', '@' + _0x24522a['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x17849f['user']['id'])['replace']('#prefixo#', _0x2e2a61[0x0]['multiprefix'] == !![] ? _0x2e2a61[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x133dce);
                        } else {
                            teks = welcome2(_0x24522a['participants'][0x0]['split']('@')[0x0], _0x28ad4e['subject']);
                        }
                        _0x17849f['sendMessage'](_0x28ad4e['id'], {
                            'text': teks,
                            'mentions': _0x24522a['participants']
                        });
                    } else if (_0x24522a['action'] === 'remove') {
                        var _0x4b6a25 = _0x24522a['participants'][0x0];
                        if (_0x580577) {
                            teks = _0x2e2a61[0x0]['wellcome'][0x1]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x28ad4e['subject'])['replace']('#numerodele#', '@' + _0x24522a['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x17849f['user']['id'])['replace']('#prefixo#', _0x2e2a61[0x0]['multiprefix'] == !![] ? _0x2e2a61[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x133dce);
                        } else {
                            teks = bye2(_0x4b6a25['split']('@')[0x0]);
                        }
                        _0x17849f['sendMessage'](_0x28ad4e['id'], {
                            'text': teks,
                            'mentions': _0x24522a['participants']
                        });
                    }
                }
            } catch (_0x183af2) {
                console['log'](_0x183af2);
            }
        }
        if (_0x5155aa['groups.update']) {
            try {
                const _0x6322bb = _0x5155aa['groups.update'];
                for (const _0x5d2c0c of Array['isArray'](_0x6322bb) ? _0x6322bb : [_0x6322bb]) {
                    if (!_0x5d2c0c?.['id'])
                        continue;
                    try {
                        const _0xee84c9 = await _0x17849f['groupMetadata'](_0x5d2c0c['id']);
                        atualizarGrupoCache(_0xee84c9);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x5d2c0c['id']);
                    } catch {
                        atualizarGrupoCache(_0x5d2c0c);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x5d2c0c['id']);
                    }
                }
            } catch (_0x3a3421) {
                errorLog('[groups.update]\x20' + _0x3a3421['message']);
            }
        }
        if (_0x5155aa['messages.upsert']) {
            var _0x560d3e = _0x5155aa['messages.upsert'];
            try {
                const _0x2dba97 = _0x560d3e['messages'] || [_0x560d3e];
                for (const _0x3ca4c3 of _0x2dba97) {
                    if (!_0x3ca4c3?.['key']?.['remoteJid'] || _0x3ca4c3['key']['remoteJid']['endsWith']('@broadcast'))
                        continue;
                    AddWhatsAppuser(_0x17849f, _0x3ca4c3)['catch'](() => {
                    });
                }
            } catch {
            }
            try {
                const {processEununca: _0x17cd75} = require('./util/eununca-handler.js');
                const _0x4d805a = _0x560d3e['messages'] || [_0x560d3e];
                for (const _0xf102c of _0x4d805a) {
                    if (_0xf102c?.['message']?.['pollUpdateMessage']) {
                        await _0x17cd75(_0x17849f, _0xf102c)['catch'](_0x25ede2 => errorLog('[eununca]\x20' + _0x25ede2['message']));
                    }
                }
            } catch {
            }
            Promise['resolve'](require('./index.js')(_0x560d3e, _0x17849f, _0x464ba1, _0x539424))['catch'](_0x2aa595 => {
                errorLog('[index.js]\x20Erro\x20não\x20tratado:\x20' + (_0x2aa595?.['message'] || _0x2aa595));
            });
        }
        if (_0x5155aa['connection.update']) {
            const _0x8c79ad = _0x5155aa['connection.update'];
            var {
                connection: _0x4e304a,
                lastDisconnect: _0x2c011c,
                qr: _0x388a55,
                isNewLogin: _0x1090e1,
                receivedPendingNotifications: _0x5a0ebd
            } = _0x8c79ad;
            if (_0x388a55) {
                console['log'](colors['cyan']('📱\x20Escaneie\x20o\x20QR\x20Code\x20abaixo\x20com\x20o\x20WhatsApp:'));
                qrTerminal['generate'](_0x388a55, { 'small': !![] });
                QRCode['toFile']('./qrcode.png', _0x388a55, {
                    'width': 0x200,
                    'margin': 0x2
                }, _0x5ef2c3 => {
                    if (_0x5ef2c3) {
                        warningLog(colors['yellow']('⚠\x20Não\x20foi\x20possível\x20salvar\x20qrcode.png:\x20' + _0x5ef2c3['message']));
                    } else {
                        successLog(colors['green']('✅\x20QR\x20Code\x20também\x20salvo\x20como\x20imagem\x20em:\x20qrcode.png'));
                    }
                });
                console['log'](colors['yellow']('\x0a⏳\x20O\x20QR\x20Code\x20expira\x20em\x203\x20minutos.\x20Escaneie\x20rápido!\x0a'));
            }
            const _0x4cdd1b = new Boom(_0x2c011c?.['error'])?.['output']?.['statusCode'];
            switch (_0x4e304a) {
            case 'close':
                if (_0x4cdd1b) {
                    if (_0x4cdd1b == 0x191) {
                        console['log'](colors['red'](mess['ErrorBaileys401']()));
                    } else if (_0x4cdd1b == 0x198) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_408']()));
                    } else if (_0x4cdd1b == 0x19b) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_411']()));
                    } else if (_0x4cdd1b == 0x1ac) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_428']()));
                    } else if (_0x4cdd1b == 0x1b8) {
                        console['log'](colors['gray'](mess['ErrorBaileys_440']()));
                    } else if (_0x4cdd1b == 0x1f4) {
                        console['log'](colors['gray'](mess['ErrorBaileys_500']()));
                    } else if (_0x4cdd1b == 0x1f7) {
                        console['log'](colors['gray']('Ocorreu\x20um\x20erro\x20desconhecido!\x20Error:\x20503.'));
                    } else if (_0x4cdd1b == 0x203) {
                        console['log'](colors['gray'](mess['ErrorBaileys_515']()));
                    } else {
                        console['log']('Conexão\x20fechada\x20por\x20motivo\x20do\x20erro:\x20' + _0x2c011c?.['error']);
                    }
                    await iniciarwaguri();
                }
                break;
            case 'connecting':
                warningLog('' + colors['yellow'](mess['connecting']()));
                infoLog('WhatsApp-Web:\x20' + _0x1e6b93);
                break;
            case 'open':
                iniciarwaguri['_loggedOutCount'] = 0x0;
                iniciarMonitorRestartQR(_0x17849f);
                console['log'](banner3['string']);
                console['log'](banner2['string']);
                successLog('' + colors['green'](mess['open']()));
                infoLog('💻\x20Instagram:\x20@paulo_mod_domina');
                infoLog('🤖\x20Versão:\x20' + botPackage['version'] + '\x20(' + botPackage['update_date'] + ')');
                infoLog('💾\x20Servidor:\x20Privado!');
                infoLog('©\x20Todos\x20os\x20Direitos\x20Resevardos\x20a\x20Eduh\x20Dev\x20</>\x20');
                await _0x17849f['sendPresenceUpdate']('available');
                try {
                    const _0x3d784d = String(setting['ownerNumber'] || '')['replace'](/[^0-9]/g, '') + '@s.whatsapp.net';
                    const _0x4c3c3a = Date['now']();
                    if (_0x3d784d['length'] > 0x12 && (!global['__mainBotOpenNotifiedAt'] || _0x4c3c3a - global['__mainBotOpenNotifiedAt'] > 0x5 * 0x3c * 0x3e8)) {
                        global['__mainBotOpenNotifiedAt'] = _0x4c3c3a;
                        await _0x17849f['sendMessage'](_0x3d784d, { 'text': '🟢\x20*' + NomeDoBot + '\x20conectado!*\x0a\x0a📡\x20Sistema\x20principal\x20online.\x0a🕒\x20' + moment['tz']('America/Sao_Paulo')['format']('DD/MM/YYYY\x20HH:mm:ss') + '\x0a💾\x20Sessão:\x20SQLite' })['catch'](() => {
                        });
                    }
                } catch {
                }
                if (!global['_subbotSystemStarted']) {
                    global['_subbotSystemStarted'] = !![];
                    try {
                        const _0x275968 = require('./subbot/subbotManager.js');
                        _0x275968['restoreActiveSubbots'](_0x17849f);
                        _0x275968['startExpirationWatcher'](_0x17849f);
                        successLog('🤖\x20Sistema\x20de\x20subbots\x20restaurado\x20e\x20monitorando\x20expirações.');
                    } catch (_0x182a3b) {
                        errorLog('[subbot]\x20Falha\x20ao\x20iniciar\x20sistema\x20de\x20subbots:\x20' + _0x182a3b['message']);
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
        if (_0x5155aa['creds.update']) {
            await _0x3da40f();
        }
    });
}
iniciarwaguri()['catch'](_0x41d908 => errorLog('[iniciarwaguri]\x20' + _0x41d908['message']));
let file = require['resolve'](__filename);
fs['watchFile'](file, () => {
    fs['unwatchFile'](file);
    infoLog(colors['red']('Oba,\x20Recebi\x20Atualizacao\x20no\x20Arquivo:\x20\x27' + __filename + '\x27'));
    delete require['cache'][file];
    require(file);
});
