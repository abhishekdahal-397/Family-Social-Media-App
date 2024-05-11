import React from "react";

const Stories = () => {
  const cards = [
    { title: "Card 1", content: "Content of Card 1" },
    { title: "Card 2", content: "Content of Card 2" },
    { title: "Card 3", content: "Content of Card 3" },
    { title: "Card 4", content: "Content of Card 4" },
    { title: "Card 5", content: "Content of Card 5" },
    { title: "Card 6", content: "Content of Card 6" },
    { title: "Card 6", content: "Content of Card 6" },
    { title: "Card 6", content: "Content of Card 6" },
    { title: "Card 6", content: "Content of Card 6" },
    { title: "Card 6", content: "Content of Card 6" },
  ];

  return (
    <>
      <div>Stories</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card bg-white shadow-md w-[7rem] mr-5 overflow-hidden mt-4 mb-4 rounded-md p-4 h-[10rem]"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-gray-700">{card.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
