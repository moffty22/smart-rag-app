import { auth } from './firebase-config';
import { db } from './firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email, password, role, teacherId = null) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Add user to Firestore
    await setDoc(doc(db, "users", uid), {
      email: email,
      role: role,
      teacherId: teacherId, // Optional field for associating students with teachers
    });

    console.log("User registered and role assigned!");
    return uid;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

