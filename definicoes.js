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
const fetch = (..._0x364774) => import('node-fetch')['then'](({default: _0x1479c7}) => _0x1479c7(..._0x364774));
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
function DLT_FL(_0x2beb78) {
    try {
        fs['unlinkSync'](_0x2beb78);
    } catch (_0x471d30) {
    }
}
if (!nescessario['botoes_']) {
    var EnvBotao = async (_0x2949da, _0xbec105, _0x28913f, _0xfce08a, _0x48c0b8, _0x1bf0d2) => {
        if (_0x1bf0d2['split']('|')[0x1] != '0') {
            _0x28913f['sendMessage'](_0x2949da, {
                'image': { 'url': _0x1bf0d2['split']('|')[0x1] },
                'caption': _0xfce08a,
                'mentions': [_0xbec105]
            });
        } else {
            _0x28913f['sendMessage'](_0x2949da, {
                'text': _0xfce08a,
                'mentions': [_0xbec105]
            });
        }
    };
} else {
    var EnvBotao = async (_0x33fb22, _0x5068bf, _0x3c05ff, _0x49cd3e, _0x41bba1, _0x2628b5, _0x43880c = [], _0x20894b) => {
        var _0x49884c = _0x2628b5['split']('|')[0x0]['charAt'](0x0);
        var _0x53dd7b = _0x49884c == '1' ? [{
                'buttonId': _0x43880c[0x0],
                'buttonText': { 'displayText': _0x43880c[0x1] },
                'type': 0x1
            }] : _0x49884c == '2' ? [
            {
                'buttonId': _0x43880c[0x0],
                'buttonText': { 'displayText': _0x43880c[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0x43880c[0x2],
                'buttonText': { 'displayText': _0x43880c[0x3] },
                'type': 0x1
            }
        ] : _0x49884c == '3' ? [
            {
                'buttonId': _0x43880c[0x0],
                'buttonText': { 'displayText': _0x43880c[0x1] },
                'type': 0x1
            },
            {
                'buttonId': _0x43880c[0x2],
                'buttonText': { 'displayText': _0x43880c[0x3] },
                'type': 0x1
            },
            {
                'buttonId': _0x43880c[0x4],
                'buttonText': { 'displayText': _0x43880c[0x5] },
                'type': 0x1
            }
        ] : '';
        if (_0x2628b5['split']('|')[0x1] == '0' && !_0x2628b5['split']('|')[0x0]['includes']('v')) {
            var _0x5a6974 = {
                'text': _0x49cd3e,
                'footer': _0x41bba1,
                'buttons': _0x53dd7b,
                'headerType': 0x1,
                'mentions': [_0x5068bf]
            };
        } else if (_0x2628b5['split']('|')[0x1] != '0' && !_0x2628b5['split']('|')[0x0]['includes']('v')) {
            var _0x5a6974 = {
                'image': { 'url': _0x2628b5['split']('|')[0x1] },
                'caption': _0x49cd3e,
                'footer': _0x41bba1,
                'buttons': _0x53dd7b,
                'headerType': 0x1,
                'mentions': [_0x5068bf]
            };
        } else if (_0x2628b5['split']('|')[0x1] != '0' && _0x2628b5['split']('|')[0x0]['includes']('v')) {
            var _0x5a6974 = {
                'video': { 'url': _0x2628b5['split']('|')[0x1] },
                'caption': _0x49cd3e,
                'footer': _0x41bba1,
                'buttons': _0x53dd7b,
                'headerType': 0x1,
                'mentions': [ME]
            };
        }
        _0x3c05ff['sendMessage'](_0x33fb22, _0x5a6974, { 'quoted': _0x20894b })['catch'](_0x1c9764 => {
            return console['log']('Erro\x20no\x20botão,\x20Tente\x20novamente\x20ou\x20avalie\x20o\x20que\x20pode\x20está\x20errando..\x20' + _0x1c9764);
        });
    };
}
const contar = (_0x71a782, _0x5371b3) => {
    total = 0x0;
    for (i = 0x0; i < _0x71a782['length']; i++) {
        if (_0x5371b3 == _0x71a782[i])
            total += 0x1;
    }
    return total;
};
const contarDias = _0x475cb9 => {
    if (!_0x475cb9['includes']('/'))
        return 'Tem\x20que\x20colocar\x20em\x20/,\x20ex:\x2001/01/2024';
    barra = 0x0;
    for (i of _0x475cb9) {
        if (i == '/')
            barra += 0x1;
    }
    if (barra <= 0x0 || barra > 0x2)
        return 'Revise\x20o\x20formato\x20da\x20data\x20pfvr...\x20Receio\x20que\x20você\x20não\x20tenha\x20colocado\x20o\x20formato\x20correto\x20DD/MM/YYYY';
    var [_0x4a9499, _0x229b8c, _0xdee90f] = _0x475cb9['split']('/');
    year = _0xdee90f['length'] == 0x2 ? '20' + _0xdee90f : _0xdee90f;
    if (Number(_0x4a9499) < 0x1 || Number(_0x4a9499) > 0x1f)
        return 'Os\x20dias\x20vão\x20de\x201\x20até\x20no\x20mxm\x2031';
    if (Number(_0x229b8c) < 0x1 || Number(_0x229b8c) > 0xc)
        return 'Os\x20meses\x20vão\x20de\x201\x20até\x20no\x20mxm\x2012';
    if (Number(year) < 0x1 || Number(_0x4a9499) > 0x5f5e100)
        return 'Os\x20anos\x20vão\x20de\x201\x20até\x20no\x20mxm\x20100000000';
    day = Number(year) * 0x16d;
    day += Number(_0x229b8c) * 0x1e;
    day += Number(_0x4a9499);
    return day;
};
const getInviteCode = _0x156e19 => {
    if (_0x156e19['includes']('chat.whatsapp.com/')) {
        return {
            'type': 'group',
            'code': _0x156e19['split']('chat.whatsapp.com/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    if (_0x156e19['includes']('whatsapp.com/channel/')) {
        return {
            'type': 'channel',
            'code': _0x156e19['split']('whatsapp.com/channel/')[0x1]['split'](/[?&]/)[0x0]
        };
    }
    return null;
};
const sendFutureTime = _0x3be486 => {
    hr = moment['tz']('America/Sao_Paulo');
    for (i of _0x3be486) {
        hr = hr['add'](i['valor'], i['type']);
    }
    return hr['calendar']();
};
const contarMin = _0x15174a => {
    if (contar(String(_0x15174a), ':') != 0x1)
        return 'É\x20necessário\x20o\x20uso\x20dos\x20:\x20no\x20horário,\x20seguindo\x20apenas\x20horas\x20e\x20minutos';
    var [_0x1c8918, _0x472824] = _0x15174a['split'](':');
    return Number(Number(_0x1c8918) * 0x3c) + Number(_0x472824);
};
const isJsonIncludes = (_0x48ba26, _0x7d2c3c) => {
    if (JSON['stringify'](_0x48ba26)['includes'](_0x7d2c3c))
        return !![];
    return ![];
};
const converterMin = _0x98646f => {
    if (Number(_0x98646f) === 0x0)
        return '00:00';
    if (!Number(_0x98646f))
        return 'Precisa\x20ser\x20um\x20número';
    nmr = Number(_0x98646f);
    b = nmr % 0x3c;
    a = (nmr - b) / 0x3c;
    return (a < 0xa ? '0' + a : a) + ':' + (b < 0xa ? '0' + b : b);
};
function saveJSON(_0x5bee80, _0x4aa376) {
    fs['writeFileSync'](_0x4aa376, JSON['stringify'](_0x5bee80, null, 0x2));
}
const {sendlistbuttons, EnvButton, sendListB, sendSingleWithListAndButtons} = require('./arquivos/funcoes/botoes.js');
function ANT_LTR_MD_EMJ(_0x17cce9) {
    for (let _0x6cd959 = 0x0, _0x3cb1df = _0x17cce9['length']; _0x6cd959 < _0x3cb1df; _0x6cd959++) {
        if (_0x17cce9['charCodeAt'](_0x6cd959) > 0xff) {
            return !![];
        }
    }
    return ![];
}
function kyun(_0x5aa813) {
    function _0x348e46(_0x53d730) {
        return (_0x53d730 < 0xa ? '0' : '') + _0x53d730;
    }
    ;
    var _0x2b64c8 = Math['floor'](_0x5aa813 / (0x3c * 0x3c) % 0x18);
    var _0x481caf = Math['floor'](_0x5aa813 % (0x3c * 0x3c) / 0x3c);
    var _0xe975ae = Math['floor'](_0x5aa813 % 0x3c);
    return _0x348e46(_0x2b64c8) + '\x20horas,\x20' + _0x348e46(_0x481caf) + '\x20minutos\x20e\x20' + _0x348e46(_0xe975ae) + '\x20segundos.';
}
function TimeCount(_0x99a5f9) {
    function _0x4a9537(_0x2efb16) {
        return (_0x2efb16 < 0xa ? '0' : '') + _0x2efb16;
    }
    ;
    var _0x168f40 = Math['floor'](_0x99a5f9 / (0x3c * 0x3c) / 0x18);
    var _0x57df3b = Math['floor'](_0x99a5f9 / (0x3c * 0x3c) % 0x18);
    var _0x1427bc = Math['floor'](_0x99a5f9 % (0x3c * 0x3c) / 0x3c);
    var _0x30934c = Math['floor'](_0x99a5f9 % 0x3c);
    return _0x4a9537(_0x168f40) + '\x20dia(s),\x20' + _0x4a9537(_0x57df3b) + '\x20hora(s),\x20' + _0x4a9537(_0x1427bc) + '\x20minuto(s)\x20e\x20' + _0x4a9537(_0x30934c) + '\x20segundo(s).';
}
const addNumberMais = _0x3c4704 => {
    usu = (_0x3c4704['includes']('@s.whatsapp.net') ? _0x3c4704 : identArroba(_0x3c4704))['split']('@')[0x0];
    return '+' + usu['slice'](0x0, 0x2) + '\x20' + usu['slice'](0x2, 0x4) + '\x20' + usu['slice'](0x4, usu['length'] - 0x4) + '-' + usu['slice'](usu['length'] - 0x4, usu['length']);
};
const sendHours = _0x3e52a8 => {
    moment['locale']('pt');
    return moment['tz']('America/Sao_Paulo')['format'](_0x3e52a8);
};
const shuffle = _0x84e894 => {
    palavra = _0x84e894 + '\x20';
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
async function getJsonCached(_0x1fab26) {
    if (globalCache['has'](_0x1fab26))
        return globalCache['get'](_0x1fab26);
    try {
        if (!fs['existsSync'](_0x1fab26))
            return null;
        const _0x374fc1 = JSON['parse'](await fsPromises['readFile'](_0x1fab26, 'utf8'));
        globalCache['set'](_0x1fab26, _0x374fc1);
        return _0x374fc1;
    } catch (_0xb1a131) {
        console['error']('Erro\x20ao\x20ler\x20cache\x20de\x20' + _0x1fab26 + ':', _0xb1a131);
        return null;
    }
}
async function saveJsonAsync(_0x5dc148, _0x2510ec) {
    try {
        globalCache['set'](_0x5dc148, _0x2510ec);
        await fsPromises['writeFile'](_0x5dc148, JSON['stringify'](_0x2510ec, null, 0x2));
    } catch (_0x57fd84) {
        console['error']('Erro\x20ao\x20salvar\x20' + _0x5dc148 + ':', _0x57fd84);
    }
}
const getFileBuffer = async (_0x4f272b, _0x387cf6) => {
    const _0x4cf161 = await downloadContentFromMessage(_0x4f272b, _0x387cf6);
    let _0x4cf30e = Buffer['from']([]);
    for await (const _0x28e71e of _0x4cf161) {
        _0x4cf30e = Buffer['concat']([
            _0x4cf30e,
            _0x28e71e
        ]);
    }
    return _0x4cf30e;
};
const sleep = async _0x227f20 => {
    return new Promise(_0x3c9b6f => setTimeout(_0x3c9b6f, _0x227f20));
};
const sendPoll = (_0x3b54a4, _0x3060f3, _0x22faae = '', _0x1c220e = [], _0x5a383f = 0x1) => {
    return _0x3b54a4['sendMessage'](_0x3060f3, {
        'poll': {
            'name': _0x22faae,
            'values': _0x1c220e,
            'selectableCount': _0x5a383f
        },
        'messageContextInfo': { 'messageSecret': randomBytes(0x20) }
    }, {
        'id': _0x3060f3,
        'options': { 'userJid': _0x3b54a4?.['user']?.['id'] }
    })['catch'](() => {
        return console['log'](console['error']);
    });
};
const simih = async _0x2d5dba => {
    try {
        const _0x4bc7e3 = 'https://okarun-api.com.br/ia/simih?query=' + encodeURIComponent(_0x2d5dba);
        const _0x2bf755 = await fetchJson(_0x4bc7e3);
        if (_0x2bf755?.['resultado']?.['trim']?.())
            return { 'resposta': _0x2bf755['resultado']['trim']() };
        return { 'resposta': '🤖💩\x20Não\x20sei\x20responder\x20isso\x20kkkkk' };
    } catch (_0x46b572) {
        return { 'resposta': '🤖💩\x20Buguei\x20todo\x20aqui\x20kkkkk' };
    }
};
function obeso(_0x2e8749, _0x1044e9) {
    return Number(parseFloat(_0x2e8749) / parseFloat(_0x1044e9) ** 0x2)['toFixed'](0x2);
}
function capitalizeFirstLetter(_0x2cb8bf) {
    return _0x2cb8bf['charAt'](0x0)['toUpperCase']() + _0x2cb8bf['substring'](0x1);
}
const countDays = (_0x29932b, _0x3f309d) => {
    if (!(_0x29932b || _0x3f309d))
        return 0x0;
    _0x29932b = new Date(_0x29932b[0x1] + '/' + _0x29932b[0x0] + '/' + _0x29932b[0x2]);
    _0x3f309d = new Date(_0x3f309d[0x1] + '/' + _0x3f309d[0x0] + '/' + _0x3f309d[0x2]);
    const _0x2838f9 = Math['abs'](_0x3f309d['getTime']() - _0x29932b['getTime']());
    const _0x7feecf = Math['ceil'](_0x2838f9 / (0x3e8 * 0xe10 * 0x18));
    return _0x7feecf || 0x0;
};
const timeDate = (_0x3f69e5, _0x359aa5, _0x372ab7 = !![]) => {
    if (Number(_0x359aa5) && _0x372ab7)
        return moment(_0x359aa5 * 0x3e8)['tz']('America/Sao_Paulo')['format'](_0x3f69e5);
    if (Number(_0x359aa5))
        return moment(_0x359aa5)['tz']('America/Sao_Paulo')['format'](_0x3f69e5);
    return moment['tz']('America/Sao_Paulo')['format'](_0x3f69e5);
};
const alerandom = _0x40e5e5 => {
    return Math['floor'](Math['random']() * _0x40e5e5);
};
var letras = 'abcdefghijklmnopqrstuvwxyz';
const randomLetra = () => letras[alerandom(letras['length'])]['toUpperCase']();
const formatNumber = _0x33a551 => {
    if (_0x33a551 >= 0x3b9aca00)
        return (_0x33a551 / 0x3b9aca00)['toFixed'](0x1) + 'B';
    if (_0x33a551 >= 0xf4240)
        return (_0x33a551 / 0xf4240)['toFixed'](0x1) + 'M';
    if (_0x33a551 >= 0x186a0)
        return (_0x33a551 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x33a551 >= 0x2710)
        return (_0x33a551 / 0x3e8)['toFixed'](0x1) + 'K';
    if (_0x33a551 >= 0x3e8)
        return (_0x33a551 / 0x3e8)['toFixed'](0x1) + 'K';
    return _0x33a551;
};
const formatNumberDecimal = _0x58b872 => {
    return _0x58b872['toLocaleString']('pt-BR');
};
const {convertWhatsAppUser} = require('./database/users/senderlid.js');
const identArroba = _0x1e1022 => {
    if (_0x1e1022['includes']('@')) {
        tamanho = _0x1e1022['split']('@')[0x1]['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '');
        nmr = tamanho + (tamanho['length'] > 0xd ? '@lid' : '@s.whatsapp.net');
        return convertWhatsAppUser(nmr);
    } else
        return _0x1e1022['replace'](new RegExp('[()+-/\x20+/]', 'gi'), '') + '@s.whatsapp.net';
};
function extractStateFromDDD(_0x4e0661) {
    const _0x1198b0 = {
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
    return _0x1198b0[_0x4e0661] || '';
}
const rmLetras = _0x3ddc6a => {
    return _0x3ddc6a['toLowerCase']()['normalize']('NFD')['replace'](/[\u0300-\u036f]/g, '');
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
