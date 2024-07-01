import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  console.log(data);
  return <div>Home</div>;
}

export default Home;
