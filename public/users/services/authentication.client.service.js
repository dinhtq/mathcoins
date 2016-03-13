angular.module('users').factory('Authentication', [
	function(){

		console.log("in Authentication factory and window.user is: " + window.user);

		if (window.user) {
			//check if provider is local  
			if (window.user.provider == 'local') {
				window.user.fullName =  window.user.fullName;
			}
			//else, its facebook
			else
			{
				window.user.fullName = window.user.providerData.name;
			}		
		}


		this.user = window.user;

		return {
			user: this.user
		};
	}
]);