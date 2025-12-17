import React from "react";

const AppStore = () => {
  return (
    <div className="bg-yellow-50 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Get the DigitalLibrary App</h2>
          <p className="text-gray-600 mb-6">
            Access thousands of books, borrow instantly, and enjoy reading on
            the go. Download our mobile app now from your favorite store.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="inline-block"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12"
              />
            </a>
            <a
              href="#"
              className="inline-block"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://cdn.dribbble.com/users/1787323/screenshots/6145089/library_app.png"
            alt="Digital Library App"
            className="w-72 md:w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default AppStore;
