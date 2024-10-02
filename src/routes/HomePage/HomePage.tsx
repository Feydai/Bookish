import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <div>
        <div>
          <span>LOGO</span>
        </div>
        <h1>Welcome to BookClub</h1>
        <p>Discover and discuss your favorite books with fellow readers.</p>
        <button onClick={() => nav('/signIn')}>Get Started!</button>
      </div>
    </div>
  );
};

export default HomePage;
