//// Close team modals when the user clicks anywhere outside of the modal
var bioModal1 = document.getElementById('naheimbio');
var bioModal2 = document.getElementById('charleybio');
window.onclick = function(event) {
	if (event.target == bioModal1) {
    	bioModal1.style.display = "none";
	} else if (event.target == bioModal2) {
    	bioModal2.style.display = "none";	
	}
}


// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
	var x = document.getElementById("navDemo");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}


// PUBLICATIONS
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "peerreviewed.tsv",
        dataType: "text",
        success: function(data) {pubsTable(data, "#publications");}
     });
});
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "other.tsv",
        dataType: "text",
        success: function(data) {pubsTable(data, "#other-publications");}
     });
});

function pubsTable(data, target) {
	$.getScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js");
	
	// get header
	if(target == "#publications") {
		var html = "<h2>Peer-Reviewed Publications</h2>";
	} else {
		var html = "<h2>Other Publications</h2>";	
	}
	// start the table
	html += "<table class='w3-table w3-striped w3-bordered w3-hoverable'>";
	
	// count lines in file
	var lineCount = data.split('\n').length;
	var i = 1;
	//console.log(lineCount);
	
	// split into lines
	var rows = data.split("\n");
	
	// parse lines
	rows.forEach( function getvalues(ourrow) {
		// split line into columns
		var columns = ourrow.split("\t");
		
		if(columns[0] != "type") {
			// column indices
			// type=0; authors=1; year=2; title=3; journal=4; volume=5; issue=6; pages=7; doi=8; booktitle=9 
			// editors=10; publisher=11; pubplace=12; url=13; notyetpub=14; note=15 ; reprint=16; 

			// set up publication counter
			var rowNumber = lineCount - i;
			
			// authors 
			var authors = columns[1];
			var regex1 = /N.A. Heim/gi;
			authors = authors.replace(regex1, "<span class='w3-text-azure'>N.A. Heim</span>");
			var regex2 = /Heim, N.A./gi;
			authors = authors.replace(regex2, "<span class='w3-text-azure'>Heim, N.A.</span>");
			
			// set altmetric
			var doialtmet = "";
			if(columns[8] != "") {
				doialtmet = " <a href='http://doi.org/" + columns[8] + "' target='blank'>doi:" + columns[8] + "</a></small>"; // doi
				
				if(columns[2] > 2013) {
					doialtmet += " <div class='altmetric-embed' data-badge-type='1' data-badge-popover='right' data-doi='" + columns[8] + "' data-link-target='_blank' style='display: inline-block; vertical-align: middle;'></div>";
				}
			}
			
			// start a table row
			if($.trim(columns[16]) != "") {
				html += "<tr data-href='reprints/" + columns[16] + "'>";			
			} else {
				html += "<tr>";
			}
			
			// cell with paper count
			html += "<td class='rownumber'>" + rowNumber + "</td>";
			
			// format citation cell if journal 
			if(columns[0] == "journal") {
				var vol = null;
				if(columns[6] != "") {
					vol = " " + columns[5] + "(" + columns[6] + "):" + columns[7];
				} else if(columns[14] != ""){
					vol = ". " + columns[14];									
				} else {
					vol = " " + columns[5] + ":" + columns[7];					
				}
				html += "<td><strong>" + columns[3] + ".</strong><em> " + columns[4] + "</em>" + vol; // title and Journal/vol/issue/pages
				html += ".<br/><small>" + authors + ". " + columns[2] + "."; // author and year
					
			} else {
				html += "<td><strong>" + columns[3] + ".</strong> <em>In</em> " + columns[10] + ". " + columns[9] + ":" + columns[7]; // title and editors and book title
				html += ".<br/><small>" + authors + ". " + columns[2] + "."; // author and year
			}
			
			// add doi and altmetric
			html += doialtmet + "</small>";
			
			// add note
			if(columns[15] != "") {
				html += "<br/><small>" + columns[15] + "</small>";
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
	$(target).append(html);
	
	// functions for making table row a link
	$('*[data-href]').on("click",function(){
		window.location = $(this).data('href');
		return false;
	});
		$("td > a").on("click",function(e){
		e.stopPropagation();
	});

};

