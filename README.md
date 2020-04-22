
# Teach-Leave-Live

[Instagram](https://www.instagram.com/p/B8I9rZAh5tm/)

### Creators

- Dylan Booth
- Connor Bullock
- Michael Hoffman
- Natascha Kempfe
- Mathew Lamperski
- Noah Rieck
- Ryan Widgeon


## Overview

In order to create the Teach. Leave. Live. web application, a variety of APIs were implemented. The APIs that were utilized were Stripe, Firebase, and Facebook login.

### APIs

#### Firebase API:
Firebase is utilized in order to create and structure the Teach-Leave-Live database. The database was organized into multiple tables that recorded and stored important information. We used this to pull all data used on our project.


#### Facebook API:
The Teach-Leave-Live web app utilizes Facebook’s login functionality in order to allow users to register with their pre-existing facebook accounts. Once the user connects to their facebook, the web app then requests that their basic information (Name and email) be transferred so that it can be recorded by the firebase user table.


#### Stripe API:
The Teach.Leave.Live web app utilizes Stripe API in order to conduct secure monetary transactions for the purchase of a premium account. Once the user goes through the process of going to the account page and requesting to be a premium user they are routed to the stripe checkout window to then pay for the subscription (per clients request) on a yearly basis.

Api keys: This is located in the stripeCheckout.js file on line 4

### Description of features
#### Login and Registration
Users will login and register through Facebook. Upon visiting the site, the navigation bar will present a Login button on the far right. Users who are signed in have the option to subscribe to the newsletter and pay for premium. Users will be automatically signed in vie Facebook once they have been signed in once already.
#### Viewing Home Page
Users will be directed to the home page upon visiting the site. This page will display the company’s logo and slogan. The navigation bar will be displayed at the top at all times. Users can return later to the home through the navigation bar.
#### Accessing Blogs
Users can access the blogs page through the navigation bar. The blog page will show a list of blogs that the user can select. Selecting a blog allows the user to view it and add comments to it. The site only allows the editing of blogs and comments by the admin. So in order for a user to be allowed those accesses it's important that the user has been updated to have user permissions.
#### Viewing Courses
The courses page is also accessed through the navigation bar. All users will have the option to view certain videos. Most videos will require the user to have a premium status, however. For courses react YouTube has been implemented. We implemented a blocker to the ability to access this content without being a premium user.
#### Checking Socials
Users have the choice to view the socials page from the navigation bar. This page will display the present calendar and show the events that are happening on the selected date. Users will be able to select a date, view the events on that date, search for events, and RSVP to an event. The socials page was done using firebase to store the data entries and a material  Ui calendar template.
#### Joining Premium
Upon logging in or viewing their profile, users have the chance to join the premium service of the site. This will give them access to the premium courses in the video library. Selecting the Join Premium option will give the users a chance to provide their payment information. When being prompted to join the premium option on the accounts page once they
#### Administrative Dashboard
All administrative tasks are accomplished through the admin page, also referred to as the administrative dashboard. When signed in as the administrator, the navigation bar will include a link to the admin page. This dashboard will show a graph of user activity and a taskbar on the left for additional navigation.
#### Viewing All Users
Select the Manage Users option from the taskbar on the left. This will display a list of all users, including email, subscription status, and subscription status. The administrator can manually change any of these options for each user.
#### Managing Blog Posts
Select the Manage Blog option from the taskbar. This will display a list of current blogs and an option to Add Blog. If Add Blog is selected, the administrator may choose a title and the content for the new blog. If an existing blog is selected, options will be displayed to edit that blog’s content or delete any of its comments.
#### Changing Course Content
Select the Manage Courses option from the taskbar. This will show a list of all courses and an Add Course option. Selecting Add Course will prompt for a video to be uploaded, a title of the course, and a checkbox for if the course is exclusive to premium users. When viewing the list of active courses, each course will have an option to delete and change the premium requirement of that course.
#### Editing Social Events
Select the Manage Events option from the taskbar. This will display a calendar with the present date highlighted, an option to Add Event, and a list of current events on that date. Select a different date on the calendar to view events on that day. When Add Event is selected, the administrator will be prompted for the name of the event, the date and time it occurs at, and any additional information. If an event is selected from the current event list, options will be displayed to delete the event, change its date and/or time, and edit the additional information.

## Project Structure

This project was created with [react bootstrap](https://react-bootstrap.github.io/).

The `client/src` contains almost all of the code written for this project. Files in the `src` directory are organized into separate categories.

Because we used React for the basis of the project the structures are broken into views, components, and assets. There is also a firebase directory for firebase. Additionally we have an index.js file that holds the functionality of our express implementation.



#### Views

This directory contains react components that are responsible for an entire page or a large part of a page. For example, `src/views/Blog.js` is responsible for displaying the blog page.

#### Components

The components directory contains reusable react components. These components are small parts of the page. For example, `src/components/EmbeddedVideo` is the component responsible for displaying the

##### Assets

This directory contains the web apps images and documentation.

#### Firebase

This directory contains all relevant tools for accessing Firebase and firestore, the API used to manage data on this site. It also contains the configuration with private keys.

## Setup and Use

### Configuration

Some information (such as private keys) is not stored within this repo. Specifically `src/firebase/firebaseInit` references a config file that contains all of the private information. To get the config file, you can either find it in the other documentation or get the information directly from firebase.

To get the config from firebase:

Navigate to `project overview -> project settings`
Scroll down to Web Apps
Copy the firebaseConfig variable.

### Installing Dependencies

[Download](https://nodejs.org/en/download/) NodeJS. Node package manager (or npm) is the package manager used to handle dependencies.  After downloading the repository, open the terminal and navigate to the root of this repository, then run the command `npm install` to install all dependencies required.

### Running the App

The app can be run locally by running the command `npm start` in the `teach-leave-live` or `teach-leave-live/client` directory. It is also deployed remotely on Heroku.

When testing locally the payment processing first go do npm install, then cd into client the perform run npm build

After doing so cd out of it and then run npm start.
