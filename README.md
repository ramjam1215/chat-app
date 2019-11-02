# ChatApp
By: James Corcoran

11-1-2019
- started chat-app, reading/tutorial from ng-book.
- i had to make some minor changes to the code in the book to make it compile/work, observables/subjects needed some imported libraries to run certain functions like'.map', '.filter', '.scan'. 
- after finishing up there i wanted to use semantics-ui-css, but i had issues trying to npm install it becasue of some gulper install. I looked online and no suggestions worked
- So i downloaded the the semantic files and added them in sort of manually in the angular.json file. I placed it in the scripts and styles arrays. i made a simple little div tag with a button to test semantics and it worked. But i got an error on the webpage about jquery not being defined, i believe.
- I had to also place jquery BEFORE the semantics.css in the scripts array. It worked, and thats where i'm going to stop

