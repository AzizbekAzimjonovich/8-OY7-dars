import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // To'g'ri joydan import qiling
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

      const user = userCredential.user;
      setIsPending(false);
      dispatch(login(user));
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      setIsPending(false);
      toast.error(error.message);
    }
  };

  return { isPending, register };
};
