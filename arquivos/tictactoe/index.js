const fs = require('fs');
const path = require('path');
const apikeys = require('../../configs/apikeys.json');
const {apis = {}, sites = {}, groups = {}} = apikeys;
const {okarunsite} = sites;
const {API_KEY_WAGURI, API_KEY_OKARUN} = apis;
function buildBoardImageUrl(_0x3aab4e) {
    const _0x2cb0a6 = JSON['stringify'](_0x3aab4e['_matrix']);
    const _0x36a588 = new URLSearchParams({
        'apikey': API_KEY_WAGURI,
        'board': _0x2cb0a6,
        'turn': _0x3aab4e['turn'],
        'isWin': String(_0x3aab4e['isWin']),
        'winner': _0x3aab4e['winner'] || ''
    });
    return okarunsite + '/api/canvas/jogodavelha?' + _0x36a588['toString']();
}
const DB_PATH = './arquivos/tictactoe/db/';
if (!fs['existsSync'](DB_PATH))
    fs['mkdirSync'](DB_PATH, { 'recursive': !![] });
function defineSave(_0x42a972, _0x559057) {
    const _0x3fa8aa = path['join'](DB_PATH, _0x559057 + '.json');
    fs['writeFileSync'](_0x3fa8aa, JSON['stringify'](_0x42a972, null, 0x2));
}
function setGame(_0x546922) {
    const _0x13217f = path['join'](DB_PATH, _0x546922 + '.json');
    if (!fs['existsSync'](_0x13217f)) {
        const _0x3f6ed2 = [
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
        const _0x3d4bc5 = {
            'status': !![],
            'session': _0x546922,
            'turn': 'X',
            'X': null,
            'O': null,
            'isWin': ![],
            'winner': null,
            'nine_push': [],
            '_matrix': _0x3f6ed2
        };
        defineSave(_0x3d4bc5, _0x546922);
        return _0x3d4bc5;
    } else {
        try {
            return JSON['parse'](fs['readFileSync'](_0x13217f, 'utf-8'));
        } catch {
            return null;
        }
    }
}
function checkWinner(_0x4f6eb3) {
    for (let _0x105460 = 0x0; _0x105460 < 0x3; _0x105460++) {
        if (_0x4f6eb3[_0x105460][0x0] === _0x4f6eb3[_0x105460][0x1] && _0x4f6eb3[_0x105460][0x1] === _0x4f6eb3[_0x105460][0x2])
            return _0x4f6eb3[_0x105460][0x0];
        if (_0x4f6eb3[0x0][_0x105460] === _0x4f6eb3[0x1][_0x105460] && _0x4f6eb3[0x1][_0x105460] === _0x4f6eb3[0x2][_0x105460])
            return _0x4f6eb3[0x0][_0x105460];
    }
    if (_0x4f6eb3[0x0][0x0] === _0x4f6eb3[0x1][0x1] && _0x4f6eb3[0x1][0x1] === _0x4f6eb3[0x2][0x2])
        return _0x4f6eb3[0x0][0x0];
    if (_0x4f6eb3[0x0][0x2] === _0x4f6eb3[0x1][0x1] && _0x4f6eb3[0x1][0x1] === _0x4f6eb3[0x2][0x0])
        return _0x4f6eb3[0x1][0x1];
    return ![];
}
function move(_0x38d98d, _0x3949b6, _0x3aa5c1) {
    const _0x453858 = setGame(_0x3aa5c1);
    if (!_0x453858)
        return {
            'status': ![],
            'message': 'Erro\x20ao\x20carregar\x20sessão.'
        };
    if (_0x453858['isWin']) {
        return {
            'status': ![],
            'message': 'O\x20jogo\x20já\x20foi\x20finalizado.'
        };
    }
    const _0x12cb48 = _0x453858['_matrix'][_0x38d98d][_0x3949b6];
    if (_0x12cb48 === '❌' || _0x12cb48 === '⭕') {
        return {
            'status': ![],
            'message': 'Posição\x20já\x20ocupada\x20por\x20' + _0x12cb48
        };
    }
    const _0x3e58d2 = _0x453858['turn'] === 'X' ? '❌' : '⭕';
    _0x453858['_matrix'][_0x38d98d][_0x3949b6] = _0x3e58d2;
    _0x453858['nine_push']['push'](_0x3e58d2);
    const _0x410d82 = checkWinner(_0x453858['_matrix']);
    if (_0x410d82 === '❌' || _0x410d82 === '⭕') {
        _0x453858['isWin'] = !![];
        _0x453858['winner'] = _0x410d82 === '❌' ? 'X' : 'O';
    } else if (_0x453858['nine_push']['length'] >= 0x9) {
        _0x453858['isWin'] = !![];
        _0x453858['winner'] = 'SERI';
    } else {
        _0x453858['turn'] = _0x453858['turn'] === 'X' ? 'O' : 'X';
    }
    defineSave(_0x453858, _0x3aa5c1);
    return _0x453858;
}
function validmove(_0x1a2e5e, _0x230a6c) {
    const _0x479a82 = Number(_0x1a2e5e);
    if (isNaN(_0x479a82) || _0x479a82 < 0x1 || _0x479a82 > 0x9)
        return ![];
    const _0xbb7fd8 = {
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
    const [_0x18f98d, _0x4619e3] = _0xbb7fd8[_0x479a82];
    return move(_0x18f98d, _0x4619e3, _0x230a6c);
}
module['exports'] = {
    'setGame': setGame,
    'validmove': validmove,
    'buildBoardImageUrl': buildBoardImageUrl,
    'delGame': _0x44a275 => {
        const _0x2ea1d8 = path['join'](DB_PATH, _0x44a275 + '.json');
        if (fs['existsSync'](_0x2ea1d8))
            fs['unlinkSync'](_0x2ea1d8);
    }
};
