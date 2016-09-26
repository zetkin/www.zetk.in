import Z from 'zetkin';

import app from './app';
import polyfills from '../utils/polyfills';

let port = process.env.APP_PORT || 80;

let server = app.listen(port, function() {
    let addr = server.address();

    Z.configure({
        host: 'api.' + process.env.ZETKIN_DOMAIN,
        port: 80,
        ssl: false
    });

    console.log('Listening on http://%s:%s', addr.address, addr.port);
});
