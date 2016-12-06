/**
 * Created by yannickbenchimol on 06/12/2016.
 */

// Service
ExampleApp.service('client', function (esFactory) {
    return esFactory({
        host: 'http://localhost:9200',
        apiVersion: '2.3',
        log: 'trace'
    });
});