$.get('https://sedpaleo.org/under_development/peerreviewed.csv', function(data) {

// start the table
var html = '<h2>Peer-Reviewed Publications</h2><table class="w3-table w3-striped w3-bordered w3-hoverable">';

// split into lines
var rows = data.split("\n");

// parse lines
rows.forEach( function getvalues(ourrow) {

// start a table row
html += "<tr>";

// split line into columns
var columns = ourrow.split(",");

html += "<td>" + columns[0] + "</td>";
html += "<td>" + columns[1] + "</td>";
html += "<td>" + columns[2] + "</td>";

// close row
html += "</tr>";
})
// close table
html += "</table>";

// insert into div
$('#publications').append(html);

});