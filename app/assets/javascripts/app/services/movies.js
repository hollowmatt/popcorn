angular.module('popcornApp.services')
	.service('MoviesService', function($http, $q, Movie, $cacheFactory) {
		var moviesCache = $cacheFactory('movies');

    this.movies = function(chart) {
      chart = typeof chart !== 'undefined' ? chart : "most_popular";
      var d = $q.defer();
		    
      var getNested = function(data, path) {
        var i, len = path.length;
        for(i = 0; typeof data === 'object' && i < len; ++i) {
          data = data[path[i]];
        }
        return data;
      };

      var cachedMovies = moviesCache.get(chart);

      if(cachedMovies) {
        d.resolve(cachedMovies);
      } else {
        $http({
          method: 'GET',
          url: 'http://gdata.youtube.com/feeds/api/charts/movies/' + chart 
          +'?v=2&max-results=15&paid-content=true&hl=en&region=us&alt=json'
        }). 
        then(function(response) {
          var movies = _.map(response.data.feed.entry, function(movie){
            return {
              youtubeId: movie['media$group']['yt$videoid']['$t'],
              title: movie['media$group']['media$title']['$t'], 
              released: movie['yt$firstReleased']['$t'].match(/\d{4}/)[0],
              rated: getNested(movie, ['media$group','media$rating',0,'$t']),
              runningTime: Math.round(movie['media$group']['yt$duration']['seconds'] / 60),
              posterUrl: _.findWhere(movie['media$group']['media$thumbnail'], {"yt$name": "poster"}).url,
              description: movie['media$group']['media$description']['$t']
            };
          })

          var moviePromises = _.map(movies, function(movieData) {
            var youtubeId = movieData.youtubeId;
            return Movie.findOrCreateByYoutubeId(youtubeId, movieData);
          });

          $q.all(moviePromises).then(function(movieResources) {
            d.resolve(movieResources);
          });
        },
        function(error) {
          d.reject(error);
        });
        return d.promise;
      }  
    }
	});
