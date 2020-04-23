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
		
		var colNames;
		if(columns[0] == "type") {
			colNames = columns;
			//console.log(colNames);
			
		} else {
			var rowNumber = lineCount - i;
			// start a table row
			html += "<tr>";
			
			// cell with paper count
			html += "<td class='rownumber'>" + rowNumber + "</td>";
			
			// format citation cell if journal 
			
			console.log(colNames);
			console.log(  jQuery.inArray( "type", colNames ) );
			
			if(columns[jQuery.inArray( "type", colNames )] == "journal") {
				html += "<td><strong>" + columns[jQuery.inArray( "title", colNames )] + ".</strong><em> " + columns[jQuery.inArray( "journal", colNames )] + "</em>"; // title and Journal
				if(columns[jQuery.inArray( "notyetpub", colNames )] != "") {
					html += columns[jQuery.inArray( "notyetpub", colNames )]; // in press etc. 	
				}
				html += ".<br/><small>" + columns[jQuery.inArray( "authors", colNames )] + ". " + columns[jQuery.inArray( "year", colNames )] + "."; // author and year
				if(columns[jQuery.inArray( "doi", colNames )] != "") {
					html += " <a href='http://doi.org/" + columns[jQuery.inArray( "doi", colNames )] + "' target='blank'>doi:" + columns[jQuery.inArray( "doi", colNames )] + "</a>."; // doi
					html += "<div class='altmetric-embed' data-badge-type='1' data-badge-popover='right' data-doi='" + columns[jQuery.inArray( "doi", colNames )] + "' data-link-target='_blank' style='display: inline-block; vertical-align: middle;'></div>";
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
