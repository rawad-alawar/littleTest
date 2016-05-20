var AMLTranslator = (function(){
  return{
    translate: function(aml){
      //Replaces all of the special Alien tags with their proper HTML tags
      var alien= aml;
      alien = alien.replace(/\^%/g, "<STRONG>");
      alien = alien.replace(/\^!%/g, "</STRONG>");
      alien = alien.replace(/\^~/g, "<EM>");
      alien = alien.replace(/\^!~/g, "</EM>"); //alien is now a string with HTML version of the tags, but alien still lacks the HTML formatting such as a tag closing within its parent tag

      //Initializes empty arrays that will hold the index points of the tags
      var indexStrongClose = []
      var indexEmClose = []
      var indexStrongOpen = []
      var indexEmOpen =[]

      //Loops through the alien string and pushes the starting point index of the HTML tags. All of the tags have unique characteristics that will not show up in any other context within the string. For example, I found all of the Strong Text Effect tags' beginning index points by searching for consecutive occurances of '/' & 'S'. I did the same thing for the other three types of tags.
      for (var i = 0; i<alien.length; i++){
        if (alien[i] == '/' && alien[i+1]=='S'){
          indexStrongClose.push(i-1)
        }else if (alien[i] == '/' && alien[i+1]=='E'){
          indexEmClose.push(i-1)
        }else if(alien[i]=='<' && alien[i+1]=='S'){
          indexStrongOpen.push(i)
        }else if (alien[i]=='<' && alien[i+1]=='E'){
          indexEmOpen.push(i)
        }
      }

      //I split alien into an array because arrays are easier to manipulate.
      alien = alien.split("")
      //Now I know all of the index points of the tags. The nested for loop below checks to see if an opening tag index is between a pair of same tags. First I check and see if any of the open EM tags <EM> are between any consecutive open/close pair of STRONG tags. The else if statement checks to see if STRONG tag is between any EM tags.

      for (var j=0; j<indexEmOpen.length; j++){
        for (var l=0; l<indexStrongOpen.length; l++){
          if (indexEmOpen[j] > indexStrongOpen[l] && indexEmOpen[j] < indexStrongClose[l]){
            //If an EM tag is between an open/close pair of STRONG tags, </EM> is spliced before the closing STRONG tag and <EM> is spliced after the closing STRONG tag. Because a single AML tag cannot be opend twice without being closed, the added opening <EM> tag automatically creates a proper <EM></EM> tag conversion in HTML. We know that a STRONG tag will not be opened between our new <EM></EM> pair.
            alien.splice([indexStrongClose[j]],0,'</EM>')
            alien.splice([indexStrongClose[j]+10],0,'<EM>')

            //To correct for the changing index points in the array caused by adding tags, I change the index point of the next STRONG closing point to compensate. The effect is not constant, so I tied it to the 'j' variable in the loop
            indexStrongClose[j+1]=indexStrongClose[j+1]+2+j+j
          }else if (indexStrongOpen[j] > indexEmOpen[l] && indexStrongOpen[j] < indexEmClose[l]){
            //Accounts for any <STRONG> opening tags in between a pair of consecutive open/close EM tags. Works the same as the above if statement.
             alien.splice([indexEmClose[j]],0,'</STRONG>')
             alien.splice([indexEmClose[j]+6],0,'<STRONG>')
             indexStrongClose[j+1]=indexEmClose[j+1]+2+j+j
           }
        }
      }
      //Covert alien back to a string and return it :)
      alien = alien.join('')
      return alien
    }
  };
}());


if(module.exports){
  module.exports = AMLTranslator
}
