/**
 * Created by yannickbenchimol on 06/12/2016.
 */
ExampleApp.controller('ExampleController', function ($scope, client, esFactory, DataResult) {
    $scope.viewTracks = false;
    $scope.onSearch = function () {
        switch ($scope.searchType) {
            case "all":
                var recherche = {
                    "query": {
                        "query_string": {
                            "query": $scope.input + "~"
                        }
                    }
                }
                break;
            case "artiste":
                var recherche = {
                    "query": {
                        "match": {
                            "artist": $scope.input + "~"
                        }
                    }
                }
                break;
            case "genre":
                var recherche = {
                    "query": {
                        "match": {
                            "category": $scope.input + "~"
                        }
                    }
                }
                break;
            case "album":
                var recherche = {
                    "query": {
                        "match": {
                            "title": $scope.input + "~"
                        }
                    }
                }
                break;
            default:
                var recherche = {
                    "query": {
                        "query_string": {
                            "query": $scope.input + "~"
                        }
                    }
                }
        }
//        var recherche = {
//          "query": {
//            "query_string": {
//              "query": $scope.input
//            }
//          }
//        }
        $scope.onViewTracks = function () {
            console.log($scope.viewTracks, 'entrée');
            $scope.viewTracks = true;
            console.log($scope.viewTracks, 'sortie');
        };

        DataResult.getResults(recherche)
            .then(function (data) {
                $scope.nbResponses = data.data.hits.total;
                $scope.responses = data.data.hits.hits;
                console.log(data, 'reponse recherche')

            }, function (err) {
                console.log(err, 'error')
            })
    }

    $.material.init();
    client.cluster.state({
        metric: [
            'cluster_name',
            'nodes',
            'master_node',
            'version'
        ]
    })
        .then(function (resp) {
            $scope.clusterState = resp;
            $scope.error = null;
        })
        .catch(function (err) {
            $scope.clusterState = null;
            $scope.error = err;

            if (err instanceof esFactory.errors.NoConnections) {
                $scope.error = new Error('Unable to connect to elasticsearch. ' +
                    'Make sure that it is running and listening at http://localhost:9200');
            }
        });


});
