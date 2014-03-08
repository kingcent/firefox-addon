const {Cc,Ci} = require("chrome");

var contextMenu = require("sdk/context-menu");


// create an nsIFile for the executable
var file =Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile);
//file.initWithPath("/usr/bin/gedit");
file.initWithPath("/usr/local/bin/gvim");

// create an nsIProcess
var process =Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
process.init(file);

// Run the process.
// If first param is true, calling thread will be blocked until
// called process terminates.
// Second and third params are used to pass command-line arguments
// to the process.
var args = ["argument1", "argument2"];

 var menuItem = contextMenu.Item({
  label: "URL Con",
  context: contextMenu.SelectorContext("a[href], area"),
  contentScript: 'self.on("click", function (node, data) {' +
//                 '  //self.postMessage( "src:"+node.src);' +
                 '  console.log("data:"+data);' +
                 '  console.log("nodeName:"+node.nodeName);' +
                 '  console.log("textContent:"+node.textContent);' +
                 '  console.log("namespaceURI:"+node.namespaceURI);' +
                 '  console.log("nodeValue:"+node.nodeValue);' +
                 '  console.log("nodeType:"+node.nodeType);' +
                 '  console.log("href:"+node.href);' +
                 '  self.postMessage(node.href);' +
                 '  console.log("localName:"+node.localName);' +
                 '  console.log("baseURI:"+node.baseURI);' +
                 '  console.log("baseURIObject:"+node.baseURIObject);' +
                 '  console.log("sel str"+window.getSelection().toString().trim());' +
                 '});',
  onMessage: function (selectionText) {
    console.log(selectionText);
//    console.log("cm link:"+contextMenu.link.toString());
    loc = selectionText.lastIndexOf("#");
    lineno = selectionText.substr(loc);
    lineno = lineno.replace("#","+");
    src_file = selectionText.replace("file://","");
   src_file = src_file.replace(/.html#[0-9]*/,"");
    console.log(src_file);
    args[0] = src_file;
    args[1] = lineno;
    process.run(false, args, args.length);
  }
});
