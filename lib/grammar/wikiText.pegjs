/**
	Wikipedia's Wikitext peg.js grammar file. We try here to formally define the structure
	of the wiki text	
**/

start
	= wikiText:wikiText+ {return wikiText.join("");} 

wikiText
	= template:template {return template;}
	/ complexTemplate:complexTemplate {return complexTemplate;}
	// comment:comment {return comment;}
	/ formatted:formatted {return formatted;}
	/ textLink:textLink {return textLink;}
	/	plainLink:plainLink {return plainLink;}
	/ plainText:plainText {return plainText;}
	/ bracketText:bracketText {return bracketText;}	
	/ fileLink:fileLink {return fileLink;}

textOrLink
	=	plainText:plainText
	/ formatted:formatted
	/ plainLink:plainLink
	/ textLink:textLink
	/ brackeText:bracketText
	/ htmlText:htmlText

template
	=	 "{{" plainText:plainText* "}}" {return plainText;}


complexTemplate
	=	"{{" name:plainText map:templateMap+ "}}" {return "[" + name + ", map]";}

templateMap
	= "|" key:plainText+ "=" value:templateMapValue+ {return key.join("") + "=" + value;}
		/ "|"  	


templateMapValue
	= textOrLink
	/ templateValue

formatted
	= htmlComment
	/ boldText
	/ italicText
	/ boldAndItalicText
	/	htmlText
	/ breakLine

templateValue
	= "{{" title:plainText ("|" number)* ("|" directive:plainText "=" directiveValue:plainText)* "}}"

htmlText
	= "<" plainText:plainText ">" textOrLink:textOrLink* "</" plainText ">"

htmlComment 
	= "<!--" [A-Za-z0-9"': ]+ "-->"

breakLine
	= "<br" space* "/>" {return "\n";}

boldText
	=	"'''" plainText:plainText "'''" {return "<strong>" + plainText + "</strong>";}

italicText	
	= "''" plainText:plainText "''" {return "<em>" + plainText + "</em>";}

boldAndItalicText
	= "'''''" plainText:plainText "'''''" {return "<strong><em>" + plainText + "</em></strong>";}


fileLink 
	= "[[File:" t1:plainText ("|" t:plainText)* "]]"

plainLink
	= "[[" txt:plainText "]]" {return txt;} 

textLink
	= "[[" link:plainText ("#" subsection:plainText)? "|" text:plainText "]]" {
		console.log("*** link=" + link + ", text=" + text);
		return "[[" + link + " -> " + text + "]]";}

bracketText
	= "(" text:textOrLink+ ")" {console.log("***=" + text.join(""));}
	/ "(" complexTemplate:complexTemplate* plainText:plainText* ")"


plainText
	= chars
	/ number 

newline
	=	nl:[\n\r]+ {return "\n";}

chars
	= chars:char+ {return chars.join("");}

char
	= lowerCase
	/ upperCase
	/ space
	/ newline
	/	punctuation
	/	specialChar
	/ unicodePunct
	/	unicodeLatin

specialChar
	= "\&"{ console.log("***********YYYYYYYYY*****");return ";"}

unicodePunct
	= p:[\u2000-\u206F\u2E00-\u2E7F] {return "";}

unicodeLatin
	= l:[\u00C0-\u00FF] {return l;}



punctuation
	= separator
	/ apostrophe
	/ quotation

separator
	= sep:[?!,.:;-] {return sep;}
	/ s:"_" {return s;}


apostrophe
	= ap:"'" {return ap;}

quotation
	= q:['"] {return q;}

lowerCase
	=	lw:[a-z] {return lw;}

upperCase
	= up:[A-Z] {return up;}

number
	= digits:digit+ {return parseInt(digits.join(""), 10);}
	/ "%u2013" uDigits:hexDigit* {
		return String.fromCharCode(parseInt("0x" + uDigits.join("")));
	}

digit
	= d:[0-9] {return d;}

hexDigit
  = h:[0-9a-fA-F] {return h;}

spaces
	= sps:" " {return "";}

space
	= sp:[ \t\f] {return sp;}
