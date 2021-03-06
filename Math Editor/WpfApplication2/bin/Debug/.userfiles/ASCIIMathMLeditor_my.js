/*
ASCIIMathMLeditor.js
====================
Version 1.4 July 14, 2004, (c) Peter Jipsen http://www.chapman.edu/~jipsen

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.
*/
var AMkeyspressed=20;function initEditor(){AMinitSymbols();var body=document.getElementsByTagName("body")[0];if(checkForMathML){checkForMathML=false;var nd=AMisMathMLavailable();if(nd!=null)body.insertBefore(nd,body.childNodes[0])}
AMdisplay(true)}
function AMnode2string(inNode,indent){var i,str="";if(inNode.nodeType==1){var name=inNode.nodeName.toLowerCase();str="\r"+indent+"<"+name;for(i=0;i<inNode.attributes.length;i++)
if(inNode.attributes[i].nodeValue!="italic"&&inNode.attributes[i].nodeValue!=""&&inNode.attributes[i].nodeValue!="inherit"&&inNode.attributes[i].nodeValue!=undefined)
str+=" "+inNode.attributes[i].nodeName+"="+"\""+inNode.attributes[i].nodeValue+"\"";if(name=="math")
str+=" xmlns=\"http://www.w3.org/1998/Math/MathML\"";str+=">";for(i=0;i<inNode.childNodes.length;i++)
str+=AMnode2string(inNode.childNodes[i],indent+"  ");if(name!="mo"&&name!="mi"&&name!="mn")str+="\r"+indent;str+="</"+name+">"}
else if(inNode.nodeType==3){var st=inNode.nodeValue;for(i=0;i<st.length;i++)
if(st.charCodeAt(i)<32||st.charCodeAt(i)>126)
str+="&#"+st.charCodeAt(i)+";";else if(st.charAt(i)=="<"&&indent!="  ")str+="&lt;";else if(st.charAt(i)==">"&&indent!="  ")str+="&gt;";else if(st.charAt(i)=="&"&&indent!="  ")str+="&amp;";else str+=st.charAt(i)}
return str}
function AMdisplay(now){if(document.getElementById("inputText")!=null){if(AMkeyspressed==20||now){var str=document.getElementById("inputText").value;var outnode=document.getElementById("outputNode");var newnode=AMcreateElementXHTML("div");newnode.setAttribute("id","outputNode");outnode.parentNode.replaceChild(newnode,outnode);outnode=document.getElementById("outputNode");var n=outnode.childNodes.length;for(var i=0;i<n;i++)
outnode.removeChild(outnode.firstChild);{outnode.appendChild(document.createTextNode(str))}
AMprocessNode(outnode,true);AMkeyspressed=0}else AMkeyspressed++}}
function AMchangeColumns(n){var node=document.getElementById("inputText");node.setAttribute("cols",n)}
doubleblankmathdelimiter=true;function AMsetDoubleBlank(){doubleblankmathdelimiter=document.getElementById("doubleblank").checked}
function AMviewMathML(){AMdisplay(true);var str=document.getElementById("inputText").value;var outnode=document.getElementById("outputNode");var outstr=AMnode2string(outnode,"").slice(22).slice(0,-6);outstr='<?xml version="1.0"?>\r\<!-- Copy of ASCIIMathML input\r'+str+'-->\r<?xml-stylesheet type="text/xsl" href="http://www1.chapman.edu/~jipsen/mathml/pmathml.xsl"?>\r<html xmlns="http://www.w3.org/1999/xhtml"\r  xmlns:mml="http://www.w3.org/1998/Math/MathML">\r<head>\r<title>...</title>\r</head>\r<body>\r'+outstr+'<\/body>\r<\/html>\r';var newnode=AMcreateElementXHTML("textarea");newnode.setAttribute("id","outputNode");var node=document.getElementById("inputText");newnode.setAttribute("rows",node.getAttribute("rows"));newnode.setAttribute("cols",node.getAttribute("cols"));newnode.style.width="100%";newnode.appendChild(document.createTextNode(outstr));outnode.parentNode.replaceChild(newnode,outnode)}