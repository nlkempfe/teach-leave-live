/* Import firebase products */
import {auth, provider, db} from '../firebase/firebaseInit';

/* Show the current user*/
export const readUser = () => {
    /* This function just returns an object representing the signed in user's user document.
       If no user is signed in, the function will return null. */

    let userString = localStorage.getItem("currentUser");
    if(userString){
        /* A user object is signed in and returned */
        return JSON.parse(userString);
    }
    else
        /* User is not signed in */
        return null;
};

/* Return array of all users */
export const getUsers = () => {
  let users = [];
  db.collection('users').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      users.push({
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        premium: doc.data().premium,
        role: doc.data().role,
      });
    });
  });
  return users;
}


/* COURSES */

/* Create course document in database */
export const createCourse = (course) => {
    /* This function takes in a JSON object that represents the course created.
       The course will be saved by its name and can be retrieved the same way */

    let courseRef = db.collection('courses').doc(course.name);
    let createCourse = courseRef.set(course);

};

/* Update course document in database */
export const updateCourse = (name, updatedValues) => {
    /* Function takes in the course's name and a JSON object representing only the values
        to be changed. */

    let courseRef = db.collection('courses').doc(name);
    let updateCourse = courseRef.update(updatedValues);


};

/* Delete course document from database */
export const deleteCourse = (name) => {
    /* Function takes in the course's name to be deleted. */

    let deleteDoc = db.collection('courses').doc(name).delete();

};


/* USERS */

/* Update user document in database */
export const updateUser = (uid, updatedValues) => {
    //the uid is the user id (unique identifier) created on initial authentication
    //This value can be retrieved from the signed-in user (readUser() above)

    let userRef = db.collection('users').doc(uid);
    let updateUser = userRef.update(updatedValues);

};

/* Delete user document in database */
export const deleteUser = (uid) => {
    /* Takes in a uid (retrieved from the currently signed in user) */

    let deleteDoc = db.collection('users').doc(uid).delete();

};


/* EVENTS */

/* Create event document in database */
export const createEvent = (event) => {
    /* Takes in a JSON object representing the event to be created.  */

    let eventRef = db.collection('events').doc(event.name);
    let createEvent = eventRef.set(event);

};

/* Update event document in database */
export const updateEvent = (name, updatedValues) => {
    /* Takes in the name of the event and a JSON object representing only the changes to be made */

    let eventRef = db.collection('events').doc(name);
    let updateEvent = eventRef.update(updatedValues);

};

/* Delete event document from database */
export const deleteEvent = (name) => {
    /* Takes in the name of the event to be deleted */

    let deleteEvent = db.collection('events').doc(name).delete();

};
