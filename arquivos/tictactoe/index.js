const fs = require('fs');
const path = require('path');
const apikeys = require('../../configs/apikeys.json');
const {apis = {}, sites = {}, groups = {}} = apikeys;
const {okarunsite} = sites;
const {API_KEY_WAGURI, API_KEY_OKARUN} = apis;
function buildBoardImageUrl(_0x2c02c7) {
    const _0x230bc5 = JSON['stringify'](_0x2c02c7['_matrix']);
    const _0x128382 = new URLSearchParams({
        'apikey': API_KEY_WAGURI,
        'board': _0x230bc5,
        'turn': _0x2c02c7['turn'],
        'isWin': String(_0x2c02c7['isWin']),
        'winner': _0x2c02c7['winner'] || ''
    });
    return okarunsite + '/api/canvas/jogodavelha?' + _0x128382['toString']();
}
const DB_PATH = './arquivos/tictactoe/db/';
if (!fs['existsSync'](DB_PATH))
    fs['mkdirSync'](DB_PATH, { 'recursive': !![] });
function defineSave(_0xc34181, _0x10e709) {
    const _0x3267de = path['join'](DB_PATH, _0x10e709 + '.json');
    fs['writeFileSync'](_0x3267de, JSON['stringify'](_0xc34181, null, 0x2));
}
function setGame(_0x21b09c) {
    const _0x470fa4 = path['join'](DB_PATH, _0x21b09c + '.json');
    if (!fs['existsSync'](_0x470fa4)) {
        const _0x1ed614 = [
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
        const _0x301775 = {
            'status': !![],
            'session': _0x21b09c,
            'turn': 'X',
            'X': null,
            'O': null,
            'isWin': ![],
            'winner': null,
            'nine_push': [],
            '_matrix': _0x1ed614
        };
        defineSave(_0x301775, _0x21b09c);
        return _0x301775;
    } else {
        try {
            return JSON['parse'](fs['readFileSync'](_0x470fa4, 'utf-8'));
        } catch {
            return null;
        }
    }
}
function checkWinner(_0x3b7ccd) {
    for (let _0x49db84 = 0x0; _0x49db84 < 0x3; _0x49db84++) {
        if (_0x3b7ccd[_0x49db84][0x0] === _0x3b7ccd[_0x49db84][0x1] && _0x3b7ccd[_0x49db84][0x1] === _0x3b7ccd[_0x49db84][0x2])
            return _0x3b7ccd[_0x49db84][0x0];
        if (_0x3b7ccd[0x0][_0x49db84] === _0x3b7ccd[0x1][_0x49db84] && _0x3b7ccd[0x1][_0x49db84] === _0x3b7ccd[0x2][_0x49db84])
            return _0x3b7ccd[0x0][_0x49db84];
    }
    if (_0x3b7ccd[0x0][0x0] === _0x3b7ccd[0x1][0x1] && _0x3b7ccd[0x1][0x1] === _0x3b7ccd[0x2][0x2])
        return _0x3b7ccd[0x0][0x0];
    if (_0x3b7ccd[0x0][0x2] === _0x3b7ccd[0x1][0x1] && _0x3b7ccd[0x1][0x1] === _0x3b7ccd[0x2][0x0])
        return _0x3b7ccd[0x1][0x1];
    return ![];
}
function move(_0x5edba6, _0x283849, _0x426c80) {
    const _0x479f5f = setGame(_0x426c80);
    if (!_0x479f5f)
        return {
            'status': ![],
            'message': 'Erro\x20ao\x20carregar\x20sessão.'
        };
    if (_0x479f5f['isWin']) {
        return {
            'status': ![],
            'message': 'O\x20jogo\x20já\x20foi\x20finalizado.'
        };
    }
    const _0x51e46f = _0x479f5f['_matrix'][_0x5edba6][_0x283849];
    if (_0x51e46f === '❌' || _0x51e46f === '⭕') {
        return {
            'status': ![],
            'message': 'Posição\x20já\x20ocupada\x20por\x20' + _0x51e46f
        };
    }
    const _0x261826 = _0x479f5f['turn'] === 'X' ? '❌' : '⭕';
    _0x479f5f['_matrix'][_0x5edba6][_0x283849] = _0x261826;
    _0x479f5f['nine_push']['push'](_0x261826);
    const _0x50fa50 = checkWinner(_0x479f5f['_matrix']);
    if (_0x50fa50 === '❌' || _0x50fa50 === '⭕') {
        _0x479f5f['isWin'] = !![];
        _0x479f5f['winner'] = _0x50fa50 === '❌' ? 'X' : 'O';
    } else if (_0x479f5f['nine_push']['length'] >= 0x9) {
        _0x479f5f['isWin'] = !![];
        _0x479f5f['winner'] = 'SERI';
    } else {
        _0x479f5f['turn'] = _0x479f5f['turn'] === 'X' ? 'O' : 'X';
    }
    defineSave(_0x479f5f, _0x426c80);
    return _0x479f5f;
}
function validmove(_0x2828c1, _0x5703c1) {
    const _0x2112b1 = Number(_0x2828c1);
    if (isNaN(_0x2112b1) || _0x2112b1 < 0x1 || _0x2112b1 > 0x9)
        return ![];
    const _0x364c21 = {
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
    const [_0x2a995b, _0x498620] = _0x364c21[_0x2112b1];
    return move(_0x2a995b, _0x498620, _0x5703c1);
}
module['exports'] = {
    'setGame': setGame,
    'validmove': validmove,
    'buildBoardImageUrl': buildBoardImageUrl,
    'delGame': _0x48f6ce => {
        const _0x5ceba9 = path['join'](DB_PATH, _0x48f6ce + '.json');
        if (fs['existsSync'](_0x5ceba9))
            fs['unlinkSync'](_0x5ceba9);
    }
};
