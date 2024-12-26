import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from './Footer'

function Home() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const token = localStorage.getItem('token')
    if(!token){
    navigate("/register");
  }else{
    navigate('')
  }
  };
  return (
    <div>
      {/* ..........................GetStarted............................ */}
      <div className="mx-auto max-w-2xl py-15 sm:py-20 lg:py-35">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of Hackathon
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-00 sm:text-7xl">
            Enroll in Hackathon & Test Yourself
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => handleNavigate()}
              className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
      {/* .............................................................. */}
      



      <Footer/>
    </div>
  );
}

export default Home;
