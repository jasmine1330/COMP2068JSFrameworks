const connect = require('connect');
const url = require('url');

function calculate(method, a, b) {
    let result;
    switch (method) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            result = a / b;
            break;
        default:
            return 'Invalid method';
    }
    return `${a} ${method} ${b} = ${result}`;
}

const app = connect();

app.use((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const method = query.method;
    const a = parseInt(query.a);
    const b = parseInt(query.b);

    if (isNaN(a) || isNaN(b)) {
        res.end('Invalid input');
        return;
    }

    const output = calculate(method, a, b);
    res.end(output);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
