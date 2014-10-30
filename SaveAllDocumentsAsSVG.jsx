try {
    // check if any documents are open
    if (app.documents.length == 0) throw new Error("No open documents.");
    // check if rxrepl.exe is found
    var rxrepl = new File("../rxrepl.exe");
    if (!rxrepl.exists) throw new Error("rxrepl.exe was not found at: " + rxrepl.fullName);
    // set up save options
    var options = new ExportOptionsSVG();
    options.fontSubsetting = SVGFontSubsetting.None;
    options.fontType = SVGFontType.SVGFONT;
    // get handle to batch file
    var batch = new File("run_rxrepl.bat");
    // save all documents as svg
    var n = app.documents.length;
    for (var i = n-1; i >= 0; i--) {
        var doc = app.documents[i];
        // save current document
        doc.save();
        // export document to svg
        var exportFile = new File(doc.name.substr(0, doc.name.lastIndexOf('.')));
        doc.exportFile(exportFile, ExportType.SVG, options);
        var svgName = doc.name;
        // close the document to prevent accidentally editing the svg instead of the ai file
        doc.close(SaveOptions.DONOTSAVECHANGES);
        // fix svg fonts
        // alter: modify file in-place, i.e. input file is output file
        // no-backup don't create backup file
        // options: read the replace options from file ..\\_rxreplOptions.txt
        batch.open("w");
        batch.writeln("..\\rxrepl.exe --alter --no-backup --options ..\\_rxreplOptions.txt --file " + svgName);
        batch.close();
        batch.execute();
    }
    alert("Saved " + n + " files as SVG.", "Success!");    
    // delete the batch file
    batch.remove();
} catch (e) {
    alert("Error: " + e.message);
}