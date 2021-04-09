import React from "react";
import Posts from "../post/Posts";

const Home = () => (
  <div>
    <div className=" mt-6 box has-text-centered">
      
      <p className="is-size-3"><strong>Welcome to The Social Club</strong></p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
