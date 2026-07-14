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
const fetch = (..._0x5e788c) => import('node-fetch')['then'](({default: _0x54b046}) => _0x54b046(..._0x5e788c));
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
function DLT_FL(_0x5d0e19) {
    try {
        fs['unlinkSync'](_0x5d0e19);
    } catch (_0x3a24fc) {
    }
}
if (!nescessario['botoes_']) {
    var EnvBotao = async (_0x43ff0d, _0x3d9368, _0x4ecc9e, _0x380ad0, _0x2be300, _0x167821) => {
        if (_0x167821['split']('|')[0x1] != '0') {
            _0x4ecc9e['sendMessage'](_0x43ff0d, {
                'image': { 'url': _0x167821['split']('|')[0x1] },
                'caption': _0x380ad0,
                'mentions': [_0x3d9368]
            });
        } else {
            _0x4ecc9e['sendMessage'](_0x43ff0d, {
                'text': _0x380ad0,
                'mentions': [_0x3d9368]
            });
        }
    };
} else {
    var EnvBotao = async (_0x32b691, _0x41cc92, _0x5e3156, _0x21a907, _0x5724e0, _0x385ccd, _0x145971 = [], _0x40bb2d) => {
        var _0x49a956 = _0x385ccd['split']('|')[0x0]['charAt'](0x0);
        var _0x782943 = _0x49a956 == '1' ? [{
                'buttonId': _0x145971[0x0],
                'buttonText': { 'displayText': _0x145971[0x1] },
                'type': 0x1
            }] : _0x49a956 == '2' ? [
            {
                'buttonId': _0x145971[0x0],
                'buttonText': { 'displayText': _0x145971[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0x145971[0x2],
                'buttonText': { 'displayText': _0x145971[0x3] },
                'type': 0x1
            }
        ] : _0x49a956 == '3' ? [
            {
                'buttonId': _0x145971[0x0],
                'buttonText': { 'displayText': _0x145971[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0x145971[0x2],
                'buttonText': { 'displayText': _0x145971[0x3] },
                'type': 0x1
            },
            {
                'buttonId': _0x145971[0x4],
                'buttonText': { 'displayText': _0x145971[0x5] },
                'type': 0x1
            }
        ] : '';
        if (_0x385ccd['split']('|')[0x1] == '0' && !_0x385ccd['split']('|')[0x0]['includes']('v')) {
            var _0x555e0e = {
                'text': _0x21a907,
                'footer': _0x5724e0,
                'buttons': _0x782943,
                'headerType': 0x1,
                'mentions': [_0x41cc92]
            };
        } else if (_0x385ccd['split']('|')[0x1] != '0' && !_0x385ccd['split']('|')[0x0]['includes']('v')) {
            var _0x555e0e = {
                'image': { 'url': _0x385ccd['split']('|')[0x1] },
                'caption': _0x21a907,
                'footer': _0x5724e0,
                'buttons': _0x782943,
                'headerType': 0x1,
                'mentions': [_0x41cc92]
            };
        } else if (_0x385ccd['split']('|')[0x1] != '0' && _0x385ccd['split']('|')[0x0]['includes']('v')) {
            var _0x555e0e = {
                'video': { 'url': _0x385ccd['split']('|')[0x1] },
                'caption': _0x21a907,
                'footer': _0x5724e0,
                'buttons': _0x782943,
                'headerType': 0x1,
                'mentions': [ME]
            };
        }
        _0x5e3156['sendMessage'](_0x32b691, _0x555e0e, { 'quoted': _0x40bb2d })['catch'](_0x98e5ce => {
            return console['log']('Erro\x20no\x20botão,\x20Tente\x20novamente\x20ou\x20avalie\x20o\x20que\x20pode\x20está\x20errando..\x20' + _0x98e5ce);
        });
    };
}
const contar = (_0x3b7093, _0x583812) => {
    total = 0x0;
    for (i = 0x0; i < _0x3b7093['length']; i++) {
        if (_0x583812 == _0x3b7093[i])
            total += 0x1;
    }
    return total;
};
const contarDias = _0x133f76 => {
    if (!_0x133f76['includes']('/'))
        return 'Tem\x20que\x20colocar\x20em\x20/,\x20ex:\x2001/01/2024';
    barra = 0x0;
    for (i of _0x133f76) {
        if (i == '/')
            barra += 0x1;
    }
    if (barra <= 0x0 || barra > 0x2)
        return 'Revise\x20o\x20formato\x20da\x20data\x20pfvr...\x20Receio\x20que\x20você\x20não\x20tenha\x20colocado\x20o\x20formato\x20correto\x20DD/MM/YYYY';
    var [_0x35ec5a, _0x1570ee, _0x42819b] = _0x133f76['split']('/');
    year = _0x42819b['length'] == 0x2 ? '20' + _0x42819b : _0x42819b;
    if (Number(_0x35ec5a) < 0x1 || Number(_0x35ec5a) > 0x1f)
        return 'Os\x20dias\x20vão\x20de\x201\x20até\x20no\x20mxm\x2031';
    if (Number(_0x1570ee) < 0x1 || Number(_0x1570ee) > 0xc)
        return 'Os\x20meses\x20vão\x20de\x201\x20até\x20no\x20mxm\x2012';
    if (Number(year) < 0x1 || Number(_0x35ec5a) > 0x5f5e100)
        return 'Os\x20anos\x20vão\x20de\x201\x20até\x20no\x20mxm\x20100000000';
    day = Number(year) * 0x16d;
    day += Number(_0x1570ee) * 0x1e;
    day += Number(_0x35ec5a);
    return day;
};
const getInviteCode = _0x483c0f => {
    if (_0x483c0f['includes']('chat.whatsapp.com/')) {
        return {
            'type': 'group',
            'code': _0x483c0f['split']('chat.whatsapp.com/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    if (_0x483c0f['includes']('whatsapp.com/channel/')) {
        return {
            'type': 'channel',
            'code': _0x483c0f['split']('whatsapp.com/channel/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    return null;
};
const sendFutureTime = _0x39a252 => {
    hr = moment['tz']('America/Sao_Paulo');
    for (i of _0x39a252) {
        hr = hr['add'](i['valor'], i['type']);
    }
    return hr['calendar']();
};
const contarMin = _0x5a814f => {
    if (contar(String(_0x5a814f), ':') != 0x1)
        return 'É\x20necessário\x20o\x20uso\x20dos\x20:\x20no\x20horário,\x20seguindo\x20apenas\x20horas\x20e\x20minutos';
    var [_0x30fc0e, _0x522f60] = _0x5a814f['split'](':');
    return Number(Number(_0x30fc0e) * 0x3c) + Number(_0x522f60);
};
const isJsonIncludes = (_0x12dd6f, _0x246ef4) => {
    if (JSON['stringify'](_0x12dd6f)['includes'](_0x246ef4))
        return !![];
    return ![];
};
const converterMin = _0x801668 => {
    if (Number(_0x801668) === 0x0)
        return '00:00';
    if (!Number(_0x801668))
        return 'Precisa\x20ser\x20um\x20número';
    nmr = Number(_0x801668);
    b = nmr % 0x3c;
    a = (nmr - b) / 0x3c;
    return (a < 0xa ? '0' + a : a) + ':' + (b < 0xa ? '0' + b : b);
};
function saveJSON(_0x26bdf3, _0x1ac625) {
    fs['writeFileSync'](_0x1ac625, JSON['stringify'](_0x26bdf3, null, 0x2));
}
const {sendlistbuttons, EnvButton, sendListB, sendSingleWithListAndButtons} = require('./arquivos/funcoes/botoes.js');
function ANT_LTR_MD_EMJ(_0x5f3475) {
    for (let _0x31179b = 0x0, _0x1fc985 = _0x5f3475['length']; _0x31179b < _0x1fc985; _0x31179b++) {
        if (_0x5f3475['charCodeAt'](_0x31179b) > 0xff) {
            return !![];
        }
    }
    return ![];
}
function kyun(_0x4dc7e1) {
    function _0x38197d(_0x24619a) {
        return (_0x24619a < 0xa ? '0' : '') + _0x24619a;
    }
    ;
    var _0x2b3bcf = Math['floor'](_0x4dc7e1 / (0x3c * 0x3c) % 0x18);
    var _0xf887b8 = Math['floor'](_0x4dc7e1 % (0x3c * 0x3c) / 0x3c);
    var _0x3296c7 = Math['floor'](_0x4dc7e1 % 0x3c);
    return _0x38197d(_0x2b3bcf) + '\x20horas,\x20' + _0x38197d(_0xf887b8) + '\x20minutos\x20e\x20' + _0x38197d(_0x3296c7) + '\x20segundos.';
}
function TimeCount(_0x27f827) {
    function _0x12df24(_0x209712) {
        return (_0x209712 < 0xa ? '0' : '') + _0x209712;
    }
    ;
    var _0x157f6f = Math['floor'](_0x27f827 / (0x3c * 0x3c) / 0x18);
    var _0x47fe96 = Math['floor'](_0x27f827 / (0x3c * 0x3c) % 0x18);
    var _0x51b3e3 = Math['floor'](_0x27f827 % (0x3c * 0x3c) / 0x3c);
    var _0x3bf6b9 = Math['floor'](_0x27f827 % 0x3c);
    return _0x12df24(_0x157f6f) + '\x20dia(s),\x20' + _0x12df24(_0x47fe96) + '\x20hora(s),\x20' + _0x12df24(_0x51b3e3) + '\x20minuto(s)\x20e\x20' + _0x12df24(_0x3bf6b9) + '\x20segundo(s).';
}
const addNumberMais = _0x5d75f4 => {
    usu = (_0x5d75f4['includes']('@s.whatsapp.net') ? _0x5d75f4 : identArroba(_0x5d75f4))['split']('@')[0x0];
    return '+' + usu['slice'](0x0, 0x2) + '\x20' + usu['slice'](0x2, 0x4) + '\x20' + usu['slice'](0x4, usu['length'] - 0x4) + '-' + usu['slice'](usu['length'] - 0x4, usu['length']);
};
const sendHours = _0x2c423a => {
    moment['locale']('pt');
    return moment['tz']('America/Sao_Paulo')['format'](_0x2c423a);
};
const shuffle = _0xba027e => {
    palavra = _0xba027e + '\x20';
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
async function getJsonCached(_0x1d9299) {
    if (globalCache['has'](_0x1d9299))
        return globalCache['get'](_0x1d9299);
    try {
        if (!fs['existsSync'](_0x1d9299))
            return null;
        const _0x25ed06 = JSON['parse'](await fsPromises['readFile'](_0x1d9299, 'utf8'));
        globalCache['set'](_0x1d9299, _0x25ed06);
        return _0x25ed06;
    } catch (_0x8de9ba) {
        console['error']('Erro\x20ao\x20ler\x20cache\x20de\x20' + _0x1d9299 + ':', _0x8de9ba);
        return null;
    }
}
async function saveJsonAsync(_0x10f88b, _0x1b36f6) {
    try {
        globalCache['set'](_0x10f88b, _0x1b36f6);
        await fsPromises['writeFile'](_0x10f88b, JSON['stringify'](_0x1b36f6, null, 0x2));
    } catch (_0x535763) {
        console['error']('Erro\x20ao\x20salvar\x20' + _0x10f88b + ':', _0x535763);
    }
}
const getFileBuffer = async (_0x534fcb, _0xb98412) => {
    const _0x3a6f64 = await downloadContentFromMessage(_0x534fcb, _0xb98412);
    let _0x8b5fa6 = Buffer['from']([]);
    for await (const _0xf9f867 of _0x3a6f64) {
        _0x8b5fa6 = Buffer['concat']([
            _0x8b5fa6,
            _0xf9f867
        ]);
    }
    return _0x8b5fa6;
};
const sleep = async _0x13c0b6 => {
    return new Promise(_0x3e9c02 => setTimeout(_0x3e9c02, _0x13c0b6));
};
const sendPoll = (_0x319885, _0x4cabf8, _0x3c6bfb = '', _0x4dc54a = [], _0x37db91 = 0x1) => {
    return _0x319885['sendMessage'](_0x4cabf8, {
        'poll': {
            'name': _0x3c6bfb,
            'values': _0x4dc54a,
            'selectableCount': _0x37db91
        },
        'messageContextInfo': { 'messageSecret': randomBytes(0x20) }
    }, {
        'id': _0x4cabf8,
        'options': { 'userJid': _0x319885?.['user']?.['id'] }
    })['catch'](() => {
        return console['log'](console['error']);
    });
};
const simih = async _0x27cf53 => {
    try {
        const _0x55342f = 'https://okarun-api.com.br/ia/simih?query=' + encodeURIComponent(_0x27cf53);
        const _0xeffabc = await fetchJson(_0x55342f);
        if (_0xeffabc?.['resultado']?.['trim']?.())
            return { 'resposta': _0xeffabc['resultado']['trim']() };
        return { 'resposta': '🤖💩\x20Não\x20sei\x20responder\x20isso\x20kkkkk' };
    } catch (_0x5216a3) {
        return { 'resposta': '🤖💩\x20Buguei\x20todo\x20aqui\x20kkkkk' };
    }
};
function obeso(_0x8cbf56, _0x555f8e) {
    return Number(parseFloat(_0x8cbf56) / parseFloat(_0x555f8e) ** 0x2)['toFixed'](0x2);
}
function capitalizeFirstLetter(_0x25a853) {
    return _0x25a853['charAt'](0x0)['toUpperCase']() + _0x25a853['substring'](0x1);
}
const countDays = (_0x1632c3, _0x20d1ab) => {
    if (!(_0x1632c3 || _0x20d1ab))
        return 0x0;
    _0x1632c3 = new Date(_0x1632c3[0x1] + '/' + _0x1632c3[0x0] + '/' + _0x1632c3[0x2]);
    _0x20d1ab = new Date(_0x20d1ab[0x1] + '/' + _0x20d1ab[0x0] + '/' + _0x20d1ab[0x2]);
    const _0x3dbba0 = Math['abs'](_0x20d1ab['getTime']() - _0x1632c3['getTime']());
    const _0x1473cd = Math['ceil'](_0x3dbba0 / (0x3e8 * 0xe10 * 0x18));
    return _0x1473cd || 0x0;
};
const timeDate = (_0x33fc89, _0x368847, _0x5ce09e = !![]) => {
    if (Number(_0x368847) && _0x5ce09e)
        return moment(_0x368847 * 0x3e8)['tz']('America/Sao_Paulo')['format'](_0x33fc89);
    if (Number(_0x368847))
        return moment(_0x368847)['tz']('America/Sao_Paulo')['format'](_0x33fc89);
    return moment['tz']('America/Sao_Paulo')['format'](_0x33fc89);
};
const alerandom = _0x1c3546 => {
    return Math['floor'](Math['random']() * _0x1c3546);
};
var letras = 'abcdefghijklmnopqrstuvwxyz';
const randomLetra = () => letras[alerandom(letras['length'])]['toUpperCase']();
const formatNumber = _0x4b1e61 => {
    if (_0x4b1e61 >= 0x3b9aca00)
        return (_0x4b1e61 / 0x3b9aca00)['toFixed'](0x1) + 'B';
    if (_0x4b1e61 >= 0xf4240)
        return (_0x4b1e61 / 0xf4240)['toFixed'](0x1) + 'M';
    if (_0x4b1e61 >= 0x186a0)
        return (_0x4b1e61 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x4b1e61 >= 0x2710)
        return (_0x4b1e61 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x4b1e61 >= 0x3e8)
        return (_0x4b1e61 / 0x3e8)['toFixed'](0x1) + 'K';
    return _0x4b1e61;
};
const formatNumberDecimal = _0x5d4f91 => {
    return _0x5d4f91['toLocaleString']('pt-BR');
};
const {convertWhatsAppUser} = require('./database/users/senderlid.js');
const identArroba = _0x128ccd => {
    if (_0x128ccd['includes']('@')) {
        tamanho = _0x128ccd['split']('@')[0x1]['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '');
        nmr = tamanho + (tamanho['length'] > 0xd ? '@lid' : '@s.whatsapp.net');
        return convertWhatsAppUser(nmr);
    } else
        return _0x128ccd['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '') + '@s.whatsapp.net';
};
function extractStateFromDDD(_0x50c34e) {
    const _0x374a95 = {
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
    return _0x374a95[_0x50c34e] || '';
}
const rmLetras = _0x550297 => {
    return _0x550297['toLowerCase']()['normalize']('NFD')['replace'](/[\u0300-\u036f]/g, '');
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
