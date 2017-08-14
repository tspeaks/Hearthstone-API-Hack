$(document).ready(function () { 
	function getResults(searchTerm) {
		$.ajax(
			{
				url: `https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/${searchTerm}?collectible=1`,
				beforeSend: setHeaders
						
			}
		)
			.then(function(data) {
				let cards = data.map((i) => {
					return cardTemplate(i);
				})
				displayResults(cards);
			})
		
			.fail(function(err) {
				console.log(err);

				$("#zero-results").show();



			})

	}

	function setHeaders(xhr) {
		xhr.setRequestHeader('X-Mashape-Key', 'frPNjBhS3hmshGNhH2wxsLdN72HKp14KgwTjsnftjcJxESuISw');
	}


	 function cardTemplate(data) {
	 	return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	 					<img src="${data.img}" />	
	 			</div>`

	 }

	function displayResults(cards) {
		$("#search-results").html(cards);
	}

	//search term
	$(".search-form").submit(function (event) {
		event.preventDefault();
		$("#search-results").html("");
		$("#zero-results").hide();
		$("#no-search").hide();
		$(".view").css("background", "none");
		getResults($(".search-term", $(event.currentTarget)).val());
		
		
	});
});