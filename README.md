# wikipedia-js [![Build Status](https://travis-ci.org/kenshiro-o/wikipedia-js.png?branch=master)](https://travis-ci.org/kenshiro-o/wikipedia-js)

  wikipedia-js is a simple client that enables you to query Wikipedia articles in english. 
  The format of the result is among `json`, `jsonfm`, `wddx`, `wddxfm`, `xml`, `rawfm`.
  In the case of `html` the result is formatted in basic HTML. You can retrieve either a summary of an article (i.e. before the table of contents) or a full article

## Rationale

  This project was created because Wikipedia do currently not support a node.js API.

## Installation

    $ npm install wikipedia-js

## Usage
  All searches are performed via the single method *searchArticle*:

  ```js
    var wikipedia = require("wikipedia-js");
    var query = "Napoleon Bonaparte";
    // if you want to retrieve a full article set summaryOnly to false.
    // Full article retrieval and parsing is still beta
    var options = {query: query, format: "html", summaryOnly: true};
    wikipedia.searchArticle(options, function(err, htmlWikiText){
      if(err){
        console.log("An error occurred[query=%s, error=%s]", query, err);
        return;
      }
      console.log("Query successful[query=%s, html-formatted-wiki-text=%s]", query, htmlWikiText);
      /*You should see something along the lines of:
        <p><strong>Napoleon Bonaparte</strong> (French: Napoléon Bonaparte [napoleɔ̃ bɔnɑpaʁt], Italian: Napoleone Buonaparte; 15 August 1769&nbsp;– 5 May 1821) was a French military and political leader who rose to prominence during the latter stages of the <a href=http://en.wikipedia.org/French_Revolution">French Revolution</a> and its associated <a href=http://en.wikipedia.org/French_Revolutionary_Wars">wars</a> in Europe.</p>
        <p>As <strong>Napoleon I</strong>, he was <a href=http://en.wikipedia.org/Emperor_of_the_French">Emperor of the French</a> from 1804 to 1815. His legal reform, the <a href=http://en.wikipedia.org/Napoleonic_Code">Napoleonic Code</a>, has been a major influence on many <a href=http://en.wikipedia.org/Civil_law_(legal_system)">civil law</a> jurisdictions worldwide, but he is best remembered for his role in the wars led against France by a series of coalitions, the so-called <a href=http://en.wikipedia.org/Napoleonic_Wars">Napoleonic Wars</a>. He established hegemony over most of continental Europe and sought to spread the ideals of the French Revolution, while consolidating an <a href=http://en.wikipedia.org/First_French_Empire">imperial monarchy</a> which restored aspects of the deposed <em><a href=http://en.wikipedia.org/Ancien_Régime">Ancien Régime</a>.</em> Due to his success in these wars, often against numerically superior enemies, he is generally regarded as one of the greatest military commanders of all time, and his campaigns are studied at military academies worldwide.(ref: Schom 1998)</p>
        <p>Napoleon was born at <a href=http://en.wikipedia.org/Ajaccio">Ajaccio</a> in <a href=http://en.wikipedia.org/Corsica">Corsica</a> in a family of <a href=http://en.wikipedia.org/Nobility_of_Italy">noble Italian</a> ancestry which had settled Corsica in the 16th century. He trained as an artillery officer in mainland France. He rose to prominence under the <a href=http://en.wikipedia.org/French_First_Republic">French First Republic</a> and led successful campaigns against the <a href=http://en.wikipedia.org/First_Coalition">First</a> and <a href=http://en.wikipedia.org/War_of_the_Second_Coalition">Second</a> Coalitions arrayed against France. He led a successful invasion of the Italian peninsula.</p>
        <p>In 1799, he staged a <em><a href=http://en.wikipedia.org/18_Brumaire">coup d</em>état</a> and installed himself as <a href=http://en.wikipedia.org/First_Consul">First Consul</a>; five years later the French Senate proclaimed him emperor, following a <a href=http://en.wikipedia.org/plebiscite">plebiscite</a> in his favour. In the first decade of the 19th century, the <a href=http://en.wikipedia.org/First_French_Empire">French Empire</a> under Napoleon engaged in a series of conflicts—the Napoleonic Wars—that involved every major European power.(ref: Schom 1998) After a streak of victories, France secured a dominant position in continental Europe, and Napoleon maintained the French <a href=http://en.wikipedia.org/sphere_of_influence">sphere of influence</a> through the formation of extensive alliances and the appointment of friends and family members to rule other European countries as French <a href=http://en.wikipedia.org/client_state">client state</a>s.</p>
        <p>The <a href=http://en.wikipedia.org/Peninsular_War">Peninsular War</a> and 1812 <a href=http://en.wikipedia.org/French_invasion_of_Russia">French invasion of Russia</a> marked turning points in Napoleons fortunes. His <a href=http://en.wikipedia.org/Grande_Armée">Grande Armée</a> was badly damaged in the campaign and never fully recovered. In 1813, the <a href=http://en.wikipedia.org/Sixth_Coalition">Sixth Coalition</a> defeated his forces <a href=http://en.wikipedia.org/Battle_of_Leipzig">at Leipzig</a>; the following year the Coalition invaded France, forced Napoleon to abdicate and exiled him to the island of <a href=http://en.wikipedia.org/Elba">Elba</a>. Less than a year later, he escaped Elba and returned to power, but was defeated at the <a href=http://en.wikipedia.org/Battle_of_Waterloo">Battle of Waterloo</a> in June 1815. Napoleon spent the last six years of his life in confinement by the British on the island of <a href=http://en.wikipedia.org/Saint_Helena">Saint Helena</a>. An autopsy concluded he died of <a href=http://en.wikipedia.org/stomach_cancer">stomach cancer</a>, but there has been some debate about the cause of his death, as some scholars have speculated that he was a victim of <a href=http://en.wikipedia.org/arsenic_poisoning">arsenic poisoning</a>.</p>
      */
      }
    });
  ```

## Wiki Markup -> HTML Markup
  Below are examples of wiki markup to the left along with the corresponding HTML markup to the right

     =title= -> <h1>title</h1>
     ==title== -> <h2>title</h2>
     ===title=== -> <h3>title</h3>
     ====title==== -> <h4>title</h4>
     [[French Navy]] -> <a href="http://en.wikipedia.org/wiki/French_Navy">French Navy</a>
     [[Louis XVI of France|Louis XVI]] -> <a href="http://en.wikipedia.org/wiki/Louis_XVI">Louis XVI of France</a>
     [[Category:1769 births]] -> <span class="category"><a href="http://en.wikipedia.org/wiki/Category:1769_births">1769 births</a></span>
     {{Cite book|title=Life of Napoleon Bonaparte|last=Abbott|first=John|isbn=1-4179-7063-4|publisher=Kessinger Publishing|year=2005}} -> <span class="reference" data-type="book " data-first="John" data-last="Abbott" data-year="2005" data-publisher="Kessinger Publishing" data-isbn="1-4179-7063-4">Life of Napoleon Bonaparte</span>
     {{Gutenberg|no=3567|name=Memoirs of Napoleon}} -> <a href="http://www.gutenberg.org/ebooks/3567">Memoirs Of Napoleon</a>


## Additional features

  The following features will be added soon:
  - parse metadata
  - return other formats i.e.: `yaml`, `php`, `txt`, `dbg`, `dump`
  - improve performance

## Acknowledgement
  I would like to thank the following people for their contribution to this project:
  - torokmark
  - richorama

## Licence

(The MIT License)

Copyright (c) 2013 Kenshiro &lt;kenshiro@kenshiro.me&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.