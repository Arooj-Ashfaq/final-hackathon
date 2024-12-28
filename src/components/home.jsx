import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register");
    } else {
      navigate("");
    }
  };
  const handleNav = ()=>{
navigate('/create')
  }
  return (
    <div>
      {/* ..........................GetStarted............................ */}
      <div className="mx-auto max-w-2xl py-15 sm:py-20 lg:py-35">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Share, Collaborate, and Learn
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-00 sm:text-5xl">
            Your One-Stop Platform for All Notes
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

      <section className="py-16 text-gray-800 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div onClick={handleNav} className="bg-slate-300 cursor-pointer rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl font-semibold">Share Notes</h3>
              <p className="mt-4">
                Upload and share your notes with others in just a few clicks.
              </p>
            </div>
            <div onClick={handleNav} className="bg-slate-300 cursor-pointer rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl font-semibold">Explore Notes</h3>
              <p className="mt-4">
                Browse through a vast collection of notes on various subjects.
              </p>
            </div>
            <div onClick={handleNav} className="bg-slate-300 cursor-pointer rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl font-semibold">Collaborative Learning</h3>
              <p className="mt-4">
                Join a community of learners who help each other grow.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 text-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Get Started Today!</h2>
          <p className="text-xl mb-8">
            Join a growing community of learners and start sharing notes today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
