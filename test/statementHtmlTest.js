const test = require('ava');
const {statementByHtml} = require('../src/statement');
test('Sample test', t => {
    t.true(true);
    t.is(1, 1);
    t.deepEqual({a: 1}, {a: 1});
});
test('statement test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementByHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
        ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
        ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$1,730.00</em></p>\n' +
        '<p>You earned <em>47</em> credits</p>\n');
});

test('the audience of hamlet is 30 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementByHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>30</td><td>$400.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$400.00</em></p>\n' +
        '<p>You earned <em>0</em> credits</p>\n');
});

test('the audience of hamlet is 31 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementByHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>31</td><td>$410.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$410.00</em></p>\n' +
        '<p>You earned <em>1</em> credits</p>\n');
});

test('the audience of hamlet is 29 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 29,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementByHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>Hamlet</td><td>29</td><td>$400.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$400.00</em></p>\n' +
        '<p>You earned <em>0</em> credits</p>\n');
});

test('the audience of as-like is 20 test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementByHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
        ' <tr><td>As You Like It</td><td>20</td><td>$360.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$360.00</em></p>\n' +
        '<p>You earned <em>4</em> credits</p>\n');
});

test('unknown type: tragedy1', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'othello',
                'audience': 20,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy1',
        },
    };
    try {
        statementByHtml(invoice, plays);
        t.fail();
    } catch (e) {
        t.is(e.message, 'unknown type: tragedy1');
    }
});


