const {downloadContentFromMessage, prepareWAMessageMedia} = require('@boruto_vk7/baileys');
const fsPromises = require('fs')['promises'];
const {Boom} = require('@hapi/boom');
const axios = require('axios');
const fs = require('fs-extra');
const si = require('systeminformation');
const cheerio = require('cheerio');
const crypto = require('crypto');
const util = require('util');
const globalCache = new Map();
const {randomBytes} = require('crypto');
const P = require('pino');
const NodeCache = require('node-cache');
const linkfy = require('linkifyjs');
const request = require('request');
const ms = require('ms');
const os = require('os');
const ffmpeg = require('fluent-ffmpeg');
const fetch = (..._0x1545e8) => import('node-fetch')['then'](({default: _0x2212d9}) => _0x2212d9(..._0x1545e8));
const {exec, execSync} = require('child_process');
const moment = require('moment-timezone');
const colors = require('colors');
const path = require('path');
const time = moment['tz']('America/Sao_Paulo')['format']('HH:mm:ss');
const hora = moment['tz']('America/Sao_Paulo')['format']('HH:mm:ss');
const date = moment['tz']('America/Sao_Paulo')['format']('DD/MM/YYYY');
const {EfiPayPayment} = require('./arquivos/efipay-module/index.js');
const {sendVideoAsSticker, sendImageAsSticker} = require('./arquivos//sticker/rename.js');
const {sendVideoAsSticker2, sendImageAsSticker2} = require('./arquivos//sticker/rename2.js');
const {awaitMessage} = require('./arquivos/funcoes/awaitMessage.js');
const packname = JSON['parse'](fs['readFileSync']('./package.json'));
const {arcloud} = require('./arquivos/js/arcc.js');
const setting = JSON['parse'](fs['readFileSync']('./configs/configs.json'));
const allvaluerent = JSON['parse'](fs['readFileSync']('./configs/valores.json'));
const obrigadoEXT = JSON['parse'](fs['readFileSync']('./configs/nescessario.json'));
const links = JSON['parse'](fs['readFileSync']('./database/links.json'));
const webp_mp4 = require('./arquivos/js/webp_mp4.js');
const {infoLog, successLog, errorLog, warningLog} = require('./arquivos/funcoes/logger.js');
const {validmove, setGame} = require('./arquivos/tictactoe/index.js');
const {addComandosId, deleteComandos, getComandoBlock, getComandos, addComandos} = require('./arquivos/js/addcmd.js');
const {palavrasANA, quizanimais, enigmaArchive, garticArchives, whatMusicAr, quizFutebol} = require('./arquivos/js/jogos.js');
const {getExtension, getRandom, banner2, banner3, chyt, getBuffer, fetchJson, convertSticker, upload, nit, supre, catbox, direitos, color} = require('./arquivos/funcoes/functions.js');
const {writeExifImg} = require('./arquivos//sticker/exif.js');
const rgtake = JSON['parse'](fs['readFileSync']('./database/usuarios/take.json'));
const figname = JSON['parse'](fs['readFileSync']('./arquivos/figname.json'));
const revealmsg = JSON['parse'](fs['readFileSync']('./arquivos/revealmsg.json'));
const RemoverFundo = require('./arquivos/funcoes/removebg.js');
const versão = JSON['parse'](fs['readFileSync']('./package.json'))['version'];
const countMessage = JSON['parse'](fs['readFileSync']('./configs/media/countmsg.json'));
const comandos = JSON['parse'](fs['readFileSync']('./configs/media/comandos.json'));
const nescessario = JSON['parse'](fs['readFileSync']('./configs/nescessario.json'));
const premium = JSON['parse'](fs['readFileSync']('./database/usuarios/premium.json'));
const ban = JSON['parse'](fs['readFileSync']('./database/usuarios/banned.json'));
const muted = JSON['parse'](fs['readFileSync']('./database/grupos/muted.json'));
const joguinhodavelhajs = JSON['parse'](fs['readFileSync']('./database/usuarios/joguinhodavelha.json'));
const {okarunsite} = require('./configs/apikeys.json');
const joguinhodavelhajs2 = JSON['parse'](fs['readFileSync']('./database/usuarios/joguinhodavelha2.json'));
const anotar = JSON['parse'](fs['readFileSync']('./database/func/anotar.json'));
const logoslink = JSON['parse'](fs['readFileSync']('./configs/links_img.json'));
const Limit_CMD = JSON['parse'](fs['readFileSync']('./database/func/limitarcmd.json'));
const linksimg = JSON['parse'](fs['readFileSync']('./configs/logos.json'));
const tools = JSON['parse'](fs['readFileSync']('./arquivos/json/tools.json'));
const advices = JSON['parse'](fs['readFileSync']('./arquivos/json/advices.json'));
const {linguagem, mess, getInfo} = require('./configs/lib/index.js');
const {psycatgames, vyroEngine} = require('./arquivos/funcoes/scrapper.js');
const {destrava, destrava2} = require('./arquivos/funcoes/destrava.js');
const {tabela} = require('./arquivos/js/tabela.js');
function DLT_FL(_0x1781c8) {
    try {
        fs['unlinkSync'](_0x1781c8);
    } catch (_0xdf6642) {
    }
}
if (!nescessario['botoes_']) {
    var EnvBotao = async (_0x400394, _0x33d320, _0x3ed6e5, _0x492868, _0x260933, _0x322dfc) => {
        if (_0x322dfc['split']('|')[0x1] != '0') {
            _0x3ed6e5['sendMessage'](_0x400394, {
                'image': { 'url': _0x322dfc['split']('|')[0x1] },
                'caption': _0x492868,
                'mentions': [_0x33d320]
            });
        } else {
            _0x3ed6e5['sendMessage'](_0x400394, {
                'text': _0x492868,
                'mentions': [_0x33d320]
            });
        }
    };
} else {
    var EnvBotao = async (_0x56619c, _0x25649e, _0x35824d, _0x8f6f38, _0xc4eef9, _0x5f2803, _0xb5fd30 = [], _0x36971d) => {
        var _0x198b52 = _0x5f2803['split']('|')[0x0]['charAt'](0x0);
        var _0x46b034 = _0x198b52 == '1' ? [{
                'buttonId': _0xb5fd30[0x0],
                'buttonText': { 'displayText': _0xb5fd30[0x1] },
                'type': 0x1
            }] : _0x198b52 == '2' ? [
            {
                'buttonId': _0xb5fd30[0x0],
                'buttonText': { 'displayText': _0xb5fd30[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0xb5fd30[0x2],
                'buttonText': { 'displayText': _0xb5fd30[0x3] },
                'type': 0x1
            }
        ] : _0x198b52 == '3' ? [
            {
                'buttonId': _0xb5fd30[0x0],
                'buttonText': { 'displayText': _0xb5fd30[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0xb5fd30[0x2],
                'buttonText': { 'displayText': _0xb5fd30[0x3] },
                'type': 0x1
            },
            {
                'buttonId': _0xb5fd30[0x4],
                'buttonText': { 'displayText': _0xb5fd30[0x5] },
                'type': 0x1
            }
        ] : '';
        if (_0x5f2803['split']('|')[0x1] == '0' && !_0x5f2803['split']('|')[0x0]['includes']('v')) {
            var _0x2898fc = {
                'text': _0x8f6f38,
                'footer': _0xc4eef9,
                'buttons': _0x46b034,
                'headerType': 0x1,
                'mentions': [_0x25649e]
            };
        } else if (_0x5f2803['split']('|')[0x1] != '0' && !_0x5f2803['split']('|')[0x0]['includes']('v')) {
            var _0x2898fc = {
                'image': { 'url': _0x5f2803['split']('|')[0x1] },
                'caption': _0x8f6f38,
                'footer': _0xc4eef9,
                'buttons': _0x46b034,
                'headerType': 0x1,
                'mentions': [_0x25649e]
            };
        } else if (_0x5f2803['split']('|')[0x1] != '0' && _0x5f2803['split']('|')[0x0]['includes']('v')) {
            var _0x2898fc = {
                'video': { 'url': _0x5f2803['split']('|')[0x1] },
                'caption': _0x8f6f38,
                'footer': _0xc4eef9,
                'buttons': _0x46b034,
                'headerType': 0x1,
                'mentions': [ME]
            };
        }
        _0x35824d['sendMessage'](_0x56619c, _0x2898fc, { 'quoted': _0x36971d })['catch'](_0x5eddbd => {
            return console['log']('Erro\x20no\x20botão,\x20Tente\x20novamente\x20ou\x20avalie\x20o\x20que\x20pode\x20está\x20errando..\x20' + _0x5eddbd);
        });
    };
}
const contar = (_0x56a389, _0x38b95b) => {
    total = 0x0;
    for (i = 0x0; i < _0x56a389['length']; i++) {
        if (_0x38b95b == _0x56a389[i])
            total += 0x1;
    }
    return total;
};
const contarDias = _0x112b8f => {
    if (!_0x112b8f['includes']('/'))
        return 'Tem\x20que\x20colocar\x20em\x20/,\x20ex:\x2001/01/2024';
    barra = 0x0;
    for (i of _0x112b8f) {
        if (i == '/')
            barra += 0x1;
    }
    if (barra <= 0x0 || barra > 0x2)
        return 'Revise\x20o\x20formato\x20da\x20data\x20pfvr...\x20Receio\x20que\x20você\x20não\x20tenha\x20colocado\x20o\x20formato\x20correto\x20DD/MM/YYYY';
    var [_0x3a6758, _0x7daa3e, _0x235fda] = _0x112b8f['split']('/');
    year = _0x235fda['length'] == 0x2 ? '20' + _0x235fda : _0x235fda;
    if (Number(_0x3a6758) < 0x1 || Number(_0x3a6758) > 0x1f)
        return 'Os\x20dias\x20vão\x20de\x201\x20até\x20no\x20mxm\x2031';
    if (Number(_0x7daa3e) < 0x1 || Number(_0x7daa3e) > 0xc)
        return 'Os\x20meses\x20vão\x20de\x201\x20até\x20no\x20mxm\x2012';
    if (Number(year) < 0x1 || Number(_0x3a6758) > 0x5f5e100)
        return 'Os\x20anos\x20vão\x20de\x201\x20até\x20no\x20mxm\x20100000000';
    day = Number(year) * 0x16d;
    day += Number(_0x7daa3e) * 0x1e;
    day += Number(_0x3a6758);
    return day;
};
const getInviteCode = _0x159267 => {
    if (_0x159267['includes']('chat.whatsapp.com/')) {
        return {
            'type': 'group',
            'code': _0x159267['split']('chat.whatsapp.com/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    if (_0x159267['includes']('whatsapp.com/channel/')) {
        return {
            'type': 'channel',
            'code': _0x159267['split']('whatsapp.com/channel/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    return null;
};
const sendFutureTime = _0x2759ff => {
    hr = moment['tz']('America/Sao_Paulo');
    for (i of _0x2759ff) {
        hr = hr['add'](i['valor'], i['type']);
    }
    return hr['calendar']();
};
const contarMin = _0xb179a5 => {
    if (contar(String(_0xb179a5), ':') != 0x1)
        return 'É\x20necessário\x20o\x20uso\x20dos\x20:\x20no\x20horário,\x20seguindo\x20apenas\x20horas\x20e\x20minutos';
    var [_0x2256ee, _0x28860d] = _0xb179a5['split'](':');
    return Number(Number(_0x2256ee) * 0x3c) + Number(_0x28860d);
};
const isJsonIncludes = (_0x420265, _0x1c2394) => {
    if (JSON['stringify'](_0x420265)['includes'](_0x1c2394))
        return !![];
    return ![];
};
const converterMin = _0x306c2e => {
    if (Number(_0x306c2e) === 0x0)
        return '00:00';
    if (!Number(_0x306c2e))
        return 'Precisa\x20ser\x20um\x20número';
    nmr = Number(_0x306c2e);
    b = nmr % 0x3c;
    a = (nmr - b) / 0x3c;
    return (a < 0xa ? '0' + a : a) + ':' + (b < 0xa ? '0' + b : b);
};
function saveJSON(_0xb11673, _0xab3ea2) {
    fs['writeFileSync'](_0xab3ea2, JSON['stringify'](_0xb11673, null, 0x2));
}
const {sendlistbuttons, EnvButton, sendListB, sendSingleWithListAndButtons} = require('./arquivos/funcoes/botoes.js');
function ANT_LTR_MD_EMJ(_0x30680e) {
    for (let _0x22cc36 = 0x0, _0x457e4e = _0x30680e['length']; _0x22cc36 < _0x457e4e; _0x22cc36++) {
        if (_0x30680e['charCodeAt'](_0x22cc36) > 0xff) {
            return !![];
        }
    }
    return ![];
}
function kyun(_0x408423) {
    function _0x1afe78(_0x3b0826) {
        return (_0x3b0826 < 0xa ? '0' : '') + _0x3b0826;
    }
    ;
    var _0xdca9cd = Math['floor'](_0x408423 / (0x3c * 0x3c) % 0x18);
    var _0x2fd11e = Math['floor'](_0x408423 % (0x3c * 0x3c) / 0x3c);
    var _0x161e65 = Math['floor'](_0x408423 % 0x3c);
    return _0x1afe78(_0xdca9cd) + '\x20horas,\x20' + _0x1afe78(_0x2fd11e) + '\x20minutos\x20e\x20' + _0x1afe78(_0x161e65) + '\x20segundos.';
}
function TimeCount(_0x4ff150) {
    function _0x952339(_0x28dd47) {
        return (_0x28dd47 < 0xa ? '0' : '') + _0x28dd47;
    }
    ;
    var _0x2ca599 = Math['floor'](_0x4ff150 / (0x3c * 0x3c) / 0x18);
    var _0x3aa2b5 = Math['floor'](_0x4ff150 / (0x3c * 0x3c) % 0x18);
    var _0x1df44a = Math['floor'](_0x4ff150 % (0x3c * 0x3c) / 0x3c);
    var _0x41a834 = Math['floor'](_0x4ff150 % 0x3c);
    return _0x952339(_0x2ca599) + '\x20dia(s),\x20' + _0x952339(_0x3aa2b5) + '\x20hora(s),\x20' + _0x952339(_0x1df44a) + '\x20minuto(s)\x20e\x20' + _0x952339(_0x41a834) + '\x20segundo(s).';
}
const addNumberMais = _0x1aaba0 => {
    usu = (_0x1aaba0['includes']('@s.whatsapp.net') ? _0x1aaba0 : identArroba(_0x1aaba0))['split']('@')[0x0];
    return '+' + usu['slice'](0x0, 0x2) + '\x20' + usu['slice'](0x2, 0x4) + '\x20' + usu['slice'](0x4, usu['length'] - 0x4) + '-' + usu['slice'](usu['length'] - 0x4, usu['length']);
};
const sendHours = _0xb6cb7f => {
    moment['locale']('pt');
    return moment['tz']('America/Sao_Paulo')['format'](_0xb6cb7f);
};
const shuffle = _0x5ef6b0 => {
    palavra = _0x5ef6b0 + '\x20';
    armax = [];
    for (i = 0x0; i < palavra['length']; i++) {
        armax['push']({ 'l': palavra['split'](palavra['slice'](i + 0x1))[0x0]['slice'](i) });
    }
    shuffleProcess = '';
    total_armax = armax['length'];
    for (a = 0x0; a < total_armax; a++) {
        toDoRandom = Math['floor'](Math['random']() * armax['length']);
        shuffleProcess += armax[toDoRandom]['l'];
        armax['splice'](toDoRandom, 0x1);
    }
    return shuffleProcess;
};
async function getJsonCached(_0x681487) {
    if (globalCache['has'](_0x681487))
        return globalCache['get'](_0x681487);
    try {
        if (!fs['existsSync'](_0x681487))
            return null;
        const _0x34fe9d = JSON['parse'](await fsPromises['readFile'](_0x681487, 'utf8'));
        globalCache['set'](_0x681487, _0x34fe9d);
        return _0x34fe9d;
    } catch (_0x5da540) {
        console['error']('Erro\x20ao\x20ler\x20cache\x20de\x20' + _0x681487 + ':', _0x5da540);
        return null;
    }
}
async function saveJsonAsync(_0x544114, _0x3e32ca) {
    try {
        globalCache['set'](_0x544114, _0x3e32ca);
        await fsPromises['writeFile'](_0x544114, JSON['stringify'](_0x3e32ca, null, 0x2));
    } catch (_0x33fbd1) {
        console['error']('Erro\x20ao\x20salvar\x20' + _0x544114 + ':', _0x33fbd1);
    }
}
const getFileBuffer = async (_0x47daa3, _0x29c595) => {
    const _0x4985cf = await downloadContentFromMessage(_0x47daa3, _0x29c595);
    let _0x328bcc = Buffer['from']([]);
    for await (const _0x20013f of _0x4985cf) {
        _0x328bcc = Buffer['concat']([
            _0x328bcc,
            _0x20013f
        ]);
    }
    return _0x328bcc;
};
const sleep = async _0x39c9b9 => {
    return new Promise(_0x159e6f => setTimeout(_0x159e6f, _0x39c9b9));
};
const sendPoll = (_0xa59d88, _0x5285de, _0x302f73 = '', _0x51a011 = [], _0x1213a2 = 0x1) => {
    return _0xa59d88['sendMessage'](_0x5285de, {
        'poll': {
            'name': _0x302f73,
            'values': _0x51a011,
            'selectableCount': _0x1213a2
        },
        'messageContextInfo': { 'messageSecret': randomBytes(0x20) }
    }, {
        'id': _0x5285de,
        'options': { 'userJid': _0xa59d88?.['user']?.['id'] }
    })['catch'](() => {
        return console['log'](console['error']);
    });
};
const simih = async _0x16c27e => {
    try {
        const _0x1a7bcc = 'https://okarun-api.com.br/ia/simih?query=' + encodeURIComponent(_0x16c27e);
        const _0x8a7fa2 = await fetchJson(_0x1a7bcc);
        if (_0x8a7fa2?.['resultado']?.['trim']?.())
            return { 'resposta': _0x8a7fa2['resultado']['trim']() };
        return { 'resposta': '🤖💩\x20Não\x20sei\x20responder\x20isso\x20kkkkk' };
    } catch (_0x4550a4) {
        return { 'resposta': '🤖💩\x20Buguei\x20todo\x20aqui\x20kkkkk' };
    }
};
function obeso(_0x2c9ab8, _0x5da2bc) {
    return Number(parseFloat(_0x2c9ab8) / parseFloat(_0x5da2bc) ** 0x2)['toFixed'](0x2);
}
function capitalizeFirstLetter(_0x573691) {
    return _0x573691['charAt'](0x0)['toUpperCase']() + _0x573691['substring'](0x1);
}
const countDays = (_0x19dcd5, _0x285d38) => {
    if (!(_0x19dcd5 || _0x285d38))
        return 0x0;
    _0x19dcd5 = new Date(_0x19dcd5[0x1] + '/' + _0x19dcd5[0x0] + '/' + _0x19dcd5[0x2]);
    _0x285d38 = new Date(_0x285d38[0x1] + '/' + _0x285d38[0x0] + '/' + _0x285d38[0x2]);
    const _0xd87806 = Math['abs'](_0x285d38['getTime']() - _0x19dcd5['getTime']());
    const _0x592697 = Math['ceil'](_0xd87806 / (0x3e8 * 0xe10 * 0x18));
    return _0x592697 || 0x0;
};
const timeDate = (_0x23d4c1, _0xe9b6d6, _0x323c10 = !![]) => {
    if (Number(_0xe9b6d6) && _0x323c10)
        return moment(_0xe9b6d6 * 0x3e8)['tz']('America/Sao_Paulo')['format'](_0x23d4c1);
    if (Number(_0xe9b6d6))
        return moment(_0xe9b6d6)['tz']('America/Sao_Paulo')['format'](_0x23d4c1);
    return moment['tz']('America/Sao_Paulo')['format'](_0x23d4c1);
};
const alerandom = _0x23519b => {
    return Math['floor'](Math['random']() * _0x23519b);
};
var letras = 'abcdefghijklmnopqrstuvwxyz';
const randomLetra = () => letras[alerandom(letras['length'])]['toUpperCase']();
const formatNumber = _0x1b81b0 => {
    if (_0x1b81b0 >= 0x3b9aca00)
        return (_0x1b81b0 / 0x3b9aca00)['toFixed'](0x1) + 'B';
    if (_0x1b81b0 >= 0xf4240)
        return (_0x1b81b0 / 0xf4240)['toFixed'](0x1) + 'M';
    if (_0x1b81b0 >= 0x186a0)
        return (_0x1b81b0 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x1b81b0 >= 0x2710)
        return (_0x1b81b0 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x1b81b0 >= 0x3e8)
        return (_0x1b81b0 / 0x3e8)['toFixed'](0x1) + 'K';
    return _0x1b81b0;
};
const formatNumberDecimal = _0x1ee6da => {
    return _0x1ee6da['toLocaleString']('pt-BR');
};
const {convertWhatsAppUser} = require('./database/users/senderlid.js');
const identArroba = _0x151e86 => {
    if (_0x151e86['includes']('@')) {
        tamanho = _0x151e86['split']('@')[0x1]['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '');
        nmr = tamanho + (tamanho['length'] > 0xd ? '@lid' : '@s.whatsapp.net');
        return convertWhatsAppUser(nmr);
    } else
        return _0x151e86['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '') + '@s.whatsapp.net';
};
function extractStateFromDDD(_0x454946) {
    const _0x29b33e = {
        '11': 'São\x20Paulo\x20(SP)',
        '12': 'São\x20Paulo\x20(SP)',
        '13': 'São\x20Paulo\x20(SP)',
        '14': 'São\x20Paulo\x20(SP)',
        '15': 'São\x20Paulo\x20(SP)',
        '16': 'São\x20Paulo\x20(SP)',
        '17': 'São\x20Paulo\x20(SP)',
        '18': 'São\x20Paulo\x20(SP)',
        '19': 'São\x20Paulo\x20(SP)',
        '21': 'Rio\x20de\x20Janeiro\x20(RJ)',
        '22': 'Rio\x20de\x20Janeiro\x20(RJ)',
        '24': 'Rio\x20de\x20Janeiro\x20(RJ)',
        '27': 'Espírito\x20Santo\x20(ES)',
        '28': 'Espírito\x20Santo\x20(ES)',
        '31': 'Minas\x20Gerais\x20(MG)',
        '32': 'Minas\x20Gerais\x20(MG)',
        '33': 'Minas\x20Gerais\x20(MG)',
        '34': 'Minas\x20Gerais\x20(MG)',
        '35': 'Minas\x20Gerais\x20(MG)',
        '37': 'Minas\x20Gerais\x20(MG)',
        '38': 'Minas\x20Gerais\x20(MG)',
        '41': 'Paraná\x20(PR)',
        '42': 'Paraná\x20(PR)',
        '43': 'Paraná\x20(PR)',
        '44': 'Paraná\x20(PR)',
        '45': 'Paraná\x20(PR)',
        '46': 'Paraná\x20(PR)',
        '47': 'Santa\x20Catarina\x20(SC)',
        '48': 'Santa\x20Catarina\x20(SC)',
        '49': 'Santa\x20Catarina\x20(SC)',
        '51': 'Rio\x20Grande\x20do\x20Sul\x20(RS)',
        '53': 'Rio\x20Grande\x20do\x20Sul\x20(RS)',
        '54': 'Rio\x20Grande\x20do\x20Sul\x20(RS)',
        '55': 'Rio\x20Grande\x20do\x20Sul\x20(RS)',
        '61': 'Distrito\x20Federal\x20(DF)',
        '62': 'Goiás\x20(GO)',
        '63': 'Tocantins\x20(TO)',
        '64': 'Goiás\x20(GO)',
        '65': 'Mato\x20Grosso\x20(MT)',
        '66': 'Mato\x20Grosso\x20(MT)',
        '67': 'Mato\x20Grosso\x20do\x20Sul\x20(MS)',
        '68': 'Acre\x20(AC)',
        '69': 'Rondônia\x20(RO)',
        '71': 'Bahia\x20(BA)',
        '73': 'Bahia\x20(BA)',
        '74': 'Bahia\x20(BA)',
        '75': 'Bahia\x20(BA)',
        '77': 'Bahia\x20(BA)',
        '79': 'Sergipe\x20(SE)',
        '81': 'Pernambuco\x20(PE)',
        '82': 'Alagoas\x20(AL)',
        '83': 'Paraíba\x20(PB)',
        '84': 'Rio\x20Grande\x20do\x20Norte\x20(RN)',
        '85': 'Ceará\x20(CE)',
        '86': 'Piauí\x20(PI)',
        '87': 'Pernambuco\x20(PE)',
        '88': 'Ceará\x20(CE)',
        '89': 'Piauí\x20(PI)',
        '91': 'Pará\x20(PA)',
        '93': 'Pará\x20(PA)',
        '94': 'Pará\x20(PA)',
        '95': 'Roraima\x20(RR)',
        '96': 'Amapá\x20(AP)',
        '97': 'Amazonas\x20(AM)',
        '98': 'Maranhão\x20(MA)',
        '99': 'Maranhão\x20(MA)'
    };
    return _0x29b33e[_0x454946] || '';
}
const rmLetras = _0x3f5f98 => {
    return _0x3f5f98['toLowerCase']()['normalize']('NFD')['replace'](/[\u0300-\u036f]/g, '');
};
module['exports'] = {
    'rmLetras': rmLetras,
    'extractStateFromDDD': extractStateFromDDD,
    'awaitMessage': awaitMessage,
    'P': P,
    'fs': fs,
    'util': util,
    'Boom': Boom,
    'axios': axios,
    'linkfy': linkfy,
    'request': request,
    'ms': ms,
    'ffmpeg': ffmpeg,
    'fetch': fetch,
    'exec': exec,
    'execSync': execSync,
    'moment': moment,
    'time': time,
    'hora': hora,
    'date': date,
    'os': os,
    'getBuffer': getBuffer,
    'convertSticker': convertSticker,
    'fetchJson': fetchJson,
    'writeExifImg': writeExifImg,
    'upload': upload,
    'nit': nit,
    'validmove': validmove,
    'setGame': setGame,
    'addComandosId': addComandosId,
    'deleteComandos': deleteComandos,
    'getComandoBlock': getComandoBlock,
    'getComandos': getComandos,
    'addComandos': addComandos,
    'palavrasANA': palavrasANA,
    'quizanimais': quizanimais,
    'supre': supre,
    'getExtension': getExtension,
    'getRandom': getRandom,
    'banner2': banner2,
    'banner3': banner3,
    'chyt': chyt,
    'anotar': anotar,
    'countMessage': countMessage,
    'comandos': comandos,
    'muted': muted,
    'infoLog': infoLog,
    'successLog': successLog,
    'errorLog': errorLog,
    'warningLog': warningLog,
    'sendlistbuttons': sendlistbuttons,
    'EnvButton': EnvButton,
    'sendListB': sendListB,
    'sendSingleWithListAndButtons': sendSingleWithListAndButtons,
    'figname': figname,
    'revealmsg': revealmsg,
    'RemoverFundo': RemoverFundo,
    'versão': versão,
    'nescessario': nescessario,
    'premium': premium,
    'ban': ban,
    'joguinhodavelhajs': joguinhodavelhajs,
    'joguinhodavelhajs2': joguinhodavelhajs2,
    'logoslink': logoslink,
    'linguagem': linguagem,
    'getInfo': getInfo,
    'mess': mess,
    'destrava': destrava,
    'destrava2': destrava2,
    'tabela': tabela,
    'colors': colors,
    'color': color,
    'cheerio': cheerio,
    'NodeCache': NodeCache,
    'kyun': kyun,
    'TimeCount': TimeCount,
    'sendVideoAsSticker': sendVideoAsSticker,
    'sendImageAsSticker': sendImageAsSticker,
    'sendVideoAsSticker2': sendVideoAsSticker2,
    'sendImageAsSticker2': sendImageAsSticker2,
    'sendPoll': sendPoll,
    'getFileBuffer': getFileBuffer,
    'DLT_FL': DLT_FL,
    'sleep': sleep,
    'ANT_LTR_MD_EMJ': ANT_LTR_MD_EMJ,
    'arcloud': arcloud,
    'garticArchives': garticArchives,
    'enigmaArchive': enigmaArchive,
    'psycatgames': psycatgames,
    'vyroEngine': vyroEngine,
    'whatMusicAr': whatMusicAr,
    'quizFutebol': quizFutebol,
    'obeso': obeso,
    'countDays': countDays,
    'timeDate': timeDate,
    'Limit_CMD': Limit_CMD,
    'capitalizeFirstLetter': capitalizeFirstLetter,
    'formatNumber': formatNumber,
    'setting': setting,
    'formatNumberDecimal': formatNumberDecimal,
    'shuffle': shuffle,
    'packname': packname,
    'advices': advices,
    'tools': tools,
    'links': links,
    'saveJSON': saveJSON,
    'sendHours': sendHours,
    'converterMin': converterMin,
    'contarMin': contarMin,
    'isJsonIncludes': isJsonIncludes,
    'contarDias': contarDias,
    'identArroba': identArroba,
    'obrigadoEXT': obrigadoEXT,
    'alerandom': alerandom,
    'randomLetra': randomLetra,
    'sendFutureTime': sendFutureTime,
    'contar': contar,
    'addNumberMais': addNumberMais,
    'linksimg': linksimg,
    'rgtake': rgtake,
    'webp_mp4': webp_mp4,
    'catbox': catbox,
    'getInviteCode': getInviteCode,
    'simih': simih,
    'allvaluerent': allvaluerent,
    'prepareWAMessageMedia': prepareWAMessageMedia,
    'okarunsite': okarunsite,
    'direitos': direitos,
    'si': si,
    'EfiPayPayment': EfiPayPayment,
    'saveJsonAsync': saveJsonAsync,
    'getJsonCached': getJsonCached
};
