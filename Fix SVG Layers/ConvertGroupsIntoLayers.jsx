// prompt for a maximum depth to convert groups into layers
var maxConversionDepth = parseInt(prompt("Enter maximum conversion depth\n0: no recursion, just convert groups in the current layer\n1: also convert groups within groups into sub-sub-layers an\nn: and so on..", 0, "Convert groups into layers"));

function ConvertGroupsIntoLayers(container, depth) {
    var n = container.groupItems.length;
    // iterate over groups
    for (var i = container.groupItems.length-1; i >= 0; i--) {
        var group = container.groupItems[i];
        // create new layer with the name of the group
        var layer = container.layers.add();
        layer.name = group.name;
        // move each item within the group to the new layer
        for (var j = group.pageItems.length-1; j >= 0; j--) {
            group.pageItems[j].move(layer, ElementPlacement.PLACEATBEGINNING);
        }
        // the new layer may contain more groups, apply recursion
        if (depth < maxConversionDepth) {
            n += ConvertGroupsIntoLayers(layer, depth+1);
        }
    }
    return n;
}