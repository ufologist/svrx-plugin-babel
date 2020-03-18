const {
    Transform
} = require('stream');

const EventEmitter = require('events');
const babel = require("@babel/core");

// 参考
// svrx/packages/svrx/lib/injector/index.js#onTransform
// https://github.com/svrxjs/svrx/blob/master/packages/svrx/lib/injector/index.js#L47
//
// How to create Koa2 middleware which will modify response body and run last in a chain?
// https://stackoverflow.com/questions/56558386/how-to-create-koa2-middleware-which-will-modify-response-body-and-run-last-in-a
async function onTransform(ctx, next) {
    await next();
    if (/\.(js|json)($|\?)/.test(ctx.path)) {
        ctx.body = _transform(ctx.body);
    }
}

function _transform(body) {
    var _body = body;

    if (typeof _body === 'string' || _body instanceof Buffer) {
        _body = typeof _body === 'string' ? _body : _body.toString('utf8');
        try {
            _body = babel.transformSync(_body);
        } catch (error) {
            console.warn('babel.transformSync', error);
        }
    } else if (isReadableStream(_body)) {
        _body = _body.pipe(new BabelTransform());
    }

    return _body;
}

class BabelTransform extends Transform {
    constructor() {
        super({
            transform(chunk, enc, callback) {
                this._chunkString.push(chunk.toString());
                callback();
            },
            flush(callback) {
                var code = '(' + this._chunkString.join('') + ')';
                try {
                    code = babel.transformSync(code, {
                        // not in strict mode
                        // https://babeljs.io/docs/en/options#sourcetype
                        sourceType: 'script',
                    }).code;
                } catch (error) {
                    console.warn('BabelTransform', error);
                }
                // 剥离首尾的括号
                code = code.substring(1, code.length - 2);

                this.push(code);
                callback();
            }
        });

        this._chunkString = [];
    }
}

function isReadableStream(test) {
    // ducking type check
    return test instanceof EventEmitter && typeof test.read === 'function';
}

module.exports = {
    hooks: {
        async onCreate(context) {
            context.middleware.add('svrx-plugin-babel', {
                onRoute: onTransform
            });
        }
    }
};