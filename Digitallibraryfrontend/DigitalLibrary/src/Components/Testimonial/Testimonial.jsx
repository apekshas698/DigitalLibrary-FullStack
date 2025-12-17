import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Student",
      feedback:
        "DigitalLibrary has been a lifesaver for my studies. I can access books anytime, anywhere!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Mehta",
      role: "Teacher",
      feedback:
        "The collection is amazing. I love how easy it is to borrow and share books with my students.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rohan Gupta",
      role: "Entrepreneur",
      feedback:
        "A brilliant platform for book lovers. The digital access makes it super convenient.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Readers Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-gray-600 italic mb-4">“{t.feedback}”</p>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
