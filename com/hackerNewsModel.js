hackerNewsModel = (function() {
/*************************************************************
	Dependencies
*************************************************************/
	var jquery = $;
/*************************************************************
	Private
*************************************************************/
	var hackerNewsURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
	var hackerNewsStoryPre = "https://hacker-news.firebaseio.com/v0/item/"
	var hackerNewsStoryPost = ".json?print=pretty"

	var list = [];
	var stories = [];
	var completeCount = 0;

	var getIndividualStories = function(id) {
 		$.ajax({
	        url: hackerNewsStoryPre+id+hackerNewsStoryPost ,
	        success: function (response) {
	        	completeCount--;
	        	if (response != null) {
	        		if ((response.dead != true) && (response.type == "story")) {
		        		stories.pushObject(response);
		        	}
	        	}
	        	
	        	var temp = document.getElementById("loading").innerText = "Loading News..... "+completeCount;
	        	if (completeCount <= 0) {
	        		var event = new Event("READY");
	        		dispatchEvent(event);
	        	}
	        	
	        }
	    });
	}
/*************************************************************
	Public
*************************************************************/

	var initList = function() {
	    $.ajax({
	        url: hackerNewsURL ,
	        success: function (response) {
	        	list = response;
	        	completeCount = list.length;
	        	for (var i = 0; i < list.length; i++) {
	        		getIndividualStories(list[i]);
	        	}
	        }
	    });
	}

	var getListData = function() {
		return list;
	}
	
	var getStoryData = function() {
		return stories;
	}

	return {
		initList:initList,
		getRawListData:getListData,
		getStoryData:getStoryData,
		loadingCount:completeCount,
		readyEvent:"READY",
		storyReadyEvent:"STORY_READY"
	}
}())