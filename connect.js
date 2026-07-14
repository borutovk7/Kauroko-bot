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
process['on']('unhandledRejection', _0x416039 => {
    errorLog('[unhandledRejection]\x20' + (_0x416039?.['message'] || _0x416039));
});
process['on']('uncaughtException', _0x50d1d3 => {
    errorLog('[uncaughtException]\x20' + _0x50d1d3['message']);
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
function salvarGrupos(_0x17959b) {
    if (_salvarGruposTimer)
        clearTimeout(_salvarGruposTimer);
    _salvarGruposTimer = setTimeout(() => {
        try {
            if (!fs['existsSync'](GRUPOS_DIR))
                fs['mkdirSync'](GRUPOS_DIR, { 'recursive': !![] });
            fs['writeFileSync'](GRUPOS_FILE, JSON['stringify'](_0x17959b, null, 0x2));
        } catch (_0x2048c4) {
            errorLog('[grupos.json]\x20' + _0x2048c4['message']);
        }
    }, 0x5dc);
}
function atualizarGrupoCache(_0x124459) {
    if (!_0x124459?.['id'])
        return;
    const _0x4ed1ca = carregarGrupos();
    const _0x583144 = _0x4ed1ca['findIndex'](_0x376519 => _0x376519['id'] === _0x124459['id']);
    const _0x4af41d = (_0x124459['participants'] || [])['map'](_0x37e6c9 => ({
        'jid': _0x37e6c9['jid'] || _0x37e6c9['phoneNumber'] || _0x37e6c9['id'],
        'lid': _0x37e6c9['id'] || _0x37e6c9['lid'] || _0x37e6c9['jid'],
        'admin': _0x37e6c9['admin'] || null
    }));
    const _0x4c33ec = {
        'id': _0x124459['id'],
        'subject': _0x124459['subject'] || '',
        'participants': _0x4af41d
    };
    if (_0x583144 >= 0x0)
        _0x4ed1ca[_0x583144] = _0x4c33ec;
    else
        _0x4ed1ca['push'](_0x4c33ec);
    salvarGrupos(_0x4ed1ca);
}
function resolverParticipante(_0x13c703) {
    if (!_0x13c703)
        return '';
    if (typeof _0x13c703 === 'string') {
        if (_0x13c703['endsWith']('@lid'))
            return convertWhatsAppUser(_0x13c703, 'jid') || _0x13c703;
        return _0x13c703;
    }
    if (_0x13c703['jid'] && typeof _0x13c703['jid'] === 'string')
        return _0x13c703['jid'];
    if (_0x13c703['id'] && typeof _0x13c703['id'] === 'string') {
        if (_0x13c703['id']['endsWith']('@lid'))
            return convertWhatsAppUser(_0x13c703['id'], 'jid') || _0x13c703['id'];
        return _0x13c703['id'];
    }
    return '';
}
async function uploadMidia(_0x19c2d6, _0x410b72 = 'media.jpg') {
    try {
        const _0xf331c7 = Buffer['isBuffer'](_0x19c2d6) ? _0x19c2d6 : await getBuffer(_0x19c2d6);
        const _0x51b254 = new FormData();
        _0x51b254['append']('apikey', API_KEY_WAGURI);
        _0x51b254['append']('media', _0xf331c7, {
            'filename': _0x410b72,
            'contentType': 'image/jpeg'
        });
        const _0x263904 = await axios['post'](okarunsite + '/api/upload', _0x51b254, {
            'headers': _0x51b254['getHeaders'](),
            'maxBodyLength': Infinity
        });
        if (_0x263904['data']?.['status'] && _0x263904['data']?.['resultado'])
            return _0x263904['data']['resultado'];
        throw new Error('Upload\x20falhou:\x20' + JSON['stringify'](_0x263904['data']));
    } catch (_0x477eb4) {
        errorLog('[uploadMidia]\x20' + _0x477eb4['message']);
        return null;
    }
}
function DLT_FL(_0x2db7a2) {
    try {
        fs['unlinkSync'](_0x2db7a2);
    } catch {
    }
}
const msgRetryCounterCache = new NodeCache();
const readline = require('readline');
const pairingCode = process['argv']['includes']('sim');
const question = _0x27dbab => {
    const _0x3a7611 = readline['createInterface']({
        'input': process['stdin'],
        'output': process['stdout']
    });
    return new Promise(_0x1c2fab => _0x3a7611['question'](_0x27dbab, _0x149d67 => {
        _0x3a7611['close']();
        _0x1c2fab(_0x149d67);
    }));
};
function collectNumbers(_0x5013f2) {
    return _0x5013f2['replace'](/[^0-9]/g, '');
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
function limparArquivosAntigos(_0x3c180a, _0x4c95c9, _0x368b8f = () => !![], _0x4445b9 = _0x3c180a, _0x3bd685 = !![]) {
    let _0x37ffd2 = 0x0;
    if (!fs['existsSync'](_0x3c180a))
        return _0x37ffd2;
    for (const _0x21e4d2 of fs['readdirSync'](_0x3c180a, { 'withFileTypes': !![] })) {
        const _0x33fb4a = path['join'](_0x3c180a, _0x21e4d2['name']);
        try {
            if (_0x21e4d2['isDirectory']()) {
                if (!_0x3bd685)
                    continue;
                _0x37ffd2 += limparArquivosAntigos(_0x33fb4a, _0x4c95c9, _0x368b8f, _0x4445b9, !![]);
                if (_0x33fb4a !== _0x4445b9 && fs['readdirSync'](_0x33fb4a)['length'] === 0x0)
                    fs['rmdirSync'](_0x33fb4a);
                continue;
            }
            if (!_0x21e4d2['isFile']() || !_0x368b8f(_0x21e4d2['name'], _0x33fb4a))
                continue;
            const _0x4dcbb2 = Date['now']() - fs['statSync'](_0x33fb4a)['mtimeMs'];
            if (_0x4dcbb2 >= _0x4c95c9) {
                fs['unlinkSync'](_0x33fb4a);
                _0x37ffd2++;
            }
        } catch {
        }
    }
    return _0x37ffd2;
}
function limparTemp() {
    try {
        if (fs['existsSync'](STORE_PATH)) {
            const {size: _0x569531} = fs['statSync'](STORE_PATH);
            if (_0x569531 > MAX_STORE_SIZE_MB * 0x400 * 0x400) {
                fs['writeFileSync'](STORE_PATH, '{}');
                infoLog('[limpeza]\x20store.json\x20resetado\x20(estava\x20' + (_0x569531 / 0x400 / 0x400)['toFixed'](0x1) + 'MB)');
            }
        }
        let _0x25b8d5 = 0x0;
        _0x25b8d5 += limparArquivosAntigos(SYSTEM_TEMP_DIR, TEMP_MAX_AGE_MS);
        _0x25b8d5 += limparArquivosAntigos(TEMP_DIR, TEMP_MAX_AGE_MS, _0x51faa2 => /\.(mp3|mp4|jpg|jpeg|png|webp|tmp|opus|ogg|gif)$/i['test'](_0x51faa2), TEMP_DIR, ![]);
        _0x25b8d5 += limparArquivosAntigos(ROOT_DIR, TEMP_MAX_AGE_MS, _0x283376 => /\.(mp3|mp4|opus|ogg|tmp)$/i['test'](_0x283376), ROOT_DIR, ![]);
        if (_0x25b8d5 > 0x0)
            infoLog('[limpeza]\x20' + _0x25b8d5 + '\x20arquivo(s)\x20temporário(s)\x20antigo(s)\x20removido(s).');
    } catch (_0x2e5877) {
        errorLog('[limpeza]\x20' + _0x2e5877['message']);
    }
}
function iniciarMonitorRestartQR(_0x3d9aa4) {
    global['__kaorukoSocketAtual'] = _0x3d9aa4;
    if (global['__restartQRWatcher'])
        return;
    const _0x30c07e = () => {
        const _0x48f7d5 = global['__kaorukoSocketAtual'];
        if (!_0x48f7d5)
            return;
        Promise['resolve'](restartQRfunc(_0x48f7d5))['catch'](_0x3c2ff3 => {
            errorLog('[restart-qr]\x20' + (_0x3c2ff3?.['message'] || _0x3c2ff3));
        });
    };
    global['__restartQRWatcher'] = setInterval(_0x30c07e, 0x3c * 0x3e8);
    global['__restartQRWatcher']['unref']?.();
    setTimeout(_0x30c07e, 0x1388)['unref']?.();
    infoLog('[restart-qr]\x20Verificador\x20automático\x20iniciado\x20(intervalo:\x201\x20minuto).');
}
limparTemp();
const _tempCleanupTimer = setInterval(limparTemp, 0x1e * 0x3c * 0x3e8);
_tempCleanupTimer['unref']?.();
async function iniciarwaguri() {
    const _0x6207ce = QRCODEPATH;
    const {
        state: _0x187c90,
        saveCreds: _0x199ac2
    } = await useSQLiteAuthState(_0x6207ce);
    const {
        version: _0x267a68,
        isLatest: _0xc39104
    } = await fetchLatestBaileysVersion();
    const _0x2e4eda = console['info'];
    console['info'] = function () {
        const _0x4d4775 = util['format'](...arguments);
        const _0x26f2ca = [
            'Closing\x20session:\x20SessionEntry',
            'Removing\x20old\x20closed\x20session:\x20SessionEntry\x20{',
            'Another\x20forbidden\x20string',
            'Closing\x20stale\x20open\x20session\x20for\x20new\x20outgoing\x20prekey\x20bundle',
            'Failed\x20to\x20decrypt\x20message\x20with\x20any\x20known\x20session',
            'Session\x20error:Error:\x20Bad\x20MAC'
        ];
        if (_0x26f2ca['some'](_0xf8b434 => _0x4d4775['includes'](_0xf8b434)))
            return;
        _0x2e4eda['apply'](console, arguments);
    };
    const _0x6fd793 = makeWASocket({
        'version': [
            0x2,
            0xbb8,
            0x3e2c370c
        ],
        'auth': {
            'creds': _0x187c90['creds'],
            'keys': makeCacheableSignalKeyStore(_0x187c90['keys'], P({ 'level': 'silent' }))
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
        'patchMessageBeforeSending': _0x1d5cea => {
            const _0x507695 = !!(_0x1d5cea['buttonsMessage'] || _0x1d5cea['listMessage']);
            if (_0x507695) {
                _0x1d5cea = {
                    'viewOnceMessage': {
                        'message': {
                            'messageContextInfo': {
                                'deviceListMetadataVersion': 0x2,
                                'deviceListMetadata': {}
                            },
                            ..._0x1d5cea
                        }
                    }
                };
            }
            return _0x1d5cea;
        }
    });
    let _0x317915 = null;
    if (makeInMemoryStore) {
        _0x317915 = makeInMemoryStore({ 'logger': P({ 'level': 'silent' }) });
        _0x317915['bind'](_0x6fd793['ev']);
        try {
            if (!fs['existsSync']('./util/temp'))
                fs['mkdirSync']('./util/temp', { 'recursive': !![] });
            if (fs['existsSync'](STORE_PATH))
                _0x317915['readFromFile'](STORE_PATH);
        } catch {
        }
        setInterval(() => {
            try {
                _0x317915['writeToFile'](STORE_PATH);
            } catch {
            }
        }, 0x3 * 0x3c * 0x3e8);
    }
    if (pairingCode && !_0x6fd793['authState']['creds']['registered']) {
        infoLog(colors['white']('-\x20Exemplo\x20do\x20número\x20para\x20realizar\x20a\x20conexão\x20do\x20bot:\x20+55\x2097\x209999-9999.\x20Coloque\x20do\x20jeito\x20que\x20está\x20no\x20WhatsApp!') + '\x0a–\x0a' + colors['cyan']('•\x20Insira\x20no\x20parâmetro\x20abaixo\x20o\x20número\x20de\x20telefone\x20que\x20você\x20deseja\x20conectar\x20a\x20bot\x20no\x20WhatsApp\x20Web:\x0a'));
        const _0x113774 = await question('');
        const _0x34efd9 = collectNumbers(_0x113774);
        try {
            const _0x103308 = await _0x6fd793['requestPairingCode'](_0x34efd9);
            successLog(colors['cyan']('•\x20Código\x20para\x20conectar\x20o\x20bot\x20e\x20desfrutar\x20de\x20suas\x20imensas\x20funcionalidades:') + '\x20' + colors['white'](_0x103308) + '\x0a–\x0a' + colors['yellow']('•\x20Tutorial:\x20Entre\x20no\x20WhatsApp\x20que\x20será\x20o\x20bot\x20e\x20vá\x20em\x20aparelhos\x20conectado,\x20e\x20clique\x20em\x20\x22Conectar\x20um\x20aparelho\x22,\x20e\x20lá\x20na\x20parte\x20inferior,\x20clique\x20em\x20\x22Conectar\x20com\x20número\x20de\x20telefone\x22\x20e\x20digite\x20o\x20código\x20gerado\x20acima...'));
        } catch (_0x13dba7) {
            errorLog(colors['red']('Erro\x20ao\x20gerar\x20código\x20de\x20pareamento:\x20' + _0x13dba7['message']));
            errorLog(colors['yellow']('Tente\x20deletar\x20a\x20pasta\x20de\x20sessão\x20e\x20reiniciar.'));
        }
    }
    _0x6fd793['ev']['process'](async _0x7e48cf => {
        if (_0x7e48cf['group-participants.update']) {
            try {
                var _0x5f5d99 = _0x7e48cf['group-participants.update'];
                var _0x5315e5 = getGroupData(_0x5f5d99['id']);
                if (!_0x5315e5)
                    return;
                const _0x420d6b = resolverParticipante(_0x5f5d99['participants'][0x0]);
                if (!_0x420d6b)
                    return;
                _0x5f5d99['participants'][0x0] = _0x420d6b;
                const _0x3d7aa3 = (_0x6fd793['user']['id'] || _0x6fd793['user']['jid'] || '')['split'](':')[0x0]['replace'](/@.*/, '');
                if (_0x420d6b['replace'](/@.*/, '') === _0x3d7aa3)
                    return;
                const {nukeSystemFunc: _0x2d7267} = require('./database/antinuke/nukesystem.js');
                _0x2d7267(_0x6fd793, _0x5f5d99);
                try {
                    var _0x42e993 = await _0x6fd793['groupMetadata'](_0x5f5d99['id']);
                } catch {
                    return;
                }
                const _0x4c2218 = _0x42e993['id']['endsWith']('@g.us');
                const _0x2af008 = _0x4c2218 ? _0x42e993 : null;
                if (!_0x2af008)
                    return;
                atualizarGrupoCache(_0x42e993);
                if (_0x5f5d99['action'] == 'add') {
                    const _0x4be18e = _0x5f5d99['participants'][0x0];
                    if (nescessario['listanegraG']['includes'](_0x4be18e)) {
                        await _0x6fd793['sendMessage'](_0x2af008['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban...' });
                        _0x6fd793['groupParticipantsUpdate'](_0x2af008['id'], [_0x5f5d99['participants'][0x0]], 'remove');
                        return;
                    }
                }
                if (_0x5f5d99['action'] == 'add' && _0x5315e5[0x0]['listanegra']['includes'](_0x5f5d99['participants'][0x0])) {
                    await _0x6fd793['sendMessage'](_0x2af008['id'], { 'text': 'Olha\x20quem\x20deu\x20as\x20cara\x20por\x20aqui,\x20sente\x20o\x20poder\x20do\x20ban\x20cabaço...' });
                    _0x6fd793['groupParticipantsUpdate'](_0x2af008['id'], [_0x5f5d99['participants'][0x0]], 'remove');
                }
                if (!_0x5315e5[0x0]['wellcome'][0x1]['bemvindo2'] && !_0x5315e5[0x0]['wellcome'][0x0]['bemvindo1'])
                    return;
                var _0x23a6d5 = _0x4c2218 ? _0x42e993 : '';
                if (!_0x23a6d5)
                    return;
                const _0x29bb7f = _0x5f5d99['id'];
                const _0xf8954e = _0x5315e5[0x0]['wellcome'][0x0]['legendabv'] != null ? !![] : ![];
                const _0x12a073 = _0x5315e5[0x0]['wellcome'][0x0]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x10fd1b = _0x5315e5[0x0]['wellcome'][0x1]['legendabv'] != null ? !![] : ![];
                const _0x5da4ad = _0x5315e5[0x0]['wellcome'][0x1]['legendasaiu'] != 0x0 ? !![] : ![];
                const _0x3eb9a3 = _0x23a6d5['desc'];
                if (_0x5315e5[0x0]['antifake'] == !![] && !_0x5f5d99['participants'][0x0]['startsWith']('55'))
                    return;
                let _0x2df1c4 = { 'data': 'https://telegra.ph/file/24fa902ead26340f3df2c.png' };
                if (_0x5315e5[0x0]['wellcome'][0x0]['bemvindo1'] == !![]) {
                    try {
                        ppimg = await _0x6fd793['profilePictureUrl'](_0x5f5d99['participants'][0x0]);
                    } catch {
                        ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                    }
                    _0x2df1c4 = { 'data': await uploadMidia(ppimg, 'perfil.jpg') || ppimg };
                    try {
                        var _0x4cc48d = await _0x6fd793['profilePictureUrl'](_0x29bb7f, 'image');
                    } catch {
                        var _0x4cc48d = 'https://telegra.ph/file/6ca032835ed7a16748b6f.jpg';
                    }
                    ppgrupo = { 'data': await uploadMidia(_0x4cc48d, 'grupo2.jpg') || _0x4cc48d };
                    if (_0x5f5d99['action'] === 'add') {
                        if (_0xf8954e) {
                            teks = _0x5315e5[0x0]['wellcome'][0x0]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x23a6d5['subject'])['replace']('#numerodele#', '@' + _0x5f5d99['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x6fd793['user']['id'])['replace']('#prefixo#', _0x5315e5[0x0]['multiprefix'] == !![] ? _0x5315e5[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x3eb9a3);
                        } else {
                            teks = welcome(_0x5f5d99['participants'][0x0]['split']('@')[0x0], _0x23a6d5['subject']);
                        }
                        let _0x1c5783 = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x1c5783);
                        _0x6fd793['sendMessage'](_0x23a6d5['id'], {
                            'image': { 'url': okarunsite + ('/api/welcome?avatar=' + _0x2df1c4['data'] + '&numero=' + _0x5f5d99['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=Seja\x20Bem-vindo\x20ao\x20grupo\x20' + encodeURI(_0x23a6d5['subject']) + '&mensagem=Bem\x20Vindo\x20(a)!&background=' + fundo2 + '&tema=rosa') },
                            'mentions': _0x5f5d99['participants'],
                            'caption': teks
                        });
                        DLT_FL(ran);
                    } else if (_0x5f5d99['action'] === 'remove') {
                        _0x4a58ee = _0x5f5d99['participants'][0x0];
                        try {
                            ppimg = await _0x6fd793['profilePictureUrl'](_0x4a58ee['split']('@')[0x0] + '@c.us');
                        } catch {
                            ppimg = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
                        }
                        if (_0x12a073) {
                            teks = _0x5315e5[0x0]['wellcome'][0x0]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x23a6d5['subject'])['replace']('#numerodele#', '@' + _0x5f5d99['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x6fd793['user']['id'])['replace']('#prefixo#', _0x5315e5[0x0]['multiprefix'] == !![] ? _0x5315e5[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x3eb9a3);
                        }
                        let _0x4dab8a = await getBuffer(ppimg);
                        ran = getRandom('.jpg');
                        fs['writeFileSync'](ran, _0x4dab8a);
                        _0x6fd793['sendMessage'](_0x23a6d5['id'], {
                            'image': { 'url': okarunsite + ('/api/goodbye?avatar=' + _0x2df1c4['data'] + '&numero=' + _0x5f5d99['participants'][0x0]['split']('@')[0x0] + '&members=2026&grupo=SAIU\x20DE\x20' + encodeURI(_0x23a6d5['subject']) + '&mensagem=Até%20logo!&background=' + fundo2 + '&tema=rosa') },
                            'caption': teks,
                            'mentions': _0x5f5d99['participants']
                        });
                        DLT_FL(ran);
                    }
                }
                if (_0x5315e5[0x0]['wellcome'][0x1]['bemvindo2'] == !![]) {
                    if (_0x5f5d99['action'] === 'add') {
                        if (_0x10fd1b) {
                            teks = _0x5315e5[0x0]['wellcome'][0x1]['legendabv']['replace']('#hora#', time)['replace']('#nomedogp#', _0x23a6d5['subject'])['replace']('#numerodele#', '@' + _0x5f5d99['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x6fd793['user']['id'])['replace']('#prefixo#', _0x5315e5[0x0]['multiprefix'] == !![] ? _0x5315e5[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x3eb9a3);
                        } else {
                            teks = welcome2(_0x5f5d99['participants'][0x0]['split']('@')[0x0], _0x23a6d5['subject']);
                        }
                        _0x6fd793['sendMessage'](_0x23a6d5['id'], {
                            'text': teks,
                            'mentions': _0x5f5d99['participants']
                        });
                    } else if (_0x5f5d99['action'] === 'remove') {
                        var _0x4a58ee = _0x5f5d99['participants'][0x0];
                        if (_0x5da4ad) {
                            teks = _0x5315e5[0x0]['wellcome'][0x1]['legendasaiu']['replace']('#hora#', time)['replace']('#nomedogp#', _0x23a6d5['subject'])['replace']('#numerodele#', '@' + _0x5f5d99['participants'][0x0]['split']('@')[0x0])['replace']('#numerobot#', _0x6fd793['user']['id'])['replace']('#prefixo#', _0x5315e5[0x0]['multiprefix'] == !![] ? _0x5315e5[0x0]['prefixos'][0x0] : setting['prefix'])['replace']('#descrição#', _0x3eb9a3);
                        } else {
                            teks = bye2(_0x4a58ee['split']('@')[0x0]);
                        }
                        _0x6fd793['sendMessage'](_0x23a6d5['id'], {
                            'text': teks,
                            'mentions': _0x5f5d99['participants']
                        });
                    }
                }
            } catch (_0x558fa7) {
                console['log'](_0x558fa7);
            }
        }
        if (_0x7e48cf['groups.update']) {
            try {
                const _0x5a47c4 = _0x7e48cf['groups.update'];
                for (const _0x2a400e of Array['isArray'](_0x5a47c4) ? _0x5a47c4 : [_0x5a47c4]) {
                    if (!_0x2a400e?.['id'])
                        continue;
                    try {
                        const _0x3318d7 = await _0x6fd793['groupMetadata'](_0x2a400e['id']);
                        atualizarGrupoCache(_0x3318d7);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x2a400e['id']);
                    } catch {
                        atualizarGrupoCache(_0x2a400e);
                        if (global['_gpMetaCache'])
                            global['_gpMetaCache']['delete'](_0x2a400e['id']);
                    }
                }
            } catch (_0x5db0b8) {
                errorLog('[groups.update]\x20' + _0x5db0b8['message']);
            }
        }
        if (_0x7e48cf['messages.upsert']) {
            var _0x1fee8d = _0x7e48cf['messages.upsert'];
            try {
                const _0x237d44 = _0x1fee8d['messages'] || [_0x1fee8d];
                for (const _0x426151 of _0x237d44) {
                    if (!_0x426151?.['key']?.['remoteJid'] || _0x426151['key']['remoteJid']['endsWith']('@broadcast'))
                        continue;
                    AddWhatsAppuser(_0x6fd793, _0x426151)['catch'](() => {
                    });
                }
            } catch {
            }
            try {
                const {processEununca: _0x59373c} = require('./util/eununca-handler.js');
                const _0x5aa7b9 = _0x1fee8d['messages'] || [_0x1fee8d];
                for (const _0x4ce610 of _0x5aa7b9) {
                    if (_0x4ce610?.['message']?.['pollUpdateMessage']) {
                        await _0x59373c(_0x6fd793, _0x4ce610)['catch'](_0x14f372 => errorLog('[eununca]\x20' + _0x14f372['message']));
                    }
                }
            } catch {
            }
            Promise['resolve'](require('./index.js')(_0x1fee8d, _0x6fd793, _0x6207ce, _0x317915))['catch'](_0x335418 => {
                errorLog('[index.js]\x20Erro\x20não\x20tratado:\x20' + (_0x335418?.['message'] || _0x335418));
            });
        }
        if (_0x7e48cf['connection.update']) {
            const _0x54ff87 = _0x7e48cf['connection.update'];
            var {
                connection: _0x9be0c4,
                lastDisconnect: _0x44c549,
                qr: _0x4d7b08,
                isNewLogin: _0x4b5f95,
                receivedPendingNotifications: _0x5d11fe
            } = _0x54ff87;
            if (_0x4d7b08) {
                console['log'](colors['cyan']('📱\x20Escaneie\x20o\x20QR\x20Code\x20abaixo\x20com\x20o\x20WhatsApp:'));
                qrTerminal['generate'](_0x4d7b08, { 'small': !![] });
                QRCode['toFile']('./qrcode.png', _0x4d7b08, {
                    'width': 0x200,
                    'margin': 0x2
                }, _0x325ca8 => {
                    if (_0x325ca8) {
                        warningLog(colors['yellow']('⚠\x20Não\x20foi\x20possível\x20salvar\x20qrcode.png:\x20' + _0x325ca8['message']));
                    } else {
                        successLog(colors['green']('✅\x20QR\x20Code\x20também\x20salvo\x20como\x20imagem\x20em:\x20qrcode.png'));
                    }
                });
                console['log'](colors['yellow']('\x0a⏳\x20O\x20QR\x20Code\x20expira\x20em\x203\x20minutos.\x20Escaneie\x20rápido!\x0a'));
            }
            const _0x1e7c5e = new Boom(_0x44c549?.['error'])?.['output']?.['statusCode'];
            switch (_0x9be0c4) {
            case 'close':
                if (_0x1e7c5e) {
                    if (_0x1e7c5e == 0x191) {
                        console['log'](colors['red'](mess['ErrorBaileys401']()));
                    } else if (_0x1e7c5e == 0x198) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_408']()));
                    } else if (_0x1e7c5e == 0x19b) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_411']()));
                    } else if (_0x1e7c5e == 0x1ac) {
                        console['log'](colors['yellow'](mess['ErrorBaileys_428']()));
                    } else if (_0x1e7c5e == 0x1b8) {
                        console['log'](colors['gray'](mess['ErrorBaileys_440']()));
                    } else if (_0x1e7c5e == 0x1f4) {
                        console['log'](colors['gray'](mess['ErrorBaileys_500']()));
                    } else if (_0x1e7c5e == 0x1f7) {
                        console['log'](colors['gray']('Ocorreu\x20um\x20erro\x20desconhecido!\x20Error:\x20503.'));
                    } else if (_0x1e7c5e == 0x203) {
                        console['log'](colors['gray'](mess['ErrorBaileys_515']()));
                    } else {
                        console['log']('Conexão\x20fechada\x20por\x20motivo\x20do\x20erro:\x20' + _0x44c549?.['error']);
                    }
                    await iniciarwaguri();
                }
                break;
            case 'connecting':
                warningLog('' + colors['yellow'](mess['connecting']()));
                infoLog('WhatsApp-Web:\x20' + _0x267a68);
                break;
            case 'open':
                iniciarwaguri['_loggedOutCount'] = 0x0;
                iniciarMonitorRestartQR(_0x6fd793);
                console['log'](banner3['string']);
                console['log'](banner2['string']);
                successLog('' + colors['green'](mess['open']()));
                infoLog('💻\x20Instagram:\x20@paulo_mod_domina');
                infoLog('🤖\x20Versão:\x20' + botPackage['version'] + '\x20(' + botPackage['update_date'] + ')');
                infoLog('💾\x20Servidor:\x20Privado!');
                infoLog('©\x20Todos\x20os\x20Direitos\x20Resevardos\x20a\x20Eduh\x20Dev\x20</>\x20');
                await _0x6fd793['sendPresenceUpdate']('available');
                try {
                    const _0x3c5bad = String(setting['ownerNumber'] || '')['replace'](/[^0-9]/g, '') + '@s.whatsapp.net';
                    const _0x6aabb1 = Date['now']();
                    if (_0x3c5bad['length'] > 0x12 && (!global['__mainBotOpenNotifiedAt'] || _0x6aabb1 - global['__mainBotOpenNotifiedAt'] > 0x5 * 0x3c * 0x3e8)) {
                        global['__mainBotOpenNotifiedAt'] = _0x6aabb1;
                        await _0x6fd793['sendMessage'](_0x3c5bad, { 'text': '🟢\x20*' + NomeDoBot + '\x20conectado!*\x0a\x0a📡\x20Sistema\x20principal\x20online.\x0a🕒\x20' + moment['tz']('America/Sao_Paulo')['format']('DD/MM/YYYY\x20HH:mm:ss') + '\x0a💾\x20Sessão:\x20SQLite' })['catch'](() => {
                        });
                    }
                } catch {
                }
                if (!global['_subbotSystemStarted']) {
                    global['_subbotSystemStarted'] = !![];
                    try {
                        const _0x2cfc9a = require('./subbot/subbotManager.js');
                        _0x2cfc9a['restoreActiveSubbots'](_0x6fd793);
                        _0x2cfc9a['startExpirationWatcher'](_0x6fd793);
                        successLog('🤖\x20Sistema\x20de\x20subbots\x20restaurado\x20e\x20monitorando\x20expirações.');
                    } catch (_0x37526b) {
                        errorLog('[subbot]\x20Falha\x20ao\x20iniciar\x20sistema\x20de\x20subbots:\x20' + _0x37526b['message']);
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
        if (_0x7e48cf['creds.update']) {
            await _0x199ac2();
        }
    });
}
iniciarwaguri()['catch'](_0x1ad8d6 => errorLog('[iniciarwaguri]\x20' + _0x1ad8d6['message']));
let file = require['resolve'](__filename);
fs['watchFile'](file, () => {
    fs['unwatchFile'](file);
    infoLog(colors['red']('Oba,\x20Recebi\x20Atualizacao\x20no\x20Arquivo:\x20\x27' + __filename + '\x27'));
    delete require['cache'][file];
    require(file);
});
