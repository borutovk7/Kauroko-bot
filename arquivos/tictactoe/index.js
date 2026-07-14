const fs = require('fs');
const path = require('path');
const apikeys = require('../../configs/apikeys.json');
const {apis = {}, sites = {}, groups = {}} = apikeys;
const {okarunsite} = sites;
const {API_KEY_WAGURI, API_KEY_OKARUN} = apis;
function buildBoardImageUrl(_0x2d6309) {
    const _0x113fbc = JSON['stringify'](_0x2d6309['_matrix']);
    const _0x3d0e5d = new URLSearchParams({
        'apikey': API_KEY_WAGURI,
        'board': _0x113fbc,
        'turn': _0x2d6309['turn'],
        'isWin': String(_0x2d6309['isWin']),
        'winner': _0x2d6309['winner'] || ''
    });
    return okarunsite + '/api/canvas/jogodavelha?' + _0x3d0e5d['toString']();
}
const DB_PATH = './arquivos/tictactoe/db/';
if (!fs['existsSync'](DB_PATH))
    fs['mkdirSync'](DB_PATH, { 'recursive': !![] });
function defineSave(_0x3c91f4, _0x2538dc) {
    const _0x37b84e = path['join'](DB_PATH, _0x2538dc + '.json');
    fs['writeFileSync'](_0x37b84e, JSON['stringify'](_0x3c91f4, null, 0x2));
}
function setGame(_0x5819ce) {
    const _0x5916e8 = path['join'](DB_PATH, _0x5819ce + '.json');
    if (!fs['existsSync'](_0x5916e8)) {
        const _0x1673f4 = [
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
        const _0x9bb1e2 = {
            'status': !![],
            'session': _0x5819ce,
            'turn': 'X',
            'X': null,
            'O': null,
            'isWin': ![],
            'winner': null,
            'nine_push': [],
            '_matrix': _0x1673f4
        };
        defineSave(_0x9bb1e2, _0x5819ce);
        return _0x9bb1e2;
    } else {
        try {
            return JSON['parse'](fs['readFileSync'](_0x5916e8, 'utf-8'));
        } catch {
            return null;
        }
    }
}
function checkWinner(_0x5ca515) {
    for (let _0x3613d5 = 0x0; _0x3613d5 < 0x3; _0x3613d5++) {
        if (_0x5ca515[_0x3613d5][0x0] === _0x5ca515[_0x3613d5][0x1] && _0x5ca515[_0x3613d5][0x1] === _0x5ca515[_0x3613d5][0x2])
            return _0x5ca515[_0x3613d5][0x0];
        if (_0x5ca515[0x0][_0x3613d5] === _0x5ca515[0x1][_0x3613d5] && _0x5ca515[0x1][_0x3613d5] === _0x5ca515[0x2][_0x3613d5])
            return _0x5ca515[0x0][_0x3613d5];
    }
    if (_0x5ca515[0x0][0x0] === _0x5ca515[0x1][0x1] && _0x5ca515[0x1][0x1] === _0x5ca515[0x2][0x2])
        return _0x5ca515[0x0][0x0];
    if (_0x5ca515[0x0][0x2] === _0x5ca515[0x1][0x1] && _0x5ca515[0x1][0x1] === _0x5ca515[0x2][0x0])
        return _0x5ca515[0x1][0x1];
    return ![];
}
function move(_0x44a392, _0x4080ef, _0x43590e) {
    const _0x173582 = setGame(_0x43590e);
    if (!_0x173582)
        return {
            'status': ![],
            'message': 'Erro\x20ao\x20carregar\x20sessão.'
        };
    if (_0x173582['isWin']) {
        return {
            'status': ![],
            'message': 'O\x20jogo\x20já\x20foi\x20finalizado.'
        };
    }
    const _0x1aa8f9 = _0x173582['_matrix'][_0x44a392][_0x4080ef];
    if (_0x1aa8f9 === '❌' || _0x1aa8f9 === '⭕') {
        return {
            'status': ![],
            'message': 'Posição\x20já\x20ocupada\x20por\x20' + _0x1aa8f9
        };
    }
    const _0x504e1f = _0x173582['turn'] === 'X' ? '❌' : '⭕';
    _0x173582['_matrix'][_0x44a392][_0x4080ef] = _0x504e1f;
    _0x173582['nine_push']['push'](_0x504e1f);
    const _0xe9ddd = checkWinner(_0x173582['_matrix']);
    if (_0xe9ddd === '❌' || _0xe9ddd === '⭕') {
        _0x173582['isWin'] = !![];
        _0x173582['winner'] = _0xe9ddd === '❌' ? 'X' : 'O';
    } else if (_0x173582['nine_push']['length'] >= 0x9) {
        _0x173582['isWin'] = !![];
        _0x173582['winner'] = 'SERI';
    } else {
        _0x173582['turn'] = _0x173582['turn'] === 'X' ? 'O' : 'X';
    }
    defineSave(_0x173582, _0x43590e);
    return _0x173582;
}
function validmove(_0x3a1626, _0xe51f02) {
    const _0x4543e2 = Number(_0x3a1626);
    if (isNaN(_0x4543e2) || _0x4543e2 < 0x1 || _0x4543e2 > 0x9)
        return ![];
    const _0x3a62ac = {
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
    const [_0x1727fa, _0x524666] = _0x3a62ac[_0x4543e2];
    return move(_0x1727fa, _0x524666, _0xe51f02);
}
module['exports'] = {
    'setGame': setGame,
    'validmove': validmove,
    'buildBoardImageUrl': buildBoardImageUrl,
    'delGame': _0x47c160 => {
        const _0x565607 = path['join'](DB_PATH, _0x47c160 + '.json');
        if (fs['existsSync'](_0x565607))
            fs['unlinkSync'](_0x565607);
    }
};
