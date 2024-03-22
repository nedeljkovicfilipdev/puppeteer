# Puppeteer tool for web scraping

Tech Stack:

-NodeJS
-React, Redux, Typescript

Code was written in VSCode editor

Backend:
-Importing Nodejs library Puppeeteer for web scraping page www.etsy.com 
cmd npm i puppeteer

-Added middleware for api request made from frontend
-Added routing for request
-Controller for navigating through project
-Added folder scrapers with 2 files within: 
*categories.js
*products.js

Categories.js was added for learning basic puppeteer functions

Products.js is main file for web scraping through given URL (etsy.com)
-First part of file scrapes homepage for products and returns name, image, url and price
-Second part automates going through multiple URLs from products to the detailed page where
it scrapes descriptions, sizes, materials etc.

Frontend:
-Importing Vite template https://github.com/rayyamhk/vite-react-component-library-starter
npm install -g degit
degit rayyamhk/vite-react-component-library-starter my-component-library
-Importing different QoL libraries like tailwindCSS, react-helmet, redux-toolkit, react-router-dom, lucide-react, react-toastify, i18next

*Minor modifications have been done to make navigating through template easily

During development I used official puppeteer documentation "pptr.dev" and had assistence for navigating new tool with stackoverflow,

The biggest challenge i have encountered was solving captcha problems and navigating multiple urls and saving them to the Product array of objects.
I have created RandomUserAgents, used puppeteer-extra library for stealthPlugin and if captcha is shown, manual solving where program waits until captcha is solved then continues scraping.
There is also minor timeout on every url opening for captcha checking. If there is not captcha shown, scraping continues as normal.

There was also challenges with Redux store while setting it up and error handling, but it was solved quite fast.

This kind of project was really entertaining to learn, and i will keep on updating it as i learn more advanced techniques of Puppeteer
