/* Import firebase products */
import {auth, provider, db} from '../firebase/firebaseInit';

/* Show the current user*/
export const readUser = (req, res) => {
  db.collection('users')
};
