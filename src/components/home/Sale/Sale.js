import React from "react";
import SaleCardComponent from "./SaleCardComponent";

const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <SaleCardComponent imgUrl="https://cdnstatic.orelbuy.lk/image-743ce307-a89d-4c71-b715-1b66b1dcc75d.png" />
        <SaleCardComponent imgUrl="https://cdnstatic.orelbuy.lk/image-4c6fbb94-bdac-4405-b408-94a471162b9d.png" />
      </div>

      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <SaleCardComponent imgUrl="https://cdnstatic.orelbuy.lk/image-5379d00f-d75e-4947-a247-85958d7c3c72.png" />
        <SaleCardComponent imgUrl="https://cdnstatic.orelbuy.lk/image-4c6fbb94-bdac-4405-b408-94a471162b9d.png" />
      </div>
    </div>
  );
};

export default Sale;
