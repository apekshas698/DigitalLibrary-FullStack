import React from "react";
import Book1 from "../../assets/Book1.avif";
import Book2 from "../../assets/Book2.avif";

const Hero = ({ theme }) => {
  return (
    <div className="dark:bg-black dark:text-white duration-300 relative z-20">
      <div className="container min-h-[80vh] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            className="order-1 sm:order-2 flex justify-center"
          >
            <img
              src={theme === "dark" ? Book2 : Book1}
              alt="Library"
              className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[350px] rounded-2xl shadow-lg object-contain mx-auto"
            />
          </div>
          <div className="order-2 sm:order-1 space-y-6 px-4">
            <p
              data-aos="fade-up"
              className="text-primary text-xl font-serif tracking-wide"
            >
              Welcome to Digital Library
            </p>

            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-3xl lg:text-5xl font-bold font-serif leading-tight"
            >
              Discover, Read & Share <br /> Your Favorite Books
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-gray-600 dark:text-gray-300 max-w-md"
            >
              Explore a wide collection of books, from timeless classics to
              modern favorites. Start your reading journey with us today.
            </p>
            <div data-aos="fade-up" data-aos-delay="1200">
    <button className="px-6 py-3 border-2 bg-yellow-400 text-black rounded-full shadow-md hover:border-yellow-500 duration-300">
          Get Started
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
