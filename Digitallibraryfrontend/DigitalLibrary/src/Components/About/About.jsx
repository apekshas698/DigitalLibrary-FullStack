import React from "react";
import Book3 from "../../assets/Book3.avif";
const About = () => {
  return (
    <div
      id="about"
      className="dark:bg-black bg-gray-50 dark:text-white duration-300 py-16"
    >

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div
            data-aos="slide-right"
            data-aos-duration="1500"
            className="flex justify-center"
          >
            <img
              src={Book3}
              alt="About Digital Library"
              className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[400px] rounded-2xl shadow-lg object-contain"
            />
          </div>
          <div className="space-y-6 text-justify px-2 sm:px-6">
            <h1
              data-aos="fade-up"
              className="text-3xl sm:text-4xl font-bold font-serif text-primary  text-gray-900 dark:text-gray-100 drop-shadow-md"
            >
              About Digital Library
            </h1>
            <p
              data-aos="fade-up"
              className="text-gray-900 dark:text-gray-100 text-base sm:text-lg leading-relaxed"
            >
              DigitalLibrary is your gateway to a world of knowledge and imagination
              We provide a wide collection of books across genres, making reading accessible
              anytime, anywhere
            </p>
            <p
              data-aos="fade-up"
              className="text-gray-900 dark:text-gray-100 text-base sm:text-lg leading-relaxed"
            >
              Whether you're a student, researcher, or an avid reader, our platform offers
              tools to explore, borrow, and share books seamlessly. Dive into your next
              adventure with DigitalLibrary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;