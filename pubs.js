$.get('peerreviewed.tsv', function(data) {

	// start the table
	var html = '<h2>Peer-Reviewed Publications</h2><table class="w3-table w3-striped w3-bordered w3-hoverable">';
	
	//
	var lineCount = data.split('\n').length;
	//console.log(lineCount);
	
	// split into lines
	var rows = data.split("\n");
	
	// parse lines
	var i = 1;
	rows.forEach( function getvalues(ourrow) {
		// split line into columns
		var columns = ourrow.split("\t");
		
		if(columns[0] != "type") {
			// column indices
			// type=0; authors=1; year=2; title=3; journal=4; volume=5; issue=6; pages=7; doi=8; booktitle=9 
			// editors=10; publisher=11; pubplace=12; url=13; notyetpub=14; note=15 

			// set up publication counter
			var rowNumber = lineCount - i;
			
			// start a table row
			html += "<tr>";
			
			// cell with paper count
			html += "<td class='rownumber'>" + rowNumber + "</td>";
			
			// format citation cell if journal 
			if(columns[0] == "journal") {
				html += "<td><strong>" + columns[3] + ".</strong><em> " + columns[4] + "</em>"; // title and Journal
				if(columns[14] != "") {
					html += columns[14]; // in press etc. 	
				}
				html += ".<br/><small>" + columns[1] + ". " + columns[2] + "."; // author and year
				if(columns[8] != "") {
					html += " <a href='http://doi.org/" + columns[8] + "' target='blank'>doi:" + columns[8] + "</a>."; // doi
					html += "<div class='altmetric-embed' data-badge-type='1' data-badge-popover='right' data-doi='" + columns[8] + "' data-link-target='_blank' style='display: inline-block; vertical-align: middle;'></div>";
				}	
			}
			
			// close cell	
			html += "</td>";

			// close row
			html += "</tr>";
		
			i = i + 1;
			//console.log(i);
		}
	})
	// close table
	html += "</table>";

	// insert into div
	$('#publications').append(html);
	console.log(html);

});
