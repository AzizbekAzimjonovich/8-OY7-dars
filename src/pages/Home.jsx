import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { FormInput, FormCheckbox, TodosList } from "../components";
import { Form, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Home() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        completed: userData.completed === "on",
        uid: user.uid,
      };

      addDoc(collection(db, "todos"), newTodo)
        .then(() => toast.success("New Todo added"))
        .catch((error) => toast.error(error.message));
    }
  }, [userData, user.uid]);

  return (
    <div className="container align-element pr-5 pl-5 grid grid-cols-1 md:grid-cols-2">
      <div>{data && <TodosList data={data} />}</div>
      <div className="card bg-base-100 w-96 shadow-xl p-8">
        <Form method="post" className="flex flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold">New Todo</h2>
          <FormInput name="title" type="text" label="Todo title" />
          <FormCheckbox />
          <button className="btn btn-primary btn-block">Add</button>
        </Form>
      </div>
    </div>
  );
}

export default Home;
