try {
    // check if something is selected
    var selection = app.activeDocument.selection;
    if (selection.length == 0) throw new Error("Nothing selected");
    // prompt for parameters
    var baseName = prompt("Enter base id", "id", "Apply consecutive IDs");
    var index = parseInt(prompt("Enter start index", 0, "Apply consecutive IDs"));
    // temporary rename elements totally different to prevent internal ID clashes
	// which cause the SVG export to contain cluttered IDs like "id0_1"
	RenameAll(selection, "_SCRIPT_TEMP_ID_", 0);
	// rename elements to the correct IDs
	RenameAll(selection, baseName, index);
    alert("Renamed " + selection.length + " elements.", "Success");
} catch(e) {
    alert("Error: " + e.message);
}

function RenameAll(items, baseName, index) {
	for (var i = items.length-1; i >= 0; i--) {
        items[i].name = baseName + index++;
    }
}