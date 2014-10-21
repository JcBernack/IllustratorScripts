try {
    #include "ConvertGroupsIntoLayers.jsx"
    // convert all groups in the currently active layer into sublayers
    var n = ConvertGroupsIntoLayers(app.activeDocument.activeLayer, 0);
    alert("Converted " + n + " groups into layers.", "Success!");
} catch(e) {
    alert("Error: " + e.message);
}