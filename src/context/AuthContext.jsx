// // src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from 'react';
// import { auth, firestore } from '../services/firebase';
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Sign up function
//   const signup = async (email, password, username) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
//       // Create user profile in Firestore
//       await setDoc(doc(firestore, "users", userCredential.user.uid), {
//         uid: userCredential.user.uid,
//         email,
//         username,
//         displayName: username,
//         followers: [],
//         following: [],
//         createdAt: new Date().toISOString(),
//         bio: '',
//         photoURL: ''
//       });
      
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Sign in function
//   const login = async (email, password) => {
//     try {
//       return await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Sign out function
//   const logout = () => {
//     return signOut(auth);
//   };

//   // Get user profile data
//   const getUserProfile = async (uid) => {
//     try {
//       const userDoc = await getDoc(doc(firestore, "users", uid));
//       if (userDoc.exists()) {
//         return userDoc.data();
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const profile = await getUserProfile(user.uid);
//         setCurrentUser({ ...user, profile });
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     getUserProfile
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };