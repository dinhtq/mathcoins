/*bootstrapping AngularJS*/

var mainApplicationModuleName = 'mean';

//create main application module and load dependency modules
var mainApplicationModule = angular.module(mainApplicationModuleName,
	['ngResource', 'ngRoute', 'users', 'index', 'articles', 'questions', 'quizModule', 'customFilters']);


//for SPAs SEO optimization purposes -- let crawlers know its a SPA
mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}]);


//solve Facebook's redirect bug that adds a hash part to the application URL after the OAuth
//authentication round-trip
if (window.location.hash === '#_=_') window.location.hash = '#!';


//use angular object jqLite functionality to bind a function to
//the document-ready event
angular.element(document).ready(function(){
	//initiate a new AngularJS app
	angular.bootstrap(document, [mainApplicationModuleName]);
});
