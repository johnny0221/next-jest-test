import type { NextPage } from "next";
import { Counter } from "../components/Counter/Counter";

const Home: NextPage = () => {
  return <Counter defaultCount={0} description="Hello Counter" />;
};

export default Home;
