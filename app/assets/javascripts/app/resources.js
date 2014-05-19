angular.module('popcornApp.resources', ['rails'])
.factory("Movie",
	function(railsResourceFactory, $q) {
		var resource = railsResourceFactory({
			url: '/movies',
			name: 'movie'
		});

		resource.findOrCreateByYoutubeId = function (youtubeId, otherAttributes) {
			var d = $q.defer();
			resource.query({youtube_id: youtubeId}).
				then(function(movies) {
					if(movies.length > 0) {
						//return
						// console.log(movies[0]);
						d.resolve(movies[0]);
					} else {
						//create
						var createAttributes = _.extend(
							otherAttributes, {youtube_id: youtubeId}
						);
						var movie = new resource(createAttributes);
						movie.save().then(function() {
							// console.log(movie);
							d.resolve(movie);	
						});
					}
				});
				return d.promise;
		};
		return resource;
	});