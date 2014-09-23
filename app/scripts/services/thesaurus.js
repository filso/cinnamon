angular.module('cinnamon')
  .service('thesaurus', function($http, $q) {
    var BASE_URL = 'http://localhost:9000/service.php/';
    var API_KEY = 'ZcbKsB6O2WG2hNDi143w';
    var cache = {};

    function fetchWord(word) {
      var queryParams = {
        word: word,
        key: API_KEY,
        language: 'en_US',
        output: 'json'
      };
      var url = BASE_URL + '?' + $.param(queryParams);
      if (cache[word]) {
        // console.log('cache!', cache[word]);
        return $q.when(cache[word]);
      } else if (cache[word] === null) {
        return $q.reject('unuscessful');
      }
      return $http.get(url).then(function(response) {
        var objs = response.data.response;

        var longStr = _(objs).pluck('list').pluck('synonyms').value().join('|');
        var strings = longStr.split('|');
        var list = _(strings).filter(function(str) { return !str.match('similar') && !str.match('antonym'); }).first(10).value();
        cache[word] = list;
        return list;
      }, function() {
        cache[word] = null;
        return $q.reject('unuscessful');
      });
    }

    return {
      findWord: function(word) {
        return fetchWord(word);
      }
    };
  });