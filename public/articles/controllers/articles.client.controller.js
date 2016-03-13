'use strict';

angular.module('articles').controller('ArticlesController',
	['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
	function($scope, $routeParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		// Create a new controller method for creating new articles
    $scope.create = function() {

        console.log("in client articles controller create");

    	// Use the form fields to create a new article $resource object
        var article = new Articles({
            title: this.title,
            content: this.content
        });

        // Use the article '$save' method to send an appropriate POST request
        article.$save(function(response) {

        	console.log("article saved and response is: " + JSON.stringify(response));
            console.log("redirecting to articleId page");

        	// If an article was created successfully, redirect the user to the article's page
            $location.path('articles/' + response._id);
        }, function(errorResponse) {
        	// Otherwise, present the user with the error message
            $scope.error = errorResponse.data.message;
        });
    };

		$scope.find = function(){
			$scope.articles = Articles.query();
			console.log($scope.articles);
		};

		$scope.findOne = function(){
			console.log("in articles findOne()");

			$scope.article = Articles.get({
				articleId: $routeParams.articleId
			}, function(response){
				console.log("got article and response is: " + JSON.stringify(response));
			});


		};


		$scope.update = function(){
			$scope.article.$update(function(){
				$location.path('articles/' + $scope.article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.delete = function(article) {
			//figure out if deleting from list or directly from article view
			if (article) {
				article.$remove(function(){
					for (var i in $scope.articles) {
						if ($scope.articles[i] === article) {
							$scope.articles.splice(i, 1);
						}
					}
				});
			}
			else{
				$scope.article.$remove(function(){
					$location.path('articles');
				});
			}
		};

	}//end controller constructor
]);
