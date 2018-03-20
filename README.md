# MyREADS App

This is my submission for Project 5 of the [Udacity Front End Developer 
Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001). 
MyReads is a library management app that keeps track of what books
you are reading. The app uses React & react-router to build a single page app front-end 
for a RESTful books API. MyReads can search for books, add books to shelves, and move
books between shelves. It is a responsive, mobile-first app built with Material-UI
and styled-components that look great on mobile, tablet, or desktop.


## Installing
MyReads was built with create-react-app & requires nothing more than cloning the
repository and running the following commands in the repository directory using
the CLI.

```
yarn install
yarn start
```

or

```
npm install
npm start
```

## Important

The backend API is limited to a set of cached search results and is, thus, limited to those terms. 
You can find a list of these terms by looking in searchTerms.js or clicking the 'Search Terms' button 
on the search page of the app.

## Acknowledgements

The Search Terms Modal Window is a modified version of the modal window code found
in David Cedia's blog [Modal Dialogs in React](https://daveceddia.com/open-modal-in-react/).

