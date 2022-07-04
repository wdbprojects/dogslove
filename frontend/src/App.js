import React from "react";
import { LiveVideo } from "./svg";

function App() {
  const get = async () => {
    const response = await fetch("http://localhost:3000");
    console.log(response);
  };

  get();

  return (
    <>
      <div>welcome to frontend</div>
      <div className="all_friends_icon"></div>
      <LiveVideo color="slateblue" />
    </>
  );
}

export default App;
