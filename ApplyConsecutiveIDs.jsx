try {
    // check if something is selected
    var selection = app.activeDocument.selection;
    if (selection.length == 0) throw new Error("Nothing selected");
    // prompt for parameters
    var baseName = prompt("Enter base id", "id", "Apply consecutive IDs");
    var index = parseInt(prompt("Enter start index", 0, "Apply consecutive IDs"));
    // rename elements
    for (var i = selection.length-1; i >= 0; i--) {
        selection[i].name = baseName + index++;
    }
    alert("Renamed " + index + " elements.", "Success");
} catch(e) {
    alert("Error: " + e.message);
}