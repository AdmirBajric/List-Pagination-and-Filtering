/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
Selecting <ul> unordered list - studentList.
Store studentList children in the global variable allStudents.
Set the global variable itemsPerPage to 10 - will be used to display 10 list items per page.
***/
const studentList = document.querySelector(".student-list");
const allStudents = studentList.children;
const itemsPerPage = 10;

/***
 Function showPage accepts two arguments, (list - array with all list items, page - the current page on which we are currently located).
***/
const showPage = (list, page) => {
  // Creating two variables to store the start index and the end index of the list items to be displayed on the page.
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  // The for loop displays and hiddes list items, depending on which page it is currently on.
  // Page 1 displays the first 10 list items and hidde the other. Page 2 displays the next 10 list items and hidde the other and so on.
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "";
    }
  }
};

/*** 
Function appendPageLinks creates elements, adds the elements to the DOM and makes the functionality for any quantity of list items.
***/
const appendPageLinks = (list) => {
  // PaginationLinks calculate how many pagination links we need to show list items on the page.
  const paginationLinks = Math.ceil(list.length / itemsPerPage);
  // Selecting the div tag where we want to insert our pagination links.
  const page = document.querySelector(".page");
  // Creating container div element, add the class pagination and append to the page div.
  const div = createElements("div", "div");
  div.className = "pagination";
  page.appendChild(div);
  // Creating the ul element and append to the div element.
  const ul = createElements("ul", "ul");
  div.appendChild(ul);

  // The for loop creates elements (li and a elements), adds the content, the href attribute and the eventListeners to the a elements and append the elements to the ul element.
  for (let i = 1; i < paginationLinks + 1; i++) {
    // Creating li and the a element
    li = createElements("li", "li");
    a = createElements("a", "a");
    // When the first a element is created the class active is added.
    if (i === 1) {
      a.className = "active";
    }
    // Adding the textContent, every loop is 'i' increased bye 1.
    a.textContent = [i];
    // Set the attribute href='#'.
    a.setAttribute("href", "#");
    // Add eventListener to all pagination links.
    a.addEventListener("click", (e) => {
      // Cancels the event if it is cancelable, the default action will not occur. The browser in this case will not refresh the page.
      e.preventDefault();
      // Selecting all pagination links.
      const paginationLinks = document.querySelectorAll("a");
      // The for loop removes class active from all pagination links.
      for (let i = 0; i < paginationLinks.length; i++) {
        paginationLinks[i].classList.remove("active");
      }
      // Store the clicked pagination link and parse a string in to integer.
      const linkIsClicked = parseInt(e.target.innerHTML);
      // Add class active to the clicked pagination link.
      e.target.className = "active";
      // Calling the function showPage to display the list items.
      showPage(list, linkIsClicked);
    });

    // Append the elements
    li.appendChild(a);
    ul.appendChild(li);
  }
};

// The function createElements, create elements with two arguments forwarded to the function.
const createElements = (varName, elName) => {
  varName = document.createElement(elName);
  return varName;
};

/*** 
SEARCH COMPONENT - Appended the search bar and filtering
***/
// Selecting the div element, creating elements, seting the class, textContent and the attribute.
const pageHeader = document.querySelector(".page-header");
const div = createElements("div", "div");
div.className = "student-search";
const input = createElements("input", "input");
input.setAttribute("placeholder", "Search for students...");
const button = createElements("button", "button");
button.textContent = "Search";

// Creating paragraph element, setting styles.
const errMessage = createElements("errMessage", "p");
errMessage.textContent = "No matches found. Please try again!";
errMessage.style.marginTop = "20px";
errMessage.style.textAlign = "center";
errMessage.style.color = "orangered";

// Append the created elements.
div.appendChild(input);
div.appendChild(button);
pageHeader.appendChild(div);

// Setting the eventListener keyup event to filter the list items in real time
input.addEventListener("keyup", () => {
  const clientValue = input.value.toLowerCase();
  filterListItems(clientValue);
});

// Setting the eventListener click event to filter the list items when the client types something in the input filed and press the button.
button.addEventListener("click", () => {
  const clientValue = input.value.toLowerCase();
  filterListItems(clientValue);
  input.value = "";
  input.focus();
});

// Function filterListItems accept one argument clientValue. When the client use the keyboard or when he clicks the button.
const filterListItems = (clientValue) => {
  // Removing the error message
  errMessage.remove();
  // Removing the paginations links
  const removeDiv = document.querySelector(".pagination");
  removeDiv.remove();
  // Create matchedItems variable to store the matched list items
  const matchedItems = [];
  // Create notMatchingItems variable to store the list items that was not mached in the filtering
  const notMatchingItems = [];

  // The for loop is filtering the search from input field and store to the right varibale. The matched list items to displaying and the other to hidde.
  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].querySelector("h3").textContent.includes(clientValue)) {
      matchedItems.push(allStudents[i]);
      allStudents[i].style.display = "";
    } else {
      notMatchingItems.push(allStudents[i]);
      allStudents[i].style.display = "none";
    }
  }

  // When no matches are found the error message is appended to the div element.
  if (notMatchingItems.length === allStudents.length) {
    div.appendChild(errMessage);
  }
  // Calling the functions showPage and appendPageLinks, to display the filtering results.
  showPage(matchedItems, 1);
  appendPageLinks(matchedItems);
};

// First time calling the functions to run the application
showPage(allStudents, 1);
appendPageLinks(allStudents);
