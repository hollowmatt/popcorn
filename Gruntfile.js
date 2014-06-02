module.exports = function(grunt) {
	grunt.initConfig({
		ajaxSeo: {
			all: {
				options: {
					urls: [
						"http://localhost:3000"
					],
					snapshotPath: "public/snapshots",
					webSecurity: false,
					waitTime: 3000
				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-ajax-seo");
};