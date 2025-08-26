import React from "react";

const BookNowButton = () => (
  <button className="bg-[#B8A171] text-black text-xs font-semibold py-1.5 px-5 rounded-md hover:bg-[#FFF2CC] transition-colors">
    Book Now
  </button>
);

const PricingTable = ({ title, columns, values }) => {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <div className="rounded-lg overflow-hidden border border-[#333] bg-[#1E1E1E]">
        <table className="w-full text-center text-sm md:text-base">
          <thead className="border-b border-[#333]">
            <tr className="divide-x divide-[#333]">
              {columns.map((col, idx) => (
                <th key={idx} className="py-4 px-2 font-medium text-gray-300">
                  {col}
                </th>
              ))}
              <th className="py-4 px-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="divide-x divide-[#333]">
              {values.map((val, idx) => (
                <td key={idx} className="py-4 px-2 text-white">
                  {val}
                </td>
              ))}
              <td className="py-4 px-2">
                <BookNowButton />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PricingTable;