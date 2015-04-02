app = (function() {
/*************************************************************
	Dependencies
*************************************************************/
	var jquery = $;
	var hack = hackerNewsModel;
/*************************************************************
	Private
*************************************************************/
	var App;
	var storyData = [];

	var currentStory;

	var showStory = function(data, id) {
		currentStory = document.createElement('div');
		currentStory.setAttribute('class','article_body');

		if (data.text) {
			currentStory.innerHTML = data.text;
		}

		if (data.url) {
			link = document.createElement('a');
			link.setAttribute('class', 'article_link');
			link.setAttribute('href', data.url);
			link.setAttribute('target', "_blank");
			link.innerText = data.url;
			currentStory.appendChild(link);
		}
		
		document.getElementById(id).appendChild(currentStory);
	}

	var hideStory = function() {
		if (currentStory != null) {
			currentStory.parentElement.removeChild(currentStory);
			currentStory = null;
		}
	}

	var dataReady = function(event) {
		storyData = hackerNewsModel.getStoryData();
		getEmberReady();

		var temp = document.getElementById("loading");
		temp.parentElement.removeChild(temp);
	}

	var getEmberReady = function() {
		App = Ember.Application.create();

		App.ApplicationRoute = Ember.Route.extend({
			model: function() {
				return {
					name: 'My App',
					list: storyData,
					count: hackerNewsModel.loadingCount
				}
			},
			activate: function() {
			},
			actions: {
				expandStory: function(data, id) {
					var target =document.getElementById(id);
					if (currentStory && target == currentStory.parentNode) {
						if (data.url)
							window.open(data.url, "_blank");
					} else {
						hideStory();
						showStory(data, id);
					}
					return true;
				}
			}
		});

		App.Router.map(function() {
			this.resource('index', { path: '/' });
		});
	}

/*************************************************************
	Public
*************************************************************/

	var init = function() {

		//Get Data First
		addEventListener(hackerNewsModel.readyEvent, dataReady);
		hackerNewsModel.initList();
	}

	return {
		init:init
	}
}())

