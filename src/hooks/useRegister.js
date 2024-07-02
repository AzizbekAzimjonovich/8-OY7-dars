import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const { user } = userCredential;
      setIsPending(false);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL,
        })
      );
      toast.success(`Welcome ${displayName}`);
    } catch (error) {
      setIsPending(false);
      toast.error(error.message);
    }
  };

  return { isPending, register };
};
