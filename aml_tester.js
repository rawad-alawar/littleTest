var translateModule = process.argv[2];

// Make the 'document' global available, in case it is needed.
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var mock = new MockBrowser();
GLOBAL.document = mock.getDocument();

var AMLTranslator = require(translateModule);
console.log(AMLTranslator)
var testStrings = [
   ["Hello, World!",
    "Hello, World!"],
   ["Hello, ^%World!^!%",
    "Hello, <STRONG>World!</STRONG>"],
   ["Greetings ^%from ^~Glornix^!% Beta-Nine^!~.",
    "Greetings <STRONG>from <EM>Glornix</EM></STRONG><EM> Beta-Nine</EM>."]
   // Other test strings here.
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
