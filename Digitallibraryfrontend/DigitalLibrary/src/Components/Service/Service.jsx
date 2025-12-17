import React from "react";
import { BookOpen, Users, Laptop, Calendar } from "lucide-react";

const Service = () => {
  const services = [
    {
      icon: <BookOpen size={40} className="text-yellow-500" />,
      title: "Wide Collection of Books",
      description:
        "Explore thousands of books across various categories, genres, and authors.",
    },
    {
      icon: <Laptop size={40} className="text-yellow-500" />,
      title: "Digital Library Access",
      description:
        "Read books online anytime, anywhere with our digital library platform.",
    },
    {
      icon: <Users size={40} className="text-yellow-500" />,
      title: "Community & Sharing",
      description:
        "Connect with readers, share books, and exchange knowledge in our community.",
    },
    {
      icon: <Calendar size={40} className="text-yellow-500" />,
      title: "Events & Workshops",
      description:
        "Participate in author meetups, reading sessions, and knowledge-sharing events.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
