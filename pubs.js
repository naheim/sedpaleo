$.get('peerreviewed.tsv', function(data) {

	// start the table
	var html = '<h2>Peer-Reviewed Publications</h2><table class="w3-table w3-striped w3-bordered w3-hoverable">';
	
	//
	var lineCount = data.split('\n').length - 1;
	//console.log(lineCount);
	
	// split into lines
	var rows = data.split("\n");
	
	// parse lines
	var i = 1;
	rows.forEach( function getvalues(ourrow) {
		// split line into columns
		var columns = ourrow.split("\t");
		
		if(columns[0] == "peer-review") {
			// start a table row
			html += "<tr>";

		

			html += "<td>" + columns[0] + "</td>";
			html += "<td>" + columns[1] + "</td>";
			html += "<td>" + columns[2] + "</td>";

			// close row
			html += "</tr>";
		
			i += 1;
			console.log(i);
		}
	})
	// close table
	html += "</table>";

	// insert into div
	$('#publications').append(html);

});
