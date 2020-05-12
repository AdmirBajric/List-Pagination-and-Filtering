# List Pagination and Filtering

## Techdegree project 2

### Description of the project

1. Using list of students from the HTML file and display 10 students per one page.
2. Added navigation system to web page
3. Added search comonent system to filtering the studets name

### Overview how the project is created

#### The first challenge

1. Created two global variables, in the first stored the list items (students) and in the second stored the student per page number 10.
2. First arrow function expression accepts two arguments list -HTMLCollection and the page - represent the current number, to display the students depending on which page we are on.
3. Second arrow function expression accept one argument list - HTMLCollection. This function creates elements, adds attributes, classes, textContent, use events, create with for loop the pagination links and manipulating with the DOM.
4. Created helper arrow function expression to create elements, calling this function, passing two arguments we create a new element.

#### The extra challenge

1. Created the search component - created elements, set attributes, manipulating with the DOM, added eventListeners for keyup event and click event. With event storing the value from the client and filtering the list items.
2. When the events are fired the arrow function expression is called to filter the value that the client is searching and displays on the page.
