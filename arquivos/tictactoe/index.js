const fs = require('fs');
const path = require('path');
const apikeys = require('../../configs/apikeys.json');
const {apis = {}, sites = {}, groups = {}} = apikeys;
const {okarunsite} = sites;
const {API_KEY_WAGURI, API_KEY_OKARUN} = apis;
function buildBoardImageUrl(_0x25999e) {
    const _0x3519af = JSON['stringify'](_0x25999e['_matrix']);
    const _0x924759 = new URLSearchParams({
        'apikey': API_KEY_WAGURI,
        'board': _0x3519af,
        'turn': _0x25999e['turn'],
        'isWin': String(_0x25999e['isWin']),
        'winner': _0x25999e['winner'] || ''
    });
    return okarunsite + '/api/canvas/jogodavelha?' + _0x924759['toString']();
}
const DB_PATH = './arquivos/tictactoe/db/';
if (!fs['existsSync'](DB_PATH))
    fs['mkdirSync'](DB_PATH, { 'recursive': !![] });
function defineSave(_0xd5ef39, _0x30e4fb) {
    const _0x4bdd89 = path['join'](DB_PATH, _0x30e4fb + '.json');
    fs['writeFileSync'](_0x4bdd89, JSON['stringify'](_0xd5ef39, null, 0x2));
}
function setGame(_0x2dcde5) {
    const _0x3e2e23 = path['join'](DB_PATH, _0x2dcde5 + '.json');
    if (!fs['existsSync'](_0x3e2e23)) {
        const _0x7029d9 = [
            [
                '1️⃣',
                '2️⃣',
                '3️⃣'
            ],
            [
                '4️⃣',
                '5️⃣',
                '6️⃣'
            ],
            [
                '7️⃣',
                '8️⃣',
                '9️⃣'
            ]
        ];
        const _0x65fb1 = {
            'status': !![],
            'session': _0x2dcde5,
            'turn': 'X',
            'X': null,
            'O': null,
            'isWin': ![],
            'winner': null,
            'nine_push': [],
            '_matrix': _0x7029d9
        };
        defineSave(_0x65fb1, _0x2dcde5);
        return _0x65fb1;
    } else {
        try {
            return JSON['parse'](fs['readFileSync'](_0x3e2e23, 'utf-8'));
        } catch {
            return null;
        }
    }
}
function checkWinner(_0x340583) {
    for (let _0x1b1060 = 0x0; _0x1b1060 < 0x3; _0x1b1060++) {
        if (_0x340583[_0x1b1060][0x0] === _0x340583[_0x1b1060][0x1] && _0x340583[_0x1b1060][0x1] === _0x340583[_0x1b1060][0x2])
            return _0x340583[_0x1b1060][0x0];
        if (_0x340583[0x0][_0x1b1060] === _0x340583[0x1][_0x1b1060] && _0x340583[0x1][_0x1b1060] === _0x340583[0x2][_0x1b1060])
            return _0x340583[0x0][_0x1b1060];
    }
    if (_0x340583[0x0][0x0] === _0x340583[0x1][0x1] && _0x340583[0x1][0x1] === _0x340583[0x2][0x2])
        return _0x340583[0x0][0x0];
    if (_0x340583[0x0][0x2] === _0x340583[0x1][0x1] && _0x340583[0x1][0x1] === _0x340583[0x2][0x0])
        return _0x340583[0x1][0x1];
    return ![];
}
function move(_0x249610, _0x2ad3d2, _0x281121) {
    const _0x2f9f3c = setGame(_0x281121);
    if (!_0x2f9f3c)
        return {
            'status': ![],
            'message': 'Erro\x20ao\x20carregar\x20sessão.'
        };
    if (_0x2f9f3c['isWin']) {
        return {
            'status': ![],
            'message': 'O\x20jogo\x20já\x20foi\x20finalizado.'
        };
    }
    const _0x22e0f3 = _0x2f9f3c['_matrix'][_0x249610][_0x2ad3d2];
    if (_0x22e0f3 === '❌' || _0x22e0f3 === '⭕') {
        return {
            'status': ![],
            'message': 'Posição\x20já\x20ocupada\x20por\x20' + _0x22e0f3
        };
    }
    const _0x20ff03 = _0x2f9f3c['turn'] === 'X' ? '❌' : '⭕';
    _0x2f9f3c['_matrix'][_0x249610][_0x2ad3d2] = _0x20ff03;
    _0x2f9f3c['nine_push']['push'](_0x20ff03);
    const _0x530d60 = checkWinner(_0x2f9f3c['_matrix']);
    if (_0x530d60 === '❌' || _0x530d60 === '⭕') {
        _0x2f9f3c['isWin'] = !![];
        _0x2f9f3c['winner'] = _0x530d60 === '❌' ? 'X' : 'O';
    } else if (_0x2f9f3c['nine_push']['length'] >= 0x9) {
        _0x2f9f3c['isWin'] = !![];
        _0x2f9f3c['winner'] = 'SERI';
    } else {
        _0x2f9f3c['turn'] = _0x2f9f3c['turn'] === 'X' ? 'O' : 'X';
    }
    defineSave(_0x2f9f3c, _0x281121);
    return _0x2f9f3c;
}
function validmove(_0x94fab4, _0x44a7c6) {
    const _0x3a3ad2 = Number(_0x94fab4);
    if (isNaN(_0x3a3ad2) || _0x3a3ad2 < 0x1 || _0x3a3ad2 > 0x9)
        return ![];
    const _0x334bdc = {
        0x1: [
            0x0,
            0x0
        ],
        0x2: [
            0x0,
            0x1
        ],
        0x3: [
            0x0,
            0x2
        ],
        0x4: [
            0x1,
            0x0
        ],
        0x5: [
            0x1,
            0x1
        ],
        0x6: [
            0x1,
            0x2
        ],
        0x7: [
            0x2,
            0x0
        ],
        0x8: [
            0x2,
            0x1
        ],
        0x9: [
            0x2,
            0x2
        ]
    };
    const [_0x33f0cf, _0x9c18a0] = _0x334bdc[_0x3a3ad2];
    return move(_0x33f0cf, _0x9c18a0, _0x44a7c6);
}
module['exports'] = {
    'setGame': setGame,
    'validmove': validmove,
    'buildBoardImageUrl': buildBoardImageUrl,
    'delGame': _0x15426c => {
        const _0xa025e9 = path['join'](DB_PATH, _0x15426c + '.json');
        if (fs['existsSync'](_0xa025e9))
            fs['unlinkSync'](_0xa025e9);
    }
};
