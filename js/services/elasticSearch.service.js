/**
 * Created by yannickbenchimol on 06/12/2016.
 */
function getResults(recherche) {
    $http.post('http://localhost:9200/music2/transactions/_search', recherche)
}
// Service
ExampleApp.service('client', function (esFactory) {
    return esFactory({
        host: 'http://localhost:9200',
        apiVersion: '2.3',
        log: 'trace'
    });
});
ExampleApp.service('DataResult', function () {
    var dataResult = {
        getResults: getResults
    }
    return dataResult
})