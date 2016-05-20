var translateModule = process.argv[2];

// Make the 'document' global available, in case it is needed.
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
GLOBAL.document = mock.getDocument();

var AMLTranslator = require(translateModule);
var testStrings = [
   ["Hello, World!",
    "Hello, World!"],
   ["Hello, ^~^%World!^!%^!~",
    "Hello, <EM><STRONG>World!</STRONG></EM>"],
   ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."],
  //  Other test strings here.
   ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~. Greetings ^%from ^~Glornix^!% Beta-Nine^!~. Greetings ^%from ^~Glornix^!% Beta-Nine^!~. Greetings ^%from ^~Glornix^!% Beta-Nine^!~. Greetings ^%from ^~Glornix^!% Beta-Nine^!~. Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."],
   ["In the ^~town, where I was born,^% Lived a man who sailed to sea^!~ And he told us of his life^!%",
    "In the <EM>town, where I was born,<STRONG> Lived a man who sailed to sea</STRONG></EM><STRONG> And he told us of his life</STRONG>"]
];

testStrings.forEach(function(val, idx, array) {
  translated = AMLTranslator.translate(val[0]);
  if (translated.toLowerCase() != val[1].toLowerCase()) {
    console.log("Example " + (idx + 1) + " incorrect:");
    console.log(val);
    console.log("");
    console.log("Expected:");
    console.log(val[1]);
    console.log("Received:");
    console.log(translated);
  } else {
    console.log("Example " + (idx + 1) + " correct.");
  }
});
// "Greetings <STRONG>from <EM>Glornix</STRONG> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</STRONG> Beta-Nine</EM>."
// 'Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glornix</STRONG> Beta-Nine</EM>.'
// 'Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>. Greetings <STRONG>from <EM>Glorn</EM>ix</STRON<EM>G> Beta-Nine</EM>.'
